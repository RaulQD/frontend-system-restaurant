import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

type FilterSelectProps<T> = {
    items: T[] | undefined;
    currentFilterValue: string;
    showAllButton?: boolean;
    getLabel: (item: T) => string;
    getValue: (item: T) => string;
    onValueChange: (value: string) => void;
};

export function FilterSelect<T>({
    items,
    currentFilterValue,
    showAllButton = false,
    getLabel,
    getValue,
    onValueChange,
}: FilterSelectProps<T>) {
    return (
        <Select onValueChange={onValueChange} value={currentFilterValue || 'todos'}>
            <SelectTrigger className='w-full bg-white'>
                <SelectValue placeholder='Selecciona un estado' />
            </SelectTrigger>
            <SelectContent>
                {showAllButton && <SelectItem value='todos'>Todos</SelectItem>}
                {items
                    ?.filter((item) => getValue(item) !== 'todos') // Evitar duplicado
                    .map((item) => (
                        <SelectItem key={getValue(item)} value={getValue(item)}>
                            {getLabel(item)}
                        </SelectItem>
                    ))}
            </SelectContent>
        </Select>
    );
}
