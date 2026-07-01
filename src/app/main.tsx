import 'leaflet/dist/leaflet.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.css';
import 'react-leaflet-cluster/dist/assets/MarkerCluster.Default.css';
import '../shared/infrastructure/i18n/i18n.ts';
import '../styles.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { env } from '../shared/infrastructure/env/env.ts';
import { AuthProvider } from '../shared/providers/auth-provider/auth.provider.tsx';
import { router } from './routes/routes.tsx';
import { ThemeProvider } from '@/shared/providers/theme-provider/theme-provider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GoogleOAuthProvider clientId={env.googleClientId}>
            <AuthProvider>
                <ThemeProvider defaultTheme="system">
                    <Toaster />
                    <RouterProvider router={router} />
                </ThemeProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    </StrictMode>,
);
