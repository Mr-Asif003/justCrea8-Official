 
import { useState,useEffect } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, auth } from "@/Firebase/firebaseConfig";
import { serverTimestamp } from "firebase/firestore";



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
import {
  collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy
} from "firebase/firestore";

// Note Types
type NoteColor = "default" | "red" | "yellow" | "green" | "blue" | "purple";
interface Note {
  id: string;
  title: string;
  content: string;
  color: NoteColor;
  pinned: boolean;
  archived: boolean;
  createdAt: string;
}

const colorClasses: Record<NoteColor, string> = {
  default: "bg-card",
  red: "bg-red-600 dark:border-red-500",
  yellow: "bg-yellow-400 dark:bg-yellow-600",
  green: "bg-green-500 dark:bg-green-600",
  blue: "bg-blue-500 dark:bg-blue-600",
  purple: "bg-purple-500 dark:bg-purple-600",
};

export default function NoteProject() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<NoteColor>("default");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "notes", user.uid, "userNotes"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const fetchedNotes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(fetchedNotes);
    });

    return () => unsub();
  }, [user]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setSelectedColor("default");
    setEditingNote(null);
  };

  const handleSaveNote = async () => {
    if (!user || !title.trim()) {
      toast({
        title: "Missing Info",
        description: "Please enter a title.",
        variant: "destructive",
      });
      return;
    }
    const date=new Date();

    const noteData = {
      title,
      content,
      color: selectedColor,
      pinned: editingNote?.pinned || false,
      archived: editingNote?.archived || false,
      createdAt: `${new Date().toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      })}`,
      createdMonth:date.getMonth(),

    };

    try {
      const notesRef = collection(db, "notes", user.uid, "userNotes");

      if (editingNote) {
        const noteDoc = doc(notesRef, editingNote.id);
        await updateDoc(noteDoc, noteData);
        toast({ title: "Note Updated", description: "Your note was updated." });
      } else {
        await addDoc(notesRef, noteData);
        toast({ title: "Note Created", description: "New note added." });
      }

      resetForm();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to save note." });
    }
  };

  const handleDelete = async (id: string) => {
    if (!user) return;
    try {
      await deleteDoc(doc(db, "notes", user.uid, "userNotes", id));
      toast({ title: "Deleted", description: "Note deleted." });
    } catch (err) {
      console.error(err);
    }
  };

  const togglePin = async (note: Note) => {
    if (!user) return;
    const ref = doc(db, "notes", user.uid, "userNotes", note.id);
    await updateDoc(ref, { pinned: !note.pinned });
  };

  const toggleArchive = async (note: Note) => {
    if (!user) return;
    const ref = doc(db, "notes", user.uid, "userNotes", note.id);
    await updateDoc(ref, { archived: !note.archived });
  };

  const filtered = notes
    .filter((n) => n.archived === showArchived)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const pinned = filtered.filter((n) => n.pinned);
  const unpinned = filtered.filter((n) => !n.pinned);

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <PageTitle title="Notes" description="Your personal note-taking app" />
        <Button onClick={resetForm} disabled={!editingNote}>
          <Plus className="h-4 w-4 mr-2" /> New Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Note Form */}
        <Card className="md:col-span-1 sticky top-6">
          <CardHeader>
            <CardTitle>{editingNote ? "Edit Note" : "Create Note"}</CardTitle>
            <CardDescription>
              {editingNote ? "Update your note" : "Add something new"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Write here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[200px]"
            />
            <div>
              <p className="text-sm font-medium">Note Color</p>
              <div className="flex gap-2 mt-2">
                {Object.entries(colorClasses).map(([color, className]) => (
                  <button
                    key={color}
                    className={cn(
                      "w-6 h-6 rounded-full border",
                      className,
                      selectedColor === color ? "ring-2 ring-primary" : ""
                    )}
                    onClick={() => setSelectedColor(color as NoteColor)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            {editingNote && (
              <Button variant="outline" className="mr-2" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button onClick={handleSaveNote}>
              <Save className="h-4 w-4 mr-2" />
              {editingNote ? "Update" : "Save"}
            </Button>
          </CardFooter>
        </Card>

        {/* Notes Display */}
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

          {filtered.length > 0 ? (
            <>
              {pinned.length > 0 && (
                <NoteSection title="Pinned" notes={pinned} onEdit={setEditingNote} onPin={togglePin} onArchive={toggleArchive} onDelete={handleDelete} />
              )}
              {unpinned.length > 0 && (
                <NoteSection title={pinned.length > 0 ? "Others" : ""} notes={unpinned} onEdit={setEditingNote} onPin={togglePin} onArchive={toggleArchive} onDelete={handleDelete} />
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <StickyNote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Notes</h3>
              <p className="text-muted-foreground">Try adding or searching for a note.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper Component
function NoteSection({ title, notes, onEdit, onPin, onArchive, onDelete }) {
  return (
    <div>
      {title && <h3 className="text-sm font-semibold text-muted-foreground mb-2">{title}</h3>}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className={`${cn(colorClasses[note.color])} `} >
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{note.title}</CardTitle>
                  <p className="text-sm">{note.createdAt}</p>
                  <CardDescription className="whitespace-pre-wrap">{note.content}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(note)}><Edit className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onPin(note)}><Pin className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onArchive(note)}><Archive className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onDelete(note.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
