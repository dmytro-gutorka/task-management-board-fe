import { Separator } from '@/shared/components/shadcn/ui/separator';
import { TooltipProvider } from '@/shared/components/shadcn/ui/tooltip';
import { NotebookText } from 'lucide-react';
import { ThemeToggle } from '@/shared/components/theme-toggle';

export function Header() {
    return (
        <>
            <TooltipProvider delayDuration={150}>
                <div className="flex justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <NotebookText className="h-6 w-6" />
                        <h2 className="text-1xl font-semibold">Taskify</h2>
                    </div>
                    <ThemeToggle />
                </div>
                <Separator />
            </TooltipProvider>
        </>
    );
}
