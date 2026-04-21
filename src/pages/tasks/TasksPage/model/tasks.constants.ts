import { type TaskViewMode } from '@/pages/tasks/TasksPage/model/tasks.types';

export const taskViewMode = {
    grid: 'grid',
    list: 'list',
} satisfies Record<string, TaskViewMode>;
