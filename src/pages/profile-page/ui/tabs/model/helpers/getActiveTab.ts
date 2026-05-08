import { PROFILE_TABS } from '../../../../model/profile-page.constants.ts';
import type { ProfileTab } from '../../../../model/profile-page.types.ts';

export function getActiveTab(pathname: string): ProfileTab {
    const profileTabs = Object.values(PROFILE_TABS);
    const currentTab = profileTabs.find((tab) => pathname.includes(tab));

    if (currentTab) return currentTab;

    return PROFILE_TABS.DETAILS;
}
