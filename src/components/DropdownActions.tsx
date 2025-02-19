import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {  DotsVerticalIcon } from '@radix-ui/react-icons';
import { IconType } from 'react-icons';

type Actions = {
    label: string;
    onClick: () => void;
    className?: string;
    iconType?: IconType;
};
type DropdownActionsProps = {
    actions: Actions[];
};

export default function DropdownActions({ actions }: DropdownActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    <DotsVerticalIcon className='w-5 h-5' />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
               {actions.map((action) => (
                    <DropdownMenuItem
                        key={action.label}
                        className={`cursor-pointer ${action.className || ''}`}
                        onClick={action.onClick}>
                         {action.iconType && <action.iconType className='w-5 h-5 mr-2' />}
                         {action.label}
                    </DropdownMenuItem>
               ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
