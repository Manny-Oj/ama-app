import { useState, useEffect } from "react";
import ProfileHeader from "./components/ProfileHeader";
import AskCTA from "./components/AskCTA";
import AskModal from "./components/AskModal";
import QuestionList from "./components/QuestionList";
import TagFilter from "./components/TagFilter";
import avatar from "./assets/avatar-placeholder.jpg";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [activeTag, setActiveTag] = useState("All");

  const profile = {
    profile_image: avatar,
    display_name: "Manny",
    username: "manny",
    tagline: "Building cool things.",
    location: "Kitchener, ON",
  };

  // Load saved questions
  useEffect(() => {
    const saved = localStorage.getItem("questions");
    if (saved) setQuestions(JSON.parse(saved));
  }, []);

  // Save on change
  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (text, tags) => {
    setQuestions((prev) => [
      {
        id: Date.now(),
        text,
        createdAt: Date.now(),
        likes: 0,
        replies: [],
        tags: tags || [],
      },
      ...prev,
    ]);
    closeModal();
  };

  const handleLike = (id) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, likes: q.likes + 1 } : q)),
    );
  };

  const handleDelete = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleReply = (id, replyText) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id
          ? {
              ...q,
              replies: [
                {
                  id: Date.now(),
                  text: replyText,
                  createdAt: Date.now(),
                },
              ],
            }
          : q,
      ),
    );
  };

  const allTags = Array.from(new Set(questions.flatMap((q) => q.tags)));

  const filteredQuestions =
    activeTag === "All"
      ? questions
      : questions.filter((q) => q.tags.includes(activeTag));

  return (
    <div className="relative z-10 max-w-xl mx-auto px-4 pt-10 pb-32">
      <ProfileHeader profile={profile} />

      <AskCTA onOpen={openModal} />

      <TagFilter
        activeTag={activeTag}
        setActiveTag={setActiveTag}
        allTags={allTags}
      />

      <QuestionList
        questions={filteredQuestions}
        onLike={handleLike}
        onDelete={handleDelete}
        onReply={handleReply}
        username={profile.display_name}
      />

      <AskModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
