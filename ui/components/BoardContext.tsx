import { createContext, Dispatch, SetStateAction } from 'react';
import { Task } from "@/app/api/db";

export interface BoardState {
  tasks: Task[];
  columns: string[];
}
export const defaultBoardState: BoardState = {
  tasks: [],
  columns: [],
};

export const BoardContext = createContext<{
  boardState: BoardState;
  setBoardState: Dispatch<SetStateAction<BoardState>>;
}>({
  boardState: defaultBoardState,
  setBoardState: () => {},
});
