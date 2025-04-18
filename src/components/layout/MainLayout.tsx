import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { TopNavbar } from "./TopNavbar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, ArrowRightToLine } from "lucide-react";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthProvider";

export function MainLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(false); // start with false
  const { isLogin } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
      } else if (isLogin) {
        setSidebarOpen(true); // open on desktop if logged in
      }
    };

    handleResize(); // run on load

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLogin]);

  useEffect(() => {
    // Open sidebar when user logs in and not on mobile
    if (isLogin && !isMobile) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [isLogin, isMobile]);

  return (
    <div className="min-h-screen flex flex-col">
      {isMobile && isLogin && (
        <TopNavbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      )}

      <div className="flex flex-1 overflow-hidden">
        {isLogin && (
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        <main
          className={cn(
            "flex-1 transition-all duration-300 overflow-auto",
            isLogin && !isMobile && sidebarOpen ? "ml-64" : "ml-0"
          )}
        >
          <div className="p-4 md:p-6">
            {!isMobile && isLogin && (
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
