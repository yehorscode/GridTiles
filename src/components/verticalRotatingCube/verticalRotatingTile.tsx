import React, {
  isValidElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
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
  const Face: React.FC<FaceProps> & { slotName: FaceName } = ({
    children,
    className: _className = "",
  }) => <>{children}</>;
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
  const containerRef = useRef<HTMLDivElement>(null);

  const animateTile = useCallback(
    (direction?: 1 | -1) => {
      const step = direction ?? (reverse ? -1 : 1);
      setSide((prev) => (prev + step + 4) % 4);
    },
    [reverse],
  );

  const rotationX = side * -90;

  const faceContent = useMemo(() => {
    const map: Record<FaceName, { content: ReactNode; className?: string }> = {
      front: { content: null, className: "" },
      top: { content: null, className: "" },
      back: { content: null, className: "" },
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
        transform: `rotateX(${rotationX}deg)`,
        ["--cube-width"]: width,
        ["--cube-height"]: height,
        ["--cube-depth"]: depth ?? height,
        ["--cube-border"]: border,
        ["--border-width"]: borderWidth,
      }) as React.CSSProperties & Record<string, string>,
    [rotationX, width, height, depth, border, borderWidth],
  );

  const hasTailwindBg = (cls?: string) => /\bbg-/.test(cls ?? "");
  const faceStyles: Array<React.CSSProperties> = [
    hasTailwindBg(faceContent.front.className) ? {} : { background: colors[0] },
    hasTailwindBg(faceContent.top.className) ? {} : { background: colors[1] },
    hasTailwindBg(faceContent.back.className) ? {} : { background: colors[2] },
    hasTailwindBg(faceContent.bottom.className)
      ? {}
      : { background: colors[3] },
  ];

  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
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
      className={twMerge(clsx("vertical-rotating-cube container", className))}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Rotate Cube"
      aria-live="polite"
    >
      <div className="scene" style={cubeStyle}>
        <div
          className={twMerge(clsx("face front", faceContent.front.className))}
          style={faceStyles[0]}
        >
          {faceContent.front.content}
        </div>
        <div
          className={twMerge(clsx("face top", faceContent.top.className))}
          style={faceStyles[1]}
        >
          {faceContent.top.content}
        </div>
        <div
          className={twMerge(clsx("face back", faceContent.back.className))}
          style={faceStyles[2]}
        >
          {faceContent.back.content}
        </div>
        <div
          className={twMerge(clsx("face bottom", faceContent.bottom.className))}
          style={faceStyles[3]}
        >
          {faceContent.bottom.content}
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
