import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../shared/components/shadcn/ui/card.tsx';

export function ProfileSecurityPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Security</CardTitle>
                <CardDescription>Account security actions</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    Security tab content will be implemented here.
                </div>
            </CardContent>
        </Card>
    );
}
