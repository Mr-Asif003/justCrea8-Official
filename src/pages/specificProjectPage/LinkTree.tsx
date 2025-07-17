import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Button,
  Box,
  Stack,
  Select,
  MenuItem,
  Collapse
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

import { toast } from "sonner"
const roleColors = {
  Admin: 'green',
  PM: '#1976d2',
  Contributor: '#388e3c',
  Mentor: '#fbc02d',
};

const initialLinks = [
  {
    id: 1,
    label: 'Portfolio',
    url: 'https://yourportfolio.com',
    role: 'Admin',
  },
  {
    id: 2,
    label: 'GitHub',
    url: 'https://github.com/asifkhan',
    role: 'Contributor',
  },
  {
    id: 3,
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/asifkhan',
    role: 'Mentor',
  },
  {
    id: 4,
    label: 'Blog',
    url: 'https://yourblog.com',
    role: 'PM',
  },
];

export default function LinkTreeCardGrid() {
  const [links, setLinks] = useState(initialLinks);
  const [expandedId, setExpandedId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [newLink, setNewLink] = useState({ label: '', url: '', role: 'Contributor' });

  const handleAdd = () => {
    if (!newLink.label || !newLink.url) return;
    setLinks([
      ...links,
      {
        ...newLink,
        id: Date.now(),
      },
    ]);
    toast("Event has been created.")
    setNewLink({ label: '', url: '', role: 'Contributor' });
  };

  const handleDelete = (id) => setLinks(links.filter((link) => link.id !== id));

  const startEdit = (link) => {
    setEditingId(link.id);
    setEditValues({ label: link.label, url: link.url });
  };

  const handleEditSave = (id) => {
    setLinks(links.map((link) => (link.id === id ? { ...link, ...editValues } : link)));
    setEditingId(null);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'green.400' }}>
        🌿 LinkTree Dashboard
      </Typography>

      {/* New Link Form */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
          flexWrap: 'wrap',
          background: 'rgba(0,255,255,0.05)',
          p: 2,
          borderRadius: 2,
          border: '1px solid green',
        }}
      >
        <TextField
          label="Label"
          variant="outlined"
          value={newLink.label}
          onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
          InputProps={{ sx: { color: 'cyan' } }}
          InputLabelProps={{ sx: { color: 'cyan' } }}
        />
        <TextField
          label="URL"
          variant="outlined"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          InputProps={{ sx: { color: 'cyan' } }}
          InputLabelProps={{ sx: { color: 'cyan' } }}
        />
        <Select
          value={newLink.role}
          onChange={(e) => setNewLink({ ...newLink, role: e.target.value })}
          displayEmpty
          sx={{ color: 'cyan' }}
        >
          {Object.keys(roleColors).map((role) => (
            <MenuItem value={role} key={role}>
              {role}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Add Link
        </Button>
      </Box>

      {/* Card Grid */}
      <Grid container  spacing={2} direction='row' alignItems='center' justifyContent='center'>
        {links.map((link) => {
          const isEditing = editingId === link.id;

          return (
            <Grid item xs={12} sm={6} md={4} xl={4} key={link.id}>
              <Card
                sx={{
                  minHeight: 200,
                  border: '2px solid green',
                  borderRadius: 3,
                  bgcolor: 'rgba(0, 255, 255, 0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 16px rgba(0,255,255,0.3)',
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Avatar sx={{ bgcolor: roleColors[link.role] }}>{link.label[0]}</Avatar>
                    <Stack direction="row" spacing={1}>
                      {isEditing ? (
                        <>
                          <IconButton onClick={() => handleEditSave(link.id)} color="success">
                            <SaveIcon />
                          </IconButton>
                          <IconButton onClick={() => setEditingId(null)} color="error">
                            <CancelIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton onClick={() => startEdit(link)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(link.id)} color="error">
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
                            setEditValues((prev) => ({ ...prev, label: e.target.value }))
                          }
                          sx={{ mb: 1 }}
                          InputProps={{ sx: { color: 'white' } }}
                          InputLabelProps={{ sx: { color: 'white' } }}
                        />
                        <TextField
                          label="URL"
                          fullWidth
                          value={editValues.url}
                          onChange={(e) =>
                            setEditValues((prev) => ({ ...prev, url: e.target.value }))
                          }
                          InputProps={{ sx: { color: 'white' } }}
                          InputLabelProps={{ sx: { color: 'white' } }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="h5" sx={{ color: 'white' }}>
                          {link.label}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#00bcd4', wordBreak: 'break-word' }}>
                          <a className='cursor-pointer' href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.url}
                          </a>
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'white' }}>
                          Role: {link.role}
                        </Typography>
                      </>
                    )}
                  </Box>

                  <Collapse in={expandedId === link.id}>
                    <Box mt={2}>
                      <Typography variant="body2" color="text.secondary">
                        📌 Future child links or details can go here.
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
