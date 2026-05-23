import { motion } from "framer-motion";
import avatarPlaceholder from "../assets/avatar-placeholder.jpg";

export default function ProfileHeader({ profile = {} }) {
  // Correct fallback logic
  const profile_image = profile.profile_image || avatarPlaceholder;

  const {
    display_name = "",
    username = "",
    tagline = "",
    location = "",
  } = profile;

  return (
    <div className="w-full flex flex-col items-center text-center py-6">
      {/* Avatar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        whileHover={{ scale: 1.03 }}
        className="w-28 h-28 rounded-2xl overflow-hidden shadow-md shadow-black/5 border border-gray-200 bg-white"
      >
        <img
          src={profile_image}
          alt={display_name || "User avatar"}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.25 }}
        className="mt-4 text-2xl font-semibold text-gray-900"
      >
        {display_name || "Unnamed User"}
      </motion.h1>

      {/* Username */}
      {username && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.25 }}
          className="text-sm text-gray-500"
        >
          @{username}
        </motion.p>
      )}

      {/* Tagline */}
      {tagline && (
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26, duration: 0.25 }}
          className="mt-3 text-gray-700 max-w-xs leading-relaxed"
        >
          {tagline}
        </motion.p>
      )}

      {/* Location */}
      {location && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.25 }}
          className="mt-2 flex items-center gap-1 text-gray-500 text-sm"
        >
          <motion.span
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
          >
            📍
          </motion.span>
          {location}
        </motion.div>
      )}

      {/* Divider */}
      <div className="w-full mt-8 border-t border-gray-200"></div>
    </div>
  );
}
