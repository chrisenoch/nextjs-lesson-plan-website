import { SxProps, Theme } from "@mui/material";

export function setSXValues(
  sxToSet: {
    userValues: SxProps<Theme> | undefined;
    defaultValues: SxProps<Theme> | undefined;
    sxName: string;
  }[]
) {
  //To do: Give this a mapped Type so that I map the sxNames to the return type.
  let sxValues: any = {};

  sxToSet.forEach(
    (sxObj: {
      userValues: SxProps<Theme> | undefined;
      defaultValues: SxProps<Theme> | undefined;
      sxName: string;
    }) => {
      if (sxObj.userValues) {
        sxValues[`sx${sxObj.sxName}Final`] = {
          ...sxObj.defaultValues,
          ...sxObj.userValues,
        };
      } else {
        sxValues[`sx${sxObj.sxName}Final`] = { ...sxObj.defaultValues };
      }
    }
  );

  return sxValues;
}
