import { ErrorMessage } from '@/components/ErrorMessage';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryForm } from '@/types/category';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

type CategoryFormProps = {
    errors: FieldErrors<CategoryForm>;
    register: UseFormRegister<CategoryForm>;
    isEdit?: boolean;
    control: Control<CategoryForm, any>;
};

export default function Categoryform({
    errors,
    register,
    isEdit = false,
    control,
}: CategoryFormProps) {
    return (
        <>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 font-outfit'>
                <div className='w-full col-span-3 row-span-2'>
                    <Label
                        htmlFor='category_name'
                        className={`font-medium transition-colors ${
                            errors.category_name
                                ? 'text-red-500'
                                : 'text-gray-600'
                        }`}>
                        Nombre de la categoria
                    </Label>
                    <Input
                        type='text'
                        id='category_name'
                        placeholder='Nombre de la categoria'
                        className='mt-2'
                        register={register('category_name', {
                            required: 'El nombre de la categoria es requerido.',
                            minLength: {
                                value: 3,
                                message:
                                    'El nombre de la categoria debe tener al menos 3 caracteres.',
                            },
                        })}
                    />
                    {errors.category_name && (
                        <ErrorMessage>
                            {errors.category_name.message}
                        </ErrorMessage>
                    )}
                </div>
                <div className='col-span-3'>
                    <Label
                        htmlFor='category_description'
                        className={`font-medium transition-colors ${
                            errors.category_description
                                ? 'text-red-500'
                                : 'text-gray-600'
                        }`}>
                        Descripción
                    </Label>
                    <Textarea
                        id='category_description'
                        placeholder='Descripción'
                        className='mt-2'
                        register={register('category_description', {
                            required:
                                'La descripciòn de la categoria es requerido.',
                            minLength: {
                                value: 20,
                                message:
                                    'La descripción debe tener al menos 20 caracteres.',
                            },
                        })}
                    />
                    {errors.category_description && (
                        <ErrorMessage>
                            {errors.category_description.message}
                        </ErrorMessage>
                    )}
                </div>
                {isEdit ? (
                    <div className='col-span-3'>
                        <Label
                            htmlFor='status'
                            className={`font-medium transition-colors ${
                                errors.status ? 'text-red-500' : 'text-gray-600'
                            }`}>
                            Estado
                        </Label>
                        <Controller
                            name='status'
                            control={control}
                            rules={{ required: 'Selecciona un estado.' }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Selecciona un estado' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value='DISPONIBLE'>
                                            Disponible
                                        </SelectItem>
                                        <SelectItem value='NO DISPONIBLE'>
                                            No disponible
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.status && (
                            <ErrorMessage>{errors.status.message}</ErrorMessage>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}
