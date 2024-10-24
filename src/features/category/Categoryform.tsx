import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryForm } from '@/types/category';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { useAddCategory } from './useAddCategory';
import SpinnerMini from '@/components/SpinnerMini';
import { Textarea } from '@/components/ui/textarea';

type CategoryFormProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Categoryform({ setIsOpen }: CategoryFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryForm>();
    const { AddCategory, isPending } = useAddCategory();
    const onSubmit = (data: CategoryForm) => {
        AddCategory(data, {
            onSuccess: () => {
                reset();
                setIsOpen(false);
            },
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 font-outfit'>
                    <div className='w-full col-span-3 row-span-2'>
                        <Label className='text-gray-600 font-medium7'>
                            Nombre de la categoria
                        </Label>
                        <Input
                            type='text'
                            placeholder='Nombre de la categoria'
                            className='mt-2'
                            register={register('category_name', {
                                required:
                                    'El nombre de la categoria es requerido.',
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
                        <Label className='text-gray-600 font-medium7'>
                            Descripción
                        </Label>
                        <Textarea
                           
                            placeholder='Descripción'
                            className='mt-2'
                            register={register('category_description', {
                                required:
                                    'La descripciòn de la categoria es requerido.',
                                minLength: {
                                    value: 10,
                                    message:
                                        'La descripción debe tener al menos 10 caracteres.',
                                },
                            })}
                        />
                        {errors.category_description && (
                            <ErrorMessage>
                                {errors.category_description.message}
                            </ErrorMessage>
                        )}
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <Button variant={'principal'}>
                        {isPending ? (
                            <div className='flex items-center justify-center'>
                                <SpinnerMini />
                            </div>
                        ) : (
                            <div className='flex items-center gap-2'>
                                <BiSave /> Guardar
                            </div>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
