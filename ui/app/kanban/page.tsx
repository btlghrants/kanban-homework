import App from "@/components/App";
import { Stage, Task } from "@/app/api/db";

export default async function Page() {
  const tasksResponse = await fetch("http://localhost:3000/api/tasks");
  const tasks: Task[] = await tasksResponse.json();

  const stagesResponse = await fetch("http://localhost:3000/api/stages");
  const stages: Stage[] = await stagesResponse.json();

  return (
    <App stages={stages} tasks={tasks} />
  );
}
