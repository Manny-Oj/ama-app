import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ReplyComposer({ username, onSubmit, onCancel }) {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);

  const MAX_CHARS = 300;
  const remaining = MAX_CHARS - text.length;
  const isOver = remaining < 0;
  const isEmpty = text.trim().length === 0;

  const autoGrow = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="mt-4 bg-gray-50 rounded-2xl p-4 border border-gray-200/70"
    >
      <p className="text-sm text-gray-600 mb-2">💬 {username}’s reply</p>

      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          autoGrow();
        }}
        className="
          w-full p-3 rounded-xl 
          bg-white border border-gray-200 
          focus:outline-none focus:ring-2 focus:ring-purple-300 
          resize-none overflow-hidden
        "
        rows={1}
        placeholder="Write your reply..."
      />

      <div className="flex justify-between items-center mt-3">
        <span className={`text-sm ${isOver ? "text-red-500" : "text-gray-400"}`}>
          {remaining}
        </span>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            Cancel
          </button>

          <button
            disabled={isEmpty || isOver}
            onClick={() => onSubmit(text)}
            className={`
              px-4 py-2 rounded-xl font-medium transition
              ${isEmpty || isOver
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-black text-white hover:opacity-90"}
            `}
          >
            Send it
          </button>
        </div>
      </div>
    </motion.div>
  );
}
