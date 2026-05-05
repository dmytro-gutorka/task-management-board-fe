import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '../../../../shared/components/shadcn/ui/pagination.tsx';
import { type MouseEvent } from 'react';

interface TasksPaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function TasksPagination({ page, totalPages, onPageChange }: TasksPaginationProps) {
    if (totalPages <= 1) return null;

    const canGoPrevious = page > 1;
    const canGoNext = page < totalPages;

    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    const visiblePages = pages.filter((pageNumber) => {
        return pageNumber === 1 || pageNumber === totalPages || Math.abs(pageNumber - page) <= 1;
    });

    function handlePreviousPage(event: MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        if (canGoPrevious) onPageChange(page - 1);
    }

    function handleNextPage(event: MouseEvent<HTMLAnchorElement>) {
        event.preventDefault();
        if (canGoNext) onPageChange(page + 1);
    }

    function handlePageClick(event: MouseEvent<HTMLAnchorElement>, pageNumber: number) {
        event.preventDefault();
        onPageChange(pageNumber);
    }

    return (
        <Pagination className="mt-6">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={(event) => handlePreviousPage(event)}
                        className={!canGoPrevious ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>

                {visiblePages.map((pageNumber, index) => {
                    const previousPage = visiblePages[index - 1];
                    const shouldShowEllipsis = previousPage && pageNumber - previousPage > 1;

                    return (
                        <div key={pageNumber} className="flex items-center">
                            {shouldShowEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <PaginationLink
                                    href="#"
                                    isActive={pageNumber === page}
                                    onClick={(event) => handlePageClick(event, pageNumber)}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        </div>
                    );
                })}

                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={(event) => handleNextPage(event)}
                        className={!canGoNext ? 'pointer-events-none opacity-50' : ''}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
