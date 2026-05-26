import React from "react";
import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useAuthContenxt } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { theme, setTheme } = useTheme();
  const { token, user } = useAuthContenxt();
  const [checkLogin, logoutUser] = useAuth();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Features", path: "/features" },
  ];

  return (
    <header className="w-full sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <nav className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary hover:opacity-90 transition-opacity"
        >
          Smart<span className="text-foreground">Quiz</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-gray-700" />
            )}
          </Button>

          {checkLogin() && (
            <>
              <Link to="/users">
                <Button variant="outline" className="rounded-full">
                  {user.name}
                </Button>
              </Link>

              <Button
                onClick={() => {
                  logoutUser();
                }}
                className="cursor-pointer rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Logout
              </Button>
            </>
          )}

          {!checkLogin() && (
            <>
              <Link to="/login">
                <Button variant="outline" className="rounded-full">
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:text-primary"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-6">
            <div className="flex flex-col gap-6 mt-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </NavLink>
              ))}

              {/* Theme Toggle for Mobile */}
              <Button
                variant="ghost"
                className="flex items-center justify-start gap-2 mt-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-gray-700" /> Dark Mode
                  </>
                )}
              </Button>

              {/* Auth Buttons */}
              <div className="flex flex-col gap-3 mt-4">
                <Link to="/login">
                  <Button variant="outline" className="w-full rounded-full">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

export default Navbar;
