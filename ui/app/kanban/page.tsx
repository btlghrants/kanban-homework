import Board from "@/components/Board";
import { Task } from "@/app/api/db";

export default async function Page() {
  const resp = await fetch("http://localhost:3000/api/tasks");
  const tasks: Task[] = await resp.json();

  return (
    <>
      <Board columns={["New", "WIP", "Done"]} tasks={tasks} />

      <div className={`pt-5`}>
        <h2>Tasks</h2>
        <pre className={`overflow-auto`}>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </>
  );
}
