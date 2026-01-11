import { motion } from 'framer-motion';

interface ButtonProps {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'glassmorphism';
    disabled?: boolean;
    className?: string;
}

export default function Button({
    label,
    onClick,
    variant = 'primary',
    disabled = false,
    className = ''
}: ButtonProps) {
    const variantStyles = {
        primary: 'bg-[#8D8D8D] hover:bg-[#7D7D7D] text-white px-4 py-2',
        secondary: 'bg-[#C4C4C4] hover:bg-[#B0B0B0] text-gray-800 px-4 py-2',
        success: 'bg-[#7BB57E] hover:bg-[#6AA46D] text-white px-4 py-2',
        danger: 'bg-[#D35F5F] hover:bg-[#C24E4E] text-white px-4 py-2',
        glassmorphism: "font-['Kelly_Slab'] text-center py-2.5 px-2.5 w-full max-w-60 text-base sm:text-lg text-white bg-black/10 backdrop-blur-md border border-b-white/30 border-t-white/30 hover:bg-white/30"
    };

    const disabledStyles = 'opacity-50 cursor-not-allowed';

    const baseStyles = variant === 'glassmorphism'
        ? 'rounded-[20px] transition-all duration-300 font-medium'
        : 'rounded transition-colors text-base font-medium';

    const hoverEffect = variant === 'glassmorphism' && !disabled
        ? { y: -2, boxShadow: '0 4px 16px 0 rgba(31,38,135,0.3)' }
        : !disabled ? { scale: 1.05 } : {};

    const tapEffect = variant === 'glassmorphism' && !disabled
        ? { y: 0 }
        : !disabled ? { scale: 0.95 } : {};

    return (
        <motion.button
            onClick={onClick}
            disabled={disabled}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${disabled ? disabledStyles : ''}
                ${className}
            `}
            whileHover={hoverEffect}
            whileTap={tapEffect}
        >
            {label}
        </motion.button>
    );
}
