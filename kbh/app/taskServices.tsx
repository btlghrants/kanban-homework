'use server';

import { Task } from '@/app/api/db';

const endpoint = () => `${process.env.API_HOST}:${process.env.API_PORT}/api/tasks`;

export async function create(task: Task): Promise<Task> {
  const resp = await fetch(`${endpoint()}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  return readOne(task.id);
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
  const resp = await fetch(`${endpoint()}/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  });

  return readOne(task.id);
}

export async function destroy(id: Task["id"]): Promise<void> {
  const resp = await fetch(`${endpoint()}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return;
}
