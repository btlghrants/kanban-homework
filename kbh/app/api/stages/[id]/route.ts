
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db';

export async function GET(
  context: { params: {id: string} },
) {
  const stage = db.stages.find(s => s.id === context.params.id);
  return NextResponse.json(stage);
}

export async function PUT(
  req: NextRequest,
  context: { params: {id: string} },
) {
  const id = context.params.id;
  const stage = await req.json();

  const idx = db.stages.findIndex((stage) => stage.id === id);
  db.stages[idx] = stage;

  return NextResponse.json(db.stages);
}

export async function DELETE(
  context: { params: {id: string} },
) {
  const id = context.params.id;

  const idx = db.stages.findIndex((stage) => stage.id === id);
  db.stages.splice(idx, 1);

  return NextResponse.json(db.stages);
}