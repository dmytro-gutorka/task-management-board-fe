import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcn/ui/alert';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/shadcn/ui/card';
import { Checkbox } from '@/shared/components/shadcn/ui/checkbox';
import { Label } from '@/shared/components/shadcn/ui/label';
import { Skeleton } from '@/shared/components/shadcn/ui/skeleton';
import { ADMIN_ROUTES } from '@/shared/constants/routes/admin.routes.ts';
import { PERMISSIONS } from '@/shared/modules/permissions/model/permissions.map.ts';
import { useCurrentPermissions } from '@/shared/modules/permissions/model/hooks/useCurrentPermissions.ts';
import { RbacApiService } from '@/shared/modules/rbac/rbac-api.service.ts';
import type { RoleWithPermissions } from '@/shared/modules/rbac/rbac-api.types.ts';
import { AdminPageShell } from '../../admin-dashboard/ui/common/admin-page-shell.tsx';
import type { User } from '../../../shared/modules/users/api/user-api.types-domain.ts';
import type { PermissionRoles } from '../../../shared/modules/permissions/model/permissions.types.ts';
import { UserApiService } from '../../../shared/modules/users/api/user-api.service.ts';

function AdminUserDetailsPage() {
    const { userId } = useParams();
    const { sufficientPermissions } = useCurrentPermissions();
    const canUpdateRoles = sufficientPermissions(PERMISSIONS.RBAC.UPDATE);

    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<RoleWithPermissions[]>();
    const [selectedRoles, setSelectedRoles] = useState<PermissionRoles[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fetchData = useCallback(
        async (signal?: AbortSignal) => {
            if (!userId) {
                setErrorMessage('User id is missing.');
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            setErrorMessage(null);

            try {
                const [userResult, rolesResult] = await Promise.all([
                    UserApiService.getUserById(userId, signal),
                    RbacApiService.getRoles(signal),
                ]);

                setUser(userResult);
                setSelectedRoles(userResult.roles);
                setRoles(rolesResult);
            } catch {
                if (!signal?.aborted) {
                    setErrorMessage('Failed to load user details.');
                    setUser(null);
                    setRoles([]);
                    setSelectedRoles([]);
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [userId],
    );

    useEffect(() => {
        const controller = new AbortController();

        void fetchData(controller.signal);

        return () => controller.abort();
    }, [fetchData]);

    const isRolesChanged = useMemo(() => {
        if (!user) return false;

        return [...selectedRoles].sort().join('|') !== [...user.roles].sort().join('|');
    }, [selectedRoles, user]);

    function toggleRole(role: PermissionRoles) {
        setSelectedRoles((currentRoles) => {
            if (currentRoles.includes(role)) {
                return currentRoles.filter((currentRole) => currentRole !== role);
            }

            return [...currentRoles, role];
        });
    }

    async function handleSaveRoles() {
        if (!userId) return;

        try {
            setIsSaving(true);
            setErrorMessage(null);

            const updatedUser = await UserApiService.updateUserRoles(userId, selectedRoles);

            setUser(updatedUser);
            setSelectedRoles(updatedUser.roles);
            toast.success('User roles updated');
        } catch {
            toast.error('Failed to update user roles');
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) {
        return (
            <AdminPageShell title="User details" description="Loading user access details.">
                <UserDetailsSkeleton />
            </AdminPageShell>
        );
    }

    if (errorMessage) {
        return (
            <AdminPageShell
                title="User details"
                description="Review roles and effective permissions."
            >
                <Alert variant="destructive">
                    <AlertTitle>Unable to load user</AlertTitle>
                    <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
            </AdminPageShell>
        );
    }

    if (!user) {
        return (
            <AdminPageShell title="User details" description="User was not found.">
                <Card>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">User was not found.</p>
                    </CardContent>
                </Card>
            </AdminPageShell>
        );
    }

    const fullName = [user.name, user.surname].filter(Boolean).join(' ') || 'No name';

    return (
        <AdminPageShell title="User details" description="Review roles and effective permissions.">
            <div className="flex justify-start">
                <Button asChild variant="outline" size="sm">
                    <Link to={ADMIN_ROUTES.ADMIN_USERS_PAGE}>Back to users</Link>
                </Button>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                <Card>
                    <CardHeader>
                        <CardTitle>{fullName}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <InfoRow label="ID" value={String(user.id)} />
                        <InfoRow label="Birthday" value={user.birthday ?? '—'} />
                        <InfoRow
                            label="Last login"
                            value={user.lastLoginAt?.toLocaleString() ?? '—'}
                        />
                        <InfoRow label="Created" value={user.createdAt.toLocaleString()} />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Roles</CardTitle>
                        <CardDescription>Assign roles to this user.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {!canUpdateRoles ? (
                            <Alert>
                                <AlertTitle>Read only</AlertTitle>
                                <AlertDescription>
                                    You need RBAC:UPDATE to change user roles.
                                </AlertDescription>
                            </Alert>
                        ) : null}

                        <div className="grid gap-3 sm:grid-cols-2">
                            {roles?.map((role) => (
                                <RoleCheckboxRow
                                    key={role.id}
                                    role={role}
                                    checked={selectedRoles.includes(role.name)}
                                    disabled={!canUpdateRoles || isSaving}
                                    onCheckedChange={() => toggleRole(role.name)}
                                />
                            ))}
                        </div>

                        {canUpdateRoles ? (
                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    disabled={!isRolesChanged || isSaving}
                                    onClick={() => void handleSaveRoles()}
                                >
                                    {isSaving ? 'Saving...' : 'Save roles'}
                                </Button>
                            </div>
                        ) : null}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Effective permissions</CardTitle>
                    <CardDescription>Calculated from all assigned roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        {user.permissions.length ? (
                            user.permissions.map((permission) => (
                                <Badge key={permission} variant="secondary">
                                    {permission}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No permissions.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}

function RoleCheckboxRow({
    role,
    checked,
    disabled,
    onCheckedChange,
}: {
    role: RoleWithPermissions;
    checked: boolean;
    disabled: boolean;
    onCheckedChange: () => void;
}) {
    const checkboxId = `role-${role.name}`;

    return (
        <div className="flex items-start gap-3 rounded-lg border p-3">
            <Checkbox
                id={checkboxId}
                checked={checked}
                disabled={disabled}
                onCheckedChange={onCheckedChange}
            />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={checkboxId}>{role.name}</Label>
                <p className="text-xs text-muted-foreground">
                    {role.permissions.length} permissions
                </p>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium">{value}</span>
        </div>
    );
}

function UserDetailsSkeleton() {
    return (
        <div className="space-y-4">
            <Skeleton className="h-8 w-28" />
            <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-56" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className="h-4 w-full" />
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <Skeleton key={index} className="h-16 w-full" />
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AdminUserDetailsPage;
