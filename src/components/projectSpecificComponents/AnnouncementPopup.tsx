import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AnnouncementPopup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-cyan-400 border-cyan-400">View Announcement</Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <h3 className="text-xl font-bold text-cyan-400">New Update!</h3>
        <p className="text-sm mt-2">
          We've added new roadmap features and real-time task assignment.
        </p>
      </DialogContent>
    </Dialog>
  );
}
