import React from 'react';
import { Task } from '@/app/api/db';
import Card from "@/components/Card";

function Column({title, tasks}: Readonly<{title: string, tasks: Task[]}>) {
  return (
    <div className={`bg-green-300 flex flex-col p-5 gap-3 rounded-lg min-w-96 overflow-auto`}>
      <div className={`self-center`}>
        <span>
          {title}
        </span>
      </div>
      <div className={`flex flex-col gap-5`}>
        { tasks.map(t => <Card task={t} key={t.id} /> )}
      </div>
    </div>
  );
}

export default Column;