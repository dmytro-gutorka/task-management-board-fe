import type { ReactNode } from 'react';
import { AuthFormCard } from '../../../../shared/components/auth-form-card.tsx';

interface ResetPasswordCardLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function ResetPasswordCardLayout({
    title,
    description,
    children,
}: ResetPasswordCardLayoutProps) {
    return (
        <main className="flex min-h-svh items-center justify-center px-4">
            <AuthFormCard title={title} description={description}>
                {children}
            </AuthFormCard>
        </main>
    );
}
