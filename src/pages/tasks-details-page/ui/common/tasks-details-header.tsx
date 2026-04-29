import { Button } from '../../../../shared/components/shadcn/ui/button.tsx';
import { ArrowLeft, Pencil } from 'lucide-react';

interface TasksDetailsHeaderProps {
    openModal: () => void;
    onClick: () => void;
}

export function TasksDetailsHeader({ onClick, openModal }: TasksDetailsHeaderProps) {
    return (
        <div className="flex items-center justify-between gap-4">
            <Button variant="outline" onClick={onClick}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to tasks
            </Button>

            <Button variant="outline" size="sm" className="gap-2" onClick={openModal}>
                <Pencil className="h-4 w-4" />
                Edit
            </Button>
        </div>
    );
}
