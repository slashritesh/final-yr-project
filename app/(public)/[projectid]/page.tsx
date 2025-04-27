import { getSingleProject } from "@/actions/project";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatDate, formatRelativeDate } from "@/lib/utils";
import { Eye, ThumbsUp, UserCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = async ({ params }: { params: Promise<{ projectid: string }> }) => {
  const { projectid } = await params;
  const data = await getSingleProject(projectid);
  // console.log(data);

  if (!data) {
    return <div>No project found.</div>;
  }

  const {
    thumbnail,
    createdAt,
    updatedAt,
    title,
    description,
    tags,
    author,
    views,
    likes,
  } = data;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <div className="mb-4 flex w-full items-center justify-between">
          <div className="flex gap-2 p-2 text-sm px-3 border rounded-full items-center">
            <p className="capitalize">
              by {author.firstname} {author.lastname}
            </p>
          </div>
          <div className="flex gap-5 text-sm ">
            <p className="p-2 border rounded-full px-3">
              {formatRelativeDate(updatedAt.toDateString())}
            </p>

            <p className="p-2 border rounded-full px-3">
              created on : {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </div>

      <div className="relative border-4 rounded-lg border-orange-600 w-full h-96 mb-6">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      <p className="text-lg mb-4">{description}</p>

      <div className="mb-4">
        Tags :
        <div className="flex mt-3 gap-3">
          {" "}
          {tags.map((item, index) => {
            return (
              <p
                key={index}
                className="p-2 bg-orange-900/30 text-sm px-5 rounded-full"
              >
                {item}
              </p>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center pb-6 border-b gap-6 mt-4 text-gray-600">
        <div className="flex gap-10 items-center">
          <div className="flex items-center gap-5 my-5 text-white rounded-full">
            <Eye /> <p className="text-xl">{views ?? 0}</p>
          </div>
          <div className="flex items-center gap-5 my-5 text-white rounded-full">
            <ThumbsUp /> <p className="text-xl">{likes ?? 0}</p>
          </div>
        </div>
        <div>
          <Button>Add Comment</Button>
        </div>
      </div>
    </div>
  );
};

export default page;
