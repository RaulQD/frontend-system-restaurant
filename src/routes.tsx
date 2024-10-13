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

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/' element={<Layout />}>
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route
                        path='dashboard/manage-tables'
                        element={<ManageTable />}
                    />
                    <Route path='dashboard/dishes' element={<Dishes />} />
                    <Route
                        path='dashboard/dishes/add-dishes'
                        element={<AddDishes />}
                    />
                    <Route path='dashboard/personal' element={<AdminPanel />} />
                    <Route
                        path='dashboard/personal-register'
                        element={<AddEmployee />}
                    />
                </Route>
                <Route path='/auth/' element={<AuthLayout />}>
                    <Route path='login' element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
