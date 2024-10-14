import { Category } from '@/types/category';
import FilterButton from './FilterButton';
import { getCategories } from '@/services/appCategory';
import FilterInput from './FilterInput';

export default function Filter() {
    return (
        <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
            <FilterButton<Category>
                filterValue='category'
                queryKey={['category']}
                queryFn={getCategories}
                getValue={(category) => category.category_name}
                getLabel={(category) => category.category_name}
                showAllButton={true}
            />
            <FilterInput filterValue='keyword' />
        </div>
    );
}
