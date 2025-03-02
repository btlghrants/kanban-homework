import React from 'react';
import { ArrowDownUp, MoveLeft, MoveRight, Pencil } from 'lucide-react';
import { clsx } from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/app/api/db';

interface CardProps {
  task: Task;
  leftable: boolean;
  draggable: boolean;
  rightable: boolean;
  rehomeTask: (task: Task, direction: "left" | "right") => void;
}

export default function Card({
  task,
  leftable,
  draggable,
  rightable,
  rehomeTask,
}: Readonly<CardProps>) {
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

  const leftHandler = () => { leftable && rehomeTask(task, "left"); };

  const rightHandler = () => { rightable && rehomeTask(task, "right"); };

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

        { leftable
          ? <button
              className={`bg-blue-400 p-2 rounded-lg shadow-sm hover:shadow`}
              onClick={leftHandler}
            >
              <MoveLeft />
            </button>
          : null
        }

        { draggable
            ? <button
                className={`bg-blue-400 p-2 rounded-lg shadow-sm hover:shadow`}
                {...listeners}
              >
                <ArrowDownUp />
              </button>
            : null
        }

        <button
          className={`bg-blue-400 p-2 rounded-lg shadow-sm hover:shadow`}
          onClick={editHandler}
        >
          <Pencil />
        </button>

        { rightable
          ? <button
              className={`bg-blue-400 p-2 rounded-lg shadow-sm hover:shadow`}
              onClick={rightHandler}
            >
              <MoveRight />
            </button>
          : null
        }
      </div>

      <div className={`pt-3 pb-2 text-left`}>
        {content.split("\n").map((line, idx) => (
          <p
            className={`pl-4 pb-1 -indent-4`}
            key={idx}>{line}
          </p>
        ))}
      </div>
    </div>
  );
}
