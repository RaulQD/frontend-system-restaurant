import ResponsiveDialog from '@/components/ResponsiveDialog';
import { RoomFormData, Rooms } from '@/types/rooms';
import RoomForm from './RoomForm';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useUpdateRoom } from './useUpdateRoom';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from '@/components/SpinnerMini';

type EditRoomDataModalProps = {
    roomId: Rooms['id'];
    open: boolean;
    data: Rooms;
};

export default function EditRoomDataModal({
    roomId,
    open,
    data,
}: EditRoomDataModalProps) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RoomFormData>({
        defaultValues: {
            room_name: data.room_name,
            num_tables: data.num_tables,
        },
    });
    const { update, isPending } = useUpdateRoom();
    const onSubmit = (formData: RoomFormData) => {
        const data = {
            formData,
            roomId,
        };
        update(data, {
            onSuccess: () => {
                reset();
                navigate(location.pathname, { replace: true });
            },
        });
    };

    return (
        <ResponsiveDialog
            open={open}
            title='Editar sala'
            description='Modifica los datos de la sala seleccionada.'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <RoomForm register={register} errors={errors} />
                <div className='flex justify-end gap-4 mt-6'>
                    <Button type='button' variant='secondary'>
                        Cancelar
                    </Button>
                    <Button variant='principal'>
                        {isPending ? <SpinnerMini /> : 'Guardar'}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
