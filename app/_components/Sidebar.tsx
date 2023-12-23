"use client";

import { cn } from "@/lib/utils";
import { FileQuestion, Layout, Menu, Settings, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarItem from "./SidebarItem";
import { useContext, useState } from "react";
import { SidebarOpenContext } from "../context/sidebarOpenContext";

interface SidebarProps {}

const sidebarRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: FileQuestion,
    label: "Questions",
    href: "/dashboard/questions",
  },
  {
    icon: User,
    label: "Users",
    href: "/dashboard/user",
  },
  {
    icon: Settings,
    label: "Settings",
    href: "/dashboard/settings",
  },
];

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const { openSidebar, isSidebarOpen, setIsSidebarOpen } =
    useContext(SidebarOpenContext);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-full border border-r border-gray-300 w-fit">
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild className="hover:opacity-75 transition">
          <Menu
            onClick={() => setIsSidebarOpen(false)}
            className="h-12 w-12 cursor-pointer p-2"
          />
        </SheetTrigger>
        <SheetContent side="left" className="w-[200px] sm:w-[250px] mt-14 p-0">
          <div className="pt-10 flex flex-col justify-start w-full">
            {sidebarRoutes.map((route) => (
              <SidebarItem key={route.href} route={route} />
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
export default Sidebar;
