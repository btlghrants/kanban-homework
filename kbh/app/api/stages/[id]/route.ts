
import { NextRequest, NextResponse } from 'next/server';
import { stages } from '@/app/api/db';

export async function GET(
  context: { params: {id: string} },
) {
  const stage = stages.find(s => s.id === context.params.id);
  return NextResponse.json(stage);
}

export async function PUT(
  req: NextRequest,
  context: { params: {id: string} },
) {
  const id = context.params.id;
  const stage = await req.json();

  const idx = stages.findIndex((stage) => stage.id === id);
  stages[idx] = stage;

  return NextResponse.json(stages);
}

export async function DELETE(
  context: { params: {id: string} },
) {
  const id = context.params.id;

  const idx = stages.findIndex((stage) => stage.id === id);
  stages.splice(idx, 1);

  return NextResponse.json(stages);
}