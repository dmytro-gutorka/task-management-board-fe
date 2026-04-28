import { type Task } from '@/pages/tasks-page/model/task-card/task-card.types';
import { type TasksFiltersValue } from '@/pages/tasks-page/model/task-filters/tasks-filter.types';

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
