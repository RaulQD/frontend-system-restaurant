import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Separator } from '@/components/ui/separator';
import { registerUser } from '@/services/apiAuth';
import { EmployeeFormData } from '@/types/employee';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function EmployeeForm() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const initialValue: EmployeeFormData = {
        names: '',
        last_name: '',
        dni: '',
        email: '',
        phone: '',
        address: '',
        salary: undefined,
        hire_date: undefined,
        role_name: '',
        username: '',
        password: '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({ defaultValues: initialValue });
    const { mutate } = useMutation({
        mutationFn: registerUser,
        onError(error) {
            toast.error(error.message);
        },
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['employees'] });
            toast.success(data.message);
            reset();
        },
    });

    const onSubmit = (data: EmployeeFormData) => {
        mutate(data);
        navigate('/admin/dashboard/personal');
    };
    return (
        <div className='w-3/4'>
            <div className=''>
                <div className=''>
                    <h1 className='font-outfit text-xl font-medium'>
                        Información del Empleado
                    </h1>
                </div>
                <Separator className='my-4' />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='font-outfit mb-4 '>
                        <h2 className=' text-lg text-slate-600 font-normal'>
                            Datos Personales
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 mt-5'>
                            <div className=''>
                                <Label
                                    id='names'
                                    htmlFor='names'
                                    className='text-slate-500 font-normal'>
                                    Nombre
                                </Label>
                                <Input
                                    type='text'
                                    id='names'
                                    name='names'
                                    placeholder='Nombre'
                                    className='mt-2 '
                                    register={register('names', {
                                        required:
                                            'El nombre del empleado es requerido.',
                                        minLength: {
                                            value: 3,
                                            message:
                                                'El nombre debe tener al menos 3 caracteres',
                                        },
                                    })}
                                />
                                {errors.names && (
                                    <ErrorMessage>
                                        {errors.names.message}
                                    </ErrorMessage>
                                )}
                            </div>

                            <div>
                                <Label
                                    id='last_name'
                                    htmlFor='last_name'
                                    className='text-slate-500 font-normal'>
                                    Apellidos
                                </Label>
                                <Input
                                    type='text'
                                    id='last_name'
                                    placeholder='Apellidos'
                                    className='mt-2'
                                    register={register('last_name', {
                                        required:
                                            'El apellido del empleado es requerido.',
                                        minLength: {
                                            value: 3,
                                            message:
                                                'El apellido debe tener al menos 3 caracteres',
                                        },
                                    })}
                                />
                                {errors.last_name && (
                                    <ErrorMessage>
                                        {errors.last_name.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Label
                                    id='dni'
                                    htmlFor='dni'
                                    className='text-slate-500 font-normal'>
                                    N° de documento
                                </Label>
                                <Input
                                    type='text'
                                    id='dni'
                                    placeholder='ej. 00000000'
                                    className='mt-2'
                                    register={register('dni', {
                                        required:
                                            'El DNI del empleado es requerido.',
                                        minLength: {
                                            value: 8,
                                            message:
                                                'El DNI debe tener al menos 8 caracteres',
                                        },
                                    })}
                                />
                                {errors.dni && (
                                    <ErrorMessage>
                                        {errors.dni.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Label
                                    id='email'
                                    htmlFor='email'
                                    className='text-slate-500 font-normal'>
                                    Correo electrónico
                                </Label>
                                <Input
                                    type='email'
                                    id='email'
                                    placeholder='ejemplo@ejemplo.com'
                                    className='mt-2'
                                    register={register('email', {
                                        required:
                                            'Ingrese el correo electrónico',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                                            message:
                                                'Correo electronico inválido',
                                        },
                                    })}
                                />
                                {errors.email && (
                                    <ErrorMessage>
                                        {errors.email.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Label
                                    id='phone'
                                    htmlFor='phone'
                                    className='text-slate-500 font-normal'>
                                    Contacto
                                </Label>
                                <Input
                                    type='text'
                                    id='phone'
                                    placeholder='ej. 999999999'
                                    className='mt-2'
                                    register={register('phone', {
                                        required:
                                            'Ingrese el teléfono del empleado.',
                                        pattern: {
                                            value: /^[0-9]{9}$/,
                                            message: 'El teléfono es inválido',
                                        },
                                        minLength: {
                                            value: 9,
                                            message:
                                                'El teléfono debe tener al menos 9 caracteres',
                                        },
                                    })}
                                />
                                {errors.phone && (
                                    <ErrorMessage>
                                        {errors.phone.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Label
                                    id='address'
                                    htmlFor='address'
                                    className='text-slate-500 font-normal'>
                                    Dirección
                                </Label>
                                <Input
                                    type='text'
                                    id='address'
                                    placeholder='dirección'
                                    className='mt-2'
                                    register={register('address', {
                                        required:
                                            'Ingresa la direcciòn del empleado.',
                                        minLength: {
                                            value: 3,
                                            message:
                                                'La dirección debe tener al menos 3 caracteres',
                                        },
                                    })}
                                />
                                {errors.address && (
                                    <ErrorMessage>
                                        {errors.address.message}
                                    </ErrorMessage>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='font-outfit border border-gray-300 p-4 mb-4'>
                        <h2 className=' text-lg text-slate-600 font-normal'>
                            Detalle de trabajo
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-y-4 gap-x-8'>
                            <div>
                                <Label
                                    id='salary'
                                    htmlFor='salary'
                                    className='text-slate-500 font-normal'>
                                    Sueldo
                                </Label>
                                <Input
                                    type='text'
                                    id='salary'
                                    placeholder='00.00'
                                    className='mt-2'
                                    register={register('salary', {
                                        required:
                                            'Ingrese el sueldo del empleado.',
                                        pattern: {
                                            value: /^[0-9]*$/,
                                            message: 'Número inválido',
                                        },
                                    })}
                                />
                                {errors.salary && (
                                    <ErrorMessage>
                                        {errors.salary.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div className='flex flex-col space-y-4'>
                                <Label
                                    id='hire_date'
                                    htmlFor='hire_date'
                                    className='text-slate-500 font-normal'>
                                    Fecha de contratación
                                </Label>
                                <Input
                                    type='date'
                                    id='hire_date'
                                    placeholder='Fecha de contratación'
                                    register={register('hire_date', {
                                        required:
                                            'Ingrese la fecha de contratación del empleado.',
                                    })}
                                />
                                {/* <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={'outline'}
                                            className={cn(
                                                'justify-start text-left font-normal',
                                                !date && 'text-muted-foreground'
                                            )}>
                                            {date
                                                ? format(date, 'PPP')
                                                : 'Selecciona una fecha'}
                                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className='w-auto p-0'
                                        align='start'>
                                        <Calendar
                                            mode='single'
                                            selected={date}
                                            onSelect={setDate}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>*/}
                                {errors.hire_date && (
                                    <ErrorMessage>
                                        {errors.hire_date.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Label
                                    id='role_name'
                                    htmlFor='role_name'
                                    className='text-slate-500 font-normal'>
                                    Cargo
                                </Label>
                                <Input
                                    type='text'
                                    id='role_name'
                                    placeholder='Cargo'
                                    className='mt-2'
                                    register={register('role_name', {
                                        required:
                                            'Ingresa la posiciòn del empleado.',
                                        minLength: {
                                            value: 3,
                                            message:
                                                'El cargo debe tener al menos 3 caracteres',
                                        },
                                    })}
                                />
                                {errors.role_name && (
                                    <ErrorMessage>
                                        {errors.role_name.message}
                                    </ErrorMessage>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='font-outfit border border-gray-300 p-4 mb-4'>
                        <h2 className=' text-lg text-slate-600 font-normal'>
                            Usuarios y contraseña
                        </h2>
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8'>
                            <div>
                                <Label
                                    id='username'
                                    htmlFor='username'
                                    className='text-slate-500 font-normal'>
                                    Usuario del empleado
                                </Label>
                                <Input
                                    type='text'
                                    id='username'
                                    placeholder='usuario'
                                    className='mt-2'
                                    register={register('username', {
                                        required:
                                            'Ingresa el usuario del empleado.',
                                        minLength: {
                                            value: 3,
                                            message:
                                                'El usuario debe tener al menos 3 caracteres',
                                        },
                                    })}
                                />
                                {errors.username && (
                                    <ErrorMessage>
                                        {errors.username.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div>
                                <Label
                                    id='password'
                                    htmlFor='password'
                                    className='text-slate-500 font-normal'>
                                    Contraseña
                                </Label>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='**********'
                                    className='mt-2'
                                    register={register('password', {
                                        required:
                                            'Ingresa la contraseña del empleado.',
                                        minLength: {
                                            value: 6,
                                            message:
                                                'La contraseña debe tener al menos 6 caracteres',
                                        },
                                    })}
                                />
                                {errors.password && (
                                    <ErrorMessage>
                                        {errors.password.message}
                                    </ErrorMessage>
                                )}
                                <Input
                                    type='checkbox'
                                    onChange={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <Button variant={'outline'}>Cancelar</Button>
                        <Button type='submit' variant={'principal'}>
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
