import { SignIn } from "@/components/Auth/SignIn";
import CurvedUnderlineTitle from "@/components/CurvedUnderline";
import { Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";

export default function SignInPage() {
  return (
    <Stack
      spacing={2}
      maxWidth={"500px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}
      justifyContent={"center"}>
      <CurvedUnderlineTitle
        component={"h1"}
        variant="h3"
        title={"Sign In"}
        color={orange[300]}
        sxUnderline={{ left: 2, borderRadius: "30%" }}
        sxTypography={{ marginBottom: "12px !important", alignSelf: "center" }}
      />
      <SignIn />
    </Stack>
  );
}
