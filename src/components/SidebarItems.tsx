import { IconType } from 'react-icons';
import { NavLink } from 'react-router-dom';

type SidebarItemsProps = {
    path: string;
    label: string;
    Icon: IconType;
    className?: string;
};
export default function SidebarItems({
    path,
    label,
    Icon,
    className,
}: SidebarItemsProps) {
    return (
        <li className='mb-3'>
            <NavLink
                to={path}
                className={`flex items-center gap-4 px-4 py-2  text-gray-900 rounded-lg hover:bg-gray-100 ${className} font-outfit`}>
                <Icon className='text-teal-600 text-lg' />
                {label}
            </NavLink>
        </li>
    );
}
