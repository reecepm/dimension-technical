import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "@/server/api/routers/projects";
import { taskRouter } from "@/server/api/routers/tasks";
import { userRouter } from "@/server/api/routers/users";
import { statusRouter } from "@/server/api/routers/status";
import { tagRouter } from "@/server/api/routers/tags";

export const appRouter = createTRPCRouter({
  projects: projectRouter,
  tasks: taskRouter,
  users: userRouter,
  statuses: statusRouter,
  tags: tagRouter,
});

export type AppRouter = typeof appRouter;
