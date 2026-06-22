import { HasPermissions } from '../modules/permissions/ui/has-permissions.tsx';
import { PermissionModes } from '../modules/permissions/model/permissions.constants.ts';
import { PERMISSIONS } from '../modules/permissions/model/permissions.map.ts';
import { ADMIN_ROUTES } from '../constants/routes/admin.routes.ts';
import { NavLink } from 'react-router-dom';
import { Button } from '@/shared/components/shadcn/ui/button';

function AdminDashboardLink() {
    return (
        <HasPermissions
            mode={PermissionModes.ANY}
            permission={[PERMISSIONS.USERS.READ, PERMISSIONS.RBAC.READ]}
        >
            <Button asChild variant="outline">
                <NavLink
                    to={ADMIN_ROUTES.ADMIN_PAGE}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                    Admin
                </NavLink>
            </Button>
        </HasPermissions>
    );
}

export default AdminDashboardLink;
