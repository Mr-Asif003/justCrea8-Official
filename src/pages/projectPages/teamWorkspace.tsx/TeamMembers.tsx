import { useState } from "react";
import { motion } from "framer-motion";
import { TeamHeader } from "@/components/team/TeamHeader";
import { TeamMembersList } from "@/components/team/TeamMembersList";
import { TeamActions } from "@/components/team/TeamActions";
import { TeamSidebar } from "@/components/team/TeamSidebar";
import { SearchBar } from "@/components/team/SearchBar";

const TeamMembers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Team Header */}
          <TeamHeader />

          {/* Search and Actions */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              roleFilter={roleFilter}
              setRoleFilter={setRoleFilter}
            />
            <TeamActions setSidebarOpen={setSidebarOpen} />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Team Members List */}
            <div className="xl:col-span-3">
              <TeamMembersList 
                searchQuery={searchQuery}
                roleFilter={roleFilter}
              />
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1">
              <TeamSidebar />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 xl:hidden">
          <div className="fixed right-0 top-0 h-full w-80 bg-background border-l">
            <TeamSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamMembers;