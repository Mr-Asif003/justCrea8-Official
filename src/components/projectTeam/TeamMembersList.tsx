import { motion } from "framer-motion";
import { TeamMemberCard } from "./TeamMemberCard";

interface TeamMembersListProps {
  searchQuery: string;
  roleFilter: string;
  team?: Array<{
    id: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: string;
    joinDate: string;
    projects: number;
  }>;
}

export const TeamMembersList = ({ searchQuery, roleFilter,team }: TeamMembersListProps) => {
  // Mock data - in real app this would come from API
  const tea=team || [];
  console.log(team,'asdlkf;j')
  const teamMembers = team  

  // Filter members based on search and role
  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          Team Members
          <span className="text-muted-foreground ml-2">({filteredMembers.length})</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMembers.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <TeamMemberCard member={member} />
          </motion.div>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          <p>No team members found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  );
};