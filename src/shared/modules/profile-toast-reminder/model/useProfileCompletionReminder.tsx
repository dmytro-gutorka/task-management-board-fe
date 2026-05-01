import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ROUTES } from '../../../../app/routes/common/routes.constants.ts';
import { ProfileReminderToast } from '../profile-reminder-toast.tsx';
import { LOCAL_STORAGE_PROFILE_KEYS } from '../../local-storage/model/local-storage.constants.ts';

function shouldShowReminder(): boolean {
    const skipped =
        localStorage.getItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED) === 'true';

    const neverShow =
        localStorage.getItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW) === 'true';

    return skipped && !neverShow;
}

export function useProfileCompletionReminder() {
    const navigate = useNavigate();
    const shownRef = useRef(false);

    function handleGoToProfile(t: string | number) {
        void navigate(ROUTES.PROFILE_PAGE);
        toast.dismiss(t);
    }

    function handleNeverShow(t: string | number) {
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW, 'true');
        toast.dismiss(t);
    }

    useEffect(() => {
        if (shownRef.current) return;
        if (!shouldShowReminder()) return;

        shownRef.current = true;

        toast.custom(
            (t) => (
                <ProfileReminderToast
                    onGoToProfile={() => handleGoToProfile(t)}
                    onNeverShow={() => handleNeverShow(t)}
                />
            ),
            {
                id: 'profile-reminder',
                duration: Infinity,
            },
        );
    }, [navigate]);
}
