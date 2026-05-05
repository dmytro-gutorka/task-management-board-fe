import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';

export type TasksCursor = string | null;

export interface TasksCursorPage {
    items: Task[];
    nextCursor: TasksCursor;
}

export interface TasksCursorParams {
    cursor?: TasksCursor;
    limit?: number;
}
