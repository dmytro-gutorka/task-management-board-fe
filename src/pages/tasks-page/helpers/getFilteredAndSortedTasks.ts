import { type Task } from '@/shared/modules/tasks/model/task-card/task-card.types.ts';
import type { TasksFiltersValue } from '../model/task-filters/tasks-filter.types.ts';
import { filterTasks } from './filterTasks.ts';
import { sortTasks } from './sortTasks';

export function getFilteredAndSortedTasks(
    tasks: Task[],
    filters: TasksFiltersValue,
    searchValue: string,
): Task[] {
    const filteredTasks: Task[] = filterTasks(tasks, filters, searchValue);

    return sortTasks(filteredTasks, filters.sortBy);
}
