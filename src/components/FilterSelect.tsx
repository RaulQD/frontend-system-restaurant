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
        <Select
            onValueChange={onValueChange}
            defaultValue={currentFilterValue || 'all'}>
            <SelectTrigger className='w-64 bg-white'>
                <SelectValue placeholder='Selecciona una categoría' />
            </SelectTrigger>
            <SelectContent>
                {showAllButton && <SelectItem value='all'>Todos</SelectItem>}
                {items?.map((item) => (
                    <SelectItem key={getValue(item)} value={getValue(item)}>
                        {getLabel(item)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
