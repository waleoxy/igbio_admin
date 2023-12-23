"use client";

import MaxWidthWrapper from "@/app/_components/MaxWidthWrapper";
import { SidebarOpenContext } from "@/app/context/sidebarOpenContext";
import { cn } from "@/lib/utils";
import { useContext } from "react";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const { isSidebarOpen } = useContext(SidebarOpenContext);
  console.log(isSidebarOpen);

  return (
    <>
      <MaxWidthWrapper className="">
        <div
          className={cn("flex", {
            "md:ml-[300px]": isSidebarOpen,
            "ml-0": !isSidebarOpen,
          })}>
          This is the dashboard
        </div>
      </MaxWidthWrapper>
    </>
  );
};
export default Dashboard;
