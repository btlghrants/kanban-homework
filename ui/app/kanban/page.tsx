import Board from "@/components/Board";
import { Task } from "@/app/api/db";

export default function Page() {
  return <MyApp/>
}

async function MyApp() {
  const resp = await fetch("http://localhost:3000/api/tasks");
  const tasks: Task[] = await resp.json();

  return (
    <>
      <Board columns={["New", "WIP", "Done"]} tasks={tasks} />

      <div>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </>
  );
}
