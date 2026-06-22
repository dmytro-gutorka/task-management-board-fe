import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '../../shared/components/shadcn/ui/alert.tsx';
import { Badge } from '../../shared/components/shadcn/ui/badge.tsx';
import { Button } from '../../shared/components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../shared/components/shadcn/ui/card.tsx';
import { ADMIN_ROUTES } from '../../shared/constants/routes/admin.routes.ts';
import { PERMISSIONS } from '../../shared/modules/permissions/model/permissions.map.ts';
import { useCurrentPermissions } from '../../shared/modules/permissions/model/hooks/useCurrentPermissions.ts';
import { AdminPageShell } from '../admin-dashboard/common/admin-page-shell.tsx';
import type { PermissionRoles } from '../../shared/modules/permissions/model/permissions.types.ts';
import { InfoRow } from './ui/info-row.tsx';
import { RoleCheckboxRow } from './ui/role-checkbox-row.tsx';
import { UserDetailsSkeleton } from './ui/users-data-details-skeleton.tsx';
import { useOrchestrateAdminUserDetailsPage } from './hooks/useOrchestrateAdminUserDetailsPage.ts';

function AdminUserDetailsPage() {
    const { sufficientPermissions } = useCurrentPermissions();
    const { selectedRoles, user, isLoading, saveRoles, roles, isSaving, setSelectedRoles } =
        useOrchestrateAdminUserDetailsPage();

    function toggleRole(role: PermissionRoles) {
        setSelectedRoles((currentRoles) => {
            if (currentRoles.includes(role)) {
                return currentRoles.filter((currentRole) => currentRole !== role);
            }

            return [...currentRoles, role];
        });
    }

    if (isLoading) {
        return (
            <AdminPageShell title="User details" description="Loading user access details.">
                <UserDetailsSkeleton />
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

    const isRolesChanged = [...selectedRoles].sort().join('|') !== [...user.roles].sort().join('|');
    const fullName = [user.name, user.surname].filter(Boolean).join(' ') || 'No name';
    const canUpdateRoles = sufficientPermissions(PERMISSIONS.RBAC.UPDATE);

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
                                    onClick={() => void saveRoles()}
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

export default AdminUserDetailsPage;
