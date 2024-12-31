import ResponsiveDialog from '@/components/ResponsiveDialog';
import { getDishById } from '@/services/apiDishes';
import { useQuery } from '@tanstack/react-query';
import EditDishForm from './EditDishForm';
import { DishesFormData, DishType } from '@/types/dish';
import { useLocation } from 'react-router-dom';
import EditDishModal from './EditDishModal';

export default function EditDishData() {
    const locationg = useLocation();
    const queryParams = new URLSearchParams(locationg.search);
    const dishId = queryParams.get('editDish');

    const { data } = useQuery({
        queryKey: ['dishId', dishId],
        queryFn: () => getDishById(Number(dishId)),
        enabled: !!dishId,
    });

    if (data) return <EditDishModal data={data} dishId={Number(dishId)} />;
}
