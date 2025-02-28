import Board from "@/components/Board";
import Column from "@/components/Column";

import { Task } from "@/app/api/db";

export default function Page() {
  return <MyApp/>
}

async function MyApp() {
  const resp = await fetch("http://localhost:3000/api/tasks");
  const tasks: Task[] = await resp.json();

  return (
    <>
      <Board>
        { ["New", "WIP", "Done"].map((col, idx) => (
          <Column
            title={col}
            key={col}
            tasks={tasks.filter(t => t.column === idx)}
          />
        ))}
      </Board>

      <div>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </>
  );
}
