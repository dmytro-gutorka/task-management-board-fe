import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../shared/components/shadcn/ui/card.tsx';

export function ProfilePreferencesPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Application settings</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    Preferences tab content will be implemented here.
                </div>
            </CardContent>
        </Card>
    );
}
