"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "../../components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        if (data) {
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } else {
          // Handle case where no prompt is found
          alert("Prompt not found");
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to fetch prompt:", error);
        alert("Failed to fetch prompt.");
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    if (promptId) {
      getPromptDetails();
    }
  }, [promptId, router]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
        headers: {
          "Content-Type": "application/json", // Ensure correct content type for PATCH request
        },
      });

      if (response.ok) {
        router.push("/"); // Redirect after successful update
      } else {
        console.log("Error updating prompt:", await response.json());
      }
    } catch (error) {
      console.log("Error updating prompt:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div></div>; // Provide a loading UI
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

const UpdatePromptPage = () => (
  <Suspense fallback={<div></div>}>
    <UpdatePrompt />
  </Suspense>
);

export default UpdatePromptPage;
