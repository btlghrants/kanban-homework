import { createContext, Dispatch, SetStateAction } from 'react';
import { UniqueIdentifier } from '@dnd-kit/core';
import { Stage, Task } from "@/app/api/db";

export interface BoardState {
  tasks: Task[];
  stages: Stage[];
  dndActiveId: UniqueIdentifier | null;
  isCardCreateOpen: boolean;
  cardCreateStageId: string | null;
}
export const defaultBoardState: BoardState = {
  tasks: [],
  stages: [],
  dndActiveId: null,
  isCardCreateOpen: false,
  cardCreateStageId: null,
};

export const BoardContext = createContext<{
  boardState: BoardState;
  setBoardState: Dispatch<SetStateAction<BoardState>>;
}>({
  boardState: defaultBoardState,
  setBoardState: () => {},
});
