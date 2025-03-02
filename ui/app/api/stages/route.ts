
import { NextRequest, NextResponse } from 'next/server';
import { stages } from '@/app/api/db';

export async function GET() {
  return NextResponse.json(stages);
}

export async function POST(req: NextRequest) {
  const stage = await req.json();
  stages.push(stage);

  return NextResponse.json(stages);
}
