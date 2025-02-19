import ResponsiveDialog from '@/components/ResponsiveDialog';
import { TableFormData, Tables } from '@/types/tables';
import TableForm from './TableForm';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import SpinnerMini from '@/components/SpinnerMini';
import { useEffect } from 'react';
import { useUpdateTable } from './useUpdateTable';

type TableDataModalProps = {
    open: boolean;
    data: Tables;
    tableId: Tables['id_table'];
};

export default function EditTabledataModal({
    open,
    data,
    tableId,
}: TableDataModalProps) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TableFormData>({
        defaultValues: {
            num_table: data.num_table,
            capacity_table: data.capacity_table,
            room_id: data.room.id,
        },
    });
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);
    const { update, isPending } = useUpdateTable();

    const onSubmit = (formData: TableFormData) => {
        if (!open) return; // Evita que se ejecute si el modal se cerró
        const data = {
            formData,
            tableId,
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
            title='Editar mesa'
            description='Ingresa los datos de la mesa'
            open={open}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TableForm register={register} errors={errors} />

                <div className='flex justify-end gap-4 mt-4'>
                    <Button
                        type='button'
                        variant={'secondary'}
                        onClick={() =>
                            navigate(location.pathname, { replace: true })
                        }>
                        Cancelar
                    </Button>
                    <Button variant={'principal'} disabled={isPending}>
                        {isPending ? <SpinnerMini /> : 'Guardar'}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
