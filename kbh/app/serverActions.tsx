'use server';

import { Task } from '@/app/api/db';
import * as TaskService from '@/app/taskServices';

// export async function addTask(formData: FormData) {
//   console.log(JSON.stringify(formData, null, 2));
// }

export async function addTask(task: Task) {
  return await TaskService.create(task);
}