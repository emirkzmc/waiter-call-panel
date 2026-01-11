import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomerBackground from '../../components/backgrounds/CustomerBackground';

function ConfirmationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { action, table } = location.state || { action: '', table: '' };

    useEffect(() => {
        // Auto-redirect after 3 seconds
        const timer = setTimeout(() => {
            navigate('/musteri');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigate]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const checkmarkVariants = {
        hidden: { scale: 0, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: 'spring' as const,
                stiffness: 200,
                damping: 15,
                duration: 0.6,
            },
        },
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <CustomerBackground>
            <motion.div
                className="flex flex-col items-center justify-center gap-12 w-full max-w-125"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Checkmark Circle */}
                <motion.div
                    className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-lg"
                    variants={checkmarkVariants}
                >
                    <svg
                        width="120"
                        height="120"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <motion.path
                            d="M5 13l4 4L19 7"
                            stroke="#666"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        />
                    </svg>
                </motion.div>

                {/* Confirmation Text */}
                <motion.h1
                    className="text-5xl text-white font-['Kelly_Slab'] drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] m-0 leading-tight text-center"
                    variants={textVariants}
                >
                    İşlem Onaylandı
                </motion.h1>

                {/* Optional: Display action and table info */}
                {action && table && (
                    <motion.p
                        className="text-2xl text-white/80 font-['Kelly_Slab'] text-center"
                        variants={textVariants}
                    >
                        {action} - {table}
                    </motion.p>
                )}
            </motion.div>
        </CustomerBackground>
    );
}

export default ConfirmationPage;
