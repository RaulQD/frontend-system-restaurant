import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { useNavigate } from 'react-router-dom';

type ModalProps = {
    children: React.ReactNode;
    title: string;
    description?: string;
    open?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl';
};

export default function ResponsiveDialog({
    children,
    title,
    description,
    open,
    size = 'md',
}: ModalProps) {
    const navigate = useNavigate();
    const widthClass = {
        sm: "sm:max-w-[400px]",
        md: "sm:max-w-[650px]",
        lg: "sm:max-w-[900px]",
        xl: "sm:max-w-[1200px]",
    }[size];
    return (
        <Dialog
            open={open}
            onOpenChange={() => navigate(location.pathname, { replace: true })}>
            <DialogContent className={`${widthClass}`}>
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
