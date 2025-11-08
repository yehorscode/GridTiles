import RotatingTile from "@/components/rotatingCube/rotatingTile";
import useFetchData from "./useFetchData";

export default function FeedTile() {
  const { feed, error } = useFetchData("europe");
  void console.log(feed);
  return (
    <div className="">
      <RotatingTile border="transparent">
        <RotatingTile.Front className="text-left !justify-end flex !items-end !bg-accent !border !border-white/30">
          <span className="text-right text-xl">
            {feed && <span>{feed?.items?.[1]?.title}</span>}
          </span>
        </RotatingTile.Front>
        <RotatingTile.Right className="!p-0 !m-0 !border !border-white/30 !bg-accent">
          <img src={feed?.items?.[1]?.image} alt="" />
        </RotatingTile.Right>
        <RotatingTile.Back className="text-left !justify-end flex !items-end !bg-accent !border !border-white/30">
          <span className="text-right text-xl">
            {feed && <span>{feed?.items?.[2]?.title}</span>}
          </span>
        </RotatingTile.Back>
        <RotatingTile.Left className="!p-0 !m-0 !border !border-white/30 !bg-accent">
          <img src={feed?.items?.[2]?.image} alt="" />
        </RotatingTile.Left>
      </RotatingTile>

      <div className="mt-2 text-sm"></div>
    </div>
  );
}
