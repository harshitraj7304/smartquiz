import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  ClipboardList,
  PlusCircle,
  User,
  LogOut,
  Menu,
  MessageSquare,
  List,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { useAuthContenxt } from "../../context/AuthContext";
import toast from "react-hot-toast";

function SideMenu() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { setToken, setUser } = useAuthContenxt();
  const navigate = useNavigate();

  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, link: "/users" },
    { name: "Quiz Feed", icon: List, link: "/users/feed" },
    { name: "My Quizzes", icon: ClipboardList, link: "/users/quizzes" },
    { name: "Create Quiz", icon: PlusCircle, link: "/users/create" },
    { name: "Profile", icon: User, link: "/users/profile" },
    { name: "Feedback", icon: MessageSquare, link: "/users/feedback" },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    toast.success("Logged out successfully.");
    navigate("/login");
  }

  return (
    <div
      className={cn(
        "flex flex-col h-full border-r bg-card transition-all duration-300 shrink-0",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2
          className={cn(
            "text-xl font-bold transition-all duration-300 overflow-hidden whitespace-nowrap",
            !isSidebarOpen && "opacity-0 w-0"
          )}
        >
          SmartQuiz
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="shrink-0"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Navigation links */}
      <nav className="p-3 space-y-1 flex-1">
        {navItems.map(({ name, icon: Icon, link }) => (
          <NavLink
            key={name}
            end={link === "/users"}
            to={link}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                !isSidebarOpen && "justify-center px-2"
              )
            }
            title={!isSidebarOpen ? name : undefined}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {isSidebarOpen && <span className="truncate">{name}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t">
        <button
          onClick={handleLogout}
          className={cn(
            "flex items-center w-full gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-colors duration-200",
            !isSidebarOpen && "justify-center px-2"
          )}
          title={!isSidebarOpen ? "Logout" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {isSidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
}

export default SideMenu;
