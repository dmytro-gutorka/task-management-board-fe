import { useState } from 'react';
import { Button } from '@/shared/components/shadcn/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/shared/components/shadcn/ui/card';
import { cn } from '@/shared/helpers/shadcn.utils';
import { DEFAULT_TAB, PROFILE_TABS } from '../model/profile-page.constants.ts';
import type { ProfileTab } from '../model/profile-page.types.ts';

export function ProfilePage() {
    const [activeTab, setActiveTab] = useState<ProfileTab>(DEFAULT_TAB);

    function handleTabChange(tab: ProfileTab) {
        setActiveTab(tab);
    }

    const activeTabData = PROFILE_TABS.find((tab) => tab.value === activeTab);

    return (
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6">
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your profile information, preferences and account security.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account settings</CardTitle>
                    <CardDescription>Choose the section you want to manage.</CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="grid gap-2 rounded-xl bg-muted p-1 md:grid-cols-3">
                        {PROFILE_TABS.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = tab.value === activeTab;

                            return (
                                <Button
                                    key={tab.value}
                                    type="button"
                                    variant={isActive ? 'default' : 'ghost'}
                                    className={cn(
                                        'h-auto justify-start gap-3 px-3 py-3 text-left',
                                        isActive && 'shadow-sm',
                                    )}
                                    onClick={() => handleTabChange(tab.value)}
                                    aria-pressed={isActive}
                                >
                                    <Icon className="size-4" />

                                    <span className="flex flex-col">
                                        <span className="font-medium">{tab.label}</span>
                                        <span
                                            className={cn(
                                                'text-xs font-normal',
                                                isActive
                                                    ? 'text-primary-foreground/80'
                                                    : 'text-muted-foreground',
                                            )}
                                        >
                                            {tab.description}
                                        </span>
                                    </span>
                                </Button>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{activeTabData?.label}</CardTitle>
                    <CardDescription>{activeTabData?.description}</CardDescription>
                </CardHeader>

                <CardContent>
                    {activeTab === 'profile' && <ProfileTabContent />}
                    {activeTab === 'preferences' && <PreferencesTabContent />}
                    {activeTab === 'security' && <SecurityTabContent />}
                </CardContent>
            </Card>
        </main>
    );
}

function ProfileTabContent() {
    return (
        <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Profile tab content will be implemented here latera
        </div>
    );
}

function PreferencesTabContent() {
    return (
        <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Preferences tab content will be implemented latera
        </div>
    );
}

function SecurityTabContent() {
    return (
        <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            Security tab content will be implemented latera
        </div>
    );
}
