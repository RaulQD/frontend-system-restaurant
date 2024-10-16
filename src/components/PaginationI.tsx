import { useSearchParams } from 'react-router-dom';
import { Button } from './ui/button';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
type PaginationProps = {
    totalItems: number;
};

export default function PaginationI({ totalItems }: PaginationProps) {
    const itemsPerPage = 10;
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = !searchParams.get('page')
        ? 1
        : Number(searchParams.get('page'));

    const pageCount = Math.ceil(totalItems / itemsPerPage);
    const nextPage = () => {
        const next = currentPage === pageCount ? currentPage : currentPage + 1;
        searchParams.set('page', next.toString());
        setSearchParams(searchParams);
    };
    const prevPage = () => {
        const prev = currentPage === 1 ? currentPage : currentPage - 1;
        searchParams.set('page', prev.toString());
        setSearchParams(searchParams);
    };

    if (pageCount <= 1) return null;

    return (
        <div className='flex mt-4 justify-between px-5'>
            <span className='text-sm'>
                Mostrando <span>{(currentPage - 1) * itemsPerPage + 1}</span> al{' '}
                <span>
                    {currentPage === pageCount
                        ? totalItems
                        : currentPage * itemsPerPage}
                </span>{' '}
                de <span>{totalItems}</span> resultados
            </span>
            <div className='flex space-x-2'>
                <Button
                    variant='outline'
                    onClick={prevPage}
                    disabled={currentPage === 1}>
                    <BiChevronLeft className='text-xl' />
                </Button>
                <Button
                    variant='outline'
                    onClick={nextPage}
                    disabled={currentPage === pageCount}>
                    <BiChevronRight className='text-xl' />
                </Button>
            </div>
        </div>
    );
}
