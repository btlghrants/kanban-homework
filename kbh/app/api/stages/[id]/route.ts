
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string}> }
) {
  const params = await context.params;
  const { id } = params;

  const stage = db.stages.find(s => s.id === id);
  return NextResponse.json(stage);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{id: string}> },
) {
  const params = await context.params;
  const { id } = params;

  const stage = await req.json();

  const idx = db.stages.findIndex((stage) => stage.id === id);
  db.stages[idx] = stage;

  return NextResponse.json(db.stages);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{id: string}> },
) {
  const params = await context.params;
  const { id } = params;

  const idx = db.stages.findIndex((stage) => stage.id === id);
  db.stages.splice(idx, 1);

  return NextResponse.json("");
}