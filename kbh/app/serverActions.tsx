'use server';

import { Task } from '@/app/api/db';
import * as TaskService from '@/app/taskServices';

export async function createTask(task: Task) {
  return await TaskService.create(task);
}

export async function updateTask(task: Task) {
  return await TaskService.update(task);
}