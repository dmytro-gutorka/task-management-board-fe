import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TasksFiltersValue } from '../../task-filters/tasks-filter.types.ts';

export function filterTasks(
    tasks: Task[],
    filters: TasksFiltersValue,
    searchValue: string,
): Task[] {
    return tasks.filter((task) => {
        const normalizedSearch = searchValue.trim().toLowerCase();

        const matchesStatus = filters.status === 'all' || task.status === filters.status;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;

        const matchesSearch =
            !normalizedSearch ||
            task.title.toLowerCase().includes(normalizedSearch) ||
            task.description.toLowerCase().includes(normalizedSearch);

        return matchesStatus && matchesPriority && matchesSearch;
    });
}
