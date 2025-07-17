import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function UploadDocs() {
  return (
    <div className="bg-white/10 border border-white/30 p-4 rounded shadow-2xl">
      <h4 className="text-cyan-400 mb-2">Upload Project Files</h4>
      <div className="flex items-center gap-2">
        <Input type="file" className="w-full" />
        <Button variant="outline">Upload</Button>
      </div>
    </div>
  );
}
