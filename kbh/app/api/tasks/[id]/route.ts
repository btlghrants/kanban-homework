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

  const sorted = db.tasks.sort((a, b) => a.order - b.order);
  const removeIdx = sorted.findIndex(task => task.id === id);
  sorted.splice(removeIdx, 1);
  sorted.splice(task.order, 0, task);
  db.tasks = sorted.map((task, idx) => {
    task.order = idx;
    return task;
  });

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