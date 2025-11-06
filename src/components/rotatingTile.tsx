import { useState } from "react";
import "./rotatingCube.scss";
type Props = {
  text?: string[];
  className?: string;
  bold?: boolean;
  mono?: boolean;
  colors?: string[];
  border?: string;
  borderWidth?: string;
};
export default function RotatingTile({
  text = [],
  className = "",
  bold = false,
  mono = false,
  colors = [],
  border = "",
  borderWidth = "1px",
}: Props) {
  const [side, setSide] = useState<number>(0);

  function animateTile(direction: 1 | -1 = 1) {
    setSide((prev) => (prev + direction + 4) % 4);
  }

  const rotationY = side * -90;
  const textClasses = `w-50 h-50 text-xl ${className} ${
    bold ? "font-bold" : ""
  } ${mono ? "font-mono" : ""}`.trim();

  const cubeStyle = {
    transform: `rotateY(${rotationY}deg)`,
    ["--cube-front"]: colors?.[0],
    ["--cube-right"]: colors?.[1],
    ["--cube-back"]: colors?.[2],
    ["--cube-left"]: colors?.[3],
    ["--cube-top"]: colors?.[4],
    ["--cube-bottom"]: colors?.[5],
    ["--cube-border"]: border,
    ["--border-width"]: borderWidth,
  } as React.CSSProperties & Record<string, string | undefined>;

  return (
    <div className="container" onClick={() => animateTile()} role="button" aria-label="Rotate cube">
      <div className="scene">
        <div className="cube" style={cubeStyle}>
          <div className="face front">
            <span className={textClasses}>{text[0] ?? "Front"}</span>
          </div>
          <div className="face back">
            <span className={textClasses}>{text[2] ?? "Back"}</span>
          </div>
          <div className="face right">
            <span className={textClasses}>{text[1] ?? "Right"}</span>
          </div>
          <div className="face left">
            <span className={textClasses}>{text[3] ?? "Left"}</span>
          </div>
          <div className="face top">
            <span>Top</span>
          </div>
          <div className="face bottom">
            <span>Bottom</span>
          </div>
        </div>
      </div>
    </div>
  );
}
