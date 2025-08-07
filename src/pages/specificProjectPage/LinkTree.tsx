"use client";

import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Button,
  Box,
  Stack,
  Collapse,
  TextField,
} from "@mui/material";
import { Input } from "@/components/ui/input";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/Firebase/firebaseConfig";
import { auth } from "@/Firebase/firebaseConfig";

// Define role colors
const roleColors: Record<string, string> = {
  Admin: "green",
  PM: "#1976d2",
  Contributor: "#388e3c",
  Mentor: "#fbc02d",
};

// Types
type LinkItem = {
  id: number;
  label: string;
  url: string;
  role: string;
};

type Props = {
  projectDetails;
};

export default function LinkTreeCardGrid({ projectDetails }: Props) {
  const [links, setLinks] = useState<LinkItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<Partial<LinkItem>>({});
  const [newLink, setNewLink] = useState<Omit<LinkItem, "id" | "role">>({
    label: "",
    url: "",
  });

  const projectRef = doc(db, "projects", projectDetails.projectId);

  // Load existing links
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const docSnap = await getDoc(projectRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setLinks(data.links || []);
        }
      } catch (err) {
        console.log("Error fetching links", err);
      }
    };

    fetchLinks();
  }, [projectRef]);

  const saveLinksToFirestore = async (updatedLinks: LinkItem[]) => {
    try {
      await updateDoc(projectRef, { links: updatedLinks });
      toast.success("Links updated");
    } catch (err) {
      toast.error("Failed to update links");
      console.log(err);
    }
  };

  const handleAdd = async () => {
    if (!newLink.label || !newLink.url) return;

    const currentUser = auth.currentUser;
    const role = currentUser?.displayName || "Contributor";

    const newItem: LinkItem = {
      ...newLink,
      id: Date.now(),
      role,
    };

    const updatedLinks = [...links, newItem];
    setLinks(updatedLinks);
    setNewLink({ label: "", url: "" });
    await saveLinksToFirestore(updatedLinks);
  };

  const handleDelete = async (id: number) => {
    const updatedLinks = links.filter((link) => link.id !== id);
    setLinks(updatedLinks);
    await saveLinksToFirestore(updatedLinks);
  };

  const startEdit = (link: LinkItem) => {
    setEditingId(link.id);
    setEditValues({ label: link.label, url: link.url });
  };

  const handleEditSave = async (id: number) => {
    const updatedLinks = links.map((link) =>
      link.id === id ? { ...link, ...editValues } : link
    );
    setLinks(updatedLinks);
    setEditingId(null);
    await saveLinksToFirestore(updatedLinks);
  };

  const toggleExpand = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "cyan.400" }}>
        🌿 LinkTree Dashboard
      </Typography>

      {/* New Link Inputs */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          p: 2,
          borderRadius: 2,
          border: "1px solid cyan",
        }}
      >
        <Input
          placeholder="Enter Title"
          value={newLink.label}
          onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
        />
        <Input
          placeholder="Enter URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
        />
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>

      {/* Grid of Cards */}
      <Grid container spacing={3}>
        {links.map((link) => {
          const isEditing = editingId === link.id;
          return (
            <Grid item xs={12} sm={6} md={4} key={link.id}>
              <Card
                sx={{
                  minHeight: 220,
                  border: `2px solid ${roleColors[link.role] || "cyan"}`,
                  borderRadius: 3,
                  backgroundColor: "transparent",
                  "&:hover": {
                    boxShadow: `0 6px 16px ${roleColors[link.role] || "cyan"}55`,
                  },
                }}
              >
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Avatar sx={{ bgcolor: roleColors[link.role] || "cyan" }}>
                      {link.label[0]}
                    </Avatar>
                    <Stack direction="row" spacing={1}>
                      {isEditing ? (
                        <>
                          <IconButton
                            onClick={() => handleEditSave(link.id)}
                            color="success"
                          >
                            <SaveIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => setEditingId(null)}
                            color="error"
                          >
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => startEdit(link)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDelete(link.id)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </>
                      )}
                      <IconButton onClick={() => toggleExpand(link.id)}>
                        <ExpandMoreIcon />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Box mt={2}>
                    {isEditing ? (
                      <>
                        <TextField
                          label="Label"
                          fullWidth
                          value={editValues.label}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                          sx={{ mb: 1 }}
                        />
                        <TextField
                          label="URL"
                          fullWidth
                          value={editValues.url}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              url: e.target.value,
                            }))
                          }
                        />
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h6"
                          sx={{ color: "white", wordBreak: "break-word" }}
                        >
                          {link.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: "#00bcd4", wordBreak: "break-word" }}
                        >
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.url}
                          </a>
                        </Typography>
                        <Typography variant="caption" sx={{ color: "white" }}>
                          Role: {link.role}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Collapse in={expandedId === link.id}>
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        📌 Future child links or metadata go here.
                      </Typography>
                    </Box>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
