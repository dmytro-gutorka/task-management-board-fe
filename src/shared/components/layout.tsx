import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';
import {
    type TasksFiltersValue,
    type TaskViewMode,
} from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';

export interface LayoutOutletContext {
    taskViewMode: TaskViewMode;
    filters: TasksFiltersValue;
    searchValue: string;
}

const initialFilters: TasksFiltersValue = {
    status: 'all',
    priority: 'all',
    sortBy: 'createdAt',
};

export function Layout() {
    const [taskViewMode, setTaskViewMode] = useState<TaskViewMode>('grid');
    const [filters, setFilters] = useState<TasksFiltersValue>(initialFilters);
    const [searchValue, setValue] = useState('');

    return (
        <div>
            <Header
                taskViewMode={taskViewMode}
                filters={filters}
                searchValue={searchValue}
                setSearchValue={setValue}
                onTaskViewModeChange={setTaskViewMode}
                setFilters={setFilters}
            />
            <Outlet
                context={{
                    searchValue,
                    taskViewMode,
                    filters,
                }}
            />
        </div>
    );
}
