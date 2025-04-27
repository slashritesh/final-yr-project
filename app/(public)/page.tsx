import ProjectCard from "@/components/ProjectCard";
import React from "react";

const Projects = [
  {
    id: "1",
    thumbnailUrl: "https://source.unsplash.com/400x300/?technology,project",
    title: "Campus Buddy App",
    description:
      "Simplify campus life for students through a smart app for events, updates, and networking.",
    authorName: "Ananya Sharma",
    tags: ["react", "firebase", "collegeapp"],
    likes: 120,
    comments: 34,
    views: 890,
  },
  {
    id: "2",
    thumbnailUrl: "https://source.unsplash.com/400x300/?robotics",
    title: "Autonomous Delivery Robot",
    description:
      "A robot capable of delivering packages inside campus autonomously.",
    authorName: "Rahul Mehta",
    tags: ["robotics", "ai", "iot"],
    likes: 80,
    comments: 20,
    views: 500,
  },
  {
    id: "3",
    thumbnailUrl: "https://source.unsplash.com/400x300/?education,app",
    title: "Study Tracker",
    description: "Track your study hours, subjects, and deadlines with ease.",
    authorName: "Sanya Verma",
    tags: ["productivity", "nextjs", "tailwindcss"],
    likes: 95,
    comments: 28,
    views: 650,
  },
];

const page = () => {
  return (
    <div className="my-10">
      <div className="flex gap-5 flex-col">
        {Projects.map((project) => (
          <ProjectCard
            key={project.id}
            thumbnailUrl={project.thumbnailUrl}
            title={project.title}
            description={project.description}
            authorName={project.authorName}
            tags={project.tags}
            likes={project.likes}
            comments={project.comments}
            views={project.views}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
