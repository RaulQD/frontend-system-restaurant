import Logo from '../assets/logo-icon.svg';
import LoginForm from '@/features/auth/LoginForm';

export default function Login() {
    return (
        <>
            <div className='h-screen flex items-center justify-center py-20 lg:py-[90px] '>
                <div className='bg-white rounded-md w-[550px] mx-auto '>
                    <div className='flex justify-center items-center gap-2 p-5'>
                        <img src={Logo} alt='logo' className='size-9' />
                        <span className='font-oleo text-4xl text-teal-600 hidden lg:block'>
                            Foodie <span className='text-black'>Hub</span>
                        </span>
                    </div>
                    <div className='border-b-2'></div>
                    <div className='flex min-h-full flex-1 flex-col justify-center px-8 pt-5 pb-10'>
                        <div className='sm:mx-auto sm:w-full sm:max-w-sm text-center font-poppins'>
                            <h2 className=' mt-4 text-center text-base md:text-xl font-semibold leading-9 tracking-tight text-gray-900 mb-2'>
                                ¡Bienvenido a Foodie Hub!
                            </h2>

                        </div>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </>
    );
}
