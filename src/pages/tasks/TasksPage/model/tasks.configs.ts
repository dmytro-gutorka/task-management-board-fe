export const taskStatusOptions = [
    { value: 'all', title: 'All statuses' },
    { value: 'todo', title: 'To Do' },
    { value: 'in-progress', title: 'In Progress' },
    { value: 'done', title: 'Done' },
] as const;

export const taskPriorityOptions = [
    { value: 'all', title: 'All priorities' },
    { value: 'high', title: 'High' },
    { value: 'medium', title: 'Medium' },
    { value: 'low', title: 'Low' },
] as const;

export const taskSortOptions = [
    { value: 'createdAt', title: 'Date created' },
    { value: 'deadline', title: 'Deadline' },
    { value: 'priority', title: 'Priority' },
    { value: 'title', title: 'Title' },
] as const;
