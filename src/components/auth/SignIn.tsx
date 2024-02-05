"use client";
import {
  AppDispatch,
  selectLoginStatus,
  selectUserLogin,
  userLogin,
} from "@/store";
import { Box, TextField, Button, Stack, Alert } from "@mui/material";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirect, useSearchParams } from "next/navigation";
import useHideMessageOnNavAway from "@/customHooks/useHideMessageOnNavAway";
import { LoadingButton } from "@mui/lab";
import { LoginStatus } from "@/models/types/Auth/LoginStatus";
import NotificationBox from "../NotificationBox";
import { red } from "@mui/material/colors";
import CurvedUnderlineTitle from "../Presentation/CurvedUnderline";
import { orange, blue } from "@mui/material/colors";
import LoadingSpinner from "../Presentation/LoadingSpinner";
import { useHydrated } from "@/customHooks/useHydrated";
import { StandardResponseInfo } from "@/models/types/DataFetching/StandardResponseInfo";

export function SignIn() {
  const loginStatus: LoginStatus = useSelector(selectLoginStatus);
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const userLoginStatus: StandardResponseInfo = useSelector(selectUserLogin);

  let isProtectedPage = false;
  if (searchParams.get("redirect")) {
    isProtectedPage = true;
  }
  let isMemberPage = false;
  if (searchParams.get("member")) {
    isMemberPage = true;
  }

  const shouldHideMessage = useHideMessageOnNavAway(userLoginStatus);

  const isHydrated = useHydrated();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(userLogin({ email, password }));
  }

  if (loginStatus === "LOGIN_NOT_PROCESSED" || !isHydrated) {
    return (
      <Box display="flex" justifyContent={"center"}>
        <LoadingSpinner />
      </Box>
    );
  }

  if (loginStatus === "LOGGED_IN") {
    if (redirectPath) {
      redirect(redirectPath);
    } else {
      redirect("/");
    }
  }

  return (
    <>
      {isProtectedPage && (
        <NotificationBox
          message={
            isMemberPage
              ? "You need to be a gold member and logged-in to view this page."
              : "You need to be logged-in to view this page."
          }
          sxOuterContainer={{
            marginTop: 0,
            marginBottom: 7,
            maxWidth: "600px",
          }}
          sxInnerContainer={{
            paddingY: 2,
          }}
          sxMessage={{ fontSize: "large" }}
          variant="info"
        />
      )}

      <Stack
        spacing={2}
        maxWidth={"500px"}
        mx={"auto"}
        marginTop={2}
        marginBottom={2}
        justifyContent={"center"}>
        <CurvedUnderlineTitle
          component={"h1"}
          variant={isProtectedPage ? "h4" : "h3"}
          title={"Sign In"}
          color={orange[300]}
          sxUnderline={{ left: 2, borderRadius: "30%" }}
          sxTypography={{
            marginBottom: "12px !important",
            alignSelf: "center",
          }}
        />
        <Box
          onSubmit={handleSubmit}
          component="form"
          display={"flex"}
          flexDirection={"column"}
          gap={2}>
          <TextField
            autoFocus={true}
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

          {!userLoginStatus.isLoading && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
          {userLoginStatus.isLoading && (
            <LoadingButton
              key={"loading-placeholder"}
              loading
              variant="contained">
              {/* value here affects the button size */}
              Submit
            </LoadingButton>
          )}
          {!shouldHideMessage && userLoginStatus.isError && (
            <NotificationBox
              message={userLoginStatus.message}
              sxOuterContainer={{
                marginTop: 2,
              }}
              variant="error"
            />
          )}
        </Box>
      </Stack>
    </>
  );
}
