import { getMyProjects } from "@/actions/project";
import ProjectCard from "@/components/ProjectCard";
import { prisma } from "@/lib/db";
import React from "react";

const page = async () => {
  const data = await getMyProjects();

  return (
    <div className="my-10">
      <h3 className="text-xl">My Projects</h3>
      <div className="grid grid-cols-2 my-5">
        {data.data.map((item, index) => {
          return (
            <ProjectCard
              id={item.id}
              views={item.views}
              tags={item.tags}
              likes={item.likes}
              description={item.description}
              comments={item.views}
              title={item.title}
              thumbnailUrl={item.thumbnailUrl}
              authorName={item.authorName}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default page;
