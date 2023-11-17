import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
          <Typography gutterBottom variant="h3" component="h1">
            Get{" "}
            <Box component="span" fontWeight="medium" color="secondary.light">
              creative{" "}
            </Box>
            lesson plans
          </Typography>
          <Typography variant="h5" component="p" mb={3}>
            Spend less time lesson planning and more time with friends. Download
            <Box component="span" fontWeight="bold" color="secondary.main">
              {" "}
              60 free lessons{" "}
            </Box>
            now.
          </Typography>
          <Button variant={"contained"} size="large">
            Download
          </Button>
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
              height: "auto",
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
