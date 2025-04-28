import { suggestUsers } from "@/actions/users";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Eye, MessageSquareDot, ThumbsUp, UserCircle2 } from "lucide-react";
import Link from "next/link";
import SuggestPostCard from "./SuggestPostCard";

const RightSidebar = async () => {
  const users = await suggestUsers();

  return (
    <aside>
      <div>
        <h3 className="">Suggested Post</h3>
        <SuggestPostCard />
        <SuggestPostCard />
        <SuggestPostCard />
      </div>
      <div className="my-5">
        <h3>Follow Users</h3>
        <div className="my-3 space-y-3">
          {users?.map((item, index) => {
            return (
              <Link
                href={`/profile/${item.id}`}
                key={index}
                className="p-2 px-5 rounded-lg border hover:bg-orange-950/30 flex items-center gap-3"
              >
                <Avatar>
                  <AvatarImage
                    src={item.profileimg || ""}
                    alt={item.firstname || "User"}
                  />
                  <AvatarFallback>
                    <UserCircle2 className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="user-info">
                  <p className="capitalize">
                    {item.firstname} {item.lastname}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    college student
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;



