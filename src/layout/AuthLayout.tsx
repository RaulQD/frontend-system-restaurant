import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <>
            <div className='bg-[#F6F5FB] min-h-screen'>
                <Outlet />
            </div>
        </>
    );
}
