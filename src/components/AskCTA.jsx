import { motion } from "framer-motion";

export default function AskCTA({ onOpen }) {
  return (
    <div className="relative w-full mt-4">
      {/* Subtle gradient halo */}
      <div
        className="
          absolute -inset-2
          rounded-3xl
          blur-2xl
          opacity-40
          bg-gradient-to-br from-purple-300/40 to-pink-300/40
          pointer-events-none
        "
      />

      <motion.button
        onClick={onOpen}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 140, damping: 12 }}
        whileHover={{
          scale: 1.03,
          boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
        }}
        whileTap={{ scale: 0.96 }}
        className="
          relative z-10
          w-full py-4
          rounded-3xl
          bg-black text-white
          font-medium text-lg
          shadow-sm shadow-black/10
          transition-colors
        "
      >
        Ask a question
      </motion.button>
    </div>
  );
}
