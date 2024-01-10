"use client";
import { AppDispatch, registerUser } from "@/store";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

export function SignUp() {
  console.log("SignUp page rendered");

  const { loading, userInfo, error, success } = useSelector(
    (state) => state.authSlice
  );
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setFirstName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(registerUser({ email: email.toLowerCase(), password }));
  }

  useEffect(() => {
    // redirect user to login page if registration was successful
    if (success) {
      redirect("/login");
    }
    // redirect authenticated user to premium screen
    if (userInfo) {
      redirect("/premium");
    }
  }, [userInfo, success]);

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <TextField
        id="first-name"
        name="first-name"
        label="First name"
        variant="outlined"
        value={firstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setFirstName(event.target.value);
        }}
      />
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
