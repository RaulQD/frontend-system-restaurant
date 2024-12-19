import ResponsiveDialog from '@/components/ResponsiveDialog';
import { getDishById } from '@/services/apiDishes';
import { useQuery } from '@tanstack/react-query';
import EditDishForm from './EditDishForm';
import { DishType } from '@/types/dish';

type EditDishDataProps = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    dishId: DishType['id'];
};

export default function EditDishData({
    isOpen,
    setIsOpen,
    dishId,
}: EditDishDataProps) {
    
    const { data } = useQuery({
        queryKey: ['dish', dishId],
        queryFn: () => getDishById(Number(dishId)),
        enabled: !!dishId,
    });

    if (data)
        return (
            <ResponsiveDialog
                title='Editar plato'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                description='Aquí puedes editar los datos del plato.'>
                <EditDishForm data={data} dishId={dishId} setIsOpen ={setIsOpen} />
            </ResponsiveDialog>
        );
}
