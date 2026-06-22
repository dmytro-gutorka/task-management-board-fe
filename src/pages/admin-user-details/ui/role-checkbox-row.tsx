import type { RoleWithPermissions } from '../../../shared/modules/rbac/rbac-api.types.ts';
import { Checkbox } from '../../../shared/components/shadcn/ui/checkbox.tsx';
import { Label } from '../../../shared/components/shadcn/ui/label.tsx';

interface RoleCheckboxRowProps {
    role: RoleWithPermissions;
    checked: boolean;
    disabled: boolean;
    onCheckedChange: () => void;
}

export function RoleCheckboxRow({
    role,
    checked,
    disabled,
    onCheckedChange,
}: RoleCheckboxRowProps) {
    const checkboxId = `role-${role.name}`;

    return (
        <div className="flex items-start gap-3 rounded-lg border p-3">
            <Checkbox
                id={checkboxId}
                checked={checked}
                disabled={disabled}
                onCheckedChange={onCheckedChange}
            />
            <div className="grid gap-1.5 leading-none">
                <Label htmlFor={checkboxId}>{role.name}</Label>
                <p className="text-xs text-muted-foreground">
                    {role.permissions.length} permissions
                </p>
            </div>
        </div>
    );
}
