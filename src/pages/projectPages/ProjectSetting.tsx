import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function ProjectSettingsScreen() {
  const [autoDeploy, setAutoDeploy] = useState(false);
  const [visibility, setVisibility] = useState("public");

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-cyan-500">⚙️ Project Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Project Name</Label>
            <Input placeholder="Enter project name" />
          </div>
          <div>
            <Label>Project ID</Label>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View/Edit Project ID</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Project ID</DialogTitle>
                </DialogHeader>
                <Input placeholder="Enter or edit project ID" />
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Project description..." />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Access & Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label>Visibility</Label>
          <Select value={visibility} onValueChange={setVisibility}>
            <SelectTrigger>
              <SelectValue placeholder="Select visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="team">Team Only</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Checkbox id="require-auth" />
            <Label htmlFor="require-auth">Require Authentication</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <Label>Push Alerts</Label>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue="light">
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="mb-1 block">Usage: 4.2 GB of 10 GB</Label>
          <Progress value={42} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Budget</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider defaultValue={[50]} max={100} step={10} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Auto Deployment</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-3">
          <Switch checked={autoDeploy} onCheckedChange={setAutoDeploy} />
          <Label>Enable Auto Deploy on Push</Label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Allowed Domains</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input placeholder="e.g. yourdomain.com" />
          <Input placeholder="anotherdomain.com" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Project Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="e.g. frontend, backend, AI" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language & Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Select defaultValue="en">
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="fr">French</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="IN">
            <SelectTrigger>
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IN">India</SelectItem>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="FR">France</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="destructive">Delete Project</Button>
          <Button variant="outline">Archive Project</Button>
        </CardContent>
      </Card>
    </div>
  );
}
