import RotatingTile from "@/components/rotatingCube/rotatingTile";
import VerticalRotatingTile, { Front, Top, Back, Bottom } from "@/components/verticalRotatingCube/verticalRotatingTile";

export default function Home() {
  return (
    <div className="">
      <RotatingTile></RotatingTile>
      <VerticalRotatingTile width="500px" height="100px" border="green" borderWidth="2px" colors={["#0b1", "#162", "#0b1", "#162"]}>
        <Front>
          <div style={{ color: "white", fontWeight: 600 }}>Front</div>
        </Front>
        <Top>
          <div style={{ color: "white" }}>Top </div>
        </Top>
        <Back>
          <div style={{ color: "white" }}>Back </div>
        </Back>
        <Bottom>
          <div style={{ color: "white" }}>Bottom</div>
        </Bottom>
      </VerticalRotatingTile>
    </div>
  );
}
