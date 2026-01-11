import { type ReactNode } from 'react';

interface GradientBackgroundProps {
    children: ReactNode;
    className?: string;
}
export default function WaiterBackground({ children , className}: GradientBackgroundProps) {
    return (
        <div className={`w-full min-h-screen bg-linear-to-r from-[#3a3a3a] to-[#c5c5c5] flex flex-col items-center justify-center ${className}`}>
            {children}
        </div>
    )
}
