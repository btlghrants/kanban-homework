'use server';

import App from "@/components/App";
import { Stage, Task } from "@/app/api/db";
import * as TaskService from "@/app/taskServices";
import * as StageService from "@/app/stageServices";

export default async function Page() {
  const tasks: Task[] = await TaskService.readAll();
  const stages: Stage[] = await StageService.readAll();

  return (
    <>
      <App stages={stages} tasks={tasks} />
    </>
  );
}
