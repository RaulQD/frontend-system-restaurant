import { useUser } from '@/hooks/useUser';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from './Spinner';

type ProtectedRoutesProps = {
    children: React.ReactElement;
    allowedRoles: string[];
};

export const ProtectedRoutes = ({
    children,
    allowedRoles,
}: ProtectedRoutesProps) => {
    const { user, isLoading, isError } = useUser();
    const location = useLocation();

    // 1. mientras carga el usuario, mostrar un spinner
    if (isLoading) {
        return (
            <div className='h-screen bg-gray-50 flex items-center justify-center'>
                <Spinner />
            </div>
        );
    }

    // 2. si hay un error o no hay usuario, redirigir a la página de inicio de sesión
    if (isError || !user) {
        localStorage.removeItem('token'); // limpiar el token si hay un error
        return <Navigate to='/auth/login' state={{ from: location }} replace />;
    }

    // 3. si el usuario no tiene un rol permitido, redirigir a la página de no autorizado
    if (!allowedRoles.includes(user.role)) {
        return (
            <Navigate to='/un-authorized' state={{ from: location }} replace />
        );
    }

    return children;
};
