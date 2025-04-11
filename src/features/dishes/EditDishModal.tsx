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
        // AÑADIR LA IMAGEN SELECCIONADA
        if (selectedImage instanceof File) {
            formData.append('image', selectedImage);
        }

        const datadish = {
            dishId: dishId,
            formData: formData,
        };
        editDish(datadish, {
            onSuccess: () => {
                setSelectedImage(null);
                navigate(location.pathname, { replace: true });
                reset();
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file); // Guardamos el archivo directamente
        }
    };
    return (
        <ResponsiveDialog
            title='Editar plato'
            open={open}
            description='Aquí puedes editar los datos del plato.'
            size='md'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <EditDishForm
                    errors={errors}
                    register={register}
                    handleImageChange={handleImageChange}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                />
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
                        {isPending ? (
                            <div className='flex justify-center'>
                                <SpinnerMini />
                            </div>
                        ) : (
                            <>
                                <BiUpload className='mr-2' />
                                Guardar plato
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
