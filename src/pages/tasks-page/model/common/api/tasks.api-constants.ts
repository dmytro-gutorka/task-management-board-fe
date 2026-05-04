export const TASKS_BASE_SUBPATH = '/tasks';

export const TASKS_API_ROUTES = {
    FIND_ALL: TASKS_BASE_SUBPATH,
    FIND_ONE: (taskId: string) => `${TASKS_BASE_SUBPATH}/${taskId}`,
    CREATE: TASKS_BASE_SUBPATH,
    UPDATE: (taskId: string) => `${TASKS_BASE_SUBPATH}/${taskId}`,
    DELETE: (taskId: string) => `${TASKS_BASE_SUBPATH}/${taskId}`,
};
