"use client";

import { getCommentsOnProject } from "@/actions/comment";
import { getSingleProject } from "@/actions/project";
import { CommentForm } from "@/components/CommentForm";
import ProjectDetailsSkeleton from "@/components/ProjectSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import { Eye, ThumbsDown, ThumbsUp, UserCircle2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProjectTypes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  views: number | null;
  total_likes: number | null;
  author: {
    id: string;
    profileimg: string | null;
    firstname: string | null;
    lastname: string | null;
  };
}

interface CommentTypes {
  id: string;
  content: string;
  projectId: string;
  authorId: string;
  createdAt: Date;
  commentby: {
    profileimg: string | null;
    firstname: string | null;
    lastname: string | null;
  };
}

const SinglePostPage = () => {
  const [post, setPost] = useState<ProjectTypes | undefined>(undefined);
  const [comments, setComments] = useState<CommentTypes[] | []>([]);

  const params = useParams<{ projectid: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      if (!params.projectid) return;
      const data = await getSingleProject(params.projectid);
      const resComments = await getCommentsOnProject(params.projectid);
      if (!data) {
        console.log("No data found");
        return;
      }
      if (!resComments) {
        console.log("No data found");
        return;
      }
      setPost(data);
      

      setComments(resComments);
    };
    fetchPost();
  }, [params.projectid]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProjectDetailsSkeleton />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex gap-2 p-2 text-sm px-3 border rounded-full items-center">
            <p className="capitalize">
              by {post.author.firstname + " " + post.author.lastname}
            </p>
          </div>
          <div className="flex gap-5 text-sm">
            <p className="p-2 border rounded-full px-3">
              {formatRelativeDate(new Date(post.updatedAt).toDateString())}
            </p>
            <p className="p-2 border rounded-full px-3">
              Created on: {formatDate(new Date(post.createdAt))}
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-4 rounded-lg border-orange-600 w-full h-96 mb-6">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <p className="text-lg mb-4">{post.description}</p>

      <div className="flex justify-between">
        <div className="mb-4">
          <p className="font-semibold">Tags:</p>
          <div className="flex mt-3 gap-3 flex-wrap">
            {post.tags.map((tag, index) => (
              <p
                key={index}
                className="p-2 bg-orange-900/30 text-sm px-5 rounded-full"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-2 my-5 text-white rounded-full">
            <Eye /> <p className="text-xl">{post.views ?? 0}</p>
          </div>
          <div className="flex items-center gap-2 my-5 text-white rounded-full">
            <ThumbsUp /> <p className="text-xl">{post.total_likes ?? 0}</p>
          </div>
        </div>
      </div>

      <div className="">
        <CommentForm projectId={post.id} />
      </div>

      <div className="my-10">
        {comments.map((item, index) => {
          return (
            <div
              className="p-5 border rounded-lg flex gap-5 items-center justify-between"
              key={index}
            >
              <div className="flex gap-5 items-center">
                <div>
                  <Avatar>
                    <AvatarImage
                      src={item.commentby.profileimg || ""}
                      alt={item.commentby.firstname || "User"}
                    />
                    <AvatarFallback>
                      <UserCircle2 className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <p>{item.content}</p>
              </div>
              <p className="text-sm p-2 bg-muted px-5 rounded-lg">{formatRelativeDate(item.createdAt.toDateString())}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SinglePostPage;
