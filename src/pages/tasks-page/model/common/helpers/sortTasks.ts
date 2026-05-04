import { compareByTime } from '../../../../../shared/helpers/compareByTime.ts';
import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TasksFiltersValue } from '../../task-filters/tasks-filter.types.ts';

export function sortTasks(tasks: Task[], sortBy: TasksFiltersValue['sortBy']): Task[] {
    const sorted = [...tasks];

    sorted.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.title.localeCompare(b.title);

            case 'deadline':
                return compareByTime(a.deadline, b.deadline);

            case 'createdAt':
            default:
                return compareByTime(a.createdAt, b.createdAt);
        }
    });

    return sorted;
}
