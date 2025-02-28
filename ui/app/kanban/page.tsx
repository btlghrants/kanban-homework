import Board from "@/components/Board";

export default function Page() {
  return <MyApp/>
}

async function MyApp() {
  const resp = await fetch("http://localhost:3000/api/tasks");
  const tasks = await resp.json();

  return (
    <>
      <Board />
      {/* <div>
        <h2>Tasks</h2>
        <pre>{JSON.stringify(tasks, null, 2)}</pre>
      </div> */}
    </>
  );
}
