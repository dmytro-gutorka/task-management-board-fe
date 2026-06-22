import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon, UserCogIcon, UsersIcon } from 'lucide-react';

import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/shadcn/ui/card';
import { ADMIN_ROUTES } from '@/shared/constants/routes/admin.routes.ts';
import { PERMISSIONS } from '@/shared/modules/permissions/model/permissions.map.ts';
import { HasPermissions } from '@/shared/modules/permissions/ui/has-permissions.tsx';
import { useAuth } from '@/shared/providers/auth-provider/auth.provider.tsx';
import { AdminPageShell } from './common/admin-page-shell.tsx';

const dashboardCards = [
    {
        title: 'Users',
        description: 'Search users and manage assigned roles.',
        href: ADMIN_ROUTES.ADMIN_USERS_PAGE,
        buttonLabel: 'Open users',
        permission: PERMISSIONS.USERS.READ,
        icon: UsersIcon,
    },
    {
        title: 'Roles',
        description: 'Review role to permission mapping.',
        href: ADMIN_ROUTES.ADMIN_ROLES_PAGE,
        buttonLabel: 'Open roles',
        permission: PERMISSIONS.RBAC.READ,
        icon: UserCogIcon,
    },
    {
        title: 'Permissions',
        description: 'Inspect raw permissions exposed by the API.',
        href: ADMIN_ROUTES.ADMIN_PERMISSIONS_PAGE,
        buttonLabel: 'Open permissions',
        permission: PERMISSIONS.RBAC.READ,
        icon: ShieldCheckIcon,
    },
] as const;

function AdminDashboardPage() {
    const { user } = useAuth();

    return (
        <AdminPageShell
            title="Admin dashboard"
            description="Manage users, roles and permission reference data."
        >
            <div className="grid gap-4 md:grid-cols-3">
                {dashboardCards.map((item) => {
                    const Icon = item.icon;

                    return (
                        <HasPermissions key={item.href} permission={item.permission}>
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-1">
                                            <CardTitle>{item.title}</CardTitle>
                                            <CardDescription>{item.description}</CardDescription>
                                        </div>
                                        <div className="rounded-lg border bg-muted p-2 text-muted-foreground">
                                            <Icon className="size-4" />
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <Button asChild>
                                        <Link to={item.href}>{item.buttonLabel}</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        </HasPermissions>
                    );
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>My access</CardTitle>
                    <CardDescription>
                        Current user roles and permissions from /users/me.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                    <AccessSection title="Roles">
                        {user?.roles.length ? (
                            user.roles.map((role) => (
                                <Badge key={role} variant="secondary">
                                    {role}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No roles.</p>
                        )}
                    </AccessSection>

                    <AccessSection title="Permissions">
                        {user?.permissions.length ? (
                            user.permissions.map((permission) => (
                                <Badge key={permission} variant="outline">
                                    {permission}
                                </Badge>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No permissions.</p>
                        )}
                    </AccessSection>

                    <HasPermissions permission={PERMISSIONS.RBAC.UPDATE}>
                        <p className="text-sm text-muted-foreground">
                            You can update user roles because you have RBAC:UPDATE.
                        </p>
                    </HasPermissions>
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}

function AccessSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="space-y-2">
            <h2 className="text-sm font-medium">{title}</h2>
            <div className="flex flex-wrap gap-2">{children}</div>
        </section>
    );
}

export default AdminDashboardPage;
