import { useUser } from '@/hooks/useUser';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRoutesProps = {
    children: ReactNode;
};

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const { user } = useUser();

    if (!user) {
        return <Navigate to='/auth/login' replace />;
    }
    return <>{children}</>;
};
