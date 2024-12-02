import { ErrorMessage } from '@/components/ErrorMessage';
import SpinnerMini from '@/components/SpinnerMini';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCategories } from '@/services/appCategory';
import { Category } from '@/types/category';
import { DishesFormData, DishType } from '@/types/dish';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiUpload } from 'react-icons/bi';

type EditDishProps = {
    data?: DishType;
};

export default function EditDishForm({ data }: EditDishProps) {
    const { data: category } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DishesFormData>({
        defaultValues: {
            dishes_name: data?.dishes_name,
            dishes_description: data?.dishes_description,
            price: data?.price,
            category_name: data?.category_name,
            // image_url: data.image_url,
        },
    });

    const onSubmit = () => {};

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // setSelectedImage(file?);
        }
    };

    return (
        <div className='p-4 lg:p-0'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-5 font-outfit'>
                    <div className='w-full col-span-3 row-span-2'>
                        <div className='border-2 border-dashed rounded-lg p-4 '>
                            {selectedImage ? (
                                <div className='relative'>
                                    <img
                                        src={selectedImage}
                                        alt='Imagen seleccionada'
                                        className='w-full h-auto rounded-lg'
                                    />
                                    {/* Opción para eliminar la imagen seleccionada */}
                                    <button
                                        type='button'
                                        className='mt-2 absolute top-2 right-2 bg-white rounded-full p-1'
                                        onClick={() => {
                                            setSelectedImage(null);
                                        }}>
                                        <Cross2Icon className='w-5 h-5' />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <Label
                                        htmlFor='image_url'
                                        className='flex flex-col items-center justify-center h-40 cursor-pointer'>
                                        <UploadIcon className='w-10 h-10 text-muted-foreground mb-2' />
                                        <span>Click para subir la imagen</span>
                                    </Label>
                                    <Input
                                        type='file'
                                        id='image_url'
                                        className='hidden'
                                        {...register('image_url', {
                                            required:
                                                'Sube una imagen del plato.',
                                            onChange: handleImageChange,
                                        })}
                                    />
                                </>
                            )}
                        </div>

                        {errors.image_url && (
                            <ErrorMessage>
                                {errors.image_url.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <div className='col-span-3'>
                        <Label htmlFor='dishes_name'>Nombre del plato</Label>
                        <Input
                            id='name'
                            className='mt-2'
                            type='text'
                            placeholder='Nombre del plato'
                            {...register('dishes_name', {
                                required: 'Ingresa el nombre del plato.',
                                minLength: {
                                    value: 5,
                                    message:
                                        'El nombre debe tener al menos 5 caracteres.',
                                },
                                maxLength: {
                                    value: 50,
                                    message:
                                        'El nombre debe tener menos de 50 caracteres.',
                                },
                            })}
                        />
                        {errors.dishes_name && (
                            <ErrorMessage>
                                {errors.dishes_name.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <div className='col-span-3'>
                        <Label htmlFor='dishes_description'>
                            Descripción del plato
                        </Label>
                        <Input
                            id='dishes_description'
                            className='mt-2'
                            type='text'
                            placeholder='Descripción del plato'
                            {...register('dishes_description', {
                                required: 'Ingresa la descripción del plato.',
                                minLength: {
                                    value: 5,
                                    message:
                                        'La descripción debe tener al menos 5 caracteres.',
                                },
                                maxLength: {
                                    value: 100,
                                    message:
                                        'La descripción debe tener menos de 100 caracteres.',
                                },
                            })}
                        />
                        {errors.dishes_description && (
                            <ErrorMessage>
                                {errors.dishes_description.message}
                            </ErrorMessage>
                        )}
                    </div>
                    <div className=''>
                        <Label htmlFor='price'>Precio</Label>
                        <Input
                            id='price'
                            type='number'
                            step='0.01'
                            className='mt-2'
                            placeholder='Precio'
                            {...register('price', {
                                required: 'Ingresa el precio.',
                                min: {
                                    value: 5.01,
                                    message:
                                        'El precio debe ser mayor a S/.5.00.',
                                },
                                valueAsNumber: true,
                            })}
                        />
                        <div className=''>{}</div>
                        {errors.price && (
                            <ErrorMessage>{errors.price.message}</ErrorMessage>
                        )}
                    </div>
                    <div className='space-y-2'>
                        <Label htmlFor='category_name'>Categoría</Label>
                        {category && (
                            <select
                                id='category_name'
                                className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                                {...register('category_name', {
                                    required: 'Selecciona una categoria.',
                                })}>
                                <option value=''>
                                    Selecciona una categoria
                                </option>
                                {category?.map((cat) => (
                                    <option
                                        key={cat.id}
                                        value={cat.category_name}>
                                        {cat.category_name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {errors.category_name && (
                            <ErrorMessage>
                                {errors.category_name.message}
                            </ErrorMessage>
                        )}
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <Button variant={'principal'}>
                        <BiUpload className='mr-2' />
                        Guardar plato
                    </Button>
                </div>
            </form>
        </div>
    );
}
