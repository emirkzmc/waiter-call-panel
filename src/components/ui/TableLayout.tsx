import type { ReactNode } from 'react';

interface TableLayoutProps {
    children: ReactNode;
    className?: string;
}

interface TableLayoutHeaderProps {
    children: ReactNode;
    className?: string;
}

interface TableLayoutBodyProps {
    children: ReactNode;
    className?: string;
}

interface TableLayoutRowProps {
    children: ReactNode;
    className?: string;
}

interface TableLayoutCellProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'center' | 'right';
}

export function TableLayout({ children, className = '' }: TableLayoutProps) {
    return (
        <div className={`rounded-lg overflow-hidden shadow-lg w-full ${className}`}>
            {children}
        </div>
    );
}

export function TableLayoutHeader({ children, className = '' }: TableLayoutHeaderProps) {
    return (
        <div className={`bg-white border-b-2 border-gray-300 ${className}`}>
            {children}
        </div>
    );
}

export function TableLayoutBody({ children, className = '' }: TableLayoutBodyProps) {
    return (
        <div className={`bg-[#DDDDDD]/35 flex-1 overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

export function TableLayoutRow({ children, className = '' }: TableLayoutRowProps) {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    );
}

export function TableLayoutCell({ children, className = '', align = 'left' }: TableLayoutCellProps) {
    const alignClass = {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right'
    };

    return (
        <div className={`${alignClass[align]} ${className}`}>
            {children}
        </div>
    );
}

export default TableLayout;
