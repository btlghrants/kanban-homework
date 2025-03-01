'use client';

import React, { useEffect, useState } from 'react';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task } from "@/app/api/db";
import Board, { BoardContext, BoardState, defaultBoardState } from "@/components/Board";

interface AppProps {
  tasks: Task[];
}

export default function App({tasks}: Readonly<AppProps>) {
  const [boardState, setBoardState] = useState<BoardState>(defaultBoardState);
  useEffect(() => { setBoardState(prev => ({...prev, tasks}) ) }, [tasks]);

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
      <BoardContext.Provider value={boardState}>
        <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
          <Board columns={["New", "WIP", "Done"]} />

          {/* <div className={`pt-5`}>
            <h2>Tasks</h2>
            <pre className={`overflow-auto`}>{JSON.stringify(tasks, null, 2)}</pre>
          </div> */}
        </DndContext>
      </BoardContext.Provider>
  );
}
