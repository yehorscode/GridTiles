import React, { useEffect, useState } from "react";
import clickSound from "@/assets/sounds/orb.mp3";

type Props = {
  text?: string;
  size?: string;
};
export default function GridMainText({
  text = "test",
  size = "text-4xl",
}: Props) {
  const [chars, setChars] = useState(() =>
    text.split("").map((char, i) => ({
      id: `${i}-${Math.random().toString(36).slice(2, 8)}`,
      char,
    })),
  );
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  useEffect(() => {
    setChars(
      text.split("").map((char, i) => ({
        id: `${i}-${Math.random().toString(36).slice(2, 8)}`,
        char,
      })),
    );
  }, [text]);

  function handleDragStart(e: React.DragEvent<HTMLSpanElement>, index: number) {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
    setDragIndex(index);
    const sound = new Audio(clickSound);
    sound.volume = 0.4;
    sound.play();
  }

  function handleDragOver(e: React.DragEvent<HTMLSpanElement>) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }

  function handleDrop(e: React.DragEvent<HTMLSpanElement>, toIndex: number) {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text/plain"));
    if (Number.isNaN(from)) return;
    if (from === toIndex) {
      setDragIndex(null);
      return;
    }
    setChars((prev) => {
      const copy = [...prev];
      const [moved] = copy.splice(from, 1);
      copy.splice(toIndex, 0, moved);
      return copy;
    });
    setDragIndex(null);
  }

  return (
    <div className="flex flex-wrap">
      {chars.map((item, index) => (
        <span
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          className={`border px-2 ${size} select-none cursor-move font-mono ${
            dragIndex === index ? "opacity-50" : ""
          }`}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
