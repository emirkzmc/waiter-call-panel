import { motion } from "framer-motion";
import WaiterBackground from "../../components/backgrounds/WaiterBackground";
import WaiterOptionsCard from "../../components/custom/WaiterOptionsCard";
import { waiterPageVariants } from "../../constants/animationVariants";

export default function WaiterPage() {
    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={waiterPageVariants.pageContainer}
        >
            <WaiterBackground className="p-8 items-center">
                <motion.div
                    className="bg-black/25 w-full h-[80%] rounded-4xl flex justify-center items-center px-2"
                    variants={waiterPageVariants.cardContainer}
                >
                    <WaiterOptionsCard />
                </motion.div>
            </WaiterBackground>
        </motion.div>
    );
}