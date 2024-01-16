"use client";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { cloneElement, useState } from "react";

export default function MenuButton({
  buttonComponent,
  id,
}: {
  buttonComponent: any;
  id: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const ClonedButton = cloneElement(buttonComponent, {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      handleClick(e);
    },
    id: id,
  });

  return (
    <div>
      {ClonedButton}
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleClose}>All lesson plans</MenuItem>
        <MenuItem onClick={handleClose}>Saved</MenuItem>
      </Menu>
    </div>
  );
}
