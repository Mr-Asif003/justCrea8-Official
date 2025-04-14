
import { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Search,
  Plus,
  MoreVertical,
  Pin,
  Archive,
  Trash2,
  Edit,
  PenLine,
  Save,
  StickyNote,
} from "lucide-react";

type NoteColor = "default" | "red" | "yellow" | "green" | "blue" | "purple";

interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  archived: boolean;
  createdAt: Date;
}

export default function NoteMaker() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Welcome to NoteMaker",
      content:
        "This is your personal note-taking space. Create and organize your thoughts here!",
      color: "default",
      pinned: true,
      archived: false,
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Meeting Notes",
      content:
        "- Discuss project timeline\n- Review design mockups\n- Assign tasks to team members",
      color: "blue",
      pinned: false,
      archived: false,
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
      id: "3",
      title: "Shopping List",
      content: "- Eggs\n- Milk\n- Bread\n- Vegetables",
      color: "green",
      pinned: false,
      archived: false,
      createdAt: new Date(Date.now() - 172800000), // 2 days ago
    },
  ]);
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<NoteColor>("default");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const colorClasses: Record<NoteColor, string> = {
    default: "bg-card",
    red: "bg-red-50 dark:bg-red-900/30",
    yellow: "bg-yellow-50 dark:bg-yellow-900/30",
    green: "bg-green-50 dark:bg-green-900/30",
    blue: "bg-blue-50 dark:bg-blue-900/30",
    purple: "bg-purple-50 dark:bg-purple-900/30",
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedColor("default");
    setEditingNoteId(null);
  };

  const handleCreateNote = () => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please add a title for your note.",
        variant: "destructive",
      });
      return;
    }

    const newNote: Note = {
      id: editingNoteId || Date.now().toString(),
      title,
      content,
      color: selectedColor,
      pinned: false,
      archived: false,
      createdAt: new Date(),
    };

    if (editingNoteId) {
      // Update existing note
      setNotes(
        notes.map((note) => (note.id === editingNoteId ? newNote : note))
      );
      toast({
        title: "Note Updated",
        description: "Your note has been updated successfully.",
      });
    } else {
      // Create new note
      setNotes([newNote, ...notes]);
      toast({
        title: "Note Created",
        description: "Your note has been created successfully.",
      });
    }

    resetForm();
  };

  const handleEditNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setSelectedColor(note.color);
    setEditingNoteId(note.id);
  };

  const handlePinNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const handleArchiveNote = (id: string) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
    toast({
      title: "Note Archived",
      description: "Your note has been archived.",
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
    setNoteToDelete(null);
    toast({
      title: "Note Deleted",
      description: "Your note has been deleted.",
    });
  };

  const filteredNotes = notes
    .filter((note) => note.archived === showArchived)
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pinnedNotes = filteredNotes.filter((note) => note.pinned);
  const unpinnedNotes = filteredNotes.filter((note) => !note.pinned);

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <PageTitle
          title="Notes"
          description="Capture and organize your thoughts quickly."
          className="mb-0"
        />
        <Button onClick={resetForm} disabled={!editingNoteId}>
          <Plus className="h-4 w-4 mr-2" />
          New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Create/Edit Note */}
        <Card className="md:col-span-1 h-fit sticky top-6">
          <CardHeader>
            <CardTitle>
              {editingNoteId ? "Edit Note" : "Create Note"}
            </CardTitle>
            <CardDescription>
              {editingNoteId
                ? "Update your existing note"
                : "Jot down your thoughts and ideas"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Input
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Write your note here..."
                  className="min-h-[200px] resize-none"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Note Color</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  {Object.entries(colorClasses).map(([color, className]) => (
                    <button
                      key={color}
                      className={cn(
                        "w-6 h-6 rounded-full border",
                        className,
                        selectedColor === color
                          ? "ring-2 ring-primary ring-offset-2"
                          : ""
                      )}
                      onClick={() => setSelectedColor(color as NoteColor)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            {editingNoteId && (
              <Button
                variant="outline"
                className="mr-2"
                onClick={resetForm}
              >
                Cancel
              </Button>
            )}
            <Button onClick={handleCreateNote}>
              <Save className="h-4 w-4 mr-2" />
              {editingNoteId ? "Update Note" : "Save Note"}
            </Button>
          </CardFooter>
        </Card>

        {/* Right column - Note List */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search notes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowArchived(!showArchived)}
            >
              {showArchived ? "Show Active" : "Show Archived"}
            </Button>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="space-y-6">
              {pinnedNotes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
                    <Pin className="h-4 w-4 mr-2" /> PINNED
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEditNote}
                        onPin={handlePinNote}
                        onArchive={handleArchiveNote}
                        onDelete={(id) => setNoteToDelete(id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {unpinnedNotes.length > 0 && (
                <div>
                  {pinnedNotes.length > 0 && (
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      OTHERS
                    </h3>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {unpinnedNotes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onEdit={handleEditNote}
                        onPin={handlePinNote}
                        onArchive={handleArchiveNote}
                        onDelete={(id) => setNoteToDelete(id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Notes Found</h3>
              <p className="text-muted-foreground mb-4">
                {showArchived
                  ? "You don't have any archived notes."
                  : searchTerm
                  ? "No notes match your search."
                  : "Create your first note to get started!"}
              </p>
              {!showArchived && !searchTerm && (
                <Button onClick={() => setTitle("My First Note")}>
                  Create First Note
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={noteToDelete !== null}
        onOpenChange={(open) => {
          if (!open) setNoteToDelete(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteToDelete(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => noteToDelete && handleDeleteNote(noteToDelete)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onPin: (id: string) => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

function NoteCard({ note, onEdit, onPin, onArchive, onDelete }: NoteCardProps) {
  const colorClasses: Record<NoteColor, string> = {
    default: "bg-card",
    red: "bg-red-50 dark:bg-red-900/30",
    yellow: "bg-yellow-50 dark:bg-yellow-900/30",
    green: "bg-green-50 dark:bg-green-900/30",
    blue: "bg-blue-50 dark:bg-blue-900/30",
    purple: "bg-purple-50 dark:bg-purple-900/30",
  };

  return (
    <Card className={cn("transition-all", colorClasses[note.color])}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium truncate mb-1">{note.title}</h3>
            <div className="text-sm text-muted-foreground">
              {new Date(note.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </div>
            <div className="mt-2 whitespace-pre-line text-sm line-clamp-6">
              {note.content}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit(note)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onPin(note.id)}>
                <Pin className="h-4 w-4 mr-2" />
                {note.pinned ? "Unpin" : "Pin"}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onArchive(note.id)}>
                <Archive className="h-4 w-4 mr-2" />
                {note.archived ? "Unarchive" : "Archive"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(note.id)}
                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
      {note.pinned && (
        <div className="absolute -top-1 -right-1">
          <Pin className="h-4 w-4 text-primary fill-primary" />
        </div>
      )}
    </Card>
  );
}
