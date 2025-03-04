
import { NextRequest, NextResponse } from 'next/server';
import { tasks } from '@/app/api/db';

export async function GET(
  context: { params: {id: string} },
) {
  const task = tasks.find(t => t.id === context.params.id);
  return NextResponse.json(task);
}

export async function PUT(
  req: NextRequest,
  context: { params: {id: string} },
) {
  const id = context.params.id;
  const task = await req.json();

  const idx = tasks.findIndex((task) => task.id === id);
  tasks[idx] = task;

  return NextResponse.json(tasks);
}

export async function DELETE(
  context: { params: {id: string} },
) {
  const id = context.params.id;

  const idx = tasks.findIndex((task) => task.id === id);
  tasks.splice(idx, 1);

  return NextResponse.json(tasks);
}