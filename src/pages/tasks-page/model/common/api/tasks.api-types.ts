import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type {
    CursorPaginationResponse,
    PagePaginationResponse,
} from '../../../../../shared/types/common.ts';

export type TasksCursorPage = CursorPaginationResponse<Task>;
export type TasksPaginatedPage = PagePaginationResponse<Task>;
