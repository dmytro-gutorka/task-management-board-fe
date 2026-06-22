import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/shared/components/shadcn/ui/alert';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/shadcn/ui/card';
import { Input } from '@/shared/components/shadcn/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '@/shared/components/shadcn/ui/pagination';
import { Skeleton } from '@/shared/components/shadcn/ui/skeleton';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/shadcn/ui/table';
import { ADMIN_ROUTES } from '@/shared/constants/routes/admin.routes.ts';
import { useDebounce } from '@/shared/hooks/useDebounce.ts';

import { AdminPageShell } from '../../admin-dashboard/ui/common/admin-page-shell.tsx';
import { UserApiService } from '../../../shared/modules/users/api/user-api.service.ts';
import type { PagePaginationResponse } from '../../../shared/types/common.ts';
import type { UserListItem } from '../../../shared/modules/users/api/user-api.types-domain.ts';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

function AdminUsersPage() {
    const [usersPage, setUsersPage] = useState<PagePaginationResponse<UserListItem> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(DEFAULT_PAGE);

    const debouncedSearch = useDebounce(search, 350);

    const fetchUsers = useCallback(
        async (signal?: AbortSignal) => {
            setIsLoading(true);
            setErrorMessage(null);

            try {
                const result = await UserApiService.getUsers(
                    {
                        page,
                        limit: DEFAULT_LIMIT,
                        search: debouncedSearch.trim() || undefined,
                    },
                    signal,
                );

                setUsersPage(result);
            } catch {
                if (!signal?.aborted) {
                    setErrorMessage('Failed to load users.');
                    setUsersPage(null);
                }
            } finally {
                if (!signal?.aborted) {
                    setIsLoading(false);
                }
            }
        },
        [debouncedSearch, page],
    );

    useEffect(() => {
        const controller = new AbortController();

        void fetchUsers(controller.signal);

        return () => controller.abort();
    }, [fetchUsers]);

    useEffect(() => {
        setPage(DEFAULT_PAGE);
    }, [debouncedSearch]);

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
                        />
                    </div>

                    {errorMessage ? (
                        <Alert variant="destructive">
                            <AlertTitle>Unable to load users</AlertTitle>
                            <AlertDescription>{errorMessage}</AlertDescription>
                        </Alert>
                    ) : null}

                    {isLoading ? (
                        <UsersTableSkeleton />
                    ) : hasUsers && usersPage ? (
                        <UsersTable users={usersPage.items} />
                    ) : (
                        <EmptyCard message="No users found." />
                    )}

                    {usersPage ? (
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <p className="text-sm text-muted-foreground">
                                Page {usersPage.page} of {usersPage.totalPages || 1}. Total:{' '}
                                {usersPage.total}
                            </p>

                            <Pagination className="mx-0 w-auto justify-start md:justify-end">
                                <PaginationContent>
                                    <PaginationItem>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="default"
                                            disabled={page <= 1 || isLoading}
                                            onClick={() =>
                                                setPage((currentPage) => currentPage - 1)
                                            }
                                        >
                                            Previous
                                        </Button>
                                    </PaginationItem>
                                    <PaginationItem>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="default"
                                            disabled={
                                                isLoading ||
                                                !usersPage.totalPages ||
                                                page >= usersPage.totalPages
                                            }
                                            onClick={() =>
                                                setPage((currentPage) => currentPage + 1)
                                            }
                                        >
                                            Next
                                        </Button>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    ) : null}
                </CardContent>
            </Card>
        </AdminPageShell>
    );
}

function UsersTable({ users }: { users: UserListItem[] }) {
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

function UserTableRow({ user }: { user: UserListItem }) {
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

function UsersTableSkeleton() {
    return (
        <div className="space-y-2 rounded-lg border p-3">
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                    <Skeleton className="h-5 w-10" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-3 w-56" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-8 w-16" />
                </div>
            ))}
        </div>
    );
}

function EmptyCard({ message }: { message: string }) {
    return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            {message}
        </div>
    );
}

export default AdminUsersPage;
