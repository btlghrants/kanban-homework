'use client';

import React, { useEffect, useState } from 'react';
import { Stage, Task } from "@/app/api/db";
import * as StageService from "@/app/stageServices";
import * as TaskService from "@/app/taskServices";
import Board from "@/components/Board";
import { BoardContext, BoardState, defaultBoardState } from "@/components/BoardContext";

export default function App() {
  const [boardState, setBoardState] = useState<BoardState>(defaultBoardState);
  useEffect(() => {
    const fetchData = async () => {
      const tasks: Task[] = await TaskService.readAll();
      const stages: Stage[] = await StageService.readAll();

      setBoardState(prev => ({...prev, stages, tasks}) )
    }
    fetchData();
  }, [setBoardState]);

  return (
      <BoardContext.Provider value={{boardState, setBoardState}}>
        <Board />
      </BoardContext.Provider>
  );
}
