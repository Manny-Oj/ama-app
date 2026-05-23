import { motion, useMotionValue, animate } from "framer-motion";

export default function SwipeWrapper({ children, onDelete }) {
  const x = useMotionValue(0);

  const handleDragEnd = (_, info) => {
    const threshold = -90;

    if (info.offset.x < threshold) {
      animate(x, -120, { duration: 0.15 });
      setTimeout(onDelete, 120);
    } else {
      animate(x, 0, { type: "spring", stiffness: 260, damping: 22 });
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Subtle delete button */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-0">
        <button
          onClick={onDelete}
          className="
            bg-red-500 text-white 
            text-sm px-3 py-1 
            rounded-full shadow-sm
          "
        >
          delete
        </button>
      </div>

      {/* Swipeable card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -120, right: 0 }}
        dragElastic={0.15}
        dragMomentum={false}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
