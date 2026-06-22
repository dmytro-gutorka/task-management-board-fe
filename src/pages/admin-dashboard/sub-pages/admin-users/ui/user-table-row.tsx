import type { UserListItem } from '../../../../../shared/modules/users/api/user-api.types-domain.ts';
import { TableRow, TableCell } from '../../../../../shared/components/shadcn/ui/table.tsx';
import { Badge } from '../../../../../shared/components/shadcn/ui/badge.tsx';
import { Button } from '../../../../../shared/components/shadcn/ui/button.tsx';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../../../../shared/constants/routes/admin.routes.ts';

export function UserTableRow({ user }: { user: UserListItem }) {
    const fullName = [user.name, user.surname].filter(Boolean).join(' ') || 'No name';

    return (
        <TableRow>
            <TableCell className="font-medium">{user.id}</TableCell>
            <TableCell>
                <div className="space-y-1">
                    <p className="font-medium">{fullName}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </TableCell>
            <TableCell>
                <div className="flex flex-wrap gap-1.5">
                    {user.roles.length ? (
                        user.roles.map((role) => (
                            <Badge key={role} variant="secondary">
                                {role}
                            </Badge>
                        ))
                    ) : (
                        <span className="text-sm text-muted-foreground">No roles</span>
                    )}
                </div>
            </TableCell>
            <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
                <Button asChild variant="outline" size="sm">
                    <Link to={ADMIN_ROUTES.userDetails(user.id)}>Details</Link>
                </Button>
            </TableCell>
        </TableRow>
    );
}
