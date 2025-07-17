import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/firebaseConfig";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button as ShadButton } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Button as MUIButton } from "@mui/material";
import { Trash2 } from "lucide-react";

export default function UpdateTeam() {
  const location = useLocation();
  const navigate = useNavigate();
  const { teamId } = location.state || {};

  const [form, setForm] = useState({
    teamName: "",
    teamDesc: "",
    password: "",
    contributors: [""],
    mentors: [""],
  });

  const adminUidRef = useRef("");
  const adminEmailRef = useRef("");

  useEffect(() => {
    const fetchTeam = async () => {
      if (!teamId) {
        toast.error("No team ID provided.");
        return navigate("/project/home");
      }

      try {
        const teamRef = doc(db, "teams", teamId);
        const snap = await getDoc(teamRef);
        if (!snap.exists()) {
          toast.error("Team not found.");
          return;
        }

        const data = snap.data();
        const admin = data.admin?.[0];

        if (auth.currentUser.uid !== admin?.uid) {
          toast.error("Only the team admin can update the team.");
          return navigate("/project/home");
        }

        adminUidRef.current = admin.uid;
        adminEmailRef.current = admin.email;

        setForm({
          teamName: data.teamName || "",
          teamDesc: data.teamDesc || "",
          password: data.password || "",
          contributors: (data.members?.contributors || []).map((m) => m.email),
          mentors: (data.members?.mentors || []).map((m) => m.email),
        });
      } catch (err) {
        toast.error("Error fetching team data.");
        console.error(err);
      }
    };

    fetchTeam();
  }, [teamId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field, index, value) => {
    setForm((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addField = (field) => {
    setForm((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeField = (field, index) => {
    const email = form[field][index];
    if (email === adminEmailRef.current) {
      toast.warning("Cannot remove team admin.");
      return;
    }

    setForm((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleUpdate = async () => {
    try {
      const teamRef = doc(db, "teams", teamId);
      const snap = await getDoc(teamRef);
      const oldData = snap.data();

      await updateDoc(teamRef, {
        teamName: form.teamName,
        teamDesc: form.teamDesc,
        password: form.password,
        members: {
          ...oldData.members,
          contributors: form.contributors.map((email) => ({ email })),
          mentors: form.mentors.map((email) => ({ email })),
        },
      });

      toast.success("✅ Team updated successfully!");
      navigate("/project/home");
    } catch (err) {
      toast.error("Failed to update team.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <motion.h1
        className="text-2xl font-bold text-center mb-6 text-cyan-500"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        🛠️ Update Team
      </motion.h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
        className="max-w-4xl mx-auto bg-card p-6 rounded-xl space-y-6 shadow-md"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Team Name</Label>
            <Input
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Team Password</Label>
            <Input
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <Label>Team Description</Label>
          <Input
            name="teamDesc"
            value={form.teamDesc}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label className="text-cyan-600">Contributors</Label>
          {form.contributors.map((email, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                value={email}
                onChange={(e) =>
                  handleArrayChange("contributors", index, e.target.value)
                }
                placeholder={`Contributor ${index + 1}`}
              />
              <ShadButton
                type="button"
                variant="destructive"
                onClick={() => removeField("contributors", index)}
                className="flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </ShadButton>
            </div>
          ))}
          <ShadButton
            type="button"
            variant="secondary"
            onClick={() => addField("contributors")}
          >
            + Add Contributor
          </ShadButton>
        </div>

        <div>
          <Label className="text-cyan-600">Mentors</Label>
          {form.mentors.map((email, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <Input
                value={email}
                onChange={(e) =>
                  handleArrayChange("mentors", index, e.target.value)
                }
                placeholder={`Mentor ${index + 1}`}
              />
              <ShadButton
                type="button"
                variant="destructive"
                onClick={() => removeField("mentors", index)}
                className="flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Remove
              </ShadButton>
            </div>
          ))}
          <ShadButton
            type="button"
            variant="secondary"
            onClick={() => addField("mentors")}
          >
            + Add Mentor
          </ShadButton>
        </div>

        <MUIButton
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            backgroundColor: "#06b6d4",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            borderRadius: "12px",
            paddingY: "10px",
            "&:hover": {
              backgroundColor: "#0891b2",
            },
          }}
        >
          🔄 Update Team
        </MUIButton>
      </form>
    </div>
  );
}
