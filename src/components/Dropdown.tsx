import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

type MenuItemProps = {
    path: string;
    label: string;
};

type DropdownProps = {
    isOpen: boolean;
    menuItems: MenuItemProps[];
};

export default function Dropdown({ isOpen, menuItems }: DropdownProps) {
    const contentRef = useRef<HTMLUListElement>(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isOpen]);

    return (
        <>
            <ul
                ref={contentRef}
                className='overflow-y-hidden transition-all mt-1'
                style={{ height }}>
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className=' text-black py-2 pl-4 pr-2 border-l border-gray-500 ml-6 block relative before:w-3 before:h-3 before:absolute before:bg-teal-500 before:rounded-full before:-left-[6.5px] before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-white hover:text-teal-500'>
                            {item.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </>
    );
}
