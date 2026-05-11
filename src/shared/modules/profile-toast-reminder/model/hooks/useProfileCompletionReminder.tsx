import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PROFILE_ROUTES } from '../../../../constants/routes/profile.routes.ts';
import { ProfileReminderToast } from '../../profile-reminder-toast.tsx';
import {
    LOCAL_STORAGE_BOOLEANS,
    LOCAL_STORAGE_PROFILE_KEYS,
} from '../../../../infrastructure/local-storage/model/local-storage.constants.ts';
import { PROFILE_TOAST_REMINDER_ID } from '../profile-toast-reminder.constants.ts';

function shouldShowReminder(): boolean {
    const skipped =
        localStorage.getItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED) ===
        LOCAL_STORAGE_BOOLEANS.TRUE;

    const neverShow =
        localStorage.getItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW) ===
        LOCAL_STORAGE_BOOLEANS.TRUE;

    return skipped && !neverShow;
}

export function useProfileCompletionReminder() {
    const navigate = useNavigate();
    const shownRef = useRef(false);

    function handleGoToProfile(t: string | number) {
        void navigate(PROFILE_ROUTES.PROFILE_PAGE);
        toast.dismiss(t);
    }

    function handleNeverShow(t: string | number) {
        localStorage.setItem(
            LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW,
            LOCAL_STORAGE_BOOLEANS.TRUE,
        );
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
                id: PROFILE_TOAST_REMINDER_ID,
                duration: Infinity,
            },
        );
    });
}
