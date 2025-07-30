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
import CreateTeam from "./CreateTeam"; // Adjust the path if needed

export default function CreateTeamDialog({ open, onClose }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      className="z-50"
      PaperProps={{
        className: "bg-white dark:bg-gray-900 w-full h-full",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 sm:px-6 pt-4 pb-2 border-b dark:border-gray-700">
        <DialogTitle className="text-cyan-500 font-mono text-xl">
          Create Team
        </DialogTitle>
        <IconButton onClick={onClose} className="text-cyan-500">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Content */}
      <DialogContent
        className="px-4 sm:px-6 py-4 overflow-y-auto max-h-[calc(100vh-140px)]"
      >
        <div className="w-full max-w-4xl mx-auto">
          <CreateTeam />
        </div>
      </DialogContent>

      {/* Footer Actions */}
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
