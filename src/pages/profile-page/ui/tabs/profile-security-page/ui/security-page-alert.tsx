import { CheckCircle2 } from 'lucide-react';
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from '../../../../../../shared/components/shadcn/ui/alert.tsx';

interface SecurityPageAlertProps {
    title: string;
    description: string;
    isSuccess?: boolean;
}

export function SecurityPageAlert({ title, description, isSuccess }: SecurityPageAlertProps) {
    if (!isSuccess) return;

    return (
        <Alert>
            <CheckCircle2 className="size-4" />
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{description}</AlertDescription>
        </Alert>
    );
}
