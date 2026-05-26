import React from "react";
import { Link, Outlet } from "react-router";
import SideMenu from "../../components/shared/SideMenu";
import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { CloudAlert } from "lucide-react";
function UserLayout() {
  const [checkLogin, logoutUser] = useAuth();

  if (!checkLogin()) {
    return (
      <div className="p-10 flex flex-col gap-4 items-center justify-center">
        <CloudAlert size={50} />
        <h1 className="text-center text-3xl font-semibold">
          Login to access this page !!
        </h1>
        <Button size="lg" variant="outline">
          <Link to={"/login"}>Login</Link>
        </Button>
      </div>
    );
  }

  if (checkLogin()) {
    return (
      <div className="flex h-screen bg-background text-foreground">
        <SideMenu />

        {/* Main Content Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    );
  }
}

export default UserLayout;
