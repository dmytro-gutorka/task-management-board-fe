import type { RoleWithPermissions } from '../../../../../shared/modules/rbac/rbac-api.types.ts';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from '../../../../../shared/components/shadcn/ui/card.tsx';
import { Badge } from '../../../../../shared/components/shadcn/ui/badge.tsx';

interface RoleCardProps {
    role: RoleWithPermissions;
}

export function RoleCard({ role }: RoleCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {role.name}
                    <Badge variant="outline">{role.permissions.length}</Badge>
                </CardTitle>
                <CardDescription>{role.description || 'No description'}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {role.permissions.length ? (
                        role.permissions.map((permission) => (
                            <Badge key={permission.id} variant="secondary">
                                {permission.key}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-sm text-muted-foreground">No permissions.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
