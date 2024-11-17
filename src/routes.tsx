import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import AuthLayout from './layout/AuthLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ManageTable from './pages/ManageTable';
import Dishes from './pages/Dishes';
import AdminPanel from './pages/AdminPanel';
import AddEmployee from './features/admin-personal/AddEmployee';
import AddDishes from './features/dishes/AddDishes';
import { ProtectedRoutes } from './components/ProtectedRoutes';
import Kitchen from './pages/Kitchen';
import Category from './pages/Category';
import OrderHistory from './pages/OrderHistory';
import Orders from './pages/Orders';

const ROLES = {
    Administrador: 'administrador',
    Cocinero: 'cocinero',
    Mesero: 'mesero',
};

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/' element={<Layout />}>
                    {/* RUTA PARA EL ADMINISTRADOR*/}
                    <Route
                        element={
                            <ProtectedRoutes
                                allowedRoles={[ROLES.Administrador]}
                            />
                        }>
                        <Route path='dashboard' element={<Dashboard />} />
                        <Route
                            path='dashboard/personal'
                            element={<AdminPanel />}
                        />
                        <Route
                            path='dashboard/personal-register'
                            element={<AddEmployee />}
                        />
                        <Route
                            path='dashboard/dishes/add-dishes'
                            element={<AddDishes />}
                        />
                        <Route path='dashboard/dishes' element={<Dishes />} />
                        <Route
                            path='dashboard/category'
                            element={<Category />}
                        />
                        <Route
                            path='dashboard/tables'
                            element={<ManageTable />}
                        />
                        <Route
                            path='dashboard/tables/:tableId/order'
                            element={<Orders />}
                        />
                        <Route
                            path='dashboard/tables/:tableId/order/:orderId'
                            element={<Orders />}
                        />
                        <Route path='dashboard/kitchen' element={<Kitchen />} />
                        <Route
                            path='dashboard/order-history'
                            element={<OrderHistory />}
                        />
                    </Route>
                </Route>
                {/* RUTA PARA EL MESERO
                    <Route element={ <ProtectedRoutes allowedRoles={['administrador']} /> }>
                    </Route>
                    RUTA PARA EL COCINERO
                    <Route element={ <ProtectedRoutes allowedRoles={['administrador', 'cocinero']} /> }>
                    </Route>*/}
                <Route path='/auth/' element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
