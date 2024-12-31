import { DishesFormData } from '@/types/dish';
import { useForm } from 'react-hook-form';
import { BiUpload } from 'react-icons/bi';
import { useAddDishes } from './useAddDishes';
import DishesForm from './DishesForm';
import SpinnerMini from '@/components/SpinnerMini';
import ResponsiveDialog from '@/components/ResponsiveDialog';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

type AddDishesProps = { 
    open: boolean;
}

export default function AddDishes({ open }: AddDishesProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<DishesFormData>();
    const { addDish, isPendingDishes } = useAddDishes();

    const onSubmit = (data: DishesFormData) => {
        const formData = new FormData();
        formData.append('dishes_name', data.dishes_name);
        formData.append('dishes_description', data.dishes_description);
        formData.append('price', data.price.toString());
        formData.append('category_name', data.category_name);

        //AÑADIR LA IMAGEN SELECCIONADA
        if (data.image_url && data.image_url[0]) {
            formData.append('image_url', data.image_url[0]);
        } else {
            console.error('No se ha seleccionado ninguna imagen');
            return;
        }
        console.log(data.image_url);
        addDish(formData, {
            onSuccess: () => {
                reset();
                setSelectedImage(null);
                navigate(location.pathname, { replace: true });
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

    return (
        <ResponsiveDialog
            title='Agregar plato'
            open={open}
            description='Agrega un plato al menú de tu restaurante'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
            </form>
        </ResponsiveDialog>
    );
}
