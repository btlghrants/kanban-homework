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
        <Column title="Column 1" id={1}>
          { tasks.filter(f => f.column == 1).map(task => <Card task={task} key={task.id}/>)}
        </Column>
        <Column title="Column 2" id={2}>
          { tasks.filter(f => f.column == 2).map(task => <Card task={task} key={task.id} />)}
        </Column>
        <Column title="Column 3" id={3}>
          { tasks.filter(f => f.column == 3).map(task => <Card task={task} key={task.id}/>)}
        </Column>
      </Board>

      <div>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div>
    </>
  );
}
