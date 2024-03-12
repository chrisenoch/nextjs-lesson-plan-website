"use client";
import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import {
  MediaQueryByTypographyVariant,
  getTypographyVariantSX,
} from "../theme-registry-c/responsive-typography-sx";
import womanOnHammock from "../../../public/images/woman-on-hammock-2400-1600.jpg";

export default function Hero() {
  const theme = useTheme();

  const title: MediaQueryByTypographyVariant = {
    xs: "h4",
    "430c": "h3",
    lg: "h2",
  };
  const titleSX = getTypographyVariantSX(title, theme);

  const titleText: MediaQueryByTypographyVariant = {
    xs: "body2",
    "430c": "body1",
    sm: "body18",
    md: "h6",
  };
  const { fontWeight: doNotUse, ...titleTextSX } = getTypographyVariantSX(
    titleText,
    theme
  );

  return (
    <>
      <Stack
        direction="row"
        maxWidth={"1200px"}
        mx={"auto"}
        marginTop={0}
        marginBottom={2}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          gap={4}
          sx={{
            flexWrap: { xs: "wrap", "630c": "nowrap" },
          }}
          flexWrap={"wrap"}>
          <Grid item display={"flex"} alignItems={"center"} width={"100%"}>
            <Stack alignItems={"start"}>
              <Typography
                gutterBottom
                variant={"h2"}
                sx={titleSX}
                component="h1">
                {/* <Typography gutterBottom variant={titleVariant} component="h1"> */}
                Get{" "}
                <Box
                  component="span"
                  fontWeight="medium"
                  color="secondary.light">
                  fun{" "}
                </Box>
                and{" "}
                <Box
                  component="span"
                  fontWeight="medium"
                  color="secondary.light">
                  creative{" "}
                </Box>
                lesson plans
              </Typography>
              <Typography
                variant={"h6"}
                sx={titleTextSX}
                fontWeight={"regular"}
                component="p"
                mb={3}>
                Spend less time lesson planning and more time making money or
                doing the things you love.{" "}
              </Typography>
              <Button
                download="Free lesson plans"
                href={`${process.env.NEXT_PUBLIC_BASE_URL}/lessonplans/free-lesson-plans.txt`}
                component="a"
                variant={"contained"}
                size="large"
                sx={{
                  fontSize: {
                    xs: "0.8125rem",
                    sm: "0.875rem",
                    md: "0.9375rem",
                  },
                  padding: {
                    xs: "4px 10px",
                    sm: "6px 16px",
                    md: "8px 22px",
                  },
                }}>
                Get 60 free lesson plans
              </Button>
            </Stack>
          </Grid>

          <Grid
            item
            width={"100%"}
            minWidth={"40%"}
            //height="450px"

            sx={{
              height: {
                xs: "200px",
                "430c": "270px",
                "630c": "400px",
                md: "450px",
              },
            }}>
            <Image
              placeholder="blur"
              alt="Woman relaxing on hammock"
              src={womanOnHammock}
              priority
              width={2400}
              height={1600}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "16px",
              }}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}
