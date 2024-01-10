"use client";
import { AppDispatch, selectFetchLessonPlans } from "@/store";
import {
  fetchLessonPlans,
  selectAllLessonPlans,
} from "@/store/slices/with-thunks/lessonplans-slice";
import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PremiumPage() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchLessonPlans());
  }, [dispatch]);

  const fetchLessonPlansInfo: {
    isError: boolean;
    isLoading: boolean;
    message: string;
    statusCode: null | number;
  } = useSelector(selectFetchLessonPlans);

  const lessonPlans = useSelector(selectAllLessonPlans);

  console.log("fetchLessonPlansInfo below");
  console.log(fetchLessonPlansInfo);

  console.log("lessonPlans");
  console.log(lessonPlans);

  return (
    <Stack
      spacing={2}
      maxWidth={"1200px"}
      mx={"auto"}
      marginTop={2}
      marginBottom={2}>
      <p>This is the premium area!</p>
    </Stack>
  );
}
