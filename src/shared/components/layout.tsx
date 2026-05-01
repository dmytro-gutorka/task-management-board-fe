import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/components/header';
import { ToastContainer } from 'react-toastify';
import { useProfileCompletionReminder } from '../hooks/useProfileCompletionReminder.tsx';

export function Layout() {
    useProfileCompletionReminder();

    return (
        <div>
            <Header />
            <Outlet />
            <ToastContainer position="bottom-right" autoClose={5000} />
        </div>
    );
}
