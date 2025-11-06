import { useState } from "react";
import "./verticalRotatingCube.scss";
type Props = {
  text?: string[];
  className?: string;
  bold?: boolean;
  mono?: boolean;
  colors?: string[];
  border?: string;
  borderWidth?: string;
  reverse?: boolean;
  width: string;
  height: string;
};
export default function verticalRotatingTile({
  text = [],
  className = "",
  bold = false,
  mono = false,
  colors = [],
  border = "",
  borderWidth = "1px",
  reverse = false,
  width = "",
  height = "",
}: Props) {
  const [side, setSide] = useState<number>(0);
  function animateTile(direction?: 1 | -1) {
    const step = direction ?? (reverse ? -1 : 1);
    setSide((prev) => (prev + step + 4) % 4);
  }
  const rotationX = side * -90;
  const textClasses = `w-50 h-50 text-xl ${className} ${
    bold ? "font-bold" : ""
  } ${mono ? "font-mono" : ""}`.trim();

  const cubeStyle = {
    transform: `rotateX(${rotationX}deg)`,
    ["--cube-width"]: width,
    ["--cube-height"]: height,
  } as React.CSSProperties & Record<string, string | undefined>;

  return (
    <div
      className="container"
      onClick={() => animateTile()}
      role="button"
      aria-label="Rotate Cube"
    >
      <div className="scene" style={cubeStyle}>
        <div className="face front"></div>
        <div className="face top"></div>
        <div className="face back"></div>
        <div className="face bottom"></div>
      </div>
    </div>
  );
}
