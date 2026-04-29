import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/shadcn/ui/tooltip';

interface IconTooltipProps {
    content: string;
    children: ReactNode;
}

export function IconTooltip({ content, children }: IconTooltipProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    );
}
