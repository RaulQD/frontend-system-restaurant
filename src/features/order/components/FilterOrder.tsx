import FilterButton from '@/components/FilterButton';
import FilterInput from '@/components/FilterInput';
import { getCategories } from '@/services/apiCategory';
import { Category } from '@/types/category';

export default function FilterOrder() {
    return (
        <div className='flex flex-col gap-4 '>
            <FilterInput filterValue='keyword' />
            <FilterButton<Category>
                filterValue='category'
                queryKey={['category']}
                queryFn={getCategories}
                getValue={(category) => category.category_name}
                getLabel={(category) => category.category_name}
                showAllButton={true}
            />
        </div>
    );
}
