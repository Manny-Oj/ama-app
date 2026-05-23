import ReplyCard from "./ReplyCard";

export default function ReplyList({ replies }) {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="mt-3">
      {replies.map((r) => (
        <ReplyCard key={r.id} text={r.text} createdAt={r.createdAt} />
      ))}
    </div>
  );
}
