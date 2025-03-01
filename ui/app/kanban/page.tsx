import App from "@/components/App";
import { Task } from "@/app/api/db";

export default async function Page() {
  const resp = await fetch("http://localhost:3000/api/tasks");
  const tasks: Task[] = await resp.json();

  return (
    <App tasks={tasks} />
  );
}
