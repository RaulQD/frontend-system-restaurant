import ResponsiveDialog from '@/components/ResponsiveDialog';
import { DishesFormData, DishType } from '@/types/dish';
import EditDishForm from './EditDishForm';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useUpdateDish } from './useUpdateDish';
import { Button } from '@/components/ui/button';
import { BiUpload } from 'react-icons/bi';
import SpinnerMini from '@/components/SpinnerMini';

type EditDishModalProps = {
    data: DishesFormData;
    dishId: DishType['id'];
    open: boolean;
};

export default function EditDishModal({
    data,
    dishId,
    open,
}: EditDishModalProps) {
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState<string | File | null>(
        typeof data.image_url === 'string' ? data.image_url : null
    );
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DishesFormData>({
        defaultValues: {
            dishes_name: data.dishes_name,
            dishes_description: data.dishes_description,
            available: data.available,
            price: data.price,
            category_name: data.category_name,
        },
    });
    const { editDish, isPending } = useUpdateDish();
    const onSubmit = (data: DishesFormData) => {
        const formData = new FormData();
        formData.append('dishes_name', data.dishes_name);
        formData.append('dishes_description', data.dishes_description);
        formData.append('price', data.price.toString());
        formData.append('category_name', data.category_name);
        formData.append('available', data.available);
        //AÑADIR LA IMAGEN SELECCIONADA
        // Añadir imagen al FormData
        if (selectedImage instanceof File) {
            // Si se seleccionó una nueva imagen
            formData.append('image_url', selectedImage);
        } else if (typeof selectedImage === 'string') {
            // Si se mantiene la imagen existente (URL)
            formData.append('existing_image_url', selectedImage);
        } else {
            console.error('No se ha seleccionado ninguna imagen');
            return;
        }

        const datadish = {
            dishId: dishId,
            formData: formData,
        };
        editDish(datadish, {
            onSuccess: () => {
                navigate(location.pathname, { replace: true });
                reset();
                setSelectedImage(null);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string); // Establecer la URL de datos
            };
            reader.readAsDataURL(file); // Leer el archivo como URL de datos
        }
    };
    return (
        <ResponsiveDialog
            title='Editar plato'
            open={open}
            description='Aquí puedes editar los datos del plato.'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <EditDishForm errors={errors} register={register} handleImageChange={handleImageChange} selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>
                <div className='flex items-center justify-end gap-2'>
                    <Button
                        type='button'
                        variant={'ghost'}
                        onClick={() => {
                            reset();
                            navigate(location.pathname, { replace: true });
                        }}>
                        Cancelar
                    </Button>
                    <Button variant={'principal'}>
                        <BiUpload className='mr-2' />
                        {isPending ? (
                            <div className='flex justify-center'>
                                <SpinnerMini />
                            </div>
                        ) : (
                            'Agregar plato'
                        )}
                    </Button>
                </div>
            </form>
            {/* <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <DishesForm register={register} errors={errors} handleImageChange={handleImageChange} selectedImage ={selectedImage} setSelectedImage={setSelectedImage}/>
                <div className='flex items-center justify-end gap-2'>
                    <Button
                        type='button'
                        variant={'ghost'}
                        onClick={() => {
                            reset();
                            navigate(location.pathname, { replace: true });
                        }}>
                        Cancelar
                    </Button>
                    <Button variant={'principal'}>
                        <BiUpload className='mr-2' />
                        {isPendingDishes ? (
                            <div className='flex justify-center'>
                                <SpinnerMini />
                            </div>
                        ) : (
                            'Agregar plato'
                        )}
                    </Button>
                </div>
            </form> */}
        </ResponsiveDialog>
    );
}
