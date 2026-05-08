import { PROFILE_TABS } from '../profile-page.constants.ts';
import type { ProfileTab } from '../profile-page.types.ts';

export function getActiveTab(pathname: string): ProfileTab {
    const profileTabs = Object.values(PROFILE_TABS);
    const currentTab = profileTabs.find((tab) => pathname.includes(tab));

    if (currentTab) return currentTab;

    return PROFILE_TABS.DETAILS;
}
