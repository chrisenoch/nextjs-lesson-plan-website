import { useMediaQuery } from "@mui/material";

type Media = "matches0Up" | "matches630Up" | "matches900Up" | "matches1200Up";

export default function useMediaQueryhelper(valueObjectsByPropertyName: {
  [key: string]: { [key: string]: Media }[];
}) {
  const matches0Up = useMediaQuery("(min-width:0px)");
  const matches630Up = useMediaQuery("(min-width:630px)");
  const matches900Up = useMediaQuery("(min-width:900px)");
  const matches1200Up = useMediaQuery("(min-width:1200px)");

  const media = {
    matches0Up,
    matches630Up,
    matches900Up,
    matches1200Up,
  };

  const returnObject: any = {};
  Object.entries(valueObjectsByPropertyName).forEach(
    ([propertyName, valuesArr]) => {
      for (let i = 0; i < valuesArr.length; i++) {
        const valueObj = valuesArr[i];
        const key = Object.keys(valueObj)[0];
        const matches = Object.values(valueObj)[0];
        const isMatch = media[matches];
        if (isMatch) {
          returnObject[propertyName] = key;
        }
      }
    }
  );

  return returnObject;
}

//Example argument of valueObjectsByPropertyName
// const { titleVariant, titleTextVariant } = useMediaQueryhelper({
//     titleVariant: [
//       { h4: "matches0Up" },
//       { h3: "matches630Up" },
//       { h2: "matches1200Up" },
//     ],
//     titleTextVariant: [{ body1: "matches0Up" }, { h6: "matches900Up" }],
//   });
