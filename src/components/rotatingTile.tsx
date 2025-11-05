import { useState } from "react";

type Props = {
  text?: string[];
  className?: string;
  bold?: boolean;
  mono?: boolean;
};
export default function RotatingTile({
  text = ["Lorem Ipsum", "Dolor Sit Amet"],
  className = "",
  bold = false,
  mono = false,
}: Props) {
  const classes = `w-50 h-50 p-4 text-xl ${className} ${bold ? "font-bold" : ""} ${
    mono ? "font-mono" : ""
  }`.trim();

  const [side, setSide] = useState<number>(0);


  function switchSide() {
    setSide((side + 1) % text.length);
    
  }
  function animateTile() {
    
  }

  return (
    <div className={classes} onClick={switchSide}>
      <span>{text[side]}</span>
    </div>
  );
}
