import { Shield, SlidersHorizontal, UserRound } from 'lucide-react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../shared/components/shadcn/ui/card.tsx';
import { Tabs, TabsList, TabsTrigger } from '../../../shared/components/shadcn/ui/tabs.tsx';
import type { ProfileTab } from '../model/profile-page.types.ts';
import { getActiveTab } from '../model/helpers/getActiveTab.ts';
import { getTabPath } from '../model/helpers/getTabPath.ts';

export function ProfilePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const activeTab = getActiveTab(location.pathname);

    function handleTabChange(tab: ProfileTab) {
        void navigate(getTabPath(tab));
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
                        <TabsList className="grid h-auto w-full grid-cols-1 items-stretch gap-2 p-1 md:grid-cols-3">
                            <TabsTrigger
                                value="details"
                                className="flex h-full min-h-16 items-center justify-start gap-3 whitespace-normal rounded-md px-3 py-3 text-left"
                            >
                                <UserRound className="size-4 shrink-0" />

                                <span className="flex min-w-0 flex-col items-start">
                                    <span className="font-medium">Profile</span>
                                    <span className="text-wrap text-xs font-normal text-muted-foreground">
                                        Basic user information
                                    </span>
                                </span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="preferences"
                                className="flex h-full min-h-16 items-center justify-start gap-3 whitespace-normal rounded-md px-3 py-3 text-left"
                            >
                                <SlidersHorizontal className="size-4 shrink-0" />

                                <span className="flex min-w-0 flex-col items-start">
                                    <span className="font-medium">Preferences</span>
                                    <span className="text-wrap text-xs font-normal text-muted-foreground">
                                        Application settings
                                    </span>
                                </span>
                            </TabsTrigger>

                            <TabsTrigger
                                value="security"
                                className="flex h-full min-h-16 items-center justify-start gap-3 whitespace-normal rounded-md px-3 py-3 text-left"
                            >
                                <Shield className="size-4 shrink-0" />

                                <span className="flex min-w-0 flex-col items-start">
                                    <span className="font-medium">Security</span>
                                    <span className="text-wrap text-xs font-normal text-muted-foreground">
                                        Account security actions
                                    </span>
                                </span>
                            </TabsTrigger>
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
