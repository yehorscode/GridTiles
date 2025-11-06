import RotatingTile from "@/components/rotatingTile";
import VerticalRotatingTile, { Front, Top, Back, Bottom } from "@/components/verticalRotatingTile";

export default function Home() {
  return (
    <div className="">
      <RotatingTile></RotatingTile>
      {/* <VerticalRotatingTile width="500px" height="100px" border="green" borderWidth="2px" colors={["#0b1", "#162", "#0b1", "#162"]}>
        <Front>
          <div style={{ color: "white", fontWeight: 600 }}>Front 500×100 — click to rotate</div>
        </Front>
        <Top>
          <div style={{ color: "white" }}>Top face content</div>
        </Top>
        <Back>
          <div style={{ color: "white" }}>Back face content</div>
        </Back>
        <Bottom>
          <div style={{ color: "white" }}>Bottom face content</div>
        </Bottom>
      </VerticalRotatingTile> */}
    </div>
  );
}
