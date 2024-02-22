"use client";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
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
        <DialogContentText sx={{ mb: 1 }}>
          You must reauthenticate every once in a while for security reasons.
          You have been logged out.
        </DialogContentText>
        <Divider />
        <DialogContentText sx={{ mt: 1, mb: 1 }}>
          - In reality, the refresh token would last longer than 10 minutes.
          This shows what happens when the refresh token expires.
        </DialogContentText>
        <DialogContentText sx={{ mb: 1 }}>
          - You can check the console to see the automatic refresh token
          behaviour I implemented with my custom hook:
          <strong> useHandleLoginStatus</strong>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
