export default function ReplyCard({ text, createdAt }) {
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
    <div className="relative ml-6 pl-6">
      {/* Curvy connector */}
      <div className="absolute left-0 top-3 w-6 h-6">
        <svg width="24" height="24">
          <path
            d="M 0 0 Q 0 12 12 12"
            stroke="#d1d5db"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="bg-gray-50 rounded-xl p-3 mt-2 border border-gray-200/70">
        <p className="text-gray-800">{text}</p>
        <p className="text-gray-400 text-xs mt-2">{timeAgo}</p>
      </div>
    </div>
  );
}
