import React from 'react';

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='text-start text-red-500 text-sm font-outfit mt-2'>
            {children}
        </div>
    );
};
