import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Dashboard() {
    return (
        <>
            <Button
                onClick={() => {
                    toast({
                        title: 'Scheduled: Catch up',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                    });
                }}>
                Click me
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline'>Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuItem>GitHub</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuItem disabled>API</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
