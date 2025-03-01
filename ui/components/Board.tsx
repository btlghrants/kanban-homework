import React, { useContext, useEffect } from 'react';
import {
  closestCorners,
  DndContext,
  /*DragEndEvent,
  DragMoveEvent,
  DragStartEvent,*/
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { /*arrayMove,*/ sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column from "@/components/Column";
import { BoardContext } from "@/components/BoardContext";

export default function Board() {
  const { boardState, setBoardState } = useContext(BoardContext);
  const { tasks } = boardState;
  let { columns } = boardState;

  columns = columns.length === 0 ? ["New", "In Progress", "Done"] : columns;
  useEffect(() => {
    setBoardState(prev => ({...prev, columns}))
  }, [setBoardState, columns]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (/*event: DragStartEvent*/) => {
    
  }

  const handleDragMove = (/*event: DragMoveEvent*/) => {
    
  }

  const handleDragEnd = (/*event: DragEndEvent*/) => {
    // const { active, over } = event;

    // if (active.id === over?.id) { return ; }

    // setBoardState(prev => {
    //   const start = boardState.tasks.findIndex(t => t.id === active.id);
    //   const final = boardState.tasks.findIndex(t => t.id === over?.id);
    //   return {
    //     ...prev,
    //     tasks: arrayMove(boardState.tasks, start, final),
    //   } 
    // });
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
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
