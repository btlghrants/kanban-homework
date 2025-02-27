
import { NextRequest, NextResponse } from 'next/server';
import tasks from '@/app/api/db';

// export async function GET(req: NextRequest) {
//   return new NextResponse('Hello, Next.js!', { status: 200 });
// }

export async function PUT(
  req: NextRequest,
  context: { params: {id: string} },
) {
  const id = context.params.id;
  const task = await req.json();

  const idx = tasks.findIndex((t) => t.id === id);
  tasks[idx] = task;

  return NextResponse.json(tasks);
}

export async function DELETE(
  req: NextRequest,
  context: { params: {id: string} },
) {
  const id = context.params.id;

  const idx = tasks.findIndex((t) => t.id === id);
  tasks.splice(idx, 1);

  return NextResponse.json(tasks);
}