import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Separator } from '@/components/ui/separator';
import { EmployeeFormData } from '@/types/employee';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useCreateEmployee } from './useCreateEmployee';

type EmployeeFormProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EmployeeForm() {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<EmployeeFormData>();
    const { createEmployee } = useCreateEmployee();
    const onSubmit = (data: EmployeeFormData) => {
        const formData = new FormData();
        formData.append('names', data.names);
        formData.append('last_name', data.last_name);
        formData.append('dni', data.dni);
        formData.append('email', data.email);
        formData.append('phone', data.phone);
        formData.append('address', data.address);
        formData.append('salary', data.salary!.toString());
        formData.append('hire_date', data.hire_date!.toString());
        formData.append('role_name', data.role_name);

        if (data.profile_picture_url && data.profile_picture_url[0]) {
            formData.append('profile_picture_url', data.profile_picture_url[0]);
        } else {
            console.error('No se ha seleccionado ninguna imagen');
            return;
        }
        formData.append('username', data.username);
        formData.append('password', data.password);

        createEmployee(formData, {
            onSuccess: () => {
                reset();
            },
        });
    };

    //Función para manejar el cambio de la imagen seleccionada y mostrarla en la vista previa
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Acceder al primer archivo del FileList
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string); // Establecer la URL de datos
            };
            reader.readAsDataURL(file); // Leer el archivo como URL de datos
        }
    };
    const redirectToEmployees = () => {
        navigate('/admin/dashboard/personal');
    };
    return (
        <>
            <div className=''>
                <Separator className='my-4' />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='font-outfit mb-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='grid grid-cols-1 gap-4'>
                            <div className='bg-white p-4 shadow-md rounded-md '>
                                <h2 className=' text-lg text-slate-600 font-medium mb-2'>
                                    Foto de perfil
                                </h2>
                                <div className='border-2 border-dashed rounded-lg p-8 '>
                                    {selectedImage ? (
                                        <div className='relative'>
                                            <div className='flex items-center justify-center'>
                                                <img
                                                    src={selectedImage}
                                                    alt='Imagen seleccionada'
                                                    className='w-52 h-52 rounded-lg'
                                                />
                                            </div>
                                            <button
                                                type='button'
                                                className='mt-2 absolute top-2 right-2'
                                                onClick={() =>
                                                    setSelectedImage(null)
                                                }>
                                                <Cross2Icon className='w-5 h-5' />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Label
                                                htmlFor='image_url'
                                                className='flex flex-col items-center justify-center cursor-pointer h-full'>
                                                <UploadIcon className='w-10 h-10 text-muted-foreground mb-2' />
                                                <span>
                                                    Click para subir la imagen
                                                </span>
                                            </Label>
                                            <Input
                                                type='file'
                                                id='image_url'
                                                className='hidden'
                                                {...register(
                                                    'profile_picture_url',
                                                    {
                                                        required:
                                                            'Sube una imagen del plato.',
                                                        onChange:
                                                            handleImageChange,
                                                    }
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                                {errors.profile_picture_url && (
                                    <ErrorMessage>
                                        {errors.profile_picture_url.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div className='font-outfit bg-white p-4 shadow-md rounded-md '>
                                <h2 className=' text-lg text-slate-600 font-medium mb-2'>
                                    Detalle de trabajo
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8'>
                                    <div>
                                        <Label
                                            id='salary'
                                            htmlFor='salary'
                                            className='text-slate-600 font-normal'>
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
                                    <div className=''>
                                        <Label
                                            id='hire_date'
                                            htmlFor='hire_date'
                                            className='text-slate-600 font-normal'>
                                            Fecha de contratación
                                        </Label>
                                        <Input
                                            type='date'
                                            id='hire_date'
                                            placeholder='Fecha de contratación'
                                            className='mt-2'
                                            register={register('hire_date', {
                                                required:
                                                    'Ingrese la fecha de contrato del empleado.',
                                            })}
                                        />
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
                                            className='text-slate-600 font-normal'>
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
                            <div className='font-outfit bg-white shadow-md rounded-md p-4'>
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
                                            type='password'
                                            placeholder='**********'
                                            id='password'
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='bg-white p-4 shadow-md rounded-md '>
                                <h2 className=' text-lg text-slate-600 font-medium mb-2'>
                                    Datos Personales
                                </h2>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='col-span-2'>
                                        <Label
                                            id='names'
                                            htmlFor='names'
                                            className='text-slate-600 font-normal'>
                                            Nombre del plato
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
                                    <div className='col-span-2 md:col-auto'>
                                        <Label
                                            id='last_name'
                                            htmlFor='last_name'
                                            className='text-slate-600 font-normal'>
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
                                    <div className='col-span-2 md:col-auto'>
                                        <Label
                                            id='dni'
                                            htmlFor='dni'
                                            className='text-slate-600 font-normal'>
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
                                                maxLength: {
                                                    value: 8,
                                                    message:
                                                        'El DNI debe tener máximo 8 caracteres',
                                                }
                                            })}
                                        />
                                        {errors.dni && (
                                            <ErrorMessage>
                                                {errors.dni.message}
                                            </ErrorMessage>
                                        )}
                                    </div>
                                    <div className='col-span-2 md:col-auto'>
                                        <Label
                                            id='email'
                                            htmlFor='email'
                                            className='text-slate-600 font-normal'>
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
                                    <div className='col-span-2 md:col-auto'>
                                        <Label
                                            id='phone'
                                            htmlFor='phone'
                                            className='text-slate-600 font-normal'>
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
                                                    message:
                                                        'El teléfono es inválido',
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
                                    <div className='col-span-2 '>
                                        <Label
                                            id='address'
                                            htmlFor='address'
                                            className='text-slate-600 font-normal'>
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
                            <div className='flex items-center justify-end gap-4 mt-4'>
                                <Button
                                    variant={'outline'}
                                    onClick={redirectToEmployees}>
                                    Cancelar
                                </Button>
                                <Button type='submit' variant={'principal'}>
                                    Guardar
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {/* <div className='w-full lg:w-3/4'>
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
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mt-5'>
                            <div className='col-span-2'>
                                <div className='border-2 border-dashed rounded-lg p-8 '>
                                    {selectedImage ? (
                                        <div className='relative'>
                                            <img
                                                src={selectedImage}
                                                alt='Imagen seleccionada'
                                                className='w-full h-auto rounded-lg'
                                            />
                                            <button
                                                type='button'
                                                className='mt-2 absolute top-2 right-2 bg-white rounded-full p-1'
                                                onClick={() =>
                                                    setSelectedImage(null)
                                                }>
                                                <Cross2Icon className='w-5 h-5' />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <Label
                                                htmlFor='image_url'
                                                className='flex flex-col items-center justify-center h-40 cursor-pointer'>
                                                <UploadIcon className='w-10 h-10 text-muted-foreground mb-2' />
                                                <span>
                                                    Click para subir la imagen
                                                </span>
                                            </Label>
                                            <Input
                                                type='file'
                                                id='image_url'
                                                className='hidden'
                                                {...register(
                                                    'profile_picture_url',
                                                    {
                                                        required:
                                                            'Sube una imagen del plato.',
                                                        onChange:
                                                            handleImageChange,
                                                    }
                                                )}
                                            />
                                        </>
                                    )}
                                </div>
                                {errors.profile_picture_url && (
                                    <ErrorMessage>
                                        {errors.profile_picture_url.message}
                                    </ErrorMessage>
                                )}
                            </div>
                            <div className='col-span-2 md:col-auto'>
                                <Label
                                    id='names'
                                    htmlFor='names'
                                    className='text-slate-600 font-normal'>
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

                            <div className='col-span-2 md:col-auto'>
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
                            <div className='col-span-2 md:col-auto'>
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
                            <div className='col-span-2 md:col-auto'>
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
                            <div className='col-span-2 md:col-auto'>
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
                            <div className='col-span-2 md:col-auto'>
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
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8'>
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
                            <div className=''>
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
                                    className='mt-2'
                                    register={register('hire_date', {
                                        required:
                                            'Ingrese la fecha de contrato del empleado.',
                                    })}
                                />
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
                                    type='password'
                                    placeholder='**********'
                                    id='password'
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
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-end gap-4'>
                        <Button
                            variant={'outline'}
                            onClick={redirectToEmployees}>
                            Cancelar
                        </Button>
                        <Button type='submit' variant={'principal'}>
                            Guardar
                        </Button>
                    </div>
                </form>
            </div> */}
        </>
    );
}
