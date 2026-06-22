import { useCallback, useEffect, useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcn/ui/alert';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';

import { RbacApiService } from '@/shared/modules/rbac/rbac-api.service.ts';
import { AdminPageShell } from '../../admin-dashboard/ui/common/admin-page-shell.tsx';
import {
    TableHead,
    TableRow,
    TableBody,
    TableHeader,
    Table,
    TableCell,
} from '@/shared/components/shadcn/ui/table.tsx';
import { Skeleton } from '../../../shared/components/shadcn/ui/skeleton.tsx';
import type { PermissionResponse } from '../../../shared/modules/rbac/rbac-api.types.ts';

function AdminPermissionsPage() {
    const [permissions, setPermissions] = useState<PermissionResponse[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchPermissions = useCallback(async (signal?: AbortSignal) => {
        setIsLoading(true);
        setErrorMessage(null);

        try {
            const result = await RbacApiService.getPermissions(signal);

            setPermissions(result);
        } catch {
            if (!signal?.aborted) {
                setErrorMessage('Failed to load permissions.');
                setPermissions([]);
            }
        } finally {
            if (!signal?.aborted) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        void fetchPermissions(controller.signal);

        return () => controller.abort();
    }, [fetchPermissions]);

    return (
        <AdminPageShell title="Permissions" description="Inspect all raw permissions.">
            <Card>
                <CardHeader>
                    <CardTitle>Permission reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {errorMessage ? (
                        <Alert variant="destructive">
                            <AlertTitle>Unable to load permissions</AlertTitle>
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    ) : null}

                    {isLoading ? (
                        <PermissionsTableSkeleton />
                    ) : permissions.length ? (
                        <div className="rounded-lg border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Key</TableHead>
                                        <TableHead>Resource</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {permissions.map((permission) => (
                                        <TableRow key={permission.id}>
                                            <TableCell>
                                                <Badge>{permission.key}</Badge>
                                            </TableCell>
                                            <TableCell>{permission.resource}</TableCell>
                                            <TableCell>{permission.action}</TableCell>
                                            <TableCell className="max-w-md whitespace-normal text-muted-foreground">
                                                {permission.description || 'No description'}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                            No permissions found.
                        </div>
                    )}
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}

function PermissionsTableSkeleton() {
    return (
        <div className="space-y-2 rounded-lg border p-3">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="grid grid-cols-[160px_1fr_1fr_2fr] gap-3">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-full" />
                </div>
            ))}
        </div>
    );
}

export default AdminPermissionsPage;
