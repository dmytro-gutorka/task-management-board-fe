import { useState } from 'react';
import { LS_KEY_TASKS_VIEW_MODE } from '../../common/tasks-page.constants.ts';
import { TASK_VIEW_MODE } from '../../task-filters/tasks-filter.constants.ts';
import type { TaskViewMode } from '../../task-filters/tasks-filter.types.ts';

export function useTasksViewMode() {
    const [view, setView] = useState<TaskViewMode>(
        (localStorage.getItem(LS_KEY_TASKS_VIEW_MODE) as TaskViewMode) || TASK_VIEW_MODE.GRID,
    );

    const changeView = (taskViewMode: TaskViewMode) => {
        if (taskViewMode !== TASK_VIEW_MODE.LIST && taskViewMode !== TASK_VIEW_MODE.GRID) {
            return;
        }

        localStorage.setItem(LS_KEY_TASKS_VIEW_MODE, taskViewMode);
        setView(taskViewMode);
    };

    return {
        view,
        changeView,
    };
}
