import React, { useState } from 'react';
import { Card, CardContent, Input } from '@mui/material';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from 'recharts';
import { Star } from 'lucide-react';

const COLORS = [
  '#f97316', // orange-500
  '#14b8a6', // teal-500
  '#10b981', // emerald-500
  '#f59e0b', // amber-500
  '#8b5cf6', // violet-500
  '#ef4444', // red-500
  '#3b82f6', // blue-500
  '#e11d48', // rose-600
  '#22c55e', // green-500
  '#0ea5e9', // sky-500
];
export default function Poll() {
  const pollOptionsInitial = [
    { id: 1, text: 'Friday Deployment' },
    { id: 2, text: 'Monday Deployment' },
    { id: 3, text: 'Next Sprint' },
  ];

  const [pollVotes, setPollVotes] = useState({});
  const [voterMap, setVoterMap] = useState({}); // id -> [names]
  const [pollOptions, setPollOptions] = useState(pollOptionsInitial);
  const [voterName, setVoterName] = useState('');
  const [newOption, setNewOption] = useState('');
  const [votedUsers, setVotedUsers] = useState([]);

  const handleVote = (id) => {
    const name = voterName.trim().toLowerCase();
    if (!name) return alert('Please enter your name to vote.');
    if (votedUsers.includes(name)) return alert('You have already voted.');

    setPollVotes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));

    setVoterMap((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), voterName.trim()],
    }));

    setVotedUsers((prev) => [...prev, name]);
  };

  const handleAddPollOption = () => {
    if (newOption.trim()) {
      const newId = pollOptions.length + 1;
      setPollOptions([...pollOptions, { id: newId, text: newOption }]);
      setNewOption('');
    }
  };

  const chartData = pollOptions.map((option) => ({
    name: option.text,
    votes: pollVotes[option.id] || 0,
    voters: voterMap[option.id] || [],
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, votes, voters } = payload[0].payload;
      return (
        <div className="bg-white border border-gray-300 p-2 rounded shadow-md text-sm">
          <p className="font-medium text-indigo-600">{name}</p>
          <p>{votes} vote(s)</p>
          {voters.length > 0 && (
            <>
              <p className="mt-1 font-semibold text-gray-500">Voters:</p>
              <ul className="list-disc list-inside text-xs text-gray-700">
                {voters.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
     <div >
    <div className="w-full mt-4  mx-auto p-6 bg-transparent border border-cyan-400 rounded-2xl shadow-xl flex flex-col md:flex-row gap-10">
      <div className='w-full md:w-1/2'>
        <h2 className="text-2xl font-bold text-cyan-500 mb-1">🗳️ Team Poll</h2>
        <p className="text-sm text-gray-500 mb-4">
          What’s the best time for the next deployment?
        </p>

        <Input
  fullWidth
  placeholder="Enter your name to vote"
  value={voterName}
  onChange={(e) => setVoterName(e.target.value)}
  className="mb-3"
  sx={{ input: { color: 'cyan' ,borderBottom: '2px solid #06b6d4'} }} // Or 'text.red' for theme-based
/>

        <div className="flex gap-2 mb-4">
          <Input
            fullWidth
            placeholder="Add new poll option"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
              sx={{ input: { color: 'cyan' ,borderBottom: '2px solid #06b6d4'} }} // Or 'text.red' for theme-based

          />
          <Button onClick={handleAddPollOption} className="bg-indigo-500 text-white">
            Add
          </Button>
        </div>

        <Separator className="mb-4" />

        <div className="space-y-3">
          {pollOptions.map((option) => (
            <Card
              key={option.id}
              onClick={() => handleVote(option.id)}
              className="cursor-pointer  border hover:border-indigo-500 transition rounded-xl"
            >
              <CardContent className="flex bg-white-700 border-cyan-500 justify-between items-center px-4 py-3">
                <span className="text-black ">{option.text}</span>
                <span className="text-sm text-cyan-600 font-semibold">
                  {pollVotes[option.id] || 0} votes
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      {/* charts */}
    <div className="w-full md:w-1/2">
      {/* 📊 Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">📊 Live Poll Results</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
<Tooltip content={CustomTooltip} />            <Bar dataKey="votes">
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🟣 Pie Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">📈 Vote Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="votes"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      </div>
      </div>
      {/* 🧠 Decision Tree */}
<div className="mt-8 bg-gradient-to-r from-slate-100 to-cyan-300 rounded-md ">
 <div className="flex justify-between">
   <h3 className="text-lg font-semibold text-gray-700 mb-4">🧠 Decision Tree</h3>
  <div className="p-2 animate-spin bg-gray-700 rounded-xl translate-x-10 duration-1000"><Star color='cyan' size={30}/></div>
 </div>
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm">
    <div className="text-center text-cyan-600 font-bold">📦 Deployment Plan</div>

    <div className="flex flex-col md:flex-row md:justify-around gap-4 mt-6">
      {pollOptions.map((option, i) => (
        <div key={i} className="bg-white rounded-lg border border-cyan-300 p-4 shadow-md w-full md:w-1/3">
          <div className="font-semibold text-indigo-600 mb-2">{option.text}</div>
          <div className="text-sm text-gray-600">
            {option.text.toLowerCase().includes('friday')
              ? '🕒 Allows late sprint fixes'
              : option.text.toLowerCase().includes('monday')
              ? '🚀 Starts fresh with new week'
              : '🛠️ Delays release for more testing'}
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

      
    </div>
  );
}
