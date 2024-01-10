"use client";
import { AppDispatch, userLogin } from "@/store";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

export function SignIn() {
  const { userInfo, error } = useSelector((state) => state.authSlice);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  }

  // Ensure that  previously authenticated users can’t access this page.
  if (userInfo?.isLoggedIn) {
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
      {error && (
        <Box
          component="p"
          color={error ? "error.main" : "success.main"}
          aria-live="polite"
          role="status">
          Either the username or email is incorrect.
        </Box>
      )}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
