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
    const token = localStorage.getItem('token');
    const { user, isLoading, isError } = useUser();
    const location = useLocation();

    // REDIRIGIR A LA PÁGINA DE LOGIN SI NO HAY TOKEN
    if (!token) {
        return <Navigate to='/auth/login' state={{ from: location }} replace />;
    }
    // 2. mientras carga el usuario, mostrar un spinner
    if (isLoading) {
        return (
            <div className='h-screen bg-gray-50 flex items-center justify-center'>
                <Spinner />
            </div>
        );
    }

    if (isError || !user)
        return <Navigate to='/auth/login' state={{ from: location }} replace />;

    // //USUARIO ADMINISTRADOR TIENE ACCESO A TODAS LAS RUTAS
    // if (user.role === 'administrador') {
    //     return children;
    // }

    if (!allowedRoles.includes(user.role)) {
        return (
            <Navigate to='/un-authorized' state={{ from: location }} replace />
        );
    }

    return children;
};
