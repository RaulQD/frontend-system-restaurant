import NotImage from '@/assets/not-image-found.png';
import { DishesType } from '@/types/dish';
type DishDetailsProps = {
  dish: DishesType;
};

export default function DishDetails({ dish }: DishDetailsProps) {
    return (
        <div className=''>
            <div>
                <div>
                    <img
                        src={dish.image_url || NotImage}
                        alt=''
                        className='h-20 w-20 rounded-xl'
                    />
                </div>
            </div>
        </div>
    );
}
