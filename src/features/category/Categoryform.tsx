import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BiSave} from 'react-icons/bi';

type CategoryFormProps = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Categoryform({ setIsOpen }: CategoryFormProps) {

  const onSubmit = () => {
        console.log('holi');
        setIsOpen(false);
  }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 my-5 font-outfit'>
                    <div className='w-full col-span-3 row-span-2'>
                        <Label className='text-gray-500 font-bold'>
                            Nombre de la categoria
                        </Label>
                        <Input
                            type='text'
                            placeholder='Nombre de la categoria'
                            className='inputText'
                        />
                    </div>
                    <div className='col-span-3'>
                        <Label className='text-gray-500 font-bold'>
                            Descripción
                        </Label>
                        <Input
                            type='text'
                            placeholder='Descripción'
                            className='inputText'
                        />
                    </div>
                </div>
                <div className='flex items-center justify-end'>
                    <Button variant={'principal'}>
                        <BiSave className='mr-2' />
                        Guardar
                    </Button>
                </div>
            </form>
        </div>
    );
}
