import '../shared/infrastructure/i18n/i18n.ts';
import '../styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './query-client/quety-client.ts';
import { Toaster } from 'sonner';
import { AuthProvider } from '../shared/providers/auth-provider/auth.provider.tsx';
import { router } from './routes/routes.tsx';
import { ThemeProvider } from '@/shared/providers/theme-provider/theme-provider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider defaultTheme="system">
                    <Toaster />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
);
