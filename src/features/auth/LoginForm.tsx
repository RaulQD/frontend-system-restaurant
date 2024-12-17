import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginDataForm } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import SpinnerMini from '@/components/SpinnerMini';

export default function LoginForm() {
    
    const initialValues: LoginDataForm = {
        username: '',
        password: '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: initialValues,
    });
    const { autentication, isPending } = useLogin();

    const onSubmit = (data: LoginDataForm) => {
        autentication(data, {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <>
            <div className='sm:mx-auto sm:w-full sm:max-w-lg'>
                <form
                    className='space-y-6'
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <div className='mt-2'>
                            <Input
                                type='text'
                                id='username'
                                autoComplete='off'
                                placeholder='usuario'
                                register={register('username', {
                                    required: 'El usuario es requerido.',
                                })}
                            />
                            {errors.username && (
                                <ErrorMessage>
                                    {errors.username.message}
                                </ErrorMessage>
                            )}
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center justify-start'>
                            <Label htmlFor='password'>Contraseña</Label>
                        </div>
                        <div className='mt-2'>
                            <Input
                                type='password'
                                id='password'
                                autoComplete='off'
                                placeholder='*********'
                                register={register('password', {
                                    required: 'La contraseña es requerida.',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'La contraseña debe tener al menos 8 caracteres',
                                    },
                                })}
                            />
                            {errors.password && (
                                <ErrorMessage>
                                    {errors.password.message}
                                </ErrorMessage>
                            )}
                        </div>
                        <div className='text-sm flex justify-between mt-4'>
                            <div className='flex items-center'>
                                <input
                                    type='checkbox'
                                    id='showPassword'
                                    className=' h-3 w-3 rounded transition duration-200'
                                />
                                <label
                                    htmlFor='showPassword'
                                    className='ml-2 text-sm'>
                                    Mostrar contraseñas
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            type='submit'
                            variant={'principal'}
                            disabled={isPending}
                            className='w-[400px] md:w-full text-base'
                            size={'lg'}>
                            {!isPending ? (
                                'Iniciar Sesión'
                            ) : (
                                <div className='flex items-center justify-center'>
                                    {' '}
                                    <SpinnerMini />
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
