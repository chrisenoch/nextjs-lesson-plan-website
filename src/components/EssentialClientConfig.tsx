"use client";

import useHandleLoginStatus from "@/customHooks/useHandleLoginStatus";
import { getAccessTokenWithRefreshTokenOnAppMount } from "@/store";
import { useState, useEffect } from "react";
import { LogoutWarning } from "./auth-c/LogoutWarning";
import { useAppDispatch } from "@/store/hooks";

export default function EssentialClientConfig({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("EssentialClientConfig mounts");
  const dispatch = useAppDispatch();
  const renderModal = useHandleLoginStatus(10_000); //10_000 - 10 secs
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
