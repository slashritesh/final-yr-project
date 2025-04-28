import { getUserProfile } from "@/actions/users";
import ProjectCard from "@/components/ProjectCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserCircle2 } from "lucide-react";
import React from "react";

const page = async ({ params }: { params: Promise<{ userid: string }> }) => {
  const { userid } = await params;

  if (!userid) {
    return <div>Something Went Wrong!!</div>;
  }
  const data = await getUserProfile(userid);

  // console.log(data);

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex gap-5 p-10">
          <Avatar className="h-14 w-14">
            <AvatarImage
              className=""
              src={data?.profileimg || ""}
              alt={data?.firstname || "User"}
            />
            <AvatarFallback>
              <UserCircle2 className="h-8 w-8" />
            </AvatarFallback>
          </Avatar>
          <div className="">
            <h2 className="capitalize text-2xl font-medium">
              {data?.firstname + " " + data?.lastname}
            </h2>
            <h2 className="text-sm font-medium">{data?.email}</h2>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-4xl">{data?.posts.length}</p>
          <h3 className="text-xl">Total Projects</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {data?.posts.map((item, index) => {
          return (
            <ProjectCard
              key={index}
              authorName={data.firstname + " " + data.lastname}
              total_likes={0}
              views={0}
              comments={0}
              description={item.description}
              tags={item.tags}
              thumbnailUrl={item.thumbnail}
              title={item.title}
              id={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
