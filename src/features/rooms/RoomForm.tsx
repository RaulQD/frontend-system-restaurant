import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RoomFormData } from '@/types/rooms';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type RoomFormProps = {
    errors: FieldErrors<RoomFormData>;
    register: UseFormRegister<RoomFormData>;
};

export default function RoomForm({ errors, register }: RoomFormProps) {
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 font-outfit'>
                <div className='w-full col-span-3 row-span-2'>
                    <Label
                        htmlFor='room_name'
                        className={`font-medium transition-colors ${
                            errors.room_name ? 'text-red-500' : 'text-gray-600'
                        } `}>
                        Nombre de la sala
                    </Label>
                    <Input
                        type='text'
                        id='room_name'
                        placeholder='Nombre de la sala'
                        className='mt-2'
                        {...register('room_name', {
                            required: 'La sala es requerida.',
                            minLength: {
                                value: 3,
                                message:
                                    'La sala debe tener al menos 3 caracteres.',
                            },
                           
                        })}
                    />
                    {errors.room_name && (
                        <ErrorMessage>{errors.room_name.message}</ErrorMessage>
                    )}
                </div>
                <div className='col-span-3'>
                    <Label
                        htmlFor='num_tables'
                        className={`font-medium transition-colors ${
                            errors.num_tables ? 'text-red-500' : 'text-gray-600'
                        } `}>
                        Capacidad
                    </Label>
                    <Input
                        type='text'
                        id='num_tables'
                        placeholder='Capacidad'
                        className='mt-2'
                        {...register('num_tables', {
                            required: 'La capacidad es requerido.',
                            min: {
                                value: 1,
                                message: 'La capacidad debe ser mayor a 0.',
                            },
                        })}
                    />
                    {errors.num_tables && (
                        <ErrorMessage>{errors.num_tables.message}</ErrorMessage>
                    )}
                </div>
            </div>
        </>
    );
}
