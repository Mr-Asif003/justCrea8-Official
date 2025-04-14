
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Send,
  MessageSquare,
  HelpCircle,
  BookOpen,
  ThumbsUp,
  ThumbsDown,
  Youtube,
  FileText,
} from "lucide-react";

export default function Help() {
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  
  const handleFeedbackSubmit = () => {
    if (!feedbackMessage.trim()) {
      toast({
        title: "Empty Feedback",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setFeedbackMessage("");
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    });
  };
  
  const handleSupportSubmit = () => {
    if (!supportMessage.trim()) {
      toast({
        title: "Empty Message",
        description: "Please enter your support message before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setSupportMessage("");
    toast({
      title: "Support Request Submitted",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="animate-fade-in">
      <PageTitle 
        title="Help & Support" 
        description="Get help, find answers, and share feedback."
      />
      
      <div className="mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for help topics..." 
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Documentation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Comprehensive guides and tutorials
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                View Docs
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <Youtube className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Watch step-by-step video guides
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <Youtube className="h-4 w-4" />
                Watch Videos
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-primary/5">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium mb-2">Community Forum</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join discussions with other users
              </p>
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Visit Forum
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Tabs defaultValue="faq">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
          <TabsTrigger value="feedback">Give Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="faq">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How do I create my first blog post?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 px-2">
                      <p>
                        To create your first blog post, navigate to the Blog Maker page using the sidebar menu. Click on the "Create New" tab, add a title, write your content, and optionally add tags. When you're ready, click either "Save as Draft" or "Publish".
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Blog Maker</Badge>
                        <Badge variant="outline">Getting Started</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    How do I organize my notes by color?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 px-2">
                      <p>
                        When creating or editing a note, you'll see a color selection option below the content area. Click on one of the color circles to assign that color to your note. This makes it easier to visually categorize and organize your notes.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Notes</Badge>
                        <Badge variant="outline">Organization</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    Can I set recurring tasks in the ToDo feature?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 px-2">
                      <p>
                        Currently, the ToDo feature supports one-time tasks with due dates. Recurring tasks are on our roadmap and will be available in a future update. You can subscribe to our newsletter in the Settings page to be notified when this feature is released.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">ToDo</Badge>
                        <Badge variant="outline">Features</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    How do I customize my dashboard widgets?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 px-2">
                      <p>
                        On the Dashboard page, click the "Customize" button in the top right corner. This will activate edit mode where you can toggle widget visibility or reorder them. Click "Done" when you're satisfied with your layout.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Dashboard</Badge>
                        <Badge variant="outline">Customization</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    Is there a mobile app available?
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 px-2">
                      <p>
                        JustCre8 is fully responsive and works well on mobile browsers. A dedicated mobile app for iOS and Android is currently in development and scheduled for release later this year. You can sign up for early access in the Settings page.
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Mobile</Badge>
                        <Badge variant="outline">Accessibility</Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Get help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-sm font-medium block mb-1.5">
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-sm font-medium block mb-1.5">
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="Your email address" />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="text-sm font-medium block mb-1.5">
                    Subject
                  </label>
                  <Input id="subject" placeholder="Support request subject" />
                </div>
                
                <div>
                  <label htmlFor="message" className="text-sm font-medium block mb-1.5">
                    Message
                  </label>
                  <Textarea 
                    id="message" 
                    placeholder="Describe your issue or question in detail" 
                    rows={5}
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="attachment" className="text-sm font-medium block mb-1.5">
                    Attachment (optional)
                  </label>
                  <Input id="attachment" type="file" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-sm text-muted-foreground">
                We typically respond within 24 hours
              </p>
              <Button onClick={handleSupportSubmit} className="gap-2">
                <Send className="h-4 w-4" />
                Submit Request
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Give Feedback</CardTitle>
              <CardDescription>
                Share your thoughts and help us improve
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium mb-2">
                    How would you rate your experience with JustCre8?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        key={rating}
                        variant="outline"
                        className="h-10 w-10 p-0"
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label htmlFor="feedback" className="text-sm font-medium block">
                    What could we improve?
                  </label>
                  <Textarea 
                    id="feedback" 
                    placeholder="Share your suggestions, ideas, or report issues..." 
                    rows={5}
                    value={feedbackMessage}
                    onChange={(e) => setFeedbackMessage(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center hover:border-primary cursor-pointer transition-all">
                    <ThumbsUp className="h-5 w-5 mb-2 text-muted-foreground" />
                    <span className="text-sm">Enjoying</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center hover:border-primary cursor-pointer transition-all">
                    <HelpCircle className="h-5 w-5 mb-2 text-muted-foreground" />
                    <span className="text-sm">Confused</span>
                  </div>
                  <div className="border rounded-lg p-4 flex flex-col items-center text-center hover:border-primary cursor-pointer transition-all">
                    <ThumbsDown className="h-5 w-5 mb-2 text-muted-foreground" />
                    <span className="text-sm">Disliking</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-sm text-muted-foreground">
                Your feedback helps us improve JustCre8
              </p>
              <Button onClick={handleFeedbackSubmit} className="gap-2">
                <Send className="h-4 w-4" />
                Submit Feedback
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
