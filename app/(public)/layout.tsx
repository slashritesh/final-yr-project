import MainSidebar from "@/components/MainSidebar";
import Navbar from "@/components/Navbar";
import RightSidebar from "@/components/RightSidebar";
import React from "react";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>
  <Navbar />
  
  <div className="flex mx-12 mt-5"> {/* Flex container for layout */}
    
    {/* Left Sidebar (Navigation, Filters) */}
    <div className="w-[250px] border-r pr-5"> {/* Fixed width for the left sidebar */}
      <MainSidebar />
    </div>

    {/* Main Content Area (Posts, Project Ideas, Discussions) */}
    <div className="flex-1 mx-5"> {/* Main content takes remaining space */}
      {children} {/* This will render the main content (e.g., list of posts or project ideas) */}
    </div>

    {/* Right Sidebar (Trending, Recommendations, Ads) */}
    <div className="w-[300px] border-l pl-5"> {/* Fixed width for the right sidebar */}
      <RightSidebar />
    </div>
  </div>
</main>



}
