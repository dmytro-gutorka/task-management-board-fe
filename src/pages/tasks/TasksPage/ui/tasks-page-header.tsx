import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const TasksPageHeader = () => {
    return (
        <div className="flex items-center justify-between gap-4 border-b pb-4">
            <div className="space-y-111">
                <h2 className="text-2xl font-semibold tracking-tight">Tasks #NUMBER OF TASKS</h2>
            </div>

            <Button size="icon" aria-label="Create task">
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
};
