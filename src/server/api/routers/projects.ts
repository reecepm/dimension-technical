import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { pinecone } from "@/server/pinecone";

export const projectRouter = createTRPCRouter({
  getAll: publicProcedure
    .output(
      z
        .object({
          id: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          name: z.string(),
          color: z.string(),
        })
        .array()
    )
    .query(({ ctx }) => {
      return ctx.prisma.project.findMany();
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
        color: z.string().regex(/^text-[a-z]{3,8}-[0-9]{3}$/),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.project.create({
        data: {
          ...input,
        },
      });
      return true;
    }),
  remove: publicProcedure
    .input(
      z.object({
        id: z.string().nonempty(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await pinecone.delete({
        ids: [input.id],
      });
      await ctx.prisma.project.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
