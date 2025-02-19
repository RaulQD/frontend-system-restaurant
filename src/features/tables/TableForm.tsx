import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getRooms } from '@/services/apiRooms';
import { Rooms } from '@/types/rooms';
import { TableFormData } from '@/types/tables';
import { useQuery } from '@tanstack/react-query';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
type TableFormProps = {
    errors: FieldErrors<TableFormData>;
    register: UseFormRegister<TableFormData>;
};
export default function TableForm({ errors, register }: TableFormProps) {
    const { data: rooms } = useQuery<Rooms[]>({
        queryKey: ['rooms'],
        queryFn: getRooms,
    });

    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 font-outfit'>
                <div className='w-full col-span-3 row-span-2'>
                    <Label
                        className={`font-medium transition-colors ${
                            errors.num_table ? 'text-red-500' : 'text-gray-600'
                        } `}>
                        Nombre de la categoria
                    </Label>
                    <Input
                        type='text'
                        placeholder='Mesa'
                        className='mt-2'
                        {...register('num_table', {
                            required: 'La mesa es requerida.',
                            minLength: {
                                value: 3,
                                message:
                                    'La mesa debe tener al menos 3 caracteres.',
                            },
                            validate: (value) => {
                                if (!/^Mesa/.test(value)) {
                                    return 'Debe comenzar con la palabra "Mesa"';
                                }
                                if (!/^Mesa \d+$/.test(value)) {
                                    return ' Solo debe permitir números después de la palabra "Mesa".';
                                }
                                return true;
                            },
                        })}
                    />
                    {errors.num_table && (
                        <ErrorMessage>{errors.num_table.message}</ErrorMessage>
                    )}
                </div>
                <div className='col-span-3'>
                    <Label
                        className={`font-medium transition-colors ${
                            errors.capacity_table
                                ? 'text-red-500'
                                : 'text-gray-600'
                        } `}>
                        Capacidad
                    </Label>
                    <Input
                        type='number'
                        placeholder='Capacidad'
                        className='mt-2'
                        {...register('capacity_table', {
                            required: 'La capacidad es requerido.',
                            min: {
                                value: 1,
                                message: 'La capacidad debe ser mayor a 0.',
                            },
                        })}
                    />
                    {errors.capacity_table && (
                        <ErrorMessage>
                            {errors.capacity_table.message}
                        </ErrorMessage>
                    )}
                </div>
                <div className='col-span-3'>
                    <Label
                        htmlFor='room_id'
                        className={`font-medium transition-colors ${
                            errors.room_id ? 'text-red-500' : 'text-gray-600'
                        } `}>
                        Salón
                    </Label>
                    <select
                        id='room_id'
                        className='flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground text-gray-600 font-medium focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 mt-2'
                        {...register('room_id', {
                            required: 'El salon es requerido.',
                        })}>
                        <option value=''>Selecciona un salón</option>
                        {rooms?.map((room) => (
                            <option
                                key={room.id}
                                value={room.id}
                                className='capitalize '>
                                {room.room_name}
                            </option>
                        ))}
                    </select>
                    {errors.room_id && (
                        <ErrorMessage>{errors.room_id.message}</ErrorMessage>
                    )}
                </div>
            </div>
        </>
    );
}
