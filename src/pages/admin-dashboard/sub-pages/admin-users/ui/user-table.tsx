import type { UserListItem } from '../../../../../shared/modules/users/api/user-api.types-domain.ts';
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
} from '../../../../../shared/components/shadcn/ui/table.tsx';
import { UserTableRow } from './user-table-row.tsx';

interface UsersTableProps {
    users: UserListItem[];
}

export function UsersTable({ users }: UsersTableProps) {
    return (
        <div className="rounded-lg border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[72px]">ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <UserTableRow key={user.id} user={user} />
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
