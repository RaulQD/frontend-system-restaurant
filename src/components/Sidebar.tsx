import { BiCart, BiDish, BiSolidReport, BiUser } from 'react-icons/bi';
import SidebarDropdown from './SidebarDropdown';
import SidebarItems from './SidebarItems';
import { MdOutlineTableBar } from 'react-icons/md';

type SidebarProps = {
    sidebarOpen: boolean;
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Sidebar({ sidebarOpen }: SidebarProps) {
    return (
        <aside
            id='sidebar'
            className={`fixed z-20 h-screen lg:h-full top-0 left-0 pt-16 lg:pt-0 w-64 flex flex-col transition-transform duration-300 ease-in-out transform
              ${
                  sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              } lg:translate-x-0 lg:static lg:inset-auto bg-white border-r border-gray-300`}
            aria-label='Sidebar'>
            <div className='flex-1 flex flex-col pt-6 pb-4 overflow-y-auto'>
                <div className='flex-1 px-3 bg-white space-y-1'>
                    <ul className='space-y-2 pb-2 font-outfit'>
                        <SidebarItems
                            path='/dashboard/tables'
                            label='Manejo de Mesas'
                            Icon={MdOutlineTableBar}
                        />
                        <SidebarDropdown
                            label='Ventas'
                            Icon={BiCart}
                            menuItems={[
                                {
                                    path: '/dashboard/dishes',
                                    label: 'Platos',
                                },

                                {
                                    path: '/dashboard/category',
                                    label: 'Categorias',
                                },
                            ]}
                        />
                        <SidebarDropdown
                            label='Personal'
                            Icon={BiUser}
                            menuItems={[
                                {
                                    path: '/dashboard/personal',
                                    label: 'Administrar Personal',
                                },
                            ]}
                        />
                        <SidebarDropdown
                            label='Reportes'
                            Icon={BiSolidReport}
                            menuItems={[
                                {
                                    path: '/dashboard/reports-month',
                                    label: 'Total ventas por mes',
                                },
                                {
                                    path: '/dashboard/reports-users',
                                    label: 'Ventas por trabajador',
                                },
                            ]}
                        />
                        <SidebarDropdown
                            label='Cocina'
                            Icon={BiDish}
                            menuItems={[
                                {
                                    path: '/dashboard/kitchen',
                                    label: 'Listado de Pedidos',
                                },
                            ]}
                        />
                        <SidebarDropdown
                            label='Ordenes'
                            Icon={BiDish}
                            menuItems={[
                                {
                                    path: '/dashboard/order-history',
                                    label: 'Historial de ordenes',
                                },
                            ]}
                        />
                    </ul>
                </div>
            </div>
        </aside>
    );
}
