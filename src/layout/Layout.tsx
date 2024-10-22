import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, isLoading, isError } = useUser();

    console.log('isLoading', isLoading);
    console.log('isError', isError);
    console.log(user);
    return (
        <>
            <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className='flex overflow-hidden pt-16 h-screen'>
                <Sidebar
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                />
                {/* Backdrop para cerrar el sidebar en móvil */}
                {sidebarOpen && (
                    <div
                        className='bg-gray-900 opacity-50 fixed inset-0 z-10 lg:hidden'
                        onClick={() => setSidebarOpen(false)} // Cerrar el sidebar al hacer click fuera
                    />
                )}

                <div
                    className='bg-gray-900 opacity-50 hidden fixed inset-0 z-10'
                    id='sidebarBackdrop'></div>
                <div
                    id='main-content'
                    className={`flex-1 relative overflow-y-auto `}>
                    <main>
                        <div className='min-h-screen'>
                            <div className='p-6'>
                                <Outlet />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Toaster />
        </>
    );
}
