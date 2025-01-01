import ResponsiveDialog from '@/components/ResponsiveDialog';
import { DishesFormData, DishType } from '@/types/dish';
import EditDishForm from './EditDishForm';
import DishesForm from './DishesForm';

type EditDishModalProps = {
    data: DishesFormData;
    dishId: DishType['id'];
};

export default function EditDishModal({ data, dishId }: EditDishModalProps) {
    return (
        <ResponsiveDialog
            title='Editar plato'
            description='Aquí puedes editar los datos del plato.'>
            <EditDishForm data={data} dishId={dishId} />
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
