import { filterTasks } from '@/pages/tasks/TasksPage/helpers/filterTasks';
import { sortTasks } from '@/pages/tasks/TasksPage/helpers/sortTasks';
import { type Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { type TasksFiltersValue } from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';

export function getFilteredAndSortedTasks(
    tasks: Task[],
    filters: TasksFiltersValue,
    searchValue: string,
): Task[] {
    const filteredTasks: Task[] = filterTasks(tasks, filters, searchValue);

    return sortTasks(filteredTasks, filters.sortBy);
}
