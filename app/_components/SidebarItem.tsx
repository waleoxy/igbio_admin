"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  route: {
    icon: LucideIcon;
    label: string;
    href: string;
  };
}

const SidebarItem: React.FC<SidebarItemProps> = ({ route }) => {
  const { href, icon: Icon, label } = route;

  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      onClick={onClick}
      href={href}
      className={cn(
        "flex mb-4 space-x-1 text-lg w-full pl-6 py-2 hover:text-sky-700 hover:bg-sky-300/20",
        {
          "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700 ":
            isActive,
        }
      )}>
      <Icon />
      <h5>{label}</h5>
    </Link>
  );
};
export default SidebarItem;
