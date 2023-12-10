"use client";
import { Box, TextField, Button, Stack } from "@mui/material";
import { useState } from "react";

export function SignIn() {
  console.log("SignIn page rendered");

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSubmit(e) {
    console.log("in handle submit");
    e.preventDefault();

    //To do: change this to use RTQ query
    postJSON({ username, password });
  }

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      display={"flex"}
      flexDirection={"column"}
      gap={2}>
      <TextField
        id="username"
        name="username"
        label="Username"
        variant="outlined"
        value={username}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setUsername(event.target.value);
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

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
  );
}

//Delete this - this is just for testing
async function postJSON(data: { username: string; password: string }) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
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
  }
}
