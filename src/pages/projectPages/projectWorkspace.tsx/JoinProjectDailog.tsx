import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/ui/button";
import JoinProject from "./JoinProject";

export default function JoinProjectDialog({ open, onClose, teamId }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen // ✅ Always full screen on all devices
      PaperProps={{
        className: "bg-white dark:bg-gray-900 w-full h-full m-0 rounded-none",
        style: {
          width: "100%",
          height: "100%",
          margin: 0,
          borderRadius: 0,
        },
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b dark:border-gray-700">
        <DialogTitle className="text-cyan-500 font-mono text-xl">
          🚀 Join Project
        </DialogTitle>
        <IconButton onClick={onClose} className="text-cyan-500">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Content */}
      <DialogContent className="overflow-y-auto h-full px-6">
        <JoinProject teamId={teamId} onClose={onClose} />
      </DialogContent>

      {/* Footer */}
      <DialogActions className="flex justify-center py-4 border-t dark:border-gray-700">
        <Button
          onClick={onClose}
          variant="outline"
          className="border-cyan-500 text-cyan-500 hover:bg-cyan-50 dark:hover:bg-cyan-900"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
