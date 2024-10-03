import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authenticatedUser } from '@/services/apiAuth';
import { LoginDatForm } from '@/types/auth';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

export default function LoginForm() {
    const initialValues: LoginDatForm = {
        username: '',
        password: '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });
    const { mutate } = useMutation({
        mutationFn: authenticatedUser,
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
        },
    });

    const onSubmit = (data: LoginDatForm) => {
        mutate(data);
        console.log(data);
        console.log('232');
    };

    return (
        <>
            <div className='sm:mx-auto sm:w-full sm:max-w-lg'>
                <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <Label htmlFor='email'>Email</Label>
                        <div className='mt-2'>
                            <Input
                                type='text'
                                id='username'
                                autoComplete='off'
                                placeholder='usuario'
                                register={register('username', {
                                    required: 'El usuario es requerido',
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
                                    required: 'La contraseña es requerida',
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
                            className='w-[400px] lg:w-full text-base'
                            size={'lg'}>
                            Iniciar Sesión
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
