import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import SwapVert from '@mui/icons-material/SwapVert';
import { clsx } from 'clsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@/app/api/db';
import { BoardContext } from '@/components/BoardContext';
import Confirm from '@/components/Confirm';
import { deleteTask } from '@/app/serverActions';

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
  const { boardState, setBoardState } = useContext(BoardContext);
  const { hasCardDeleteId } = boardState;
  const { id, owner, title, content } = task;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id, data: { type: "card" }});

  const leftHandler = () => leftable && rehomeTask(task, "left");

  const rightHandler = () => rightable && rehomeTask(task, "right");

  const openCardUpdate = () => {
    setBoardState(prev => ({
      ...prev,
      isCardUpdateOpen: true,
      cardUpdateTaskId: task.id,
    }));
  }

  const deleteInquire = () => {
    setBoardState(prev => ({...prev, hasCardDeleteId: id }));
  }

  const deleteCancel = () => {
    setBoardState(prev => ({...prev, hasCardDeleteId: null }));

  }

  const deleteConfirm = async () => {
    let newTasks = [...boardState.tasks];
    const taskIdx = newTasks.findIndex(t => t.id === task.id);
    newTasks.splice(taskIdx, 1);

    let reordered = newTasks.filter(t => t.stageId === task.stageId);
    reordered = reordered.map((task, idx) => {
      task.order = idx;
      return task;
    });
    reordered.forEach(reo => {
      const idx = newTasks.findIndex(t => t.id === reo.id);
      newTasks.splice(idx, 1, reo);
    });

    await deleteTask(task);

    setBoardState(prev => ({...prev, tasks: newTasks, hasCardDeleteId: null }));
  }

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
      <div className={`flex items-center gap-x-1 text-left`}>
        <div className={`flex flex-col gap-y-1 flex-grow`}>
          <div className={`text-xl`}>{title}</div>
          <div className={`text-sm`}>{owner}</div>
        </div>

        { leftable
          ? <IconButton
              className={`bg-blue-400 icon-button-micro`}
              onClick={leftHandler}
            >
              <ChevronLeft />
            </IconButton>
          : null
        }

        { draggable
            ? <IconButton
                className={`bg-blue-400 icon-button-micro`}
                disableRipple
                {...listeners}
              >
                <SwapVert />
              </IconButton>
            : null
        }

        <IconButton
          className={`bg-blue-400 icon-button-micro`}
          onClick={deleteInquire}
        >
          <Delete />
        </IconButton>
        <Confirm
          isOpen={hasCardDeleteId === id}
          prompt={`Are you sure?`}
          explain={[`Delete:`, `Task: "${title}"`, `Id: "${id}"`]}
          confirm={deleteConfirm}
          cancel={deleteCancel}
        />


        <IconButton
          className={`bg-blue-400 icon-button-micro`}
          onClick={openCardUpdate}
        >
          <Edit />
        </IconButton>

        { rightable
          ? <IconButton
              className={`bg-blue-400 icon-button-micro`}
              onClick={rightHandler}
            >
              <ChevronRight />
            </IconButton>
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
