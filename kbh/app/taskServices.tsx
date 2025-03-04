'use server';

import { Task } from '@/app/api/db';

const endpoint = () => `${process.env.API_HOST}/api/tasks`;

export async function create(task: Task): Promise<Task> {
  throw "TODO - persist given & return persisted!";
}

export async function readOne(id: Task["id"]): Promise<Task> {
  const resp = await fetch(`${endpoint()}/${id}`);
  return await resp.json();
}

export async function readAll(): Promise<Task[]> {
  const resp = await fetch(`${endpoint()}`);
  return await resp.json();
}

export async function update(task: Task): Promise<Task> {
  throw "TODO - persist given & return persisted!";
}

export async function destroy(id: Task["id"]): Promise<void> {
  throw "TODO - delete given";
}
