interface EmptyCardProps {
    message: string;
}

export function EmptyCard({ message }: EmptyCardProps) {
    return (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            {message}
        </div>
    );
}
