import { type Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { type TasksFiltersValue } from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';
import { compareByTime } from '@/shared/helpers/compareByTime';

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
