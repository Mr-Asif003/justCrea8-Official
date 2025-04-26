import { useEffect, useState } from "react";
import { PageTitle } from "@/components/ui/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db, auth } from "@/Firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import {
  Camera, User, Mail, Key,
  Info, AlertTriangle, Upload
} from "lucide-react";

export default function Account() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");

  //database reference
  const user = auth.currentUser;
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFirstName(data.firstName || "");
        setLastName(data.lastName || "");
        setUserEmail(data.email || "");
        setBio(data.bio || "");
      } else {
        console.log("No user document found.");
      }
    };

    fetchUserData();
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        firstName,
        lastName,
        email: userEmail,
        bio,
        updatedAt: new Date()
      });

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated.",
      });
    } catch (e) {
      console.error("Error saving profile: ", e);
    }
  };

  const handleDeleteAccount = () => {
    // Add your Firebase delete logic here
    toast({
      title: "Account Deleted",
      description: "Your account has been deleted.",
      variant: "destructive",
    });
    setConfirmDelete(false);
  };

  return (
    <div className="animate-fade-in">
      <PageTitle
        title="Account & Profile"
        description="Manage your account settings and preferences."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative mb-6">
              <div className="w-24 h-24 bg-muted rounded-full overflow-hidden border-4 border-background">
                <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                  <User className="w-12 h-12" />
                </div>
              </div>
              <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8" variant="secondary">
                <Camera className="h-4 w-4" />
                <span className="sr-only">Upload avatar</span>
              </Button>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">{firstName} {lastName}</h3>
              <p className="text-sm text-muted-foreground mt-2">{bio}</p>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <div className="md:col-span-2">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="profile">Profile Info</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Profile Info Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal details</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstname">First Name</Label>
                        <Input
                          id="firstname"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastname">Last Name</Label>
                        <Input
                          id="lastname"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Write a short bio about yourself..."
                        className="resize-none"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 block">Profile Picture</Label>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-muted rounded-full overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white">
                            <User className="w-8 h-8" />
                          </div>
                        </div>
                        <Button variant="outline" className="gap-2">
                          <Upload className="h-4 w-4" /> Upload new image
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleSaveProfile}>
                    Save changes
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Update your password and security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium flex items-center gap-2">
                      <Key className="h-4 w-4" /> Password
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div>
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium mb-4 flex items-center gap-2">
                      <Info className="h-4 w-4" /> Privacy Settings
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="text-sm">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications about activity</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="public-profile" className="text-sm">Public Profile</Label>
                          <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                        </div>
                        <Switch id="public-profile" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive"
                      >
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="bg-muted/50 p-3 rounded-md text-sm">
                        <p>All your data will be deleted:</p>
                        <ul className="list-disc ml-5 mt-2">
                          <li>Blog posts</li>
                          <li>Notes</li>
                          <li>ToDo lists</li>
                          <li>Dashboard configurations</li>
                        </ul>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setConfirmDelete(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button onClick={handleSaveProfile}>Save changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
