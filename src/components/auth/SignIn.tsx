"use client";
import { AppDispatch, userLogin } from "@/store";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect } from "next/navigation";

export function SignIn() {
  console.log("SignIn page rendered");

  const { loading, userInfo, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  }

  // Ensure that  previously authenticated users can’t access this page.
  // redirect authenticated user to homepage
  useEffect(() => {
    if (userInfo) {
      redirect("/");
    }
  }, [userInfo]);

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

//Delete this - this is just for testing
async function postJSON(data: { email: string; password: string }) {
  try {
    const response = await fetch("http://xlocalhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
    console.log("error below");
    console.log({ error });
  }
}
