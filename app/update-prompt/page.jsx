"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Form from "../../components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get the promptId from the query string
  const promptId = router.query.id; 

  useEffect(() => {
    if (promptId) {
      const getPromptDetails = async () => {
        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          if (!response.ok) throw new Error("Failed to fetch prompt details");
          const data = await response.json();
          setPost({ prompt: data.prompt, tag: data.tag });
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      getPromptDetails();
    }
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to update prompt");
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading prompt details...</div>;
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
