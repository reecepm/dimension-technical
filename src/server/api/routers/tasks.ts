import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { Priority } from "@prisma/client";
import { EmbeddingType, Metadata } from "@/server/pinecone";
import { removeStopwords } from "stopword";

export const taskRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1, { message: "Title is required" }),
        description: z.string().optional(),
        projectId: z.string().optional(),
        statusId: z.string().optional(),
        assignees: z.string().array().optional(),
        priority: z.nativeEnum(Priority).optional(),
        tags: z.string().array().optional(),
        dueDate: z.date().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.task.create({
        data: {
          ...input,
          tags: {
            connect: input.tags?.map((tag) => ({ id: tag })),
          },
          assignees: {
            connect: input.assignees?.map((assignee) => ({ id: assignee })),
          },
        },
      });
    }),
  getRelevantTagAndProjects: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .output(
      z.object({
        tags: z.string().array(),
        projects: z.string().array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingTags = await ctx.prisma.tag.findMany();
      const existingProjects = await ctx.prisma.project.findMany();

      const baseInput = (input.title + ": " + input.description).split(" ");
      const simplified = removeStopwords(baseInput); // should reduce token usage a bit

      const aiInput = [
        simplified.slice(0, 120).join(" "), // almost definitely a better way to do this, might be better to do off character count, but just grab the first 120 words so it doesn't eat toooooo many tokens
        ...existingTags.map((tag) => tag.name),
        ...existingProjects.map((project) => project.name),
      ];

      const embeddings = await ctx.openai.createEmbedding({
        model: "text-embedding-ada-002",
        input: aiInput,
      });

      const assignedIndexes: {
        id: string;
        type: EmbeddingType;
      }[] = [
        {
          id: "input",
          type: "input",
        },
        ...existingTags.map((tag) => ({
          id: tag.id,
          type: "tag" as EmbeddingType,
        })),
        ...existingProjects.map((project) => ({
          id: project.id,
          type: "project" as EmbeddingType,
        })),
      ]; // bit hacky but openai doesn't have metadata for embeddings right now

      await ctx.pinecone.upsert({
        vectors: embeddings.data.data.map((e) => {
          const assigned = assignedIndexes[e.index];
          return {
            id: assigned?.id || e.index.toString(),
            values: e.embedding,
            metadata: {
              type: assigned?.type || "input",
            },
          };
        }),
      });

      const { matches: inputMatches } = await ctx.pinecone.query({
        topK: 10,
        id: "input",
        includeMetadata: true,
        filter: {
          type: {
            $in: ["tag", "project"],
          },
        },
      });
      const matchesHighToLow = inputMatches.sort((a, b) => b.score - a.score);

      return {
        tags: matchesHighToLow
          .filter((m) => m.metadata.type === "tag")
          .slice(0, 2)
          .map((m) => m.id),
        projects: matchesHighToLow
          .filter((m) => m.metadata.type === "project")
          .slice(0, 1)
          .map((m) => m.id),
      };
    }),
});
