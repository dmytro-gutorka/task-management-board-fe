import { CalendarDays, Lock, Mail } from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/shadcn/ui/card';
import { formatDate } from '../../../../../../shared/helpers/formatDate.ts';
import type { User } from '../../../../../../shared/modules/users/user-api.types-domain.ts';
import { ReadOnlyField } from './readonly-field.tsx';

interface ProfileReadOnlyInfoProps {
    user: User;
}

export function ProfileReadOnlyInfo({ user }: ProfileReadOnlyInfoProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Account information</CardTitle>
                <CardDescription>
                    These details are read-only and cannot be changed here.
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-3">
                <ReadOnlyField
                    icon={<Mail className="size-4" />}
                    label="Email"
                    value={user.email}
                />

                <ReadOnlyField
                    icon={<CalendarDays className="size-4" />}
                    label="Registration date"
                    value={formatDate(user.createdAt)}
                />

                <ReadOnlyField
                    icon={<Lock className="size-4" />}
                    label="Last login"
                    value={user.lastLoginAt ? formatDate(user.lastLoginAt) : 'No login data'}
                />
            </CardContent>
        </Card>
    );
}
