import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import LessonPlanCard from "@/components/LessonPlans/LessonPlanCard";
import Hero from "@/components/Hero";
import AutoCompleteMultiSelect from "@/components/AutoCompleteMultiSelect";
import { Stack } from "@mui/material";
import { Search } from "@mui/icons-material";
import SearchAndDisplayLessonPlans from "@/components/LessonPlans/SearchAndDisplayLessonPlans";

export default function HomePage() {
  return (
    <>
      <Hero />
      <SearchAndDisplayLessonPlans />
    </>
  );
}
