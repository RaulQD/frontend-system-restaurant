import Spinner from '@/components/Spinner';
import { getEmployeeById } from '@/services/apiEmployee';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import EditEmployeeForm from './EditEmployeeForm';

export default function EditEmployee() {
    const params = useParams();
    const employeeId = params.employeeId!
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['employeeId', employeeId],
        queryFn: () => getEmployeeById(Number(employeeId)),
        enabled: !!employeeId,
    });
    if (isLoading) {
        return (
            <div className='flex justify-center items-center h-96'>
                <Spinner />
            </div>
        );
    }
    if (isError) {
        return (
            <div className='flex justify-center items-center h-96'>
                <p className='text-lg text-gray-500'>{error?.message}</p>
            </div>
        );
    }

    if (data) return <EditEmployeeForm data={data} employeeId={Number(employeeId)} />;
}
