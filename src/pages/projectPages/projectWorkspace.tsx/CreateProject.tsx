import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, db } from "@/Firebase/firebaseConfig";
import { toast } from "sonner";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Button } from "@mui/material";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreateProject({ teamId, onClose }) {
  const [teamAdmin, setTeamAdmin] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [form, setForm] = useState({
    projectName: "",
    description: "",
    startAt: "",
    endAt: "",
    milestones: [""],
    techStack: [],
    priority: "",
    status: "",
    budget: "",
    password: "",
    adminUid: "",
    adminName: "",
    managerUid: "",
    managerName: "",
  });

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamId) return toast.error("No team ID provided.");
      const snap = await getDoc(doc(db, "teams", teamId));
      if (!snap.exists()) return toast.error("Team not found.");

      const data = snap.data();
      const admin = data.admin?.[0];
      if (!admin || auth.currentUser.uid !== admin.uid) {
        return toast.error("Only the team admin can create projects.");
      }

      const contributors =
        Object.values(data.members?.contributors || {}) || [];

      setTeamAdmin(admin);
      setTeamMembers(contributors);
      setForm((prev) => ({
        ...prev,
        adminUid: admin.uid,
        adminName: admin.name,
      }));
    };

    fetchTeam();
  }, [teamId]);

  const handleSubmit = async () => {
    try {
      const projectMembers = await Promise.all(
        selectedMembers.map(async (m) => {
          const snap = await getDoc(doc(db, "users", m.uid));
          const user = snap.exists() ? snap.data() : {};
          return {
            uid: m.uid,
            name:
              (user.firstName || "") + " " + (user.lastName || "") || m.name,
            email: user.email || m.email,
          };
        })
      );

      const payload = {
        projectName: form.projectName,
        description: form.description,
        startAt: form.startAt,
        endAt: form.endAt,
        milestones: form.milestones,
        techStack: form.techStack,
        priority: form.priority,
        status: form.status,
        budget: form.budget,
        password: form.password,
        teamId,
        memberUids: selectedMembers.map((m) => m.uid),
        projectMembers,
        teamAdmin: {
          uid: form.adminUid,
          name: form.adminName,
          email: teamAdmin.email,
        },
        projectManager: {
          uid: form.managerUid,
          name: form.managerName,
        },
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "projects"), payload);
      await updateDoc(docRef, { projectId: docRef.id });
      await updateDoc(doc(db, "teams", teamId), {
        projects: arrayUnion(docRef.id),
      });

      toast.success("✅ Project created successfully.");
      if (onClose) onClose();
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to create project.");
    }
  };

  const handleConfirmation = (e) => {
    e.preventDefault();
    if (!form.projectName || !form.managerUid || selectedMembers.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setConfirmationOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-950 to-gray-900 text-white px-4 py-10 flex justify-center items-start">
      <div className="w-full max-w-4xl space-y-8">
        <div className="rounded-2xl p-6 md:p-8 bg-gradient-to-r from-indigo-600 via-cyan-600 to-blue-500 shadow-lg">
          <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
            Create Project
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Define project details and assign members to get started!
          </p>
        </div>

        <form onSubmit={handleConfirmation} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Project Name"
              value={form.projectName}
              onChange={(val) => setForm({ ...form, projectName: val })}
            />
            <InputField
              label="Project Budget"
              type="number"
              value={form.budget}
              onChange={(val) => setForm({ ...form, budget: val })}
            />
            <InputField
              label="Project Password"
              value={form.password}
              onChange={(val) => setForm({ ...form, password: val })}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <InputField
              label="Start Date"
              type="date"
              value={form.startAt}
              onChange={(val) => setForm({ ...form, startAt: val })}
            />
            <InputField
              label="End Date"
              type="date"
              value={form.endAt}
              onChange={(val) => setForm({ ...form, endAt: val })}
            />
          </div>

          <SelectField
            label="Priority"
            value={form.priority}
            options={["High", "Medium", "Low"]}
            onChange={(val) => setForm({ ...form, priority: val })}
          />
          <SelectField
            label="Status"
            value={form.status}
            options={["Planning", "In Progress", "Completed"]}
            onChange={(val) => setForm({ ...form, status: val })}
          />

          <SelectField
            label="Project Manager"
            value={form.managerUid}
            options={teamMembers.map((m) => ({ label: m.name, value: m.uid }))}
            onChange={(uid) => {
              const manager = teamMembers.find((m) => m.uid === uid);
              setForm({
                ...form,
                managerUid: uid,
                managerName: manager?.name,
              });
            }}
          />

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ color: "white" }}>Project Members</InputLabel>
            <Select
              multiple
              value={selectedMembers.map((m) => m.uid)}
              onChange={(e) => {
                const uids = e.target.value;
                const members = teamMembers.filter((m) =>
                  uids.includes(m.uid)
                );
                setSelectedMembers(members);
              }}
              input={<OutlinedInput label="Project Members" />}
              renderValue={(selected) =>
                selected
                  .map((uid) => teamMembers.find((m) => m.uid === uid)?.name)
                  .join(", ")
              }
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#06b6d4",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#22d3ee",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#0e7490",
                },
              }}
            >
              {teamMembers.map((m) => (
                <MenuItem key={m.uid} value={m.uid}>
                  <Checkbox
                    checked={selectedMembers.some((x) => x.uid === m.uid)}
                  />
                  <ListItemText primary={m.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#06b6d4",
              "&:hover": { backgroundColor: "#0891b2" },
              textTransform: "none",
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: "12px",
              paddingY: "10px",
              color: "white",
            }}
          >
            🚀 Create Project
          </Button>
        </form>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onClose={() => setConfirmationOpen(false)}>
        <DialogTitle>⚠ Confirm Project Creation</DialogTitle>
        <DialogContent>
          <Typography>
            Make sure all selected team members have joined your team and created accounts.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Confirm & Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const InputField = ({ label, type = "text", value, onChange }) => (
  <div>
    <Label className="text-white mb-1 block">{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/10 text-white border border-white/20 focus:border-cyan-400 rounded-xl"
    />
  </div>
);

const SelectField = ({ label, value, options, onChange }) => (
  <FormControl fullWidth sx={{ mt: 2 }}>
    <InputLabel sx={{ color: "white" }}>{label}</InputLabel>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      input={<OutlinedInput label={label} />}
      sx={{
        color: "white",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#06b6d4",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "#22d3ee",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "#0e7490",
        },
      }}
    >
      {options.map((opt) =>
        typeof opt === "object" ? (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ) : (
          <MenuItem key={opt} value={opt}>
            {opt}
          </MenuItem>
        )
      )}
    </Select>
  </FormControl>
);
