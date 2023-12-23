import { Metadata } from "next";
import { ReactNode } from "react";
import Sidebar from "../_components/Sidebar";
import Navbar from "../_components/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin dashboard of IGBiology",
};

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="relative h-full">
      <div className="absolute top-14 h-[calc(100%-3.5rem)] left-0">
        <Sidebar />
      </div>
      <Navbar />

      {children}
    </div>
  );
};
export default DashboardLayout;
