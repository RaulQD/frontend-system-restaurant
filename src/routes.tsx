import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import AuthLayout from './layout/AuthLayout';
import Login from './pages/Login';
import ManageTable from './pages/ManageTable';
import Dishes from './pages/Dishes';
import AdminPanel from './pages/AdminPanel';
import AddEmployee from './features/admin-personal/AddEmployee';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import Kitchen from './pages/Kitchen';
import Category from './pages/Category';
import OrderHistory from './pages/OrderHistory';
import Orders from './pages/Orders';
import UnAuthorized from './pages/UnAuthorized';
import { useUser } from './hooks/useUser';

const ROLES = {
    Administrador: 'administrador',
    Cocinero: 'cocinero',
    Mesero: 'mesero',
};

export default function AppRoutes() {
    const { user } = useUser();
    const getDefaultRoutes = () => {
        if (!user) return '/auth/login';
        switch (user.role) {
            case ROLES.Administrador:
                return '/dashboard/personal';
            case ROLES.Cocinero:
                return '/dashboard/kitchen';
            case ROLES.Mesero:
                return '/dashboard/tables';
            default:
                return '/un-authorized';
        }
    };
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path='/'
                    element={<Navigate to={getDefaultRoutes()} replace />}
                />
                <Route path='dashboard' element={<Layout />}>
                    <Route
                        path='empleados'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <AdminPanel />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='empleados/registrar-empleado'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <AddEmployee />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='dishes'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <Dishes />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='category'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <Category />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='tables'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[
                                    ROLES.Administrador,
                                    ROLES.Mesero,
                                ]}>
                                <ManageTable />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='tables/:tableId/order/:orderId'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[
                                    ROLES.Mesero,
                                    ROLES.Administrador,
                                ]}>
                                <Orders />
                            </ProtectedRoutes>
                        }
                    />

                    <Route
                        path='kitchen'
                        index
                        element={
                            <ProtectedRoutes
                                allowedRoles={[
                                    ROLES.Cocinero,
                                    ROLES.Administrador,
                                ]}>
                                <Kitchen />
                            </ProtectedRoutes>
                        }
                    />
                    <Route path='order-history' element={<OrderHistory />} />
                </Route>

                <Route path='/un-authorized' element={<UnAuthorized />} />
                <Route path='/auth/' element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
