
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Menu, Bell } from "lucide-react";

interface TopNavbarProps {
  toggleSidebar: () => void;
}

export function TopNavbar({ toggleSidebar }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center bg-background border-b border-border px-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <Link to="/userHome" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-justcre8-purple to-justcre8-aqua rounded-xl flex items-center justify-center text-white font-bold text-xs">
              J8
            </div>
            <span className="font-bold text-lg">JustCre8</span>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
