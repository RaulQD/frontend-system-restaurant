import Logo from '../assets/logo-icon.svg';
import LoginForm from '@/features/auth/LoginForm';

export default function Login() {
    return (
        <div className='h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8'>
            <div className='bg-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-lg'>
                <div className='flex flex-col items-center gap-2 p-5'>
                    <img src={Logo} alt='logo' className='size-9' />
                    <span className='font-oleo text-3xl md:text-4xl text-teal-600'>
                        Foodie <span className='text-black'>Hub</span>
                    </span>
                </div>
                <div className='border-b'></div>
                <div className='flex flex-col justify-center px-6 sm:px-10 pt-5 pb-10'>
                    <div className='text-center font-poppins'>
                        <h2 className='text-lg md:text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-4'>
                            ¡Bienvenido a Foodie Hub!
                        </h2>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}
