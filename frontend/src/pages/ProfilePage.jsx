import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(data);
      } catch (err) {
        toast.error("Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/profile`, profile, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Profile updated successfully");
      setProfile({ ...data, password: "" });
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading your profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center">
        <FaUserCircle className="text-gray-400 text-7xl mb-3" />
        <h2 className="text-2xl font-semibold text-gray-800">{profile.name || "User"}</h2>
        <p className="text-gray-500">{profile.email}</p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-6"></div>

      {/* Editable Fields */}
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-600">Full Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className={`w-full mt-1 p-2 border rounded-md ${
              isEditing
                ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            disabled
            className="w-full mt-1 p-2 border rounded-md bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">New Password</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Enter new password"
            className={`w-full mt-1 p-2 border rounded-md ${
              isEditing
                ? "focus:outline-none focus:ring-2 focus:ring-blue-500"
                : "bg-gray-100 cursor-not-allowed"
            }`}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
