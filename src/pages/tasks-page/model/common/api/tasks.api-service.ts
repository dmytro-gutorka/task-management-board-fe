import { GENERAL_QUERY_PARAMS } from '../../../../../shared/constants/common.constants.ts';
import type { CursorParams } from '../../../../../shared/types/common.ts';
import { TASKS_API_ROUTES } from './tasks.api-constants.ts';
import { httpClient } from '../../../../../shared/infrastructure/axios/httpClient.ts';
import type {
    CreateTaskPayload,
    Task,
    UpdateTaskPayload,
} from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { TasksCursorPage, TasksPaginatedPage } from './tasks.api-types.ts';

export const TasksApiService = {
    async findPage(queryString: string, signal: AbortSignal): Promise<TasksPaginatedPage> {
        const params = new URLSearchParams(queryString);

        const { data } = await httpClient.get<TasksPaginatedPage>(TASKS_API_ROUTES.FIND_ALL, {
            params,
            signal,
        });

        return data;
    },

    async findFeedPage(
        { cursor = null, limit = 20 }: CursorParams,
        signal: AbortSignal,
    ): Promise<TasksCursorPage> {
        const params = new URLSearchParams();

        params.set(GENERAL_QUERY_PARAMS.LIMIT, String(limit));
        if (cursor) params.set(GENERAL_QUERY_PARAMS.CURSOR, cursor);

        const { data } = await httpClient.get<TasksCursorPage>(TASKS_API_ROUTES.FIND_FEED, {
            params,
            signal,
        });

        return data;
    },

    async create(payload: CreateTaskPayload): Promise<Task> {
        const { data } = await httpClient.post<Task>(TASKS_API_ROUTES.CREATE, payload);
        return data;
    },

    async update(payload: UpdateTaskPayload, taskId: string): Promise<Task> {
        const { data } = await httpClient.patch<Task>(TASKS_API_ROUTES.UPDATE(taskId), payload);
        return data;
    },

    async delete(taskId: string): Promise<void> {
        await httpClient.delete(TASKS_API_ROUTES.DELETE(taskId));
    },
};
