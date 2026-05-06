import { TASKS_API_ROUTES } from './tasks.api-constants.ts';
import { httpClient } from '../../../../../shared/infrastructure/axios/httpClient.ts';
import type {
    CreateTaskPayload,
    Task,
    UpdateTaskPayload,
} from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type {
    TasksCursorPaginatedResponse,
    TasksPagePaginatedResponse,
} from './tasks.api-types.ts';

export const TasksApiService = {
    async findPage(
        params: URLSearchParams,
        signal: AbortSignal,
    ): Promise<TasksPagePaginatedResponse> {
        const { data } = await httpClient.get<TasksPagePaginatedResponse>(
            TASKS_API_ROUTES.FIND_ALL,
            {
                params,
                signal,
            },
        );

        return data;
    },

    async findFeedPage(
        params: URLSearchParams,
        signal: AbortSignal,
    ): Promise<TasksCursorPaginatedResponse> {
        const { data } = await httpClient.get<TasksCursorPaginatedResponse>(
            TASKS_API_ROUTES.FIND_FEED,
            {
                params,
                signal,
            },
        );

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
