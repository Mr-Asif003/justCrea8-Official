
import { useState, useRef,useEffect } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { collection,addDoc, doc, updateDoc, deleteDoc, onSnapshot, query, where, orderBy, Timestamp
 } from "firebase/firestore"; 
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image as ImageIcon,
  Plus,
  FileEdit,
  Trash2,
  Clock,
  Save,
  Eye,
  Search,
  X,
  Tag,
} from "lucide-react";
import { auth, db } from "@/Firebase/firebaseConfig";
import { set } from "date-fns";

export default function BlogMaker() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [creater, setCreater] = useState("");
  const editorRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [showBlog, setShowBlog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const[showContentHtml,setContentHtml]=useState<string>("")
  const [showBlogId, setShowBlogId] = useState<string | null>(null);
  // Fetch blogs on mount
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      const blogsRef = collection(db, "blogs", user.uid, "userblogs");
      const q = query(blogsRef, orderBy("date", "desc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedBlogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(fetchedBlogs);
      });
      return () => unsubscribe();
    }
  }, []);

  // Format text for the editor
  const formatText = (command: string) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSaveBlog = async (status: "draft" | "published") => {
    const date=new Date()
    if (!title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your blog post.",
        variant: "destructive",
      });
      return;
    }

    const newBlog = {
      title,
      content,
      tags,
      status: status === "published" ? "published" : "draft",
      date: Timestamp.now(),
      createdAt:date.getDate(),
      createdMonth:date.getMonth(),
      createdBy: creater,
    };

    try {
      const user = auth.currentUser;
      const blogRef = collection(db, "blogs", user.uid, "userblogs");
      await addDoc(blogRef, newBlog);

      toast({
        title: status === "published" ? "Blog Published" : "Draft Saved",
        description: `Your blog post has been ${status}.`,
      });

      setBlogs([newBlog, ...blogs]);
      setContent("");
      setCreater("");
      setTags([]);
      setTitle("");
    } catch (e) {
      toast({
        title: "Error",
        description: `An error occurred while saving your blog post: ${e.message}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id:string) => {
    const user = auth.currentUser;
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "You are not logged in.",
        variant: "destructive",
      });
      return;
    }

    try {
      const blogRef = doc(db, "blogs", user.uid, "userblogs", id);
      await deleteDoc(blogRef);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      toast({
        title: "Blog Deleted",
        description: "The blog post has been deleted.",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: `Error deleting the blog post: ${e.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <PageTitle
        title="Blog Maker"
        description="Create and manage your blog posts."
      />

      <Tabs defaultValue="create">
        <TabsList className="mb-6">
          <TabsTrigger value="create">Create New</TabsTrigger>
          <TabsTrigger value="manage">Manage Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Blog Post</CardTitle>
              <CardDescription>
                Express your thoughts and ideas in a well-formatted blog post.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Blog Creater Name"
                    value={creater}
                    onChange={(e) => setCreater(e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>
                <div>
                  <Input
                    placeholder="Enter blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>
                

                
    <div>
      <div className="bg-muted/50 rounded-md p-1 mb-2 flex flex-wrap gap-1">
        <Button
          onClick={() => {
            formatText("bold");
            setIsBold(!isBold);
          }}
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${isBold ? "bg-cyan-400" : ""}`}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => {
            formatText("italic");
            setIsItalic(!isItalic);
          }}
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${isItalic ? "bg-cyan-400" : ""}`}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => {
            formatText("underline");
            setIsUnderline(!isUnderline);
          }}
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${isUnderline ? "bg-cyan-400" : ""}`}
        >
          <Underline className="h-4 w-4" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-8" />

        <Button
          onClick={() => {
            formatText("justifyLeft");
            setAlign("left");
          }}
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${align === "left" ? "bg-cyan-400" : ""}`}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => {
            formatText("justifyCenter");
            setAlign("center");
          }}
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${align === "center" ? "bg-cyan-400" : ""}`}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => {
            formatText("justifyRight");
            setAlign("right");
          }}
          variant="ghost"
          size="sm"
          className={`h-8 px-2 ${align === "right" ? "bg-cyan-400" : ""}`}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>

      <div
      ref={editorRef}
      contentEditable
      onInput={()=>{setContent(editorRef.current.innerText)
      setContentHtml(editorRef.current.innerHTML)
      }}
      className="min-h-[300px] p-4 border rounded-md focus-visible:ring-2 focus:outline-none"
      placeholder="Write your blog content here..."
      suppressContentEditableWarning={true}
    />
    </div>

                <div>
                  <p className="text-sm font-medium mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    {tags.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        No tags added yet
                      </span>
                    )}
                  </div>
                  <div className="flex">
                    <Input
                      placeholder="Add a tag..."
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      className="rounded-r-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button
                      onClick={handleAddTag}
                      className="rounded-l-none"
                      disabled={!currentTag}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => handleSaveBlog("draft")}
              >
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button onClick={() => handleSaveBlog("published")}>
                Publish
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="manage">
          <div className="flex items-center justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                className="pl-8"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Sort by Date
              </Button>
              <Button variant="outline" size="sm">
                Filter
              </Button>
            </div>
          </div>

          {blogs.filter(blog=>blog.status==='published').length > 0 ? (
            <div className="space-y-4">
              {blogs.filter(blog=>blog.status==='published').map((blog) => (
                <Card key={blog.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {blog.title}
                          </h3>
                                   
                          <Badge
                            variant={
                              blog.status === "published"
                                ? "default"
                                : "secondary"
                            }
                            className="ml-2"
                          >
                            {blog.status}
                          </Badge>
                        </div>
                        <p className="text-cyan-300 text-sm">
                           by  {blog.createdBy}
                            
                          </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="h-4 w-4" />
                          <span>
                          {blogs.find(blog => blog.id === showBlogId)?.date.toDate().toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 mb-3">
                          {blog.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {blog.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              <Tag className="h-3 w-3" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                      <Button
        onClick={() => {
          setShowBlogId(blog.id);
          setShowBlog(true);
        }}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        {showBlog && (
  <Dialog open={showBlog} onOpenChange={setShowBlog}>
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>
          {blogs.find(blog => blog.id === showBlogId)?.title}
        </DialogTitle>
        <DialogDescription>
          By: {blogs.find(blog => blog.id === showBlogId)?.createdBy}
         
        </DialogDescription>
        <DialogDescription>
          By: {blogs.find(blog => blog.id === showBlogId)?.date.toDate().toLocaleDateString()}
         
        </DialogDescription>
        <DialogDescription className="text-xl p-4">

           {blogs.find(blog => blog.id === showBlogId)?.content}
        </DialogDescription>
      </DialogHeader>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: blogs.find(blog => blog.id === showBlogId)?.contentHtml || "",
        }}
      />
      <DialogFooter>
        <Button onClick={() => setShowBlog(false)}>Close</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
)}

                       
                        <Button variant="ghost" size="icon">
                          <FileEdit className="h-4 w-4" />
                        </Button>
                        <Dialog
                          open={deleteId === blog.id}
                          onOpenChange={(open) => {
                            if (!open) setDeleteId(null);
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive"
                              onClick={()=>{handleDelete(blog.id)}}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete Blog Post</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this blog post?
                                This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setDeleteId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => handleDelete(blog.id)}
                              >
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileEdit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No Blog Posts Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first blog post to get started
              </p>
              <Button>Create New Blog Post</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

}
