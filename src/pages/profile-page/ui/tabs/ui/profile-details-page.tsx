import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../../../../../shared/components/shadcn/ui/card.tsx';

export function ProfileDetailsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Basic user information</CardDescription>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                    Profile tab content will be implemented here.
                </div>
            </CardContent>
        </Card>
    );
}
