import { Link } from 'react-router-dom';
import { Badge } from '../../shared/components/shadcn/ui/badge.tsx';
import { Button } from '../../shared/components/shadcn/ui/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../shared/components/shadcn/ui/card.tsx';
import { PERMISSIONS } from '../../shared/modules/permissions/model/permissions.map.ts';
import { HasPermissions } from '../../shared/modules/permissions/ui/has-permissions.tsx';
import { useAuth } from '../../shared/providers/auth-provider/auth.provider.tsx';
import { AdminPageShell } from './common/admin-page-shell.tsx';
import { dashboardCards } from './model/admin-dashboard.tabs-config.tsx';
import { AccessSection } from './ui/AccessSection.tsx';

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

export default AdminDashboardPage;
