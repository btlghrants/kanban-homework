import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string}> }
) {
  const params = await context.params;
  const { id } = params;

  const task = db.tasks.find(t => t.id === id);
  if (!task) { throw `Can't find task: ${id}`}

  return NextResponse.json(task);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{id: string}> },
) {
  const params = await context.params;
  const { id } = params

  const task = await req.json();

  const fromStageId = db.tasks.find(t => t.id === id)!.stageId;
  let fromStage = db.tasks
    .filter(t => t.stageId === fromStageId)
    .sort((a, b) => a.order - b.order );
  let fromIdx = fromStage.findIndex(t => t.id === id)!;
  fromStage.splice(fromIdx, 1);
  fromStage = fromStage.map((t, idx) => {
    t.order = idx;
    return t;
  });

  const toStageId = task.stageId;
  let toStage = db.tasks
    .filter(t => t.stageId === toStageId)
    .sort((a, b) => a.order - b.order );
  toStage.splice(task.order, 0, task);
  toStage = toStage.map((t, idx) => {
    t.order = idx;
    return t;
  });

  let newTasks = db.tasks.map(t => {
    const foundFrom = fromStage.find(staged => staged.id === t.id);
    const foundTo = toStage.find(staged => staged.id === t.id);
    return (
      foundFrom ? foundFrom :
      foundTo ? foundTo :
      t
    );
  });

  db.tasks = newTasks;

  return NextResponse.json(db.tasks);
}

export async function DELETE(
  context: { params: {id: string} },
) {
  const id = context.params.id;

  const idx = db.tasks.findIndex((task) => task.id === id);
  db.tasks.splice(idx, 1);

  return NextResponse.json(db.tasks);
}