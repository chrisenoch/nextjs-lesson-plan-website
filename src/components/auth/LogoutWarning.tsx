"use client";

import { useHydrated } from "@/customHooks/useHydrated";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

export function LogoutWarning({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="logging-out">
      <DialogTitle id="logging-out">Logging out</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You must reauthenticate every once in a while for security reasons.
          You have been logged out.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
