import RotatingTile from "@/components/rotatingCube/rotatingTile";

export default function InfiniteBoxes() {
  return (
    <div className="w-full justify-center items-center flex gap-1">
      <div className="grid justify-center grid-cols-8">
        {Array.from({ length: 64 }).map((_, index) => (
          <RotatingTile key={index} />
        ))}
      </div>
    </div>
  );
}

