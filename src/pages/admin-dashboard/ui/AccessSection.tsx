import type { ReactNode } from 'react';

export function AccessSection({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="space-y-2">
            <h2 className="text-sm font-medium">{title}</h2>
            <div className="flex flex-wrap gap-2">{children}</div>
        </section>
    );
}
