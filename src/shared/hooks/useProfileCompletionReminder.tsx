import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ToastContentProps } from 'react-toastify';
import { toast } from 'react-toastify';
import { Button } from '../components/shadcn/ui/button.tsx';
import { LOCAL_STORAGE_PROFILE_KEYS } from '../modules/local-storage/model/local-storage.constants.ts';

export function useProfileCompletionReminder() {
    const navigate = useNavigate();

    function handleShowNoMore(closeToast: ToastContentProps['closeToast']): void {
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW, 'true');
        closeToast?.();
    }

    useEffect(() => {
        const skipped =
            localStorage.getItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_SKIPPED) === 'true';
        const neverShow =
            localStorage.getItem(LOCAL_STORAGE_PROFILE_KEYS.PROFILE_COMPLETION_NEVER_SHOW) ===
            'true';

        if (!skipped || neverShow) return;

        toast(
            ({ closeToast }: ToastContentProps) => (
                <div className="space-y-3">
                    <div>
                        <p className="font-medium">Fil in the profile</p>
                        <p className="text-sm text-muted-foreground">This will help us a lot</p>
                    </div>

                    <div className="flex gap-2">
                        <Button size="sm" onClick={closeToast}>
                            Get to profile
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleShowNoMore(closeToast)}
                        >
                            DO not show it anymore
                        </Button>
                    </div>
                </div>
            ),
            {
                autoClose: false,
            },
        );
    }, [navigate]);
}
