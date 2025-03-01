import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { FilterSelect } from './FilterSelect';

/* <T> -> los tipos genericos permiten que una función clase o componente trabaje con diferente tipos de datos 
sin necesidad de especificar un tipo concreto al momento de escribir el códigos */
type FilterButtonProps<T> = {
    filterValue: string;
    queryKey: string[];
    queryFn: () => Promise<T[]>;
    getLabel: (item: T) => string;
    getValue: (item: T) => string;
    showAllButton?: boolean;
    useSelectOnMobile?: boolean; // Agregado para controlar si se usa Select en móvil
};

export default function FilterButton<T>({
    filterValue,
    queryKey,
    queryFn,
    getLabel,
    getValue,
    showAllButton = false,
    useSelectOnMobile = true,
}: FilterButtonProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentFilterValue = searchParams.get(filterValue) || '';

    const { data: items } = useQuery<T[]>({
        queryKey,
        queryFn,
        retry: false,
    });

    const handleButtonFilter = (value: string) => {
        if (value === 'all') {
            searchParams.delete(filterValue); // Interpreta 'all' como "Todos"
        } else {
            searchParams.set(filterValue, value);
        }
        setSearchParams(searchParams);
    };

    return (
        <>
            {useSelectOnMobile && (
                <div className='xl:hidden'>
                    <FilterSelect
                        items={items}
                        currentFilterValue={currentFilterValue}
                        showAllButton={showAllButton}
                        getLabel={getLabel}
                        getValue={getValue}
                        onValueChange={handleButtonFilter}
                    />
                </div>
            )}

            <div className={useSelectOnMobile ? 'hidden xl:block' : 'block'}>
                <ul className='flex flex-wrap md:flex-row items-start justify-start gap-4'>
                    {/* Botón "Todos" */}
                    {showAllButton && (
                        <li>
                            <Button
                                variant={
                                    currentFilterValue === ''
                                        ? 'principal'
                                        : 'outline'
                                }
                                className='capitalize'
                                onClick={() => {
                                    handleButtonFilter('all');
                                }}>
                                Todos
                            </Button>
                        </li>
                    )}

                    {Array.isArray(items) &&
                        items?.map((item) => (
                            <li key={getValue(item)}>
                                <Button
                                    variant={
                                        currentFilterValue === getValue(item)
                                            ? 'principal'
                                            : 'outline'
                                    }
                                    className='capitalize'
                                    onClick={() =>
                                        handleButtonFilter(getValue(item))
                                    }>
                                    {getLabel(item)}
                                </Button>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
}
