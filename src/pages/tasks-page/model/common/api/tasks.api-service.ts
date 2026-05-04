import { httpClient } from '../../../../../shared/infrastructure/axios/httpClient.ts';
import type {
    CreateTaskPayload,
    Task,
    UpdateTaskPayload,
} from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import { TASKS_API_ROUTES } from './tasks.api-constants.ts';

export const TasksApiService = {
    async findAll(params: URLSearchParams, signal: AbortSignal): Promise<Task[]> {
        const { data } = await httpClient.get<Task[]>(TASKS_API_ROUTES.FIND_ALL, {
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
