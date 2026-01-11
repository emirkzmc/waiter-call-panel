import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CallsTable from "./CallsTable";
import TablesManagement from "./TablesManagement";
import { waiterPageVariants } from "../../constants/animationVariants";

type ViewType = "dashboard" | "tables";

export default function WaiterOptionsCard() {
  const [activeView, setActiveView] = useState<ViewType>("dashboard");

  return (
    <div className="flex gap-4 w-full h-[calc(100vh-6rem)] my-6 rounded-3xl p-4">
      <motion.div
        className="bg-[#D6D6D6] rounded-2xl p-4 flex flex-col items-center gap-6 w-60"
        initial="hidden"
        animate="visible"
        variants={waiterPageVariants.sidebar}
      >
        <motion.div
          className="w-full rounded-xl py-8 flex items-center justify-center"
          variants={waiterPageVariants.logo}
        >
          <h1 className="text-6xl text-white tracking-wider">NOOK</h1>
        </motion.div>

        <div className="w-full flex flex-col gap-3">
          <motion.button
            onClick={() => setActiveView("dashboard")}
            className={`${activeView === "dashboard"
              ? "bg-[#A0A0A0] border border-black"
              : "bg-[#C4C4C4] hover:bg-[#B0B0B0]"
              } transition-colors w-full py-2 rounded-lg text-lg font-medium text-gray-800`}
            variants={waiterPageVariants.navButton}
            whileHover="hover"
            whileTap="tap"
          >
            Dashboard
          </motion.button>
          <motion.button
            onClick={() => setActiveView("tables")}
            className={`${activeView === "tables"
              ? "bg-[#A0A0A0] border border-black"
              : "bg-[#C4C4C4] hover:bg-[#B0B0B0]"
              } transition-colors w-full py-2 rounded-lg text-lg font-medium text-gray-800`}
            variants={waiterPageVariants.navButton}
            whileHover="hover"
            whileTap="tap"
          >
            Masalar
          </motion.button>
        </div>
      </motion.div>

      <div className="flex-1 rounded-2xl p-4 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={waiterPageVariants.contentArea}
            className="h-full flex flex-col"
          >
            {activeView === "dashboard" ? <CallsTable /> : <TablesManagement />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
