import { ReactElement } from "react";

export default function SVG({
  width,
  height,
  viewBox,
  children,
  ...props
}: {
  width: string;
  height: string;
  viewBox: { minX: number; minY: number; width: number; height: number };
  children: ReactElement;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`${viewBox.minX} ${viewBox.minY} ${viewBox.width} ${viewBox.height} `}
      {...props}>
      {children}
    </svg>
  );
}
