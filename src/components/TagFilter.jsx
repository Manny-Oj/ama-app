export default function TagFilter({ activeTag, setActiveTag, allTags }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mt-4 no-scrollbar">
      {["All", ...allTags].map((tag) => {
        const isActive = activeTag === tag;
        return (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`
              px-4 py-1 rounded-full whitespace-nowrap text-sm border
              transition
              ${
                isActive
                  ? "bg-black text-white border-black"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }
            `}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
