import { type ValueOf } from '@/shared/types/common';
import { TASK_PRIORITY, TASK_STATUS } from '@/pages/tasks-page/model/task.constants';

export type TaskStatus = ValueOf<typeof TASK_STATUS>;
export type TaskPriority = ValueOf<typeof TASK_PRIORITY>;

export type Task = {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline?: string | null;
    assignee?: {
        id: string;
        name: string;
        avatarUrl?: string | null;
    } | null;
    isPrivate?: boolean;
    tags?: string[];
    createdAt: string;
};
