import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser, logout } from "../features/auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>{error}</h2>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>Please log in to view your profile.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-56 bg-linear-to-r from-blue-600 via-purple-600 to-pink-500"></div>

        <div className="relative px-8 pb-10">
          <img
            src={user.avatar?.url || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
            alt=""
            className="w-40 h-40 rounded-full border-8 border-white object-cover absolute -top-20 left-8 shadow-lg"
          />

          <div className="pt-24 flex flex-col md:flex-row justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-gray-500 mt-2">{user.email}</p>
              <span className="inline-block mt-3 px-4 py-1 bg-blue-100 text-blue-700 rounded-full">
                {user.role || "User"}
              </span>
            </div>

            <div className="mt-5 md:mt-0 flex gap-3">
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">About</h2>
            <p className="text-gray-600 mt-3">
              {user.bio || "No bio added yet."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-blue-50 p-6 rounded-xl text-center">
              <h3 className="text-2xl font-bold">0</h3>
              <p>Followers</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-xl text-center">
              <h3 className="text-2xl font-bold">0</h3>
              <p>Following</p>
            </div>

            <div className="bg-pink-50 p-6 rounded-xl text-center">
              <h3 className="text-2xl font-bold">0</h3>
              <p>Posts</p>
            </div>
          </div>

          <div className="mt-10 bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-3">
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "User"}
              </p>
              <p>
                <strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;