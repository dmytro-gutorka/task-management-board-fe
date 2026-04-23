import { type Task } from '@/pages/tasks/TasksPage/model/task-card/task-card.types';
import { type TasksFiltersValue } from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';

export function filterTasks(
    tasks: Task[],
    filters: TasksFiltersValue,
    searchValue: string,
): Task[] {
    return tasks.filter((task) => {
        const matchesStatus = filters.status === 'all' || task.status === filters.status;
        const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
        const matchesSearch = task.title.toLowerCase().includes(searchValue.toLowerCase());

        return matchesStatus && matchesPriority && matchesSearch;
    });
}
