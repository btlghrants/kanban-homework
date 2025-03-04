'use server';

import { Stage } from '@/app/api/db';

const endpoint = () => `${process.env.API_HOST}:${process.env.API_PORT}/api/stages`;

// export async function create(stage: Stage): Promise<Stage> {}

export async function readOne(id: Stage["id"]): Promise<Stage> {
  const resp = await fetch(`${endpoint()}/${id}`);
  return await resp.json();
}

export async function readAll(): Promise<Stage[]> {
  const resp = await fetch(`${endpoint()}`);
  return await resp.json();
}

// export async function update(stage: Stage): Promise<Stage> {}

// export async function destroy(id: Stage["id"]): Promise<void> {}
