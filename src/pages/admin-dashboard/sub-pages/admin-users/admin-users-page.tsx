import { SearchIcon } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '../../../../shared/components/shadcn/ui/card.tsx';
import { Input } from '../../../../shared/components/shadcn/ui/input.tsx';
import { AdminPageShell } from '../../common/admin-page-shell.tsx';
import { UsersTableSkeleton } from './ui/user-table-skeleton.tsx';
import { EmptyCard } from './ui/empty-card.tsx';
import { UsersTable } from './ui/user-table.tsx';
import { useGetUsers } from './model/hooks/useGetUsers.ts';
import { AdminUserPagination } from './ui/admin-user-pagination.tsx';

function AdminUsersPage() {
    const { setSearch, usersPage, isLoading, search, page, setPage } = useGetUsers();

    const hasUsers = Boolean(usersPage?.items.length);

    return (
        <AdminPageShell title="Users" description="Search users and manage their roles.">
            <Card>
                <CardHeader>
                    <CardTitle>User management</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="relative">
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search by email, name or surname..."
                            className="pl-8"
                            aria-label="Search users"
                        />
                    </div>
                    {isLoading && <UsersTableSkeleton />}
                    {hasUsers && usersPage ? (
                        <UsersTable users={usersPage.items} />
                    ) : (
                        <EmptyCard message="No users found." />
                    )}
                    <AdminUserPagination
                        usersPage={usersPage}
                        setPage={setPage}
                        page={page}
                        isLoading={isLoading}
                    />
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}

export default AdminUsersPage;
