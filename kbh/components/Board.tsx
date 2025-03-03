import React, { useContext } from 'react';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { BoardContext } from "@/components/BoardContext";
import { Task } from "@/app/api/db";
import Column from "@/components/Column";
import CardCreate from "@/components/CardCreate";

export default function Board() {
  const { boardState, setBoardState } = useContext(BoardContext);
  const { stages, tasks, isCardCreateOpen} = boardState;

  const rehomeTask = (task: Task, direction: "left" | "right") => {
    const fromStageIdx = stages.findIndex(stage => stage.id === task.stageId);
    let toStageIdx = direction === "left" ? fromStageIdx - 1 : fromStageIdx + 1;
    const minIdx = 0;
    const maxIdx = stages.length - 1;
    toStageIdx = toStageIdx < minIdx ? minIdx : toStageIdx;
    toStageIdx = toStageIdx > maxIdx ? maxIdx : toStageIdx;

    const fromStageId = stages[fromStageIdx].id;
    const toStageId = stages[toStageIdx].id;

    let froms = tasks.filter(t => t.stageId === fromStageId).sort((a, b) => a.order - b.order);
    let tos = tasks.filter(t => t.stageId === toStageId).sort((a, b) => a.order - b.order);

    const moveIdx = froms.findIndex(t => t.id === task.id);
    const [ mover ] = froms.splice(moveIdx, 1);

    mover.stageId = toStageId;
    tos.unshift(mover);

    froms = froms.map((task, idx) => {
      task.order = idx;
      return task;
    });
    tos = tos.map((task, idx) => {
      task.order = idx;
      return task;
    });
    const reordered = [...froms, ...tos];

    const nextTasks = [...tasks].map(t => {
      const found = reordered.find(task => task.id === t.id );
      return found ? found : t;
    });
    setBoardState(prev => ({ ...prev, tasks: nextTasks }));
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setBoardState(prev => ({ ...prev, dndActiveId: active.id }));
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    if ( active && over && active.id !== over.id ) {
      const activeTask = tasks.find(task => task.id === active.id)!;
      const overTask = tasks.find(task => task.id === over.id)!;

      const activeStageTasks = tasks
        .filter(task => task.stageId === activeTask.stageId)
        .sort((a, b) => a.order - b.order);

      const activeIdx = activeStageTasks.findIndex(task => task.id === activeTask.id);
      const overIdx = activeStageTasks.findIndex(task => task.id === overTask.id);

      const shuffled = arrayMove(activeStageTasks, activeIdx, overIdx);
      const reordered = shuffled.map((task, idx) => {
        task.order = idx;
        return task;
      });

      const nextTasks = [...tasks].map(task => {
        const next = reordered.find(t => t.id === task.id);
        return next ? next : task;
      })
      setBoardState(prev => ({...prev, tasks: nextTasks}) );
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {}

  const openCardCreate = (stageId: string) => {
    setBoardState(prev => ({
      ...prev,
      isCardCreateOpen: true,
      cardCreateStageId: stageId
    }));
  };

  const closeCardCreate = () => {
    setBoardState(prev => ({ ...prev, isCardCreateOpen: false }));
  };

  return (
    <div className={`bg-red-300 h-dvh flex flex-row p-5 gap-5 overflow-auto pretty-scroll-h`}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={stages.map(stage => stage.id)}>
          { stages.map((stage) =>
            <Column
              key={stage.id}
              id={stage.id}
              title={stage.title}
              description={stage.description}
              tasks={tasks.filter(f => f.stageId === stage.id).sort((a, b) => a.order - b.order)}
              rehomeTask={rehomeTask}
              openCardCreate={openCardCreate}
            />
          )}
        </SortableContext>
      </DndContext>

      <CardCreate
        open={isCardCreateOpen}
        close={closeCardCreate}
      />
    </div>
  );
}
