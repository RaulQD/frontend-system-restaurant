import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginDataForm } from '@/types/auth';
import { useForm } from 'react-hook-form';
import { useLogin } from './useLogin';
import SpinnerMini from '@/components/SpinnerMini';
import { useState } from 'react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const initialValues: LoginDataForm = {
        username: '',
        password: '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
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
        <div className='w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto'>
            <form
                className='space-y-6'
                onSubmit={handleSubmit(onSubmit)}
                noValidate>
                <div>
                    <Label htmlFor='username'>Usuario</Label>
                    <div className='mt-2'>
                        <Input
                            type='text'
                            id='username'
                            autoComplete='off'
                            placeholder='Usuario'
                            {...register('username', {
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
                    <Label htmlFor='password'>Contraseña</Label>
                    <div className='mt-2'>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            
                            autoComplete='off'
                            placeholder='*********'
                            {...register('password', {
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
                                className='h-4 w-4 rounded transition duration-200'
                                onChange={() => setShowPassword(!showPassword)}
                            />
                            <label
                                htmlFor='showPassword'
                                className='ml-2 text-sm'>
                                Mostrar contraseña
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <Button
                        type='submit'
                        variant='principal'
                        disabled={isPending}
                        className='w-full text-base'
                        size='lg'>
                        {!isPending ? 'Iniciar Sesión' : <SpinnerMini />}
                    </Button>
                </div>
            </form>
        </div>
    );
}
