import { useUser } from '@/hooks/useUser';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

type ProtectedRoutesProps = {
    allowedRoles: string[];
};

export const ProtectedRoutes = ({ allowedRoles }: ProtectedRoutesProps) => {
    const { user, isLoading, isError } = useUser();
    const location = useLocation();

    // 2. mientras carga el usuario, mostrar un spinner
    if (isLoading)
        return (
            <div className='h-screen bg-gray-50 flex items-center justify-center'>
                <Spinner />
            </div>
        );

    if (isError || !user)
        return <Navigate to='/auth/login' state={{ from: location }} replace />;

    if (!allowedRoles.includes(user.role.name))
        return (
            <Navigate to='/un-authorized' state={{ from: location }} replace />
        );

    return <Outlet />;
};
