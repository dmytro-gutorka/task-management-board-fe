import { CircleUser } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROFILE_ROUTES } from '../constants/routes/profile.routes.ts';
import { IconTooltip } from './icon-tooltip.tsx';
import { Button } from './shadcn/ui/button.tsx';

export function UserProfileButton() {
    return (
        <Link to={PROFILE_ROUTES.PROFILE_PAGE}>
            <IconTooltip content="Profile">
                <Button variant="outline">
                    <CircleUser />
                </Button>
            </IconTooltip>
        </Link>
    );
}
