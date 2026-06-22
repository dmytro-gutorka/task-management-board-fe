import { Badge } from '../../../../shared/components/shadcn/ui/badge.tsx';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../shared/components/shadcn/ui/card.tsx';
import { AdminPageShell } from '../../common/admin-page-shell.tsx';
import {
    TableHead,
    TableRow,
    TableBody,
    TableHeader,
    Table,
    TableCell,
} from '../../../../shared/components/shadcn/ui/table.tsx';
import { PermissionsTableSkeleton } from './ui/PermissionsTableSkeleton.tsx';
import { useGetPermissions } from './hooks/useGetPermissions.ts';

function AdminPermissionsPage() {
    const { permissions, isLoading } = useGetPermissions();

    return (
        <AdminPageShell title="Permissions" description="Inspect all raw permissions.">
            <Card>
                <CardHeader>
                    <CardTitle>Permission reference</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

export default AdminPermissionsPage;
