import * as React from 'react';

import { cn } from '@/lib/utils';
import { UseFormRegisterReturn } from 'react-hook-form';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    register?: UseFormRegisterReturn;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, register, ...props }, ref) => {
        return (
            <input
                type={type}
                className={cn(
                    'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ',
                    className
                )}
                ref={ref}
                {...props}
                {...register}
            />
        );
    }
);
Input.displayName = 'Input';

export { Input };
