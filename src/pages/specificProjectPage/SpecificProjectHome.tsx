import { useEffect, useState } from "react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

import {
  Projector,
  WorkflowIcon,
  LayoutDashboard,
  TreePalm,
  NotebookPenIcon,
  Group,
  LucideWorkflow,
  StickyNote,
  ClipboardCheck,
  MessagesSquare,
} from "lucide-react";

import TeamChatWithPoll from "./ChatScreen";
import Documents from "./Documents";
import KanbanBoard from "./KanbanBoard";
import Tasks from "./Tasks";
import LinkTreeCardGrid from "./LinkTree";
import TodoProject from "./TodoProject";
import NoteProject from "./NoteProject";
import Poll from "./Poll";
import Project from "./Project";
import Workspace from "./WorkSpace";
import ProjectDashboard from "./PDashboard4";
import ProjectMembers from "./ProjectMembers";
import GDHome from "./GroupDiscussion/GDHome";

import { useParams } from "react-router-dom";
import { db } from "@/Firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { toast } from "sonner";

export default function ProjectHome() {
  const [mainTab, setMainTab] = useState("overview");
  const [subTab, setSubTab] = useState("dashboard");
  const [projectDetails, setProjectDetails] = useState({});
  const [projectMembersDetails, setProjectMembersDetails] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectRef = doc(db, "projects", projectId);
        const p = await getDoc(projectRef);
        const data = p.data();
        setProjectDetails(data);
        
      } catch (e) {
        toast.error("Error in fetching project data");
      }
    };
    fetchData();
  }, [projectId]);

  useEffect(() => {
    if (!projectDetails) return;

    const a = projectDetails.admin || {};
    const pa = projectDetails.projectAdmin || {};
    const pm = projectDetails.projectManager || {};
    const contributors = Array.isArray(projectDetails.contributors)
      ? projectDetails.contributors
      : [];

    const final = [];

    if (a.uid) final.push({ ...a, role: "admin" });
    if (pa.uid) final.push({ ...pa, role: "projectAdmin" });
    if (pm.uid) final.push({ ...pm, role: "projectManager" });

    const filteredContributors = contributors.filter(
      (member) =>
        member.uid !== a.uid &&
        member.uid !== pa.uid &&
        member.uid !== pm.uid
    );

    const contributorList = filteredContributors.map((c) => ({
      ...c,
      role: "contributor",
    }));

    setProjectMembersDetails([...final, ...contributorList]);

  }, [projectDetails]);

  const subTabs = {
    overview: [
      {
        label: "Project",
        value: "project",
        icon: Projector,
        component: <Project projectDetails={projectDetails} />,
      },
      {
        label: "Dashboard",
        value: "dashboard",
        icon: LayoutDashboard,
        component: (
          <ProjectDashboard
            projectDetails={projectDetails}
            projectId={projectId}
          />
        ),
      },
      {
        label: "Documents",
        value: "documents",
        icon: NotebookPenIcon,
        component: <Documents  />,
      },
      {
        label: "Teams",
        value: "team",
        icon: Group,
        component: (
          <ProjectMembers projectMembersDetails={projectMembersDetails} />
        ),
      },
    ],
    planner: [
      {
        label: "Todos",
        value: "todos",
        icon: ClipboardCheck,
        component: <TodoProject projectDetails={projectDetails} />,
      },
      {
        label: "Notes",
        value: "notes",
        icon: StickyNote,
        component: <NoteProject projectDetails={projectDetails} setProjectDetails={setProjectDetails} />,
      },
      {
        label: "Tasks",
        value: "tasks",
        icon: WorkflowIcon,
        component: <Tasks  projectDetails={projectDetails} setProjectDetails={setProjectDetails} projectMemberDetails={projectMembersDetails}/>,
      },
      {
        label: "LinkTree",
        value: "linktree",
        icon: TreePalm,
        component: <LinkTreeCardGrid projectDetails={projectDetails} />,
      },
    ],
    workspace: [
      {
        label: "Workspace",
        value: "workspace",
        icon: WorkflowIcon,
        component: <Workspace projectDetails={projectDetails} />,
      },
      {
        label: "Group Discussion",
        value: "group-discussion",
        icon: TreePalm,
        component:<GDHome projectDetails={projectDetails}/>,
      },
      {
        label: "Chat",
        value: "chat",
        icon: MessagesSquare,
        component: <TeamChatWithPoll />,
      },
      {
        label: "Poll",
        value: "poll",
        icon: LayoutDashboard,
        component: <Poll projectDetails={projectDetails}  />,
      },
      {
        label: "Kanban",
        value: "kanban",
        icon: LucideWorkflow,
        component: <KanbanBoard />,
      },
    ],
  };

  const renderSidebarLayout = (group) => (
    <Tabs
      value={subTab}
      onValueChange={setSubTab}
      className="flex flex-col md:flex-row-reverse gap-4 w-full"
    >
      <TabsList className="w-full md:w-[12%] flex flex-row md:flex-col justify-around items-center overflow-x-auto md:overflow-visible bg-muted p-2 rounded-xl shadow-md gap-2">
        {subTabs[group].map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="flex items-center justify-center text-sm md:text-base gap-2 px-3 py-2 whitespace-nowrap"
          >
            <tab.icon size={16} />
            <span>{tab.label}</span>
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="flex-1 min-w-0 w-full p-3 md:p-4 border rounded-xl bg-background shadow-inner overflow-auto">
        {subTabs[group].map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="w-full">
            {tab.component}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );

  return (
    <div className="w-full px-3 md:px-6 py-4 md:py-6">
      <Tabs
        value={mainTab}
        onValueChange={(val) => {
          setMainTab(val);
          setSubTab(subTabs[val]?.[0]?.value || "");
        }}
        className="w-full"
      >
        <TabsList className="flex justify-around items-center bg-muted/30 rounded-xl mb-4 shadow-sm">
          <TabsTrigger
            value="overview"
            className="text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-accent flex items-center gap-2"
          >
            🧩 Overview
          </TabsTrigger>
          <TabsTrigger
            value="planner"
            className="text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-accent flex items-center gap-2"
          >
            🧠 Planner
          </TabsTrigger>
          <TabsTrigger
            value="workspace"
            className="text-sm md:text-base font-medium px-4 py-2 rounded-lg hover:bg-accent flex items-center gap-2"
          >
            🛠️ WorkHouse
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">{renderSidebarLayout("overview")}</TabsContent>
        <TabsContent value="planner">{renderSidebarLayout("planner")}</TabsContent>
        <TabsContent value="workspace">{renderSidebarLayout("workspace")}</TabsContent>
      </Tabs>
    </div>
  );
}
