"use client";

import useAutoLogoutWhenJwtTokenExpires from "@/customHooks/useAutoLogoutWhenJwtTokenExpires";
import { AppDispatch, getAccessTokenWithRefreshTokenOnAppMount } from "@/store";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LogoutWarning } from "./Auth/LogoutWarning";

export default function EssentialClientConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("EssentialClientConfig mounts");
  const dispatch = useDispatch<AppDispatch>();
  //useAutoLogout(1_800_000);
  const renderModal = useAutoLogoutWhenJwtTokenExpires(30_000, 10_000); //240_000 - 4 mins // 30_000 - 30 secs //10_000 - 10 secs
  const [previousRenderModal, setPreviousRenderModal] = useState<{
    hasAutoLoggedOut: boolean;
  }>(renderModal);
  const [showLogoutWarning, setShowLogoutWarning] = useState<boolean>(false);

  //Avoids using an effect and saves a render.
  if (renderModal !== previousRenderModal) {
    if (renderModal.hasAutoLoggedOut) {
      setShowLogoutWarning(true);
      renderModal.hasAutoLoggedOut = false;
    }
    setPreviousRenderModal(renderModal);
  }

  // automatically authenticate user if refresh token cookie and access token cookies are found on app mount
  useEffect(() => {
    dispatch(getAccessTokenWithRefreshTokenOnAppMount());
  }, [dispatch]);

  return (
    <>
      <LogoutWarning
        open={showLogoutWarning}
        handleClose={() => {
          setShowLogoutWarning(false);
        }}
      />
      {children}
    </>
  );
}
