import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { getCategories } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { DishesFormData } from '@/types/dish';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { Dispatch } from 'react';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';

type CategoryFormProps = {
    errors: FieldErrors<DishesFormData>;
    register: UseFormRegister<DishesFormData>;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: string | File | null;
    setSelectedImage: Dispatch<React.SetStateAction<string | File | null>>;
    control: Control<DishesFormData, any>;
};
export default function EditDishForm({
    errors,
    register,
    handleImageChange,
    selectedImage,
    setSelectedImage,
    control,
}: CategoryFormProps) {
    const { data: category } = useQuery<Category[]>({
        queryKey: ['categories'],
        queryFn: getCategories,
    });

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-5 font-outfit'>
                <div className='w-full col-span-3 row-span-2'>
                    <div className='border-2 border-dashed rounded-lg p-4 '>
                        {selectedImage ? (
                            <div className='relative flex justify-center items-center'>
                                {typeof selectedImage === 'string' ? (
                                    <img
                                        src={selectedImage}
                                        alt='Imagen seleccionada'
                                        className='w-52 h-auto rounded-lg'
                                    />
                                ) : (
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt='Imagen seleccionada'
                                        className='w-52 h-auto rounded-lg'
                                    />
                                )}

                                {/* Opción para eliminar la imagen seleccionada */}
                                <button
                                    type='button'
                                    className='mt-2 absolute top-2 right-48 bg-white rounded-full p-1'
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
                                    className={`font-medium transition-colors ${
                                        errors.image_url
                                            ? 'text-red-500'
                                            : 'text-gray-600'
                                    } flex flex-col items-center justify-center h-40 cursor-pointer`}>
                                    <UploadIcon
                                        className={`transition-colors ${
                                            errors.image_url
                                                ? 'text-red-500'
                                                : 'text-gray-600'
                                        } w-10 h-10 text-muted-foreground mb-2`}
                                    />
                                    <span>Click para subir la imagen</span>
                                </Label>
                                <Input
                                    type='file'
                                    id='image_url'
                                    className='hidden'
                                    accept='image/*' // 🔥 Asegura que solo acepte imágenes
                                    onChange={handleImageChange} // 🔥 No uses register aquí
                                />
                            </>
                        )}
                    </div>

                    {errors.image_url && (
                        <ErrorMessage>{errors.image_url.message}</ErrorMessage>
                    )}
                </div>
                <div className='col-span-3'>
                    <Label
                        htmlFor='dishes_name'
                        className={`font-medium transition-colors ${
                            errors.dishes_name
                                ? 'text-red-500'
                                : 'text-gray-600'
                        }`}>
                        Nombre del plato
                    </Label>
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
                    <Label
                        htmlFor='dishes_description'
                        className={`font-medium transition-colors ${
                            errors.dishes_description
                                ? 'text-red-500'
                                : 'text-gray-600'
                        }`}>
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
                <div className='space-y-2'>
                    <Label
                        htmlFor='price'
                        className={`font-medium transition-colors ${
                            errors.price ? 'text-red-500' : 'text-gray-600'
                        }`}>
                        Precio
                    </Label>
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
                                message: 'El precio debe ser mayor a S/.4.99.',
                            },
                            valueAsNumber: true,
                        })}
                    />
                    {errors.price && (
                        <ErrorMessage>{errors.price.message}</ErrorMessage>
                    )}
                </div>
                <div className='space-y-2'>
                    <Label
                        htmlFor='available'
                        className={`font-medium transition-colors ${
                            errors.available ? 'text-red-500' : 'text-gray-600'
                        }`}>
                        Estado
                    </Label>
                    <Controller
                        name='available'
                        control={control}
                        rules={{ required: 'Selecciona una opción.' }}
                        render={({ field }) => (
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}>
                                <SelectTrigger className='w-[180px]'>
                                    <SelectValue placeholder='Selecciona una opción' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value='DISPONIBLE'>
                                        Disponible
                                    </SelectItem>
                                    <SelectItem value='NO DISPONIBLE'>
                                        No Disponible
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.available && (
                        <ErrorMessage>{errors.available.message}</ErrorMessage>
                    )}
                </div>
                <div className='space-y-2'>
                    <Label
                        htmlFor='category_name'
                        className={`font-medium transition-colors ${
                            errors.category_name
                                ? 'text-red-500'
                                : 'text-gray-600'
                        }`}>
                        Categoría
                    </Label>
                    {category && (
                        <Controller
                            name='category_name'
                            control={control}
                            rules={{ required: 'Selecciona una categoría.' }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <SelectTrigger className='w-[180px]'>
                                        <SelectValue placeholder='Selecciona una categoria' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {category?.map((cat) => (
                                            <SelectItem
                                                key={cat.id}
                                                value={cat.category_name}>
                                                {cat.category_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    )}

                    {errors.category_name && (
                        <ErrorMessage>
                            {errors.category_name.message}
                        </ErrorMessage>
                    )}
                </div>
            </div>
        </>
    );
}
