import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TasksFiltersValue } from '../../task-filters/tasks-filter.types.ts';
import { filterTasks } from './filterTasks.ts';
import { sortTasks } from './sortTasks.ts';

export function getFilteredAndSortedTasks(
    tasks: Task[],
    filters: TasksFiltersValue,
    searchValue: string,
): Task[] {
    const filteredTasks: Task[] = filterTasks(tasks, filters, searchValue);

    return sortTasks(filteredTasks, filters.sortBy);
}
