export default function TagSelector({ tags, setTags }) {
  const options = ["Life", "Work", "Business", "Advice", "Random"];

  const toggle = (tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap mt-3">
      {options.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={`
            px-3 py-1 rounded-full text-sm border
            ${
              tags.includes(tag)
                ? "bg-black text-white border-black"
                : "bg-white text-gray-600 border-gray-300"
            }
          `}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
