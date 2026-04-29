import type { MetaDbFields } from '../../../../types/common.ts';
import type { TaskPriority, TaskStatus } from '../task-card/task-card.types.ts';

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: string;
    assigneeName: string;
    // assigneeAvatarUrl: string;
    // assigneeId: string;
    isPrivate: boolean;
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

export type CreateTaskPayload = Omit<Task, MetaDbFields>;
export type UpdateTaskPayload = Partial<CreateTaskPayload>;
