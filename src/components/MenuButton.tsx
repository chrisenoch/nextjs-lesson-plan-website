"use client";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { cloneElement, useState } from "react";
import SecureNextLink from "./SecureNextLink";

export default function MenuButton({
  buttonComponent,
  menuItems,
  id,
}: {
  buttonComponent: any;
  menuItems: { name: string; href: string }[];
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
    id,
    textTransform: "none",
  });

  const renderedMenuItems = menuItems.map((menuItem) => (
    <MenuItem
      component={SecureNextLink}
      href={menuItem.href}
      key={menuItem.name}
      onClick={handleClose}>
      {menuItem.name}
    </MenuItem>
  ));

  return (
    <>
      {ClonedButton}
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        {renderedMenuItems}
      </Menu>
    </>
  );
}
