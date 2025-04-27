import { getAllProjects } from "@/actions/project";
import ProjectCard from "@/components/ProjectCard";
import React from "react";



const page = async () => {
  const data = await getAllProjects()
  return (
    <div className="my-5">
      <div className="flex gap-5 flex-col">
        {data.data.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            thumbnailUrl={project.thumbnailUrl}
            title={project.title}
            description={project.description}
            authorName={project.authorName}
            tags={project.tags}
            total_likes={project.total_likes}
            comments={project.comments}
            views={project.views}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
