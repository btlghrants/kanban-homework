import React from 'react';
import Column from "@/components/Column";
import { Task } from "@/app/api/db";

function Board({
  columns,
  tasks,
}: Readonly<{
  columns: string[],
  tasks: Task[],
}>) {
  return (
    <div className={`bg-red-300 size-full flex flex-row p-5 gap-3 rounded-lg overflow-auto`}>
      { columns.map((col, idx) => (
        <Column
          title={col}
          key={col}
          tasks={tasks.filter(t => t.column === idx)}
        />
      ))}
    </div>
  );
}

export default Board;