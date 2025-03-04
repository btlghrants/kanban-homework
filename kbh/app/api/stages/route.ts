
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/api/db';

export async function GET() {
  return NextResponse.json(db.stages);
}

export async function POST(req: NextRequest) {
  const stage = await req.json();
  db.stages.push(stage);

  return NextResponse.json(db.stages);
}
