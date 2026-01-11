import { motion, AnimatePresence } from "framer-motion";
import { waiterPageVariants } from "../../constants/animationVariants";

interface ConfirmationModalProps {
    show: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function ConfirmationModal({
    show,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Evet",
    cancelText = "Hayır"
}: ConfirmationModalProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    variants={waiterPageVariants.modalBackdrop}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 font-['Kelly_Slab']"
                        variants={waiterPageVariants.modalContent}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                            {title}
                        </h2>
                        <p className="text-gray-600 mb-8 text-center text-lg">
                            {message}
                        </p>
                        <div className="flex gap-4">
                            <motion.button
                                onClick={onCancel}
                                className="flex-1 bg-[#8D8D8D] hover:bg-[#7D7D7D] text-white py-3 px-6 rounded-lg transition-colors text-lg font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {cancelText}
                            </motion.button>
                            <motion.button
                                onClick={onConfirm}
                                className="flex-1 bg-[#D35F5F] hover:bg-[#C24E4E] text-white py-3 px-6 rounded-lg transition-colors text-lg font-medium"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {confirmText}
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
