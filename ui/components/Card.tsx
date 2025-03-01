import React from 'react';
import { Task } from '@/app/api/db';

function Card({task}: Readonly<{task: Task}>) {
  return (
    <div className={`bg-blue-300 pt-2 pb-2 pl-3 pr-3 rounded-md text-center shadow-sm`}>
      {JSON.stringify(task, null, 2)}
    </div>
  );
}

export default Card;