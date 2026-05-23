import { useState } from "react";
import ReplyList from "./ReplyList";
import ReplyComposer from "./ReplyComposer";

export default function QuestionCard({
  text,
  createdAt,
  likes,
  tags,
  replies,
  onLike,
  onReply,
  onDelete,
  username,
}) {
  const [isReplying, setIsReplying] = useState(false);

  const timeAgo = (() => {
    const diff = Date.now() - createdAt;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  })();

  return (
    <div className="relative rounded-2xl bg-white p-5 shadow-sm border border-gray-200/80">
      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition text-sm"
      >
        delete
      </button>

      <p className="text-gray-900">{text}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {tags.map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center mt-3">
        <span className="text-gray-400 text-sm">{timeAgo}</span>

        <div className="flex gap-4 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike();
            }}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ❤️ {likes}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsReplying(true);
            }}
            className="text-gray-500 hover:text-black transition"
          >
            💬
          </button>
        </div>
      </div>

      {/* Inline reply composer */}
      {isReplying && (
        <ReplyComposer
          username={username}
          onCancel={() => setIsReplying(false)}
          onSubmit={(replyText) => {
            onReply(replyText);
            setIsReplying(false);
          }}
        />
      )}

      {/* Replies */}
      {replies.length > 0 && <ReplyList replies={replies} />}
    </div>
  );
}
