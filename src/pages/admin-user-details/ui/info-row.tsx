interface InfoRowProps {
    label: string;
    value: string;
}

export function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="text-right font-medium">{value}</span>
        </div>
    );
}
