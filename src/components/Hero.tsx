import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function Hero() {
  return (
    <Stack
      direction="row"
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={0}
      marginBottom={2}>
      <Grid container alignItems="center" justifyContent="center">
        <Grid item xs={6}>
          <Typography variant="h3" component="h1">
            Get some free lesson plans
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Image
            alt={"A beach with palm trees"}
            src={
              "https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg"
            }
            width={600}
            height={550}
            priority
            style={{
              maxWidth: "100%",
              //   height: "400px",
              //   width: "auto",
              objectFit: "cover",
              borderRadius: 32,
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
