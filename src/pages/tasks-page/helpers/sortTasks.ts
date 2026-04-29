import { compareByTime } from '@/shared/helpers/compareByTime';
import type { Task } from '../../../shared/modules/tasks/model/task/task.types.ts';
import type { TasksFiltersValue } from '../model/task-filters/tasks-filter.types.ts';

const priorityRank: Record<Task['priority'], number> = {
    high: 3,
    medium: 2,
    low: 1,
};

export function sortTasks(tasks: Task[], sortBy: TasksFiltersValue['sortBy']): Task[] {
    const sorted = [...tasks];

    sorted.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);

            case 'priority':
                return priorityRank[b.priority] - priorityRank[a.priority];

            case 'deadline':
                return compareByTime(a.deadline, b.deadline);

            case 'createdAt':
            default:
                return compareByTime(a.createdAt, b.createdAt);
        }
    });

    return sorted;
}
