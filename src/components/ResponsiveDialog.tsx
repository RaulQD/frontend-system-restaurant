import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
    children: React.ReactNode;
    title: string;
    description?: string;
    open?: boolean;
};

export default function ResponsiveDialog({
    children,
    title,
    description,
    open,
}: ModalProps) {
    const navigate = useNavigate();
    return (
        <Dialog
            open={open}
            onOpenChange={() => navigate(location.pathname, { replace: true })}>
            <DialogContent className='sm:max-w-[625px]'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
}
{
    /*return (
    <Drawer open={open} onOpenChange={() => navigate(location.pathname, { replace: true })}>
        <DrawerContent>
            <DrawerHeader className='text-left'>
                <DrawerTitle>{title}</DrawerTitle>
                {description && (
                    <DrawerDescription>{description}</DrawerDescription>
                )}
            </DrawerHeader>
            {children}
        </DrawerContent>
    </Drawer>
    );*/
}
