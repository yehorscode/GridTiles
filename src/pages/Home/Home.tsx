import RotatingTile from "@/components/rotatingTile";

export default function Home() {
  return (
    <div className="flex">
      <RotatingTile
        className=""
        text={[
          "Hi! Click me!!",
          "Thanks! Click more",
          "YAYAY",
          "No more clicking 4 u!",
        ]}
        border="green"
      />
    </div>
  );
}
