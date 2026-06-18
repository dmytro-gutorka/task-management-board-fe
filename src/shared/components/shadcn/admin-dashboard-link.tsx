import { HasPermissions } from '../../modules/permissions/ui/has-permissions.tsx';
import { PermissionModes } from '../../modules/permissions/model/permissions.constants.ts';
import { PERMISSIONS } from '../../modules/permissions/model/permissions.map.ts';

function AdminDashboardLink() {
    return (
        // just for the same of testing, will be changed later
        <HasPermissions mode={PermissionModes.ALL} permission={[PERMISSIONS.USERS.READ]}>
            <div>DASHBOARD ADMIN</div>
        </HasPermissions>
    );
}

export default AdminDashboardLink;
