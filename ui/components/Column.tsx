// 'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { SortableContext } from '@dnd-kit/sortable';
import { Task } from '@/app/api/db';
import Card from "@/components/Card";

interface ColumnProps {
  id: string,
  title: string,
  description: string,
  tasks: Task[],
}

export default function Column({
  id,
  title,
  description,
  tasks,
}: Readonly<ColumnProps>) {
  const addHandler = () => { console.log("add new card!") };

  return (
    <div
      className={`bg-green-300 flex flex-col p-5 gap-3 rounded-lg min-w-96 w-96 shadow-sm overflow-hidden`}
    >
      <div className={`flex items-center gap-x-2`}>
        <div className={`flex flex-col gap-y-1 flex-grow`}>
          <div className={`text-xl`}>{title}</div>
          <div className={`text-sm`}>{description}</div>
        </div>
        <button
          className={`bg-green-400 p-2 rounded-lg shadow-sm hover:shadow`}
          onClick={addHandler}
        >
          <Plus />
        </button>
      </div>

      <div className={`flex flex-col gap-5 overflow-auto pretty-scroll-v`}>
        <SortableContext items={tasks.map(task => task.id)}>
          { tasks.map(task => (
            <Card key={task.id} task={task} moveable={tasks.length > 1} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
