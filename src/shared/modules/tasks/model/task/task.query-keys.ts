export const tasksKeys = {
    all: ['tasks'] as const,
    lists: () => [...tasksKeys.all, 'list'] as const,
    detail: (taskId: string) => [...tasksKeys.all, 'detail', taskId] as const,
};
