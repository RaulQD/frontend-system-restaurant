import { Category } from '@/types/category';
import FilterButton from './FilterButton';
import FilterInput from './FilterInput';
import { getCategories } from '@/services/apiCategory';

export default function Filter() {
    return (
        <div className='flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
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
