import LogoIcon from '../assets/logo-icon.svg';
import { BiMenu, BiX } from 'react-icons/bi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { getAuthenticatedUser } from '@/services/apiAuth';

type NavbarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
    const { data, isLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getAuthenticatedUser,
        enabled: !!localStorage.getItem('token'), // Solo se ejecuta si hay un token
    });

    console.log(isLoading);
    console.log(data);
    return (
        <nav className='bg-white border-b border-gray-200 fixed z-30 w-full'>
            <div className='px-3 py-3 lg:px-5 lg:pl-3'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start'>
                        <button
                            id='toggleSidebarMobile'
                            aria-expanded='true'
                            aria-controls='sidebar'
                            className='lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded'
                            onClick={() => setSidebarOpen(!sidebarOpen)}>
                            {sidebarOpen ? (
                                <BiX className='w-5 h-5' />
                            ) : (
                                <BiMenu className='w-5 h-5' />
                            )}
                        </button>
                        <div className=' hidden lg:block'>
                            <div className='flex justify-center items-center gap-2'>
                                <img
                                    src={LogoIcon}
                                    alt='logo'
                                    className='size-8'
                                />
                                <p className='whitespace-nowrap font-oleo text-3xl text-teal-600 '>
                                    Foodie
                                    <span className='text-black'> Hub</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        {/* User Avatar */}
                        <div className='flex items-center justify-center gap-2'>
                            <Avatar>
                                <AvatarImage
                                    src='https://github.com/shadcn.png'
                                    alt='@shadcn'
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className='flex flex-col leading-5'>
                                <p className='font-medium '>Raul Quispe </p>
                                <span className='text-xs font-outfit text-gray-400'>
                                    Admin
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
