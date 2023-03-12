import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: publicProcedure
    .output(
      z
        .object({
          id: z.string(),
          createdAt: z.date(),
          updatedAt: z.date(),
          name: z.string(),
        })
        .array()
    )
    .query(({ ctx }) => {
      return ctx.prisma.user.findMany();
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1, { message: "Name is required" }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.create({
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
      await ctx.prisma.user.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
