import RotatingTile from "@/components/rotatingCube/rotatingTile";
import useFetchData from "./useFetchData";
export default function FeedTile() {
  void console.log(useFetchData("world"));
  return (
    <RotatingTile>
      <RotatingTile.Front>
        <span>Feed Front</span>
      </RotatingTile.Front>
      <RotatingTile.Right>
        <span>Feed Right</span>
      </RotatingTile.Right>
      <RotatingTile.Back>
        <span>Feed Back</span>
      </RotatingTile.Back>
      <RotatingTile.Left>
        <span>Feed Left</span>
      </RotatingTile.Left>
    </RotatingTile>
  );
}
