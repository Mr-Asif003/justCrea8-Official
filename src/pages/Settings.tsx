
import { useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sun,
  Moon,
  Monitor,
  BellRing,
  Languages,
  Upload,
  Download,
  Columns,
  Palette,
  Mail,
  Lock,
} from "lucide-react";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [desktopNotifications, setDesktopNotifications] = useState(true);
  const [language, setLanguage] = useState("english");
  const [defaultDashboardView, setDefaultDashboardView] = useState("widgets");
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };
  
  const handleExportData = () => {
    toast({
      title: "Data Exported",
      description: "Your data has been exported successfully.",
    });
  };
  
  const handleImportData = () => {
    toast({
      title: "Data Imported",
      description: "Your data has been imported successfully.",
    });
  };

  return (
    <div className="animate-fade-in">
      <PageTitle 
        title="Settings" 
        description="Customize your workspace and preferences."
      />
      
      <div className="space-y-8">
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-6">
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize the look and feel of your workspace
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Palette className="h-4 w-4" />Theme
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all hover:border-primary ${
                          theme === "light" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setTheme("light")}
                      >
                        <Sun className="h-8 w-8 mb-2" />
                        <span className="text-sm">Light</span>
                      </div>
                      <div
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all hover:border-primary ${
                          theme === "dark" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setTheme("dark")}
                      >
                        <Moon className="h-8 w-8 mb-2" />
                        <span className="text-sm">Dark</span>
                      </div>
                      <div
                        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all hover:border-primary ${
                          theme === "system" ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => setTheme("system")}
                      >
                        <Monitor className="h-8 w-8 mb-2" />
                        <span className="text-sm">System</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                      <Columns className="h-4 w-4" />Default Layout
                    </h3>
                    <Select
                      defaultValue={defaultDashboardView}
                      onValueChange={setDefaultDashboardView}
                    >
                      <SelectTrigger className="w-full max-w-xs">
                        <SelectValue placeholder="Select layout" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="widgets">Widget View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                        <SelectItem value="compact">Compact View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable animation effects throughout the app
                      </p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <BellRing className="h-4 w-4" />Notification Channels
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="desktop-notifications">Desktop Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Show notifications in your browser
                        </p>
                      </div>
                      <Switch
                        id="desktop-notifications"
                        checked={desktopNotifications}
                        onCheckedChange={setDesktopNotifications}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                    <Mail className="h-4 w-4" />Email Preferences
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="task-reminders">Task Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Get reminded about upcoming tasks
                        </p>
                      </div>
                      <Switch id="task-reminders" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="newsletter">Product Updates</Label>
                        <p className="text-sm text-muted-foreground">
                          News about new features and improvements
                        </p>
                      </div>
                      <Switch id="newsletter" defaultChecked={false} />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>User Preferences</CardTitle>
                <CardDescription>
                  Set general preferences for a personalized experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Languages className="h-4 w-4" />Language
                  </h3>
                  <Select
                    defaultValue={language}
                    onValueChange={setLanguage}
                  >
                    <SelectTrigger className="w-full max-w-xs">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English (US)</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                      <SelectItem value="japanese">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-save">Auto-save</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically save notes and blog drafts
                      </p>
                    </div>
                    <Switch id="auto-save" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use a more compact layout with less white space
                      </p>
                    </div>
                    <Switch id="compact-mode" defaultChecked={false} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sound-effects">Sound Effects</Label>
                      <p className="text-sm text-muted-foreground">
                        Play sound when completing tasks
                      </p>
                    </div>
                    <Switch id="sound-effects" defaultChecked={false} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>
                  Import, export, or reset your account data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Export Data</CardTitle>
                      <CardDescription>
                        Download all your data in JSON format
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        This will export all your blogs, notes, tasks and settings.
                      </p>
                      <Button 
                        variant="outline" 
                        onClick={handleExportData}
                        className="w-full gap-2"
                      >
                        <Download className="h-4 w-4" /> Export Data
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">Import Data</CardTitle>
                      <CardDescription>
                        Upload previously exported data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Only import files that were exported from JustCre8.
                      </p>
                      <Button className="w-full gap-2" onClick={handleImportData}>
                        <Upload className="h-4 w-4" /> Import Data
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="border-destructive/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-destructive">Reset Data</CardTitle>
                    <CardDescription>
                      Permanently delete all your data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      This will permanently delete all your blogs, notes, tasks and settings. This action cannot be undone.
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Type 'DELETE' to confirm"
                        className="max-w-xs"
                      />
                      <Button variant="destructive">
                        Reset All Data
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and privacy
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <Lock className="h-4 w-4" /> Password
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input type="password" placeholder="Current Password" />
                    <Input type="password" placeholder="New Password" />
                  </div>
                  <Button className="mb-6">Change Password</Button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch id="two-factor" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="sessions">Active Sessions</Label>
                      <p className="text-sm text-muted-foreground">
                        Currently signed in on 1 device
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="data-collection">Usage Data</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow collection of anonymous usage data to improve the product
                      </p>
                    </div>
                    <Switch id="data-collection" defaultChecked />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto">Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
