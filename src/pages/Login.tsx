import { Separator } from '@/components/ui/separator';
import Logo from '../assets/logo-icon.svg';
import LoginForm from '@/features/auth/LoginForm';

export default function Login() {
    return (
        <div className='min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='bg-white rounded-lg w-full max-w-md sm:max-w-lg shadow-lg'>
                <div className='flex flex-col items-center gap-3 p-5'>
                    <img src={Logo} alt='logo' className='size-10' />
                    <span className='font-oleo text-3xl md:text-4xl text-teal-600'>
                        Foodie <span className='text-black'>Hub</span>
                    </span>
                </div>
                <Separator />
                <div className='flex flex-col justify-center p-5 sm:p-6 md:p-8'>
                    <div className='text-center font-poppins'>
                        <h2 className='text-lg sm:text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-4'>
                            ¡Bienvenido a Foodie Hub!
                        </h2>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
