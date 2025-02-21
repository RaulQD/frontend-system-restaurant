import ResponsiveDialog from '@/components/ResponsiveDialog';
import TableForm from './TableForm';
import { TableFormData } from '@/types/tables';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCreateTable } from './useCreateTable';
import SpinnerMini from '@/components/SpinnerMini';

type TableDataModalProps = {
    open: boolean;
};

export default function AddTableDataModal({ open }: TableDataModalProps) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TableFormData>();

    useEffect(() => {
        if (open) {
            reset();
        }
    }, [open, reset]);
    const { create, isPending } = useCreateTable();

    const onSubmit = (formData: TableFormData) => {
        const data = {
            num_table: formData.num_table,
            capacity_table: formData.capacity_table,
            room_id: formData.room_id,
        };
        create(data, {
            onSuccess: () => {
                reset();
                navigate(location.pathname, { replace: true });
            },
        });
    };

    return (
        <ResponsiveDialog
            title='Datos de la mesa'
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
                    <Button variant={'principal'}>
                        {isPending ? <SpinnerMini /> : 'Agregar mesa'}
                    </Button>
                </div>
            </form>
        </ResponsiveDialog>
    );
}
