import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import EditEmployee from './features/admin-personal/EditEmployee';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Tables from './pages/Tables';
import Rooms from './pages/Rooms';

const ROLES = {
    Administrador: 'administrador',
    Cocinero: 'cocinero',
    Mesero: 'mesero',
};

export default function AppRoutes() {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='dashboard' element={<Layout />}>
                    <Route
                        path='home'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <Dashboard />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='employees'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <AdminPanel />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='employees/create'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <AddEmployee />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='employees/:employeeId/edit'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <EditEmployee />
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
                        path='table'
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
                        path='table/:tableId/order/:orderId'
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
                    <Route path='reports' element={<Reports />} />
                    <Route
                        path='order-history'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <OrderHistory />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='tables'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <Tables />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path='rooms'
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}>
                                <Rooms />
                            </ProtectedRoutes>
                        }
                    />
                </Route>

                <Route path='auth' element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                </Route>
                <Route path='/un-authorized' element={<UnAuthorized />} />
            </Routes>
        </BrowserRouter>
    );
}
