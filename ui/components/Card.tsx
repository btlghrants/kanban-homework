import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/app/api/db';

interface CardProps {
  task: Task;
}

export default function Card({task}: Readonly<CardProps>) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: task.id});
  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={`bg-blue-300 pt-2 pb-2 pl-3 pr-3 rounded-md text-center shadow-sm`}
    >
      {JSON.stringify(task, null, 2)}
    </div>
  );
}
