
import { NextRequest, NextResponse } from 'next/server';
import { tasks } from '@/app/api/db';

export async function GET() {
  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  const task = await req.json();
  tasks.push(task);

  return NextResponse.json(tasks);
}
