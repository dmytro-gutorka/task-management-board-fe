import type { Task } from '../task.types.ts';
import type {
    CursorPaginationResponse,
    PagePaginationResponse,
} from '../../../../../types/common.ts';

export type TasksCursorPaginatedResponse = CursorPaginationResponse<Task>;
export type TasksPagePaginatedResponse = PagePaginationResponse<Task>;
