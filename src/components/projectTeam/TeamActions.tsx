import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UserPlus, Settings, Plus, Users } from "lucide-react";

interface TeamActionsProps {
  setSidebarOpen: (open: boolean) => void;
}

export const TeamActions = ({ setSidebarOpen }: TeamActionsProps) => {
  const actions = [
    { icon: UserPlus, label: "Add Member", variant: "default" as const },
    { icon: Settings, label: "Edit Team", variant: "outline" as const },
   
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="flex flex-wrap gap-3"
    >
      {actions.map((action, index) => (
        <motion.div
          key={action.label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <Button
            variant={action.variant}
            className={`group transition-all duration-200 ${
              action.variant === "default" 
                ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-primary/25" 
                : "hover:bg-primary/10 hover:border-primary/30"
            }`}
            onClick={() => {
              if (action.label === "Add Member") {
                setSidebarOpen(true);
              }
            }}
          >
            <action.icon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
            <span className="hidden sm:inline">{action.label}</span>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
};