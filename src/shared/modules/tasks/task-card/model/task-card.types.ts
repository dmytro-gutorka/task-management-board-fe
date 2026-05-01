import { type ValueOf } from '../../../../types/common.ts';
import { TASK_PRIORITY, TASK_STATUS } from '../../common/model/task.constants.ts';

export type TaskStatus = ValueOf<typeof TASK_STATUS>;
export type TaskPriority = ValueOf<typeof TASK_PRIORITY>;
