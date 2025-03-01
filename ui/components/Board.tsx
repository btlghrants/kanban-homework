import React, { createContext, useContext } from 'react';
import Column from "@/components/Column";
import { Task } from "@/app/api/db";

export interface BoardState {
  tasks: Task[];
}
export const defaultBoardState: BoardState = {
  tasks: [],
};

export const BoardContext = createContext<BoardState>(defaultBoardState);

interface BoardProps {
  columns: string[];
}

export default function Board({columns}: Readonly<BoardProps>) {
  const { tasks } = useContext(BoardContext);

  return (
    <div className={`bg-red-300 size-full flex flex-row p-5 gap-5 rounded-lg overflow-auto`}>
      { columns.map((col, idx) => (
        <Column
          title={col}
          key={col}
          tasks={tasks.filter(t => t.column === idx)}
        />
      ))}
    </div>
  );
}
