import SwipeWrapper from "./SwipeWrapper";
import QuestionCard from "./QuestionCard";
import { motion, AnimatePresence } from "framer-motion";

export default function QuestionList({
  questions,
  onLike,
  onDelete,
  onReply,
  username,
}) {
  if (questions.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-400">
        No questions yet — be the first to ask.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-6">
      <AnimatePresence>
        {questions.map((q) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            <SwipeWrapper onDelete={() => onDelete(q.id)}>
              <QuestionCard
                text={q.text}
                createdAt={q.createdAt}
                likes={q.likes}
                tags={q.tags}
                replies={q.replies}
                onLike={() => onLike(q.id)}
                onReply={(replyText) => onReply(q.id, replyText)}
                onDelete={() => onDelete(q.id)}
                username={username}
              />
            </SwipeWrapper>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
