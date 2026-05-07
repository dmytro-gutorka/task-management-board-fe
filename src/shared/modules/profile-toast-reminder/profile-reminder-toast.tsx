import { useTranslation } from 'react-i18next';
import { Button } from '../../components/shadcn/ui/button.tsx';

interface ProfileReminderToastProps {
    onGoToProfile: () => void;
    onNeverShow: () => void;
}

export function ProfileReminderToast({ onGoToProfile, onNeverShow }: ProfileReminderToastProps) {
    const { t } = useTranslation('common');

    return (
        <div className="space-y-3 rounded-lg border bg-card text-card-foreground p-4 shadow-lg">
            <div>
                <p className="font-medium">
                    {t('toasts.profile-reminder.description', { ns: 'common' })}
                </p>
                <p className="text-sm text-muted-foreground">
                    {t('toasts.profile-reminder.title', { ns: 'common' })}
                </p>
            </div>

            <div className="flex gap-2">
                <Button size="sm" onClick={onGoToProfile}>
                    {t('toasts.profile-reminder.buttons.go-to-profile', { ns: 'common' })}
                </Button>
                <Button size="sm" variant="outline" onClick={onNeverShow}>
                    {t('toasts.profile-reminder.buttons.never-show', { ns: 'common' })}
                </Button>
            </div>
        </div>
    );
}
