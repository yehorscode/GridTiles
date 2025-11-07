import { Outlet } from "react-router-dom";
import VerticalRotatingTile, {
  Front,
  Top,
  Back,
  Bottom,
} from "@/components/verticalRotatingCube/verticalRotatingTile";
export default function Layout() {
  return (
    <div className=" min-h-screen">
      <header className="bg-accent min-w-screen rounded-none">
        <VerticalRotatingTile width="100vw" height="50px">
          <Front className="bg-red-500 px-2 justify-start items-start">
            <div className="flex text-left w-full">
              <span className="font-bold font-mono ">GridTiles</span>
              <div className="!justify-end text-right flex-grow flex items-center">
                <button className="bg-gray-300">Homepage</button>
              </div>
            </div>
          </Front>
          <Top className="bg-red-300">Top content</Top>
          <Back className="bg-green-500">Back content</Back>
          <Bottom className="bg-yellow-500">Bottom content</Bottom>
        </VerticalRotatingTile>
      </header>
      <main className="bg-background p-3">
        <Outlet />
      </main>
    </div>
  );
}
