import ResponsiveDialog from '@/components/ResponsiveDialog';
import { getDishById } from '@/services/apiDishes';
import { DishType } from '@/types/dish';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Handle } from 'vaul';

export default function EditDishData() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const dishId = queryParams.get('editDish');

    const { data } = useQuery({
        queryKey: ['dish', dishId],
        queryFn: () => getDishById(Number(dishId)),
        enabled: !!dishId,
    });
     const handleEditDish = (dishId: DishType['id']) => {
        navigate(`?editDish=${dishId}`);
        setIsOpen(true);
    };

    const handleClose = () => {
        navigate(location.pathname, { replace: true });
        setIsOpen(false);
    };
    console.log(data);
    if (data)
        return (
            <ResponsiveDialog
                title='Editar plato'
                isOpen={isOpen}
                setIsOpen={handleClose}
                description='Aquí puedes editar los datos del plato.'>
                {/* <EditDishForm data={dishEdit} /> */}
                <div>
                  hola
                </div>
            </ResponsiveDialog>
        );
}
