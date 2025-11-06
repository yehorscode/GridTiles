import React, { isValidElement, useCallback, useMemo, useState } from "react";
/**
 * VerticalRotatingTile
 *
 * Usage (named faces):
 *
 * import VerticalRotatingTile, { Front, Top, Back, Bottom } from "./verticalRotatingTile";
 *
 * <VerticalRotatingTile width="200px" height="200px">
 *   <Front>Front content</Front>
 *   <Top>Top content</Top>
 *   <Back>Back content</Back>
 *   <Bottom>Bottom content</Bottom>
 * </VerticalRotatingTile>
 *
 * Or compound form:
 *
 * <VerticalRotatingTile width="200px" height="200px">
 *   <VerticalRotatingTile.Front>Front</VerticalRotatingTile.Front>
 *   <VerticalRotatingTile.Top>Top</VerticalRotatingTile.Top>
 *   <VerticalRotatingTile.Back>Back</VerticalRotatingTile.Back>
 *   <VerticalRotatingTile.Bottom>Bottom</VerticalRotatingTile.Bottom>
 * </VerticalRotatingTile>
 */
import type { ReactElement, ReactNode } from "react";
import "./verticalRotatingCube.scss";

type FaceName = "front" | "top" | "back" | "bottom";

type FaceProps = {
  children?: ReactNode;
  className?: string;
};


const makeFace = (name: FaceName) => {
  const Face: React.FC<FaceProps> & { slotName: FaceName } = ({ children }) => <>{children}</>;
  Face.displayName = name.charAt(0).toUpperCase() + name.slice(1);
  Face.slotName = name;
  return Face;
};

const Front = makeFace("front");
const Top = makeFace("top");
const Back = makeFace("back");
const Bottom = makeFace("bottom");

type Props = {
  className?: string;
  reverse?: boolean;
  width?: string; 
  height?: string; 
  depth?: string; 
  border?: string; 
  borderWidth?: string; 
  colors?: string[]; 
  children?: ReactNode;
};

type Compound = React.FC<Props> & {
  Front: typeof Front;
  Top: typeof Top;
  Back: typeof Back;
  Bottom: typeof Bottom;
};

const VerticalRotatingTile: Compound = ({
  className = "",
  reverse = false,
  width = "150px",
  height = "150px",
  depth,
  border = "rgba(255,255,255,0.45)",
  borderWidth = "1px",
  colors = [],
  children,
}) => {
  const [side, setSide] = useState<number>(0); 

  const animateTile = useCallback((direction?: 1 | -1) => {
    const step = direction ?? (reverse ? -1 : 1);
    setSide((prev) => (prev + step + 4) % 4);
  }, [reverse]);

  const rotationX = side * -90; 

  const faceContent = useMemo(() => {
    const map: Record<FaceName, ReactNode> = {
      front: null,
      top: null,
      back: null,
      bottom: null,
    };
    React.Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const el = child as ReactElement<{ children?: ReactNode }> & { type: { slotName?: FaceName } };
      const slot = el.type && (el.type as any).slotName;
      if (slot && (map as any)[slot] === null) {
        (map as any)[slot] = el.props.children;
      }
    });
    return map;
  }, [children]);

  const cubeStyle = useMemo(() => ({
    transform: `rotateX(${rotationX}deg)`,
    ["--cube-width"]: width,
    ["--cube-height"]: height,
    ["--cube-depth"]: depth ?? height,
    ["--cube-border"]: border,
    ["--border-width"]: borderWidth,
  }) as React.CSSProperties & Record<string, string>, [rotationX, width, height, depth, border, borderWidth]);

  const faceStyles: Array<React.CSSProperties> = [
    { background: colors[0] }, 
    { background: colors[1] }, 
    { background: colors[2] }, 
    { background: colors[3] }, 
  ];

  const handleKey = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      animateTile();
    }
    if (e.key === "ArrowUp") {
      animateTile(1);
    }
    if (e.key === "ArrowDown") {
      animateTile(-1);
    }
  }, [animateTile]);

  return (
    <div
      className={`vertical-rotating-cube container ${className}`.trim()}
      onClick={() => animateTile()}
      onKeyDown={handleKey}
      role="button"
      tabIndex={0}
      aria-label="Rotate Cube"
      aria-live="polite"
    >
      <div className="scene" style={cubeStyle}>
        <div className="face front" style={faceStyles[0]}>
          {faceContent.front}
        </div>
        <div className="face top" style={faceStyles[1]}>
          {faceContent.top}
        </div>
        <div className="face back" style={faceStyles[2]}>
          {faceContent.back}
        </div>
        <div className="face bottom" style={faceStyles[3]}>
          {faceContent.bottom}
        </div>
      </div>
    </div>
  );
};

VerticalRotatingTile.Front = Front;
VerticalRotatingTile.Top = Top;
VerticalRotatingTile.Back = Back;
VerticalRotatingTile.Bottom = Bottom;

export default VerticalRotatingTile;

export { Front, Top, Back, Bottom };
