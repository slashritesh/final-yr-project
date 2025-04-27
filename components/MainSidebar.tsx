import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ChartArea, EyeIcon, MessageCircle, ThumbsUp } from "lucide-react";

const Categories = [
  "Artificial Intelligence",
  "Machine Learning",
  "Data Science",
  "Full Stack Development",
  "Frontend Development",
  "Backend Development",
  "Cloud Computing",
  "DevOps",
  "Cybersecurity",
  "Blockchain",
  "Mobile App Development",
  "AR/VR Development",
];

const MainSidebar = () => {
  return (
    <aside className="py-5">
      <div className="flex border-b flex-col gap-2 text-sm">
        <Link
          className="text-left flex gap-2 hover:bg-muted p-3 rounded-sm"
          href={"/"}
        >
          <MessageCircle size={20} /> Top Commented
        </Link>
        <Link
          className="text-left flex gap-2 hover:bg-muted p-3 rounded-sm"
          href={"/"}
        >
          <ThumbsUp size={20} /> Top Liked
        </Link>
        <Link
          className="text-left mb-4 flex gap-2 hover:bg-muted p-3 rounded-sm"
          href={"/"}
        >
          <EyeIcon size={20} /> Most Viewed
        </Link>
      </div>
      <div className="my-5">
        <h3>Explore Topics</h3>
        <div className="flex flex-col gap-2 my-3">
          {Categories.map((item,index) => {
            return <div className="text-sm p-2 border w-fit px-4 rounded-full hover:bg-muted" key={index}>{item}</div>;
          })}
        </div>
      </div>
    </aside>
  );
};

export default MainSidebar;
