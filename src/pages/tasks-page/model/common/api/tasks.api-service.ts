import { httpClient } from '../../../../../shared/infrastructure/axios/httpClient.ts';
import type {
    CreateTaskPayload,
    Task,
    UpdateTaskPayload,
} from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import { TASKS_API_ROUTES } from './tasks.api-constants.ts';
import type { TasksCursorPage, TasksCursorParams } from './tasks.api-types.ts';

export const TasksApiService = {
    async findPage(
        queryString: string,
        { cursor = null, limit = 10 }: TasksCursorParams,
        signal: AbortSignal,
    ): Promise<TasksCursorPage> {
        const params = new URLSearchParams(queryString);

        params.set('limit', String(limit));
        if (cursor) params.set('cursor', cursor);

        const { data } = await httpClient.get<TasksCursorPage>(TASKS_API_ROUTES.FIND_ALL, {
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
