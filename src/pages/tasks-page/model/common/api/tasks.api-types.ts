import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type {
    CursorPaginationResponse,
    PagePaginationResponse,
} from '../../../../../shared/types/common.ts';

export type TasksCursorPaginatedResponse = CursorPaginationResponse<Task>;
export type TasksPagePaginatedResponse = PagePaginationResponse<Task>;
