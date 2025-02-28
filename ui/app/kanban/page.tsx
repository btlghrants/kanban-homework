import Board from "@/components/Board";
import Column from "@/components/Column";
import Card from "@/components/Card";

export default function Page() {
  return <MyApp/>
}

async function MyApp() {
  const resp = await fetch("http://localhost:3000/api/tasks");
  const tasks = await resp.json();

  return (
    <>
      <Board>
        <Column title="Column 1">
          <Card />
        </Column>
        <Column title="Column 2">
          <Card />
          <Card />
        </Column>
        <Column title="Column 3">
          <Card />
          <Card />
          <Card />
        </Column>
      </Board>
      {/* <div>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div> */}
    </>
  );
}
