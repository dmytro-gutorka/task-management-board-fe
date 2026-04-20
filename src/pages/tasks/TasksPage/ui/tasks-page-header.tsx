import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SearchInput } from '@/shared/components/search-input';

export const TasksPageHeader = () => {
    return (
        <div className="">
            <div className="space-y-1">
                <h2 className="text-5xl font-semibold">Tasks #NUMBER OF TASKS</h2>
            </div>

            <></>

            <Button size="icon" aria-label="Create task">
                <Plus className="h-4 w-4" />
            </Button>

            <SearchInput />
        </div>
    );
};
