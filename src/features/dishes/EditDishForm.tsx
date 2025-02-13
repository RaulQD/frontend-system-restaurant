import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCategories } from '@/services/apiCategory';
import { Category } from '@/types/category';
import { DishesFormData } from '@/types/dish';
import { Cross2Icon, UploadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type CategoryFormProps = {
    errors: FieldErrors<DishesFormData>;
    register: UseFormRegister<DishesFormData>;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: string | File | null
    setSelectedImage: React.Dispatch<React.SetStateAction<string | File | null>>
};
export default function EditDishForm({
    errors,
    register,
    handleImageChange,
    selectedImage,
    setSelectedImage,
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
                                    className='flex flex-col items-center justify-center h-40 cursor-pointer'>
                                    <UploadIcon className='w-10 h-10 text-muted-foreground mb-2' />
                                    <span>Click para subir la imagen</span>
                                </Label>
                                <Input
                                    type='file'
                                    id='image_url'
                                    className='hidden'
                                    accept="image/*" // 🔥 Asegura que solo acepte imágenes
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
                <div className='space-y-2'>
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
                    <Label htmlFor='available'>available</Label>
                    <select
                        id='available'
                        className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
                        {...register('available', {
                            required: 'Selecciona una opción.',
                        })}>
                        <option value='DISPONIBLE'>Disponible</option>
                        <option value='NO DISPONIBLE'>No Disponible</option>
                    </select>
                    {errors.available && (
                        <ErrorMessage>{errors.available.message}</ErrorMessage>
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
                            <option value=''>Selecciona una categoria</option>
                            {category?.map((cat) => (
                                <option key={cat.id} value={cat.category_name}>
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
        </>
    );
}
