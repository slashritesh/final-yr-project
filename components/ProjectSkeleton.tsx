import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailsSkeleton() {
  return (
    <div className="flex flex-col w-full gap-6 p-6">
      
      {/* Project Title */}
      <Skeleton className="h-10 w-2/3 rounded-xl" />

      {/* Author and Date Info */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-8 w-40 rounded-lg" />
        <Skeleton className="h-8 w-40 rounded-lg" />
      </div>

      {/* Image / Screenshot */}
      <Skeleton className="h-[400px] w-full rounded-2xl" />

      {/* Project Description */}
      <div className="flex flex-col gap-4 mt-6">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-4">
        <Skeleton className="h-8 w-20 rounded-full" />
        <Skeleton className="h-8 w-16 rounded-full" />
        <Skeleton className="h-8 w-24 rounded-full" />
      </div>
    </div>
  );
}
