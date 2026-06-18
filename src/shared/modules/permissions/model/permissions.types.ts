import type { ValueOf } from '../../../types/common.ts';
import {
    PermissionModes,
    PermissionResources,
    PermissionActions,
} from './permissions.constants.ts';

export type PermissionResource = ValueOf<typeof PermissionResources>;
export type PermissionAction = ValueOf<typeof PermissionActions>;
export type PermissionMode = ValueOf<typeof PermissionModes>;

export type PermissionKey = `${PermissionResource}:${PermissionAction}`;

export type PermissionCheckInput = PermissionKey | PermissionKey[];
