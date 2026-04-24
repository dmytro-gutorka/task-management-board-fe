import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/components/Header';

export function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
