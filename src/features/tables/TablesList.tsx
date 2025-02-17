import { useTable } from './useTable';

export default function TablesList() {
    const { tables, isLoading, isError, error } = useTable();
    console.log(tables?.results);
    return <div>TableList</div>;
}
