import ResponsiveDialog from '@/components/ResponsiveDialog';
import { RoomFormData } from '@/types/rooms';
import { useForm } from 'react-hook-form';
import RoomForm from './RoomForm';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useCreateRoom } from './useCreateRoom';
import { useEffect } from 'react';
import SpinnerMini from '@/components/SpinnerMini';

type AddRoomDataModalProps = {
    open: boolean;
};

export default function AddRoomDataModal({ open }: AddRoomDataModalProps) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RoomFormData>({
        defaultValues: {
            room_name: '',
            num_tables: '',
        },
    });
    // Reset the form when the modal is closed
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    const { create, isPending } = useCreateRoom();
    const onSubmit = (data: RoomFormData) => {
        create(data, {
            onSuccess: () => {
                reset();
                navigate(location.pathname, { replace: true });
            },
        });
    };
    const handleCancel = () => {
        reset();
        navigate(location.pathname, { replace: true });
    };

    return (
        <ResponsiveDialog
            title='Agregar nueva sala'
            open={open}
            description='Agrega una nueva sala para el restaurante.'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <RoomForm errors={errors} register={register} />
                <div className='flex justify-end gap-4 mt-4'>
                    <Button
                        type='button'
                        variant={'secondary'}
                        onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button type='submit' variant={'principal'}>
                        {isPending ? <SpinnerMini /> : 'Guardar'}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
