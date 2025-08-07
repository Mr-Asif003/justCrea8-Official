import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Crown,
  Users,
  ArrowRight,
  Building2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function ProjectMembers({ projectMembersDetails, teamAdmin }) {
  const members = Array.isArray(projectMembersDetails) ? projectMembersDetails : [];

  const admin = members.find((m) => m.role === 'admin');
  const projectAdmin = members.find((m) => m.role === 'projectAdmin');
  const projectManager = members.find((m) => m.role === 'projectManager');
  const contributors = members.filter((m) => m.role === 'contributor');

  const MemberCard = ({ name, email, uid, role }) => {
    const roleColors = {
      admin: "bg-red-100 text-red-600",
      projectAdmin: "bg-yellow-100 text-yellow-700",
      projectManager: "bg-green-100 text-green-700",
      contributor: "bg-blue-100 text-blue-700",
      teamAdmin: "bg-purple-100 text-purple-700",
    };

    return (
      <Card className="w-full shadow-sm hover:shadow-lg transition-all hover:shadow-cyan-400 duration-300 border border-gray-200 rounded-2xl">
        <CardContent className="flex flex-col md:flex-row gap-4 items-center justify-between py-5 px-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-gray-300">
              <AvatarFallback className="text-lg font-bold">
                {name?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
              <p className="font-semibold text-lg text-gray-900 dark:text-white">{name}</p>
              <p className="text-sm text-gray-500">{email || "No email"}</p>
              {role && (
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize inline-block ${roleColors[role] || "bg-gray-100 text-gray-700"}`}
                >
                  {role}
                </span>
              )}
            </div>
          </div>

          {uid && (
            <Link to={`/profile/${uid}`}>
              <Button
                variant="outline"
                className="text-sm border-cyan-500 hover:bg-gray-700 flex items-center gap-1"
              >
                View Profile <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Users className="h-5 w-5" /> Project Members
      </h2>

      {teamAdmin && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-purple-700">
            <Building2 className="h-5 w-5" /> Team Admin
          </div>
          <MemberCard {...teamAdmin} role="teamAdmin" />
        </div>
      )}

      {admin && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-red-600">
            <ShieldCheck className="h-5 w-5" /> Admin
          </div>
          <MemberCard {...admin} />
        </div>
      )}

      {projectAdmin && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-yellow-600">
            <Crown className="h-5 w-5" /> Project Admin
          </div>
          <MemberCard {...projectAdmin} />
        </div>
      )}

      {projectManager && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-green-600">
            <User className="h-5 w-5" /> Project Manager
          </div>
          <MemberCard {...projectManager} />
        </div>
      )}

      {contributors.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2 text-lg font-semibold text-gray-700">
            <Users className="h-5 w-5" /> Contributors ({contributors.length})
          </div>
          <div className="grid gap-4">
            {contributors.map((member, index) => (
              <MemberCard key={member.uid || index} {...member} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
