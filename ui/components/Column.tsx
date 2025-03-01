import React from 'react';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/app/api/db';
import Card from "@/components/Card";

interface ColumnProps {
  title: string, tasks: Task[]
}

export default function Column({title, tasks}: Readonly<ColumnProps>) {
  return (
    <div className={`bg-green-300 flex flex-col p-5 gap-3 rounded-lg min-w-96 overflow-auto`}>
      <div className={`self-center`}>
        <span>
          {title}
        </span>
      </div>
      <div className={`flex flex-col gap-5`}>
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          { tasks.map(t => <Card task={t} key={t.id} /> )}
        </SortableContext>
      </div>
    </div>
  );
}
