import React from 'react';
import Add from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { SortableContext } from '@dnd-kit/sortable';
import { Stage, Task } from '@/app/api/db';
import Card from "@/components/Card";

interface ColumnProps {
  id: string;
  title: string;
  description: string;
  tasks: Task[];
  stages: Stage[];
  rehomeTask: (task: Task, direction: "left" | "right") => void;
  openCardCreate: (stageId: string) => void;
}

export default function Column({
  id,
  title,
  description,
  tasks,
  stages,
  rehomeTask,
  openCardCreate,
}: Readonly<ColumnProps>) {
  return (
    <div
      className={`bg-green-300 flex flex-col p-5 gap-3 rounded-lg min-w-96 w-96 shadow-sm overflow-hidden`}
    >
      <div className={`flex items-center gap-x-2`}>
        <div className={`flex flex-col gap-y-1 flex-grow`}>
          <div className={`text-xl`}>{title}</div>
          <div className={`text-sm`}>{description}</div>
        </div>
        <IconButton
          className={`bg-green-400 icon-button-micro`}
          onClick={() => openCardCreate(id)}
        >
          <Add />
        </IconButton>
      </div>

      <div className={`flex flex-col gap-5 overflow-auto pretty-scroll-v`}>
        <SortableContext items={tasks.map(task => task.id)}>
          { tasks.map(task => {
            const draggable = tasks.length > 1;
            const leftable = stages.findIndex(stage => stage.id === task.stageId) !== 0;
            const rightable = stages.findIndex(stage => stage.id === task.stageId) !== stages.length - 1;

            return <Card
              key={task.id}
              task={task}
              leftable={leftable}
              draggable={draggable}
              rightable={rightable}
              rehomeTask={rehomeTask}
            />
          })}
        </SortableContext>
      </div>
    </div>
  );
}
