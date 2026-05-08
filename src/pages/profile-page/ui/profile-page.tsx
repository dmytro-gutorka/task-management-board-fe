import { PROFILE_TABS, tabRoutes } from '../model/profile-page.constants.ts';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../shared/components/shadcn/ui/card.tsx';
import { Tabs, TabsList } from '../../../shared/components/shadcn/ui/tabs.tsx';
import { getActiveTab } from '../model/helpers/getActiveTab.ts';
import type { ProfileTab } from '../model/profile-page.types.ts';
import { ProfileTabTrigger } from './tabs/ui/profile-tab-trigger.tsx';

export function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const activeTab = getActiveTab(location.pathname);

    function handleTabChange(tab: ProfileTab) {
        void navigate(tabRoutes[tab]);
    }

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your profile information, preferences and account security.
                </p>
            </div>

            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <Card>
                    <CardHeader>
                        <CardTitle>Account settings</CardTitle>
                        <CardDescription>Choose the section you want to manage.</CardDescription>
                    </CardHeader>

                    <CardContent className="pb-8">
                        <TabsList className="grid h-auto w-full grid-cols-1 items-stretch gap-2 p-1 md:grid-cols-3 bg-transparent">
                            <ProfileTabTrigger
                                tab={PROFILE_TABS.DETAILS}
                                title="Profile"
                                description="Basic user information"
                            />
                            <ProfileTabTrigger
                                tab={PROFILE_TABS.PREFERENCES}
                                title="Preferences"
                                description="Application settings"
                            />
                            <ProfileTabTrigger
                                tab={PROFILE_TABS.SECURITY}
                                title="Security"
                                description="Acount security actions"
                            />
                        </TabsList>
                    </CardContent>
                </Card>

                <div className="mt-6">
                    <Outlet />
                </div>
            </Tabs>
        </main>
    );
}
