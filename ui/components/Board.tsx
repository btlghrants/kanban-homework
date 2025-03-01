import React, { useContext } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import Column from "@/components/Column";
import { BoardContext } from "@/components/BoardContext";

interface BoardProps {
  columns: string[];
}

export default function Board({columns}: Readonly<BoardProps>) {
  const { boardState, setBoardState } = useContext(BoardContext);
  const { tasks } = boardState;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id === over?.id) { return ; }

    setBoardState(prev => {
      const start = boardState.tasks.findIndex(t => t.id === active.id);
      const final = boardState.tasks.findIndex(t => t.id === over?.id);
      return {
        ...prev,
        tasks: arrayMove(boardState.tasks, start, final),
      }
    });
  }

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className={`bg-red-300 size-full flex flex-row p-5 gap-5 rounded-lg overflow-auto`}>
        { columns.map((col, idx) => (
          <Column
            title={col}
            key={col}
            tasks={tasks.filter(t => t.column === idx)}
          />
        ))}
      </div>
    </DndContext>
  );
}
