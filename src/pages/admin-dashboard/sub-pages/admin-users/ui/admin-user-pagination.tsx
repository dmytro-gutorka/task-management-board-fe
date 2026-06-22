import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '../../../../../shared/components/shadcn/ui/pagination.tsx';
import { Button } from '../../../../../shared/components/shadcn/ui/button.tsx';
import type { Nullable, PagePaginationResponse } from '../../../../../shared/types/common.ts';
import type { UserListItem } from '../../../../../shared/modules/users/api/user-api.types-domain.ts';
import type { Dispatch, SetStateAction } from 'react';

interface AdminUserPaginationProps {
    usersPage: Nullable<PagePaginationResponse<UserListItem>>;
    page: number;
    isLoading: boolean;
    setPage: Dispatch<SetStateAction<number>>;
}

export function AdminUserPagination({
    isLoading,
    usersPage,
    setPage,
    page,
}: AdminUserPaginationProps) {
    return (
        <>
            {usersPage ? (
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm text-muted-foreground">
                            Page {usersPage.page} of {usersPage.totalPages || 1}
                        </p>
                        <p className="text-sm text-muted-foreground">Total: {usersPage.total}</p>
                    </div>
                    <Pagination className="mx-0 w-auto justify-start md:justify-end">
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="default"
                                    disabled={page <= 1 || isLoading}
                                    onClick={() =>
                                        setPage((currentPage: number) => currentPage - 1)
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
                                        setPage((currentPage: number) => currentPage + 1)
                                    }
                                >
                                    Next
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            ) : null}
        </>
    );
}
