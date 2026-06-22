import { useCallback, useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcn/ui/alert';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/shadcn/ui/card';
import { Skeleton } from '@/shared/components/shadcn/ui/skeleton';
import { RbacApiService } from '@/shared/modules/rbac/rbac-api.service.ts';
import type { RoleWithPermissions } from '@/shared/modules/rbac/rbac-api.types.ts';
import { AdminPageShell } from '../../admin-dashboard/ui/common/admin-page-shell.tsx';

function AdminRolesPage() {
    const [roles, setRoles] = useState<RoleWithPermissions[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchRoles = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await RbacApiService.getRoles(signal);

            setRoles(result);
        } catch {
            if (!signal?.aborted) {
                setErrorMessage('Failed to load roles.');
                setRoles([]);
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        void fetchRoles(controller.signal);

        return () => controller.abort();
    }, [fetchRoles]);

    return (
        <AdminPageShell title="Roles" description="Review role to permission mapping.">
            {errorMessage ? (
                <Alert variant="destructive">
                    <AlertTitle>Unable to load roles</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            ) : null}

            {isLoading ? (
                <RolesSkeleton />
            ) : roles.length ? (
                <div className="grid gap-4 md:grid-cols-2">
                    {roles.map((role) => (
                        <RoleCard key={role.id} role={role} />
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No roles found.</p>
                    </CardContent>
                </Card>
            )}
        </AdminPageShell>
    );
}

function RoleCard({ role }: { role: RoleWithPermissions }) {
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

function RolesSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 6 }).map((__, badgeIndex) => (
                                <Skeleton key={badgeIndex} className="h-5 w-24 rounded-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default AdminRolesPage;
