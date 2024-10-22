import LogoIcon from '../assets/logo-icon.svg';
import { BiMenu, BiX } from 'react-icons/bi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { useUser } from '@/hooks/useUser';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

type NavbarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Navbar({ sidebarOpen, setSidebarOpen }: NavbarProps) {
    const { user } = useUser();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const fullName = user?.full_name;
    const nameParts = fullName?.split(' ');
    const firstName = nameParts?.[0] || '';
    const lastName = nameParts?.[2] || '';
    const concatName = `${firstName} ${lastName}`;
    // Obtener las iniciales del nombre y apellido
    const initials = `${firstName[0]}${lastName[0]}`;

    const handleLogout = () => {
        // Lógica para cerrar sesión
        localStorage.removeItem('AUTHENTICATION');
        queryClient.clear();
        navigate('/auth/login');
    };

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
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className='flex items-start justify-center gap-2 cursor-pointer'>
                                        <Avatar>
                                            <AvatarImage
                                                src={user?.profile_picture_url}
                                                alt='Foto de perfil'
                                                className='cursor-pointer'
                                            />
                                            <AvatarFallback className='bg-teal-600 text-white font-medium'>
                                                {initials}	
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex flex-col items-start justify-center'>
                                            <span className='text-sm font-medium'>
                                               {concatName}
                                            </span>
                                            <span className='text-xs text-gray-500'>
                                                {user?.role.name}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end'>
                                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleLogout}>
                                        Cerrar Sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/*<div className='flex flex-col leading-5'>
                                <p className='font-medium '>Raul Quispe </p>
                                <span className='text-xs font-outfit text-gray-400'>
                                    Admin
                                </span>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
