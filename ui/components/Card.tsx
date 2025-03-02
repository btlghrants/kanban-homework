import React from 'react';
import { ArrowDownUp, Pencil } from 'lucide-react';
import { clsx } from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/app/api/db';

interface CardProps {
  moveable: boolean;
  task: Task;
}

export default function Card({moveable, task}: Readonly<CardProps>) {
  const {id, owner, title, content} = task;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id, data: { type: "card" }});

  const editHandler = () => { console.log("edit card!") }

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        `bg-blue-300 pt-2 pb-2 pl-3 pr-3 rounded-md text-center shadow-sm hover:shadow cursor-default`,
        isDragging && "opacity-50"
      )}
    >
      <div className={`flex items-center gap-x-2 text-left`}>
        <div className={`flex flex-col gap-y-1 flex-grow`}>
          <div className={`text-xl`}>{title}</div>
          <div className={`text-sm`}>{owner}</div>
        </div>
        {
          moveable
            ? <button
                className={`bg-blue-400 p-2 rounded-lg shadow-sm hover:shadow`}
                {...listeners}
              >
                <ArrowDownUp />
              </button>
            : <button
                disabled={true}
                className={`bg-gray-400 p-2 rounded-lg`}
              >
                <ArrowDownUp />
              </button>
        }
        <button
          className={`bg-blue-400 p-2 rounded-lg shadow-sm hover:shadow`}
          onClick={editHandler}
        >
          <Pencil />
        </button>
      </div>

      <div className={`pt-3 pb-2 text-left`}>
        {content}
      </div>
    </div>
  );
}
