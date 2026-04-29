import { type ValueOf } from '@/shared/types/common.ts';
import { TASK_PRIORITY, TASK_STATUS } from '@/shared/modules/tasks/model/task/task.constants.ts';

export type TaskStatus = ValueOf<typeof TASK_STATUS>;
export type TaskPriority = ValueOf<typeof TASK_PRIORITY>;
