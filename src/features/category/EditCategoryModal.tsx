import ResponsiveDialog from "@/components/ResponsiveDialog";
import { CategoryForm } from "@/types/category";
import { useForm } from "react-hook-form";
import Categoryform from "./Categoryform";
import { Button } from "@/components/ui/button";

type EditCategoryModalProps = {
    data: CategoryForm;
}

export default function EditCategoryModal({ data }: EditCategoryModalProps) {

    const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
      } = useForm({defaultValues:{
          category_name: data.category_name,
          category_description: data.category_description
      }});
      const onSubmit = (data: CategoryForm) => {
        console.log(data);
      }

    return (
        <ResponsiveDialog
            title='Editar categoría'
            isOpen={isEdit}
            setIsOpen={setIsEdit}
            description='Aquí puedes editar los datos de la categoría.'>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Categoryform register={register} errors={errors} />
                <div className='flex items-center justify-end'>
                    <Button variant={'ghost'} onClick={() => setIsOpen(false)}>
                        Cancelar
                    </Button>
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
        </ResponsiveDialog>
    );
}
