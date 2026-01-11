import { type ReactNode } from 'react';

interface GradientBackgroundProps {
    children: ReactNode;
}

function CustomerBackground({ children }: GradientBackgroundProps) {
    return (
        <div className="w-full min-h-screen bg-linear-to-r from-[#3a3a3a] to-[#c5c5c5] flex items-center justify-center p-5">
            {children}
        </div>
    );
}

export default CustomerBackground;
