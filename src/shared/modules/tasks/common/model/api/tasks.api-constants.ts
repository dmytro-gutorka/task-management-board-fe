export const TASKS_BASE_SUBPATH = '/tasks';

export const TASKS_API_ROUTES = {
    CREATE: TASKS_BASE_SUBPATH,
    UPDATE: (taskId: string) => `${TASKS_BASE_SUBPATH}/${taskId}`,
    DELETE: (taskId: string) => `${TASKS_BASE_SUBPATH}/${taskId}`,
    FIND_BY_ID: (taskId: string) => `${TASKS_BASE_SUBPATH}/${taskId}`,
    FIND_FEED: `${TASKS_BASE_SUBPATH}/feed`,
    FIND_ALL: TASKS_BASE_SUBPATH,
};
