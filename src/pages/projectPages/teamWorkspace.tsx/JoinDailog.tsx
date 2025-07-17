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
import JoinTeam from "./JoinTeam"; // Adjust the path to your component

export default function JoinDialog({ open, onClose }) {
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
      <div className="flex justify-between items-center px-6 pt-4 pb-2 border-b dark:border-gray-700">
        <DialogTitle className="text-cyan-500 font-mono text-xl">Join Team</DialogTitle>
        <IconButton onClick={onClose} className="text-cyan-500">
          <CloseIcon />
        </IconButton>
      </div>

      <DialogContent className="p-6 mx-20 overflow-y-auto">
        <JoinTeam />
      </DialogContent>

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
