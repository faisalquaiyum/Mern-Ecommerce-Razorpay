import React, { useContext } from "react";
import AppContext from "../../context/AppContext";
import { FaSignOutAlt, FaEnvelope, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { profile, logout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="bg-[#121212] text-white py-12 px-4">
      <div className="flex flex-col items-center justify-start gap-6 max-w-3xl mx-auto w-full">
        {/* Avatar */}
        <FaUserCircle className="text-yellow-400" size={120} />

        {profile ? (
          <div className="w-full">
            {/* Name */}
            <h1 className="text-3xl font-bold text-center mb-4">{profile.name}</h1>

            {/* Divider */}
            <hr className="border-gray-700 mb-6" />

            {/* Details */}
            <div className="space-y-4 text-lg text-gray-300">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" />
                <span>{profile.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <FaCalendarAlt className="text-yellow-400" />
                <span>
                  Joined:{" "}
                  {new Date(profile.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <div className="mt-10 flex justify-center">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-full text-white font-medium"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Loading profile...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
