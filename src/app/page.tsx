import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import MediaCard from "@/components/MediaCard";
import Hero from "@/components/Hero";
import AutoCompleteMultiSelect from "@/components/AutoCompleteMultiSelect";
import { Stack } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function HomePage() {
  return (
    <>
      <Hero />
      {/* <Box
        sx={{
          maxWidth: "900px",
          mt: 10,
          mb: 4,
          mx: "auto",
        }}> */}
      <Stack
        spacing={4}
        sx={{
          maxWidth: "900px",
          mt: 10,
          mb: 4,
          mx: "auto",
        }}>
        <Typography
          variant="h4"
          component="h3"
          borderBottom={4}
          borderColor={"primary.light"}
          alignSelf={"center"}>
          Search lesson plans
        </Typography>

        <AutoCompleteMultiSelect />
      </Stack>
      {/* </Box> */}
      <Box
        sx={{
          // height: "100%",
          display: "flex",
          maxWidth: "1200px",
          margin: "0 auto",
          // width: "100%",
        }}>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid xs={4}>
            <MediaCard
              heading="Driverless Cars"
              imageURL="https://raw.githubusercontent.com/chrisenoch/assets/main/driverlesscars.jpg"
              alt="A man driving a car"
              text="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              heading="The Founding of Hollywood"
              text="HSL (for hue, saturation, lightness) and HSV (for hue, saturation, value; also known as HSB, for hue, saturation, brightness) are alternative representations of the RGB color model, designed in the 1970s by computer graphics researchers."
              imageURL="https://raw.githubusercontent.com/chrisenoch/assets/main/hollywood2.jpg"
              alt="Hollywood"
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              heading="Your Dream Holiday"
              text="An RGB color space is any additive color space based on the RGB color model. RGB color spaces are commonly found describing the input signal to display devices such as television screens and computer monitors."
              imageURL="https://raw.githubusercontent.com/chrisenoch/assets/main/beach.jpg"
              alt="A beach with palm trees"
            />
          </Grid>
          <Grid xs={4}>
            <MediaCard
              heading="Shopping for Clothes"
              text="The CIELAB color space, also referred to as L*a*b*, was intended as a perceptually uniform space, where a given numerical change corresponds to a similar perceived change in color."
              imageURL="https://raw.githubusercontent.com/chrisenoch/assets/main/shopping.jpg"
              alt="A woman with shopping bags full of clothes"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
