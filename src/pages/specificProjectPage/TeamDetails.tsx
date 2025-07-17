import React, { useState } from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical } from "lucide-react"
import { Input } from '@mui/material';
import { set } from 'date-fns';
export default function TeamDetails() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [team, setTeam] = useState([
    {
      name: 'Asif Khan',
      id: '9523',
      role: 'Admin',
      responsibilities: 'Leads architecture, GitHub, deployment, and DevOps.',
      skills: ['React Native', 'Node.js', 'Python', 'DevOps'],
      contribution: 85,
      credits: 10,
      penalties: 0,
      github: 'https://github.com/asifkhan',
      linkedin: 'https://linkedin.com/in/asifkhan',
    },
    {
      name: 'Priya Sharma',
      id: '9524',
      role: 'Project Manager',
      responsibilities: 'Handles team timeline, tasks, and communication.',
      skills: ['Scrum', 'Agile', 'Team Management'],
      contribution: 90,
      credits: 9,
      penalties: 1,
      github: 'https://github.com/priyasharma',
      linkedin: 'https://linkedin.com/in/priyasharma',
    },
    {
      name: 'Rohit Verma',
      id: '9525',
      role: 'Contributor',
      responsibilities: 'Backend APIs and database integration.',
      skills: ['Node.js', 'Express', 'MongoDB'],
      contribution: 75,
      credits: 8,
      penalties: 2,
      github: 'https://github.com/rohitverma',
      linkedin: 'https://linkedin.com/in/rohitverma',
    },
    {
      name: 'Simran Kaur',
      id: '9526',
      role: 'Contributor',
      responsibilities: 'Frontend design, animation, and UI polish.',
      skills: ['React', 'Tailwind CSS', 'UI/UX'],
      contribution: 78,
      credits: 9,
      penalties: 0,
      github: 'https://github.com/simrankaur',
      linkedin: 'https://linkedin.com/in/simrankaur',
    },
    {
      name: 'Aditya Jaiswal',
      id: '9527',
      role: 'Contributor',
      responsibilities: 'AI model development and ML pipeline.',
      skills: ['Python', 'TensorFlow', 'OpenCV'],
      contribution: 82,
      credits: 10,
      penalties: 0,
      github: 'https://github.com/adityajaiswal',
      linkedin: 'https://linkedin.com/in/adityajaiswal',
    },
    {
      name: 'Dr. Arvind Patel',
      id: '9600',
      role: 'Mentor',
      responsibilities: 'Technical mentoring and model validation.',
      skills: ['AI Ethics', 'Mentoring', 'Research'],
      contribution: 100,
      credits: 12,
      penalties: 0,
      github: '',
      linkedin: 'https://linkedin.com/in/arvindpatel',
    },
    {
      name: 'Dr. Ritu Saxena',
      id: '9601',
      role: 'Mentor',
      responsibilities: 'UI/UX feedback and project guidance.',
      skills: ['Design Thinking', 'User Research', 'Mentoring'],
      contribution: 100,
      credits: 12,
      penalties: 0,
      github: '',
      linkedin: 'https://linkedin.com/in/ritusaxena',
    },
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({ ...team[index], skills: team[index].skills.join(', ') });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'contribution' || name === 'credits' || name === 'penalties'
          ? parseInt(value) || 0
          : value,
    }));
  };

  const saveChanges = () => {
    const updated = [...team];
    updated[editIndex] = {
      ...formData,
      skills: formData.skills.split(',').map((s) => s.trim()),
    };
    setTeam(updated);
    setEditIndex(null);
  };

  const getRoleInfo = (role) => {
    const roleMap = {
      Admin: { initials: 'Ad', color: 'from-cyan-400 to-blue-600' },
      'Project Manager': { initials: 'Pm', color: 'from-indigo-400 to-purple-600' },
      Contributor: { initials: 'Co', color: 'from-green-400 to-teal-600' },
      Mentor: { initials: 'Me', color: 'from-pink-400 to-red-600' },
    };
    return roleMap[role] || { initials: role.slice(0, 2), color: 'from-gray-400 to-gray-600' };
  };

  const getContributionBarColor = (contrib) => {
    if (contrib > 80) return 'bg-green-500';
    if (contrib > 60) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  const teamData = [
  {
    id: 1,
    name: "Asif Khan",
    role: "Backend Developer",
    avatar: "",
    credits: 120,
    penalties: 20,
    tasks: { completed: 10, pending: 2 },
    status: "Active"
  },
  {
    id: 2,
    name: "Fatima Noor",
    role: "UI Designer",
    avatar: "",
    credits: 150,
    penalties: 0,
    tasks: { completed: 15, pending: 0 },
    status: "Active"
  },
  {
    id: 3,
    name: "Zaid Ali",
    role: "QA Engineer",
    avatar: "",
    credits: 90,
    penalties: 10,
    tasks: { completed: 5, pending: 4 },
    status: "Pending"
  }
]
const [showEditForm, setShowEditForm] = useState(false);


  return (
    <div className={`px-6 md:px-12 py-10 space-y-10 ${isDark ? 'bg-zinc-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <section className="text-center mb-10">
        <TypeWriterEffect
          textStyle={{
            fontFamily: 'Poppins',
            fontWeight: 700,
            fontSize: '1rem',
            color: isDark ? '#ffffff' : '#111827',
          }}
          startDelay={100}
          cursorColor={isDark ? '#ffffff' : '#000000'}
         multiText={['🚀 Meet the Dream Team', '✨ Bringing Ideas to Life']}
          multiTextDelay={1500}
          typeSpeed={50}
        />
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {team.map((member, index) => {
          const { initials, color } = getRoleInfo(member.role);
          return (
            <div
              key={index}
              className={`relative rounded-3xl p-6 overflow-hidden shadow-xl transition-transform duration-300 hover:scale-[1.03] ${
                isDark
                  ? 'bg-gradient-to-br border text-white'
                  : 'bg-white text-gray-900'
              }`}
            >
              <div className="absolute inset-0 backdrop-blur-xl opacity-20 rounded-3xl bg-black/10"></div>

              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                  <div
                    className={`w-14 h-14 flex items-center justify-center text-xl font-bold rounded-full bg-gradient-to-br ${color} text-white`}
                  >
                    {initials}
                  </div>
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-xs px-3 py-1 bg-cyan-400 hover:bg-cyan-500 rounded text-white font-semibold"
                  >
                    Edit
                  </button>
                </div>

                <h2 className="text-xl font-semibold">{member.name}</h2>
                <p className="text-sm italic opacity-80">{member.role}</p>
                <p className="text-sm">{member.responsibilities}</p>

                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full backdrop-blur-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex gap-6 mt-2 text-sm">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-600 font-semibold"
                    >
                      GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-600 font-semibold"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>

                {/* Contribution Bar */}
                <div className="mt-3">
                  <div className="text-xs font-semibold opacity-80 mb-1">Contribution</div>
                  <div className="w-full h-3 rounded bg-gray-300 dark:bg-gray-700">
                    <div
                      className={`${getContributionBarColor(member.contribution)} h-3 rounded`}
                      style={{ width: `${member.contribution}%` }}
                    />
                  </div>
                </div>

                {/* Credits & Penalties */}
                <div className="flex justify-between mt-2 text-sm font-semibold">
                  <span>Credits: <span className="text-green-500">{member.credits}</span></span>
                  <span>Penalties: <span className="text-red-500">{member.penalties}</span></span>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {editIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
          <div
            className={`bg-white dark:bg-zinc-900 rounded-2xl max-w-lg w-full p-6 shadow-lg overflow-y-auto max-h-[90vh]`}
          >
            <h3 className="text-lg font-bold mb-4 text-center text-cyan-600">Edit Member Details</h3>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium">Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Role</span>
                <select
                  name="role"
                  value={formData.role || ''}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option>Admin</option>
                  <option>Project Manager</option>
                  <option>Contributor</option>
                  <option>Mentor</option>
                </select>
              </label>

              <label className="block">
                <span className="text-sm font-medium">Responsibilities</span>
                <textarea
                  rows="3"
                  name="responsibilities"
                  value={formData.responsibilities || ''}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Skills (comma separated)</span>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      skills: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Contribution (%)</span>
                <input
                  type="number"
                  name="contribution"
                  min="0"
                  max="100"
                  value={formData.contribution || 0}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Credits</span>
                <input
                  type="number"
                  name="credits"
                  min="0"
                  value={formData.credits || 0}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">Penalties</span>
                <input
                  type="number"
                  name="penalties"
                  min="0"
                  value={formData.penalties || 0}
                  onChange={handleFormChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">GitHub URL</span>
                <input
                  type="url"
                  name="github"
                  value={formData.github || ''}
                  onChange={handleFormChange}
                  placeholder="https://github.com/username"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>

              <label className="block">
                <span className="text-sm font-medium">LinkedIn URL</span>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleFormChange}
                  placeholder="https://linkedin.com/in/username"
                  className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-cyan-500 focus:border-cyan-500"
                />
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setEditIndex(null)}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveChanges}
                className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
<h1 className='font-serif text-cyan-500 text-sm sm:text-xl'>Teams Data </h1>
<button className='border bg-cyan-500  p-1 rounded-md hover:bg-cyan-800 hover:text-white transition-colors' onClick={()=>setShowEditForm(!showEditForm)}>Edit Team Data</button>
  <div className="space-y-4">
  {showEditForm && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 p-4">
      <div className="bg-white  rounded-2xl w-full max-w-lg p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        <h3 className="text-lg font-bold mb-4 text-center text-cyan-600">Edit Team Data</h3>
        <button onClick={()=>setShowEditForm(!showEditForm)} className='text-2xl text-red-600 mb-2'>x</button>
        <div className="space-y-4">
<select className='bg-zinc-600 w-full  p-2 rounded-md' >
            <option value="">Select Team Member</option>
            {teamData.map((member) => (
              <option key={member.id} value={member.id}>
                {member.name}
              </option>
            ))}
</select>
          <Input placeholder="Role" />
          <Input placeholder="Credits" type="number" />
          <Input placeholder="Penalties" type="number" />
          <Input placeholder="Tasks Completed" type="number" />
          <Input placeholder="Tasks Pending" type="number" />
          <Input placeholder="Status" />
          
          <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Save</Button>
        </div>
      </div>
    </div>
  )}

  {teamData.map((member) => (
    <Card
      key={member.id}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl shadow-sm border gap-4"
    >
      {/* Column 1: Avatar + Name + Role */}
      <div className="flex items-center gap-4 sm:w-1/5 min-w-[160px]">
        <Avatar>
          <AvatarImage src={member.avatar} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-center sm:text-left">{member.name}</p>
          <p className="text-sm text-muted-foreground text-center sm:text-left">{member.role}</p>
        </div>
      </div>

      {/* Column 2: Credits */}
      <div className="sm:w-1/5 min-w-[120px] text-center">
        <p className="text-lg font-semibold text-green-600">{member.credits}</p>
        <p className="text-xs text-muted-foreground">Credits</p>
      </div>

      {/* Column 3: Penalties */}
      <div className="sm:w-1/5 min-w-[120px] text-center">
        <p className="text-lg font-semibold text-red-500">{member.penalties}</p>
        <p className="text-xs text-muted-foreground">Penalties</p>
      </div>

      {/* Column 4: Tasks */}
      <div className="sm:w-1/5 min-w-[150px] text-center">
        <p className="font-medium">
          ✅ {member.tasks.completed} / ❌ {member.tasks.pending}
        </p>
        <p className="text-xs text-muted-foreground">Tasks Done / Left</p>
      </div>

      {/* Column 5: Status + Actions */}
      <div className="sm:w-1/5 min-w-[120px] flex items-center justify-end gap-2">
        <Badge variant="outline">{member.status}</Badge>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>View</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Remove</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  ))}
</div>



    </div>
  );
}
