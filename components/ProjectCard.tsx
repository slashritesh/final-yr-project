import {
  Heart,
  MessageCircle,
  Eye,
  UserCircle,
  MessageSquareDot,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  id : string,
  thumbnailUrl: string;
  title: string;
  authorName: string;
  description: string;
  total_likes: number;
  comments: number;
  views: number;
  tags : string[]
}

export default function ProjectCard({
  thumbnailUrl,
  id,
  tags,
  title,
  description,
  authorName,
  total_likes,
  comments,
  views,
}: ProjectCardProps) {
  return (
    <Link href={`/${id}`} className="border rounded-xl p-4 shadow-sm hover:shadow-md transition">
      <div className="flex gap-4">
        {/* Thumbnail */}
        <div className="w-full min-w-[300px] h-[200px] bg-amber-600 relative rounded-lg overflow-hidden">
          <Image src={thumbnailUrl} alt={title} fill className="object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
              {description}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-muted px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-base capitalize text-gray-500">by {authorName}</p>
            <div className="flex gap-4 text-gray-600 text-sm">
              <div className="flex items-center gap-1">
                <Eye size={16} /> {views}
              </div>
              <div className="flex items-center gap-1">
                <MessageSquareDot size={16} /> {comments}
              </div>
              <div className="flex items-center gap-1">
                <ThumbsUp size={16} /> {total_likes ?? 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
