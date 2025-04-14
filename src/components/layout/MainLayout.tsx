
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, ArrowLeftToLine, ArrowRightToLine } from "lucide-react";

export function MainLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) setSidebarOpen(false);
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {isMobile && (
        <TopNavbar 
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />
      )}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main 
          className={cn(
            "flex-1 transition-all duration-300 overflow-auto",
            sidebarOpen && !isMobile ? "ml-64" : "ml-0"
          )}
        >
          <div className="p-4 md:p-6">
            {!isMobile && (
              <Button 
                variant="ghost" 
                size="icon"
                className="mb-4"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? (
                  <ArrowLeftToLine className="h-5 w-5" />
                ) : (
                  <ArrowRightToLine className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {sidebarOpen ? "Close sidebar" : "Open sidebar"}
                </span>
              </Button>
            )}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
