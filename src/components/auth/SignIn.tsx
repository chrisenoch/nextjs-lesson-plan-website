"use client";
import {
  AppDispatch,
  selectLoginStatus,
  selectUserLogin,
  userLogin,
} from "@/store";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import useHideMessageOnNavAway from "@/customHooks/useHideMessageOnNavAway";
import { LoadingButton } from "@mui/lab";
import { LoginStatus } from "@/models/types/LoginStatus";

export function SignIn() {
  const loginStatus: LoginStatus = useSelector(selectLoginStatus);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userLoginInfo: null | {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectUserLogin);

  const shouldHideMessage = useHideMessageOnNavAway(userLoginInfo);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  }

  if (loginStatus === "LOGGED_IN") {
    redirect("/");
  }

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <TextField
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        id="password"
        name="password"
        label="Password"
        variant="outlined"
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
      />
      {!shouldHideMessage && userLoginInfo?.isError && (
        <Box
          component="p"
          color={userLoginInfo?.isError ? "error.main" : "success.main"}
          aria-live="polite"
          role="status">
          {userLoginInfo?.message}
        </Box>
      )}

      {!userLoginInfo?.isLoading && (
        <Button type="submit" variant="contained">
          Submit
        </Button>
      )}
      {userLoginInfo?.isLoading && (
        <LoadingButton key={"loading-placeholder"} loading variant="contained">
          {/* value here affects the button size */}
          Submit
        </LoadingButton>
      )}
    </Box>
  );
}
