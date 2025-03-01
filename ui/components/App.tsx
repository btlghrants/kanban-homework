'use client';

import React, { useEffect, useState } from 'react';
import { Task } from "@/app/api/db";
import Board, { BoardContext, BoardState, defaultBoardState } from "@/components/Board";

interface AppProps {
  tasks: Task[];
}

export default function App({tasks}: Readonly<AppProps>) {
  const [boardState, setBoardState] = useState<BoardState>(defaultBoardState);
  useEffect(() => { setBoardState(prev => ({...prev, tasks}) ) }, [tasks]);

  return (
      <BoardContext.Provider value={{boardState, setBoardState}}>
        <Board columns={["New", "WIP", "Done"]} />

        {/* <div className={`pt-5`}>
          <h2>Tasks</h2>
          <pre className={`overflow-auto`}>{JSON.stringify(tasks, null, 2)}</pre>
        </div> */}
      </BoardContext.Provider>
  );
}
