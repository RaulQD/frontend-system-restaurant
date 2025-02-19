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
import { useQuery } from '@tanstack/react-query';
import { getRoles } from '@/services/apiRol';
import { Rol } from '@/types/rols';

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
    const { data: roles } = useQuery<Rol[]>({
        queryKey: ['roles'],
        queryFn: getRoles,
    });

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
            formData.append('image', data.profile_picture_url[0]);
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
        navigate('/dashboard/employees');
    };
    return (
        <>
            <div className=''>
                <Separator className='my-4' />
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='font-outfit mb-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='grid grid-cols-1 gap-4'>
                            <div className='bg-white p-4 shadow-md rounded-md '>
                                <h2 className=' text-lg text-slate-600 font-semibold mb-2'>
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
                                                className={`font-medium transition-colors ${
                                                    errors.profile_picture_url
                                                        ? 'text-red-500'
                                                        : 'text-gray-600'
                                                } flex flex-col items-center justify-center h-40 cursor-pointer`}>
                                                <UploadIcon
                                                    className={`font-medium transition-colors ${
                                                        errors.profile_picture_url
                                                            ? 'text-red-500'
                                                            : 'text-gray-600'
                                                    }w-10 h-10 text-muted-foreground mb-2
                                                `}
                                                />
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
                                <h2 className='text-lg text-slate-600 font-semibold mb-2'>
                                    Detalle de trabajo
                                </h2>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8'>
                                    <div>
                                        <Label
                                            id='salary'
                                            htmlFor='salary'
                                            className={`font-medium transition-colors ${
                                                errors.salary
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Sueldo
                                        </Label>
                                        <Input
                                            type='text'
                                            id='salary'
                                            placeholder='0.00'
                                            className='mt-2'
                                            {...register('salary', {
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
                                            className={`font-medium transition-colors ${
                                                errors.hire_date
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Fecha de contratación
                                        </Label>
                                        <Input
                                            type='date'
                                            id='hire_date'
                                            placeholder='Fecha de contratación'
                                            className='mt-2'
                                            {...register('hire_date', {
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
                                            className={`font-medium transition-colors ${
                                                errors.role_name
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Cargo
                                        </Label>
                                        <select
                                            id='role_name'
                                            className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 mt-2'
                                            {...register('role_name', {
                                                required: 'Selecciona una rol.',
                                            })}>
                                            <option value=''>
                                                Selecciona un rol
                                            </option>
                                            {roles?.map((role) => (
                                                <option
                                                    key={role.id_rol}
                                                    value={role.role_name}>
                                                    {role.role_name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.role_name && (
                                            <ErrorMessage>
                                                {errors.role_name.message}
                                            </ErrorMessage>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='font-outfit bg-white shadow-md rounded-md p-4'>
                                <h2 className=' text-lg text-slate-600 font-semibold'>
                                    Usuarios y contraseña
                                </h2>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-8'>
                                    <div>
                                        <Label
                                            id='username'
                                            htmlFor='username'
                                            className={`font-medium transition-colors ${
                                                errors.username
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Usuario del empleado
                                        </Label>
                                        <Input
                                            type='text'
                                            id='username'
                                            placeholder='usuario'
                                            className='mt-2'
                                            {...register('username', {
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
                                            className={`font-medium transition-colors ${
                                                errors.password
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Contraseña
                                        </Label>
                                        <Input
                                            type='password'
                                            id='password'
                                            placeholder='**********'
                                            className='mt-2'
                                            {...register('password', {
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
                                            className={`font-medium transition-colors ${
                                                errors.names
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Nombre del plato
                                        </Label>
                                        <Input
                                            type='text'
                                            id='names'
                                            placeholder='Nombre'
                                            className='mt-2 '
                                            {...register('names', {
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
                                            className={`font-medium transition-colors ${
                                                errors.last_name
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Apellidos
                                        </Label>
                                        <Input
                                            type='text'
                                            id='last_name'
                                            placeholder='Apellidos'
                                            className='mt-2'
                                            {...register('last_name', {
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
                                            className={`font-medium transition-colors ${
                                                errors.dni
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            N° de documento
                                        </Label>
                                        <Input
                                            type='text'
                                            id='dni'
                                            placeholder='ej. 00000000'
                                            className='mt-2'
                                            {...register('dni', {
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
                                            className={`font-medium transition-colors ${
                                                errors.email
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Correo electrónico
                                        </Label>
                                        <Input
                                            type='email'
                                            id='email'
                                            placeholder='ejemplo@ejemplo.com'
                                            className='mt-2'
                                            {...register('email', {
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
                                            className={`font-medium transition-colors ${
                                                errors.phone
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Contacto
                                        </Label>
                                        <Input
                                            type='text'
                                            id='phone'
                                            placeholder='ej. 999999999'
                                            className='mt-2'
                                            {...register('phone', {
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
                                            className={`font-medium transition-colors ${
                                                errors.address
                                                    ? 'text-red-500'
                                                    : 'text-gray-600'
                                            } `}>
                                            Dirección
                                        </Label>
                                        <Input
                                            type='text'
                                            id='address'
                                            placeholder='dirección'
                                            className='mt-2'
                                            {...register('address', {
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
        </>
    );
}
