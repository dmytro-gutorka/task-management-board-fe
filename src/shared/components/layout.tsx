import { Outlet } from 'react-router';
import { Header } from '@/shared/components/header';

export function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
