import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import TagSelector from "./TagSelector";

export default function AskModal({ isOpen, onClose, onSubmit }) {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([]);
  const textareaRef = useRef(null);

  const MAX_CHARS = 140;

  // Auto-grow textarea
  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  // Close on ESC
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const remaining = MAX_CHARS - text.length;
  const isOverLimit = remaining < 0;
  const isEmpty = text.trim().length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="
            fixed inset-0 z-50 
            bg-black/30 backdrop-blur-sm 
            flex items-center justify-center 
            px-4
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
            className="
              w-full max-w-md 
              bg-white rounded-3xl 
              shadow-xl shadow-black/10 
              p-6
            "
          >
            <h2 className="text-xl font-semibold text-gray-900">
              Ask a question
            </h2>

            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                handleInput();
              }}
              onInput={handleInput}
              className="
                w-full mt-4 p-4 
                rounded-2xl 
                border border-gray-200 
                bg-gray-50 
                focus:outline-none 
                focus:ring-2 focus:ring-purple-300 
                resize-none
                overflow-hidden
              "
              rows={1}
              placeholder="What's on your mind?"
            />

            {/* Tag selector */}
            <TagSelector tags={tags} setTags={setTags} />

            {/* Character count */}
            <div className="flex justify-end mt-2">
              <span
                className={`
                  text-sm 
                  ${isOverLimit ? "text-red-500" : "text-gray-400"}
                `}
              >
                {remaining}
              </span>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="
                  text-gray-600 
                  hover:text-gray-800 
                  active:scale-95 
                  transition
                "
              >
                Cancel
              </button>

              <motion.button
                onClick={() => {
                  if (isEmpty || isOverLimit) return;
                  onSubmit(text, tags);
                  setText("");
                  setTags([]);
                }}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: isEmpty || isOverLimit ? 1 : 1.03 }}
                className={`
                  px-5 py-2 
                  rounded-xl 
                  font-medium 
                  shadow-sm shadow-black/10
                  transition
                  ${
                    isEmpty || isOverLimit
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-black text-white"
                  }
                `}
              >
                Submit
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
