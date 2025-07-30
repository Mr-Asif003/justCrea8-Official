import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, MapPin } from "lucide-react";

export const TeamHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-2xl  p-8 border border-cyan-500 shadow-md shadow-purple-500 backdrop-blur-sm"
    >
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Team Avatar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Avatar className="w-20 h-20 ring-4 ring-primary/20">
              <AvatarImage src="/placeholder.svg" alt="Team Avatar" />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                TC
              </AvatarFallback>
            </Avatar>
          </motion.div>

          {/* Team Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Team Catalyst
              </h1>
              <p className="text-muted-foreground text-lg mt-2">
                Building the future of project management
              </p>
            </div>

            {/* Team Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                <span>12 Members</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Founded Dec 2023</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Global Remote</span>
              </div>
            </div>
          </div>

          {/* Team Status */}
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              Active Team
            </Badge>
            <div className="text-sm text-muted-foreground">
              ID: #TC-2024
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary/20 to-transparent rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
};