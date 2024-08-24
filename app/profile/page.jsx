"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "../../components/Profile";

const MyProfile = () => {
  const { data: session, status } = useSession();  // Include status to check if session is loading
  const [myPosts, setMyPosts] = useState([]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  useEffect(() => {
    // Check if session is still loading or if user ID is not available
    if (status === "loading" || !session?.user.id) {
      console.log("Session is loading or user ID not found");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        const data = await response.json();
        console.log("Fetched posts data:", data);
        setMyPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [session, status]);  // Depend on session and status

  console.log("myPosts state:", myPosts);

  return (
    <Profile
      name="My profile"
      desc="Welcome to Your Personalized Profile Page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
