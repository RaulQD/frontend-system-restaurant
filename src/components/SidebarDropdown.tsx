import { useState } from 'react';

import Dropdown from './Dropdown';
import { IconType } from 'react-icons';
import { RxCaretRight } from 'react-icons/rx';

type DropdownItems = {
    path: string;
    label: string;
};
type SidebarDropdownProps = {
    label: string;
    Icon: IconType;
    menuItems: DropdownItems[];
};
export default function SidebarDropdown({
    label,
    Icon,
    menuItems,
}: SidebarDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <li className='mb-3'>
                <button
                    type='button'
                    className='w-full text-black flex justify-between items-center py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors'
                    onClick={() => setIsOpen(!isOpen)}>
                    <span className='flex items-center gap-4'>
                        <Icon className='text-teal-600 text-lg' />
                        {label}
                    </span>
                    <RxCaretRight
                        className={`text-black text-xl mt-1 ${
                            isOpen ? 'rotate-90' : ''
                        }  transition-all`}
                    />
                </button>
                <Dropdown isOpen={isOpen} menuItems={menuItems} />
            </li>
        </>
    );
}
