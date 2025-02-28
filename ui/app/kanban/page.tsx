import Board from "@/components/Board";
import Column from "@/components/Column";
import Card from "@/components/Card";

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
        {
          ["New", "WIP", "Done"].map((col, idx) => (
            <Column title={col} id={idx} key={col}>
              { tasks.filter(f => f.column == idx).map(task => (
                <Card task={task} key={task.id} />
              ))}
            </Column>
          ))
        }
      </Board>

      <div>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </>
  );
}
