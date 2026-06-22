import { Card, CardContent } from '../../../../shared/components/shadcn/ui/card.tsx';
import { AdminPageShell } from '../../common/admin-page-shell.tsx';
import { RolesSkeleton } from './ui/roles-skeleton.tsx';
import { RoleCard } from './ui/role-card.tsx';
import { useGetRoles } from './model/hooks/useGetRoles.ts';

function AdminRolesPage() {
    const { roles, isLoading } = useGetRoles();

    return (
        <AdminPageShell title="Roles" description="Review role to permission mapping.">
            {isLoading && <RolesSkeleton />}
            {roles.length && (
                <div className="grid gap-4 md:grid-cols-2">
                    {roles.map((role) => (
                        <RoleCard key={role.id} role={role} />
                    ))}
                </div>
            )}
            {!roles.length && (
                <Card>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">No roles found.</p>
                    </CardContent>
                </Card>
            )}
        </AdminPageShell>
    );
}

export default AdminRolesPage;
