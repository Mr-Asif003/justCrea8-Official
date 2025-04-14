
import { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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

export default function BlogMaker() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [blogs, setBlogs] = useState([
    {
      id: "1",
      title: "Getting Started with JustCre8",
      content: "This is a sample blog post about using JustCre8 effectively...",
      tags: ["Productivity", "Tutorial"],
      status: "published",
      date: "2023-04-10",
    },
    {
      id: "2",
      title: "10 Tips for Better Organization",
      content: "Staying organized is key to productivity...",
      tags: ["Organization", "Tips"],
      status: "draft",
      date: "2023-04-05",
    },
  ]);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag]);
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSaveBlog = (status: "draft" | "published") => {
    if (!title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your blog post.",
        variant: "destructive",
      });
      return;
    }

    const newBlog = {
      id: Date.now().toString(),
      title,
      content,
      tags,
      status,
      date: new Date().toISOString().split("T")[0],
    };

    setBlogs([newBlog, ...blogs]);
    toast({
      title: status === "published" ? "Blog Published" : "Draft Saved",
      description:
        status === "published"
          ? "Your blog post has been published successfully."
          : "Your draft has been saved.",
    });

    // Reset form
    setTitle("");
    setContent("");
    setTags([]);
  };

  const handleDelete = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    setDeleteId(null);
    toast({
      title: "Blog Deleted",
      description: "The blog post has been deleted.",
    });
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
                    placeholder="Enter blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="text-lg font-medium"
                  />
                </div>

                <div>
                  <div className="bg-muted/50 rounded-md p-1 mb-2 flex flex-wrap gap-1">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Separator
                      orientation="vertical"
                      className="mx-1 h-8"
                    />
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Separator
                      orientation="vertical"
                      className="mx-1 h-8"
                    />
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <AlignRight className="h-4 w-4" />
                    </Button>
                    <Separator
                      orientation="vertical"
                      className="mx-1 h-8"
                    />
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ImageIcon className="h-4 w-4" />
                    </Button>
                  </div>

                  <Textarea
                    placeholder="Write your blog content here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[300px] resize-none"
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

          {blogs.length > 0 ? (
            <div className="space-y-4">
              {blogs.map((blog) => (
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
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(blog.date).toLocaleDateString()}
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
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
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
                              onClick={() => setDeleteId(blog.id)}
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
