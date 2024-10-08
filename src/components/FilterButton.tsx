import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

/* <T> -> los tipos genericos permiten que una función clase o componente trabaje con diferente tipos de datos 
sin necesidad de especificar un tipo concreto al momento de escribir el códigos */
type FilterButtonProps<T> = {
    filterValue: string;
    queryKey: string[];
    queryFn: () => Promise<T[]>;
    getLabel: (item: T) => string;
    getValue: (item: T) => string;
};

export default function FilterButton<T>({
    filterValue,
    queryKey,
    queryFn,
    getLabel,
    getValue,
}: FilterButtonProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilterValue = searchParams.get(filterValue) || '';

    const { data: items } = useQuery<T[]>({
        queryKey,
        queryFn,
    });

    const handleButtonFilter = (value: string) => {
        searchParams.set(filterValue, value);
        setSearchParams(searchParams);
    };

    return (
        <div>
            <ul className='flex items-center justify-center gap-4'>
                {items?.map((item) => (
                    <li key={getValue(item)}>
                        <Button
                            variant={
                                currentFilterValue === getValue(item)
                                    ? 'principal'
                                    : 'outline'
                            }
                            className='capitalize'
                            onClick={() => handleButtonFilter(getValue(item))}>
                            {getLabel(item)}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
