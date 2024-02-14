import { SxProps, Theme } from "@mui/material";

/**
 * @summary MUI styled components cannot be used in Next.js server components. This function allows us to pass custom props to components in server components.
 * @description Allow user to pass sx props to custom, with the component defining default sx props if the user does not supply them.
 * @param sxToSet 
 * @example - 'Usage in a component, assuming the component accepts sxOuterContainer and sxInnerContainer as props'.
 *  const sxOuterContainerDefault: SxProps<Theme> = {
      maxWidth: "900px",
      mt: 3,
    };
     const sxInnerContainerDefault: SxProps<Theme> = {
    //some values
  };
     const {
    sxOuterContainerFinal, sxInnerContainerFinal
  } = setSXValues([
    {
      userValues: sxOuterContainer,
      defaultValues: sxOuterContainerDefault,
      sxName: "OuterContainer",
    },
      {
      userValues: sxInnerContainer,
      defaultValues: sxInnerContainerDefault,
      sxName: "InnerContainer",
    },
    ]);

    'And then sxOuterContainerFinal and sxInnerContainerFinal can be assigned to the internal component elements as sx props.'
 * @returns An object with the final SxProps objects. The object values follow a strict naming convention. E.g. If you supply the function with sxOuterContainer,
    it will return sxOuterContainerFinal.
 */
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
