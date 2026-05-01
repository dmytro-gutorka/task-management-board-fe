import { Button } from '../../components/shadcn/ui/button.tsx';

interface ProfileReminderToastProps {
    onGoToProfile: () => void;
    onNeverShow: () => void;
}

export function ProfileReminderToast({ onGoToProfile, onNeverShow }: ProfileReminderToastProps) {
    return (
        <div className="space-y-3 rounded-lg border bg-card text-card-foreground p-4 shadow-lg">
            <div>
                <p className="font-medium">Fill in the profile</p>
                <p className="text-sm text-muted-foreground">This will help us a lot</p>
            </div>

            <div className="flex gap-2">
                <Button size="sm" onClick={onGoToProfile}>
                    Get to profile
                </Button>

                <Button size="sm" variant="outline" onClick={onNeverShow}>
                    Do not show anymore
                </Button>
            </div>
        </div>
    );
}
