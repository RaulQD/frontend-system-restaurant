import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getEmployees } from '@/services/apiEmployee';
import { EmployeeList } from '@/types/employee';
import { useQuery } from '@tanstack/react-query';
export default function TableEmployees() {
    const {
        data: employees,
        isLoading,
        isError,
    } = useQuery<EmployeeList>({
        queryKey: ['employees', searchName, searchLastName, status],
        queryFn: () => getEmployees({ searchName, searchName, status }),
    });

    return (
        <div className='rounded-md border mt-6'>
            <div className='overflow-x-auto shadow-sm ring-1 ring-black ring-opacity-5 md:rounded-lg'>
                <Table className='w-full divide-y divide-gray-300'>
                    <TableHeader className='bg-slate-200'>
                        <TableRow>
                            <TableHead className='w-[150px]'>Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className='text-right'>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees?.map((employee) => (
                            <TableRow key={employee}>
                                <TableCell className='font-medium'>
                                    {employee.employee}
                                </TableCell>
                                <TableCell>{employee.paymentStatus}</TableCell>
                                <TableCell>{employee.paymentMethod}</TableCell>
                                <TableCell className='text-right'>
                                    {employee.totalAmount}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
