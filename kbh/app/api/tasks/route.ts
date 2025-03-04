import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db';

export async function GET() {
  return NextResponse.json(db.tasks);
}

export async function POST(req: NextRequest) {
  const task = await req.json();
  const {stageId} = task;

  let toStage = db.tasks
    .filter(t => t.stageId === stageId)
    .sort((a, b) => a.order - b.order );
  toStage.splice(task.order, 0, task);

  toStage = toStage.map((t, idx) => {
    t.order = idx;
    return t;
  });

  let newTasks = db.tasks.map(t => {
    const found = toStage.find(staged => staged.id === t.id);
    return found ? found : t;
  });
  newTasks.push(task);

  db.tasks = newTasks;

  return NextResponse.json(db.tasks);
}
