import { type Dispatch, type SetStateAction, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './header';

export type TaskViewMode = 'grid' | 'list';

export type LayoutOutletContext = {
    taskViewMode: TaskViewMode;
    setTaskViewMode: Dispatch<SetStateAction<TaskViewMode>>;
};

export function Layout() {
    const [taskViewMode, setTaskViewMode] = useState<TaskViewMode>('grid');

    return (
        <div>
            <Header taskViewMode={taskViewMode} onTaskViewModeChange={setTaskViewMode} />
            <Outlet
                context={{
                    taskViewMode,
                    setTaskViewMode,
                }}
            />
        </div>
    );
}
