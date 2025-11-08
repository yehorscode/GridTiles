import React, {
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import type { ReactElement, ReactNode } from "react";
import "./rotatingCube.scss";

// generated the comments for these with ai cuz im lazy
/**
 * RotatingTile (horizontal rotation / Y axis)
 *
 * Usage (named faces):
 *
 * import RotatingTile, { Front, Right, Back, Left, Top, Bottom } from "./rotatingTile";
 *
 * <RotatingTile width="200px" height="200px" colors={["red","green","magenta","purple"]}>
 *   <Front>Front content</Front>
 *   <Right>Right content</Right>
 *   <Back>Back content</Back>
 *   <Left>Left content</Left>
 *   <Top>Top overlay</Top>
 *   <Bottom>Bottom overlay</Bottom>
 * </RotatingTile>
 *
 * Or compound form:
 *
 * <RotatingTile width="200px" height="200px">
 *   <RotatingTile.Front>Front</RotatingTile.Front>
 *   <RotatingTile.Right>Right</RotatingTile.Right>
 *   <RotatingTile.Back>Back</RotatingTile.Back>
 *   <RotatingTile.Left>Left</RotatingTile.Left>
 *   <RotatingTile.Top>Top</RotatingTile.Top>
 *   <RotatingTile.Bottom>Bottom</RotatingTile.Bottom>
 * </RotatingTile>
 */

type FaceName = "front" | "right" | "back" | "left" | "top" | "bottom";

type FaceProps = {
  children?: ReactNode;
  className?: string;
};

const makeFace = (name: FaceName) => {
  const Face: React.FC<FaceProps> & { slotName: FaceName } = ({
    children,
    className: _className = "",
  }) => <>{children}</>;
  Face.displayName = name.charAt(0).toUpperCase() + name.slice(1);
  Face.slotName = name;
  return Face;
};

const Front = makeFace("front");
const Right = makeFace("right");
const Back = makeFace("back");
const Left = makeFace("left");
const Top = makeFace("top");
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
  Right: typeof Right;
  Back: typeof Back;
  Left: typeof Left;
  Top: typeof Top;
  Bottom: typeof Bottom;
};

const RotatingTile: Compound = ({
  className = "",
  reverse = false,
  width = "200px",
  height = "200px",
  depth,
  border = "rgba(255,255,255,0.45)",
  borderWidth = "1px",
  colors = [],
  children,
}) => {
  const [side, setSide] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const animateTile = useCallback(
    (direction?: 1 | -1) => {
      const step = direction ?? (reverse ? -1 : 1);
      setSide((prev) => (prev + step + 4) % 4);
    },
    [reverse],
  );

  const rotationY = side * -90;

  const faceContent = useMemo(() => {
    const map: Record<FaceName, { content: ReactNode; className?: string }> = {
      front: { content: null, className: "" },
      right: { content: null, className: "" },
      back: { content: null, className: "" },
      left: { content: null, className: "" },
      top: { content: null, className: "" },
      bottom: { content: null, className: "" },
    };
    React.Children.forEach(children, (child) => {
      if (!isValidElement(child)) return;
      const el = child as ReactElement<{
        children?: ReactNode;
        className?: string;
      }> & { type: { slotName?: FaceName } };
      const slot = (el.type as any)?.slotName as FaceName | undefined;
      if (slot) {
        const key = slot as FaceName;
        if (map[key].content === null) {
          map[key] = {
            content: el.props.children,
            className: el.props.className,
          };
        }
      }
    });
    return map;
  }, [children]);

  const cubeStyle = useMemo(
    () =>
      ({
        transform: `rotateY(${rotationY}deg)`,
        ["--cube-width"]: width,
        ["--cube-height"]: height,
        ["--cube-depth"]: depth ?? width,
        ["--cube-front"]: colors?.[0],
        ["--cube-right"]: colors?.[1],
        ["--cube-back"]: colors?.[2],
        ["--cube-left"]: colors?.[3],
        ["--cube-top"]: colors?.[4],
        ["--cube-bottom"]: colors?.[5],
        ["--cube-border"]: border,
        ["--border-width"]: borderWidth,
      }) as React.CSSProperties & Record<string, string | undefined>,
    [rotationY, width, height, depth, colors, border, borderWidth],
  );

  const hasTailwindBg = (cls?: string) => /\bbg-/.test(cls ?? "");
  const faceStyles: Array<React.CSSProperties> = [
    hasTailwindBg(faceContent.front.className) ? {} : { background: colors[0] },
    hasTailwindBg(faceContent.right.className) ? {} : { background: colors[1] },
    hasTailwindBg(faceContent.back.className) ? {} : { background: colors[2] },
    hasTailwindBg(faceContent.left.className) ? {} : { background: colors[3] },
    hasTailwindBg(faceContent.top.className) ? {} : { background: colors[4] },
    hasTailwindBg(faceContent.bottom.className)
      ? {}
      : { background: colors[5] },
  ];

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        animateTile();
      }
      if (e.key === "ArrowRight") animateTile(1);
      if (e.key === "ArrowLeft") animateTile(-1);
    },
    [animateTile],
  );

  const isInteractiveTarget = (target: EventTarget | null) => {
    if (!target || !(target instanceof HTMLElement)) return false;
    if (target === containerRef.current) return false;
    const interactive = target.closest(
      'a, button, input, select, textarea, [contenteditable], [data-prevent-rotate], [role="button"], [role="link"]',
    );
    return Boolean(interactive && interactive !== containerRef.current);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(e.target)) return;
    animateTile();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInteractiveTarget(e.target)) return;
    handleKey(e);
  };

  return (
    <div
      ref={containerRef}
      className={twMerge(clsx("rotating-cube container", className))}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Rotate Cube"
      aria-live="polite"
    >
      <div className="scene">
        <div className="cube" style={cubeStyle}>
          <div
            className={twMerge(clsx("face front", faceContent.front.className))}
            style={faceStyles[0]}
          >
            {faceContent.front.content}
          </div>
          <div
            className={twMerge(clsx("face right", faceContent.right.className))}
            style={faceStyles[1]}
          >
            {faceContent.right.content}
          </div>
          <div
            className={twMerge(clsx("face back", faceContent.back.className))}
            style={faceStyles[2]}
          >
            {faceContent.back.content}
          </div>
          <div
            className={twMerge(clsx("face left", faceContent.left.className))}
            style={faceStyles[3]}
          >
            {faceContent.left.content}
          </div>
          <div
            className={twMerge(clsx("face top", faceContent.top.className))}
            style={faceStyles[4]}
          >
            {faceContent.top.content}
          </div>
          <div
            className={twMerge(
              clsx("face bottom", faceContent.bottom.className),
            )}
            style={faceStyles[5]}
          >
            {faceContent.bottom.content}
          </div>
        </div>
      </div>
    </div>
  );
};

RotatingTile.Front = Front;
RotatingTile.Right = Right;
RotatingTile.Back = Back;
RotatingTile.Left = Left;
RotatingTile.Top = Top;
RotatingTile.Bottom = Bottom;

export default RotatingTile;
export { Front, Right, Back, Left, Top, Bottom };
