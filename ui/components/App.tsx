'use client';

import React, { useEffect, useState } from 'react';
import { Stage, Task } from "@/app/api/db";
import Board from "@/components/Board";
import { BoardContext, BoardState, defaultBoardState } from "@/components/BoardContext";

interface AppProps {
  stages: Stage[];
  tasks: Task[];
}

export default function App({stages, tasks}: Readonly<AppProps>) {
  const [boardState, setBoardState] = useState<BoardState>(defaultBoardState);
  useEffect(() => {
    setBoardState(prev => ({...prev, stages, tasks}) )
  }, [stages, tasks]);

  return (
      <BoardContext.Provider value={{boardState, setBoardState}}>
        <Board />

        <div className={`pt-5`}>
          <h2>Stages</h2>
          <pre className={`overflow-auto`}>{JSON.stringify(stages, null, 2)}</pre>
        </div>
        <div className={`pt-5`}>
          <h2>Tasks</h2>
          <pre className={`overflow-auto`}>{JSON.stringify(tasks, null, 2)}</pre>
        </div>
      </BoardContext.Provider>
  );
}
