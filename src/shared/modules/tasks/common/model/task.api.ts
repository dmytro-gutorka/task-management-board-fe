import type { Nullable } from '../../../../types/common.ts';
import { readFromLocalStorage } from '../../../../infrastructure/local-storage/helpers/readFromLocalStorage.ts';
import { writeToLocalStorage } from '../../../../infrastructure/local-storage/helpers/writeToLocalStorage.ts';
import { LOCAL_STORAGE_TASKS_KEYS } from '../../../../infrastructure/local-storage/model/local-storage.constants.ts';
import type { CreateTaskPayload, Task, UpdateTaskPayload } from './task.types.ts';

export function getTasks(): Task[] {
    return readFromLocalStorage<Task[]>(LOCAL_STORAGE_TASKS_KEYS.TASKS);
}

export function getTaskById(taskId: string | null): Nullable<Task> {
    const tasks = getTasks();

    return tasks.find((task) => task.id === taskId) ?? null;
}

export function createTask(payload: CreateTaskPayload): Task {
    const tasks = getTasks();

    const now = new Date().toISOString();

    const newTask: Task = {
        id: crypto.randomUUID(),
        createdAt: now,
        updatedAt: now,
        ...payload,
    };

    writeToLocalStorage(LOCAL_STORAGE_TASKS_KEYS.TASKS, [newTask, ...tasks]);

    return newTask;
}

export function updateTask(taskId: string, payload: UpdateTaskPayload): Task {
    const tasks = getTasks();

    const existingTask = tasks.find((task) => task.id === taskId);

    if (!existingTask) throw new Error('Task not found');

    const updatedTask: Task = {
        ...existingTask,
        ...payload,
        updatedAt: new Date().toISOString(),
    };

    const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));

    writeToLocalStorage(LOCAL_STORAGE_TASKS_KEYS.TASKS, updatedTasks);

    return updatedTask;
}

export function completeTask(taskId: string): Task {
    return updateTask(taskId, {
        status: 'done',
    });
}

export function deleteTask(taskId: Nullable<string>): void {
    const tasks = getTasks();

    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    writeToLocalStorage(LOCAL_STORAGE_TASKS_KEYS.TASKS, updatedTasks);
}
