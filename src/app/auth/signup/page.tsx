import { SignIn } from "@/components/auth/SignIn";
import { SignUp } from "@/components/auth/SignUp";
import { Stack } from "@mui/material";

export default function SignInPage() {
  return (
    <Stack
      spacing={2}
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <SignUp />
    </Stack>
  );
}