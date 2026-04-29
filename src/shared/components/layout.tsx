import { Outlet } from 'react-router-dom';
import { Header } from '@/shared/components/header';

export function Layout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}
