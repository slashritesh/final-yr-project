"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/actions/comment";

export function CommentForm({ projectId }: { projectId: string }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await createComment({ content, projectId });
      console.log(res);
      
      setContent(""); // Clear the textarea after successful comment
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Textarea
        placeholder="Write your comment..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px]"
      />
      <Button type="submit" className="self-end">
        Add Comment
      </Button>
    </form>
  );
}
