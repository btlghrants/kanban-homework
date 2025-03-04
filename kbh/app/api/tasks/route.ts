import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db';

export async function GET() {
  return NextResponse.json(db.tasks);
}

export async function POST(req: NextRequest) {
  const task = await req.json();

  const sorted = db.tasks.sort((a, b) => a.order - b.order);
  sorted.splice(task.order, 0, task);
  db.tasks = sorted.map((task, idx) => {
    task.order = idx;
    return task;
  });

  return NextResponse.json(db.tasks);
}
