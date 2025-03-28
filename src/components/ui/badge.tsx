import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
    'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
        variants: {
            variant: {
                success:
                    'border-transparent bg-success text-success-foreground shadow hover:bg-success/80',
                successdark:'border-transparent bg-successdark text-successdark-foreground shadow hover:bg-successdark/80',
                warning:
                    'border-transparent bg-warning text-warning-foreground shadow hover:bg-warning/80',
                info: 'border-transparent bg-info text-info-foreground shadow hover:bg-info/80',
                default:
                    'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
                secondary:
                    'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
                destructive:
                    'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
                outline: 'text-foreground',
                muted: 'border-gray-300 bg-gray-100 text-gray-500',
                served: 'border-transparent bg-served text-served-foreground shadow hover:bg-served/80',
                payment: 'border-transparent bg-payment text-payment-foreground shadow hover:bg-payment/80',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    );
}

export { Badge, badgeVariants };
