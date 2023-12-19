"use client";
import { AppDispatch, userLogin } from "@/store";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { session } from "@/session/session";

export function SignIn() {
  const { isLoading, userInfo, error } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  }

  // Ensure that  previously authenticated users can’t access this page.
  // redirect authenticated user to homepage
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
      {error && <p>There was an error: {error}</p>}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}
