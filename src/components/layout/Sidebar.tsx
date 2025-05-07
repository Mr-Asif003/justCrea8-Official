import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Home,
  User,
  LayoutDashboard,
  FileEdit,
  StickyNote,
  CheckSquare,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";

export function Sidebar({ open, onClose }) {
  const { user } = useAuth();

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-background border-r border-border shadow-lg transform transition-transform duration-300",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 flex items-center justify-between border-b">
          <NavLink to="/userHome" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-justcre8-purple to-justcre8-aqua rounded-xl flex items-center justify-center text-white font-bold">
              J8
            </div>
            <span className="text-xl font-bold text-foreground">JustCre8</span>
          </NavLink>
          <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-1">
            <NavLink
              to="/userHome"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <Home className="h-5 w-5" />
              Home
            </NavLink>

            <NavLink
              to="/account"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <User className="h-5 w-5" />
              Account
            </NavLink>
            <NavLink
              to="/project"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              Projects
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </NavLink>

            <NavLink
              to="/blog-maker"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <FileEdit className="h-5 w-5" />
              Blog Maker
            </NavLink>

            <NavLink
              to="/notes"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <StickyNote className="h-5 w-5" />
              Notes
            </NavLink>

            <NavLink
              to="/todos"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <CheckSquare className="h-5 w-5" />
              ToDos
            </NavLink>

            <NavLink
              to="/settings"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <Settings className="h-5 w-5" />
              Settings
            </NavLink>

            <NavLink
              to="/help"
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors",
                  isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"
                )
              }
            >
              <HelpCircle className="h-5 w-5" />
              Help
            </NavLink>
          </nav>
        </div>

        {user && (
          <div className="p-4 border-t flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user.displayName || "User"}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        )}
      </div>
    </aside>
  );
}
