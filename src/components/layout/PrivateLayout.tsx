import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthProvider";

export default function PrivateLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLogin } = useAuth();

  // Handle window resizing for responsive layout
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false); // Close sidebar on mobile
      } else if (isLogin) {
        setSidebarOpen(true); // Keep sidebar open on desktop if logged in
      }
    };

    handleResize(); // Initial check on mount
    window.addEventListener("resize", handleResize); // Set up resize listener
    return () => window.removeEventListener("resize", handleResize); // Clean up listener on unmount
  }, [isLogin]);

  // Toggle sidebar visibility based on user login and screen size
  useEffect(() => {
    if (isLogin && !isMobile) {
      setSidebarOpen(true); // Automatically open sidebar on desktop when logged in
    } else {
      setSidebarOpen(false); // Automatically close sidebar on mobile
    }
  }, [isLogin, isMobile]);

  return (
    <div className="min-h-screen flex flex-col">
      {isLogin && isMobile && (
        <TopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {isLogin && (
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            className="transition-all duration-300"
          />
        )}

        <main
          className={cn(
            "flex-1 transition-all duration-300 overflow-auto",
            isLogin && !isMobile && sidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          <div className="p-4 md:p-6">
            {isLogin && !isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="mb-4"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-expanded={sidebarOpen ? "true" : "false"}
              >
                {sidebarOpen ? (
                  <ArrowLeftToLine className="h-5 w-5" />
                ) : (
                  <ArrowRightToLine className="h-5 w-5" />
                )}
              </Button>
            )}

            <Outlet />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
