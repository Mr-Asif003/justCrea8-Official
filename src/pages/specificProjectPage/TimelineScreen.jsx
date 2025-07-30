import React, { useEffect, useState } from 'react';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { FileText, LayoutTemplate, Code, Bug, UploadCloud, Wrench, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import { db } from '@/Firebase/firebaseConfig';

export default function TimelineScreen({projectDetails}) {
  // Default phases
  console.log(projectDetails)
  const [phases, setPhases] = useState([
    'Requirement Analysis',
    'System Design',
    'Implementation',
    'Testing',
    'Deployment',
    'Maintenance',
  ]);

  const [newPhase, setNewPhase] = useState('');
  const [timelineData, setTimelineData] = useState([]);
  const [showPhaseForm,setShowPhaseForm]=useState(false);
  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    date: '',
    description: '',
    phase: phases[0],
  });
  useEffect(()=>{
    if(projectDetails?.timelines){
      setTimelineData(projectDetails.timelines)
    }
  },[])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleAddTimeline = async () => {
  if (form.title && form.date) {
    const newTimeline = [...timelineData, form];
    setTimelineData(newTimeline);
    try {
      const projectRef = doc(db, 'projects', projectDetails.projectId);
      await updateDoc(projectRef, { timelines: newTimeline });
      toast.success('Timeline added!');
      setForm({
        ...form,
        title: '',
        subtitle: '',
        date: '',
        description: '',
      });
    } catch (e) {
      console.error(e);
      toast.error('Error adding timeline');
    }
  } else {
    toast.error('Please fill title and date');
  }
};


  const handleAddPhase = () => {
    if (newPhase.trim() && !phases.includes(newPhase)) {
      setPhases([...phases, newPhase]);
      setNewPhase('');
    }
  };

  const getIcon = (phase) => {

    switch (phase) {
      case 'Requirement Analysis':
        return <FileText />;
      case 'System Design':
        return <LayoutTemplate />;
      case 'Implementation':
        return <Code />;
      case 'Testing':
        return <Bug />;
      case 'Deployment':
        return <UploadCloud />;
      case 'Maintenance':
        return <Wrench />;
      default:
        return <Star />;
    }
  };

  const getColor = (phase) => {
    const colors = {
      'Requirement Analysis': '#3b82f6',
      'System Design': '#6366f1',
      'Implementation': '#10b981',
      'Testing': '#f59e0b',
      'Deployment': '#ec4899',
      'Maintenance': '#f43f5e',
    };
    return colors[phase] || '#06b6d4'; // Default cyan
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-background text-foreground space-y-10">
      <h2 className="text-2xl font-bold text-center text-cyan-600">🧠 SDLC Timeline (Customizable)</h2>
      
      <button className='p-2 bg-cyan-600 text-sm rounded-md' onClick={()=>setShowPhaseForm(!showPhaseForm)}>
        {
          showPhaseForm==true?"X":"Add Phase +"
        }

      </button>
      {showPhaseForm&&(
<div>
   {/* Add New Phase */}
      <div className="max-w-2xl mx-auto border p-4 rounded-md shadow space-y-4">
        <h3 className="text-lg font-semibold text-cyan-500">➕ Add Custom SDLC Phase</h3>
        <div className="flex gap-2">
          <Input
            placeholder="e.g. Code Review, UAT, etc."
            value={newPhase}
            onChange={(e) => setNewPhase(e.target.value)}
          />
          
          <Button onClick={handleAddPhase}>Add Phase</Button>
        </div>
      </div>

      {/* Add Timeline Entry */}
      <div className="max-w-2xl mx-auto space-y-4 p-4 rounded-lg border border-gray-200 shadow">
        <h3 className="text-lg font-semibold text-cyan-500">📌 Add Timeline Entry</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input name="title" value={form.title} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Subtitle</Label>
            <Input name="subtitle" value={form.subtitle} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Date</Label>
            <Input name="date" value={form.date} onChange={handleInputChange} />
          </div>

          <div>
            <Label>Phase</Label>
            <select
              name="phase"
              value={form.phase}
              onChange={handleInputChange}
              className="w-full border bg-slate-600 rounded h-10 px-2"
            >
              {phases.map((p, i) => (
                <option key={i} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-2">
            <Label>Description</Label>
            <Textarea name="description" value={form.description} onChange={handleInputChange} />
          </div>
        </div>

        <Button onClick={handleAddTimeline} className="mt-2 w-full">
          ➕ Add Timeline Item
        </Button>
      </div>
  </div>

      )}
     

      {/* Timeline Display */}
      <VerticalTimeline>
        {timelineData.map((entry, index) => (
          <VerticalTimelineElement
            key={index}
            className="vertical-timeline-element--work"
            contentStyle={{ background: getColor(entry.phase), color: '#fff' }}
            contentArrowStyle={{ borderRight: `7px solid ${getColor(entry.phase)}` }}
            date={entry.date}
            iconStyle={{ background: getColor(entry.phase), color: '#fff' }}
            icon={getIcon(entry.phase)}
          >
            <h3 className="vertical-timeline-element-title">{entry.title}</h3>
            <h4 className="vertical-timeline-element-subtitle">{entry.subtitle}</h4>
            <p>{entry.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  );
}
