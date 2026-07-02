import type { MetaDbFields } from '../../../../types/common.ts';
import type { TaskPriority, TaskStatus } from '../../task-card/model/task-card.types.ts';

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline?: string | null | undefined;
    isPrivate: boolean;
    latitude?: number | null;
    longitude?: number | null;
    createdAt: string;
    updatedAt: string;
};

export type CreateTaskPayload = Omit<Task, MetaDbFields>;
export type UpdateTaskPayload = Partial<CreateTaskPayload>;
