import { Outlet } from "react-router-dom";
import VerticalRotatingTile, {
  Front,
  Top,
  Back,
  Bottom,
} from "@/components/verticalRotatingCube/verticalRotatingTile";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";
export default function Layout() {
  const { theme, setTheme } = useTheme();
  function toggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const secondsString =
        date.getSeconds() < 10
          ? `0${date.getSeconds()}`
          : `${date.getSeconds()}`;
      setSeconds(secondsString);
      setMinutes(date.getMinutes());
      setHours(date.getHours());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className=" min-h-screen">
      <header className="bg-accent min-w-screen rounded-none">
        <VerticalRotatingTile width="100vw" height="50px" className="">
          <Front className="bg-accent px-2 items-start">
            <div className="flex text-left w-full">
              <div className="!justify-start text-left flex-none">
                <span className="font-mono font-bold">GridTiles</span>
              </div>
              <span className="opacity-0 mx-auto  text-center" >
                Click me!!
              </span>
              <div className="!justify-end text-right flex-none gap-2 flex">
                <button className="bg-accent-foreground text-accent" onClick={() => window.location.href = "/"}>
                  Homepage
                </button>
                <button className="bg-accent-foreground text-accent" onClick={() => window.location.href = "/infinit"}>
                  Infinite Boxes Page
                </button>
              </div>
            </div>
          </Front>
          <Top className="bg-blue-900">
            <div className="">
              <button onClick={toggleTheme} className="px-5 bg-accent">
                Toggle theme!
              </button>
            </div>
          </Top>
          <Back className="bg-green-900 text-white font-bold font-mono text-5xl">
            <span>
              <span>
                {hours}:{minutes}:{seconds}
              </span>
            </span>
          </Back>
          <Bottom className="bg-yellow-500"></Bottom>
        </VerticalRotatingTile>
      </header>
      <main className="bg-background p-3">
        <Outlet />
      </main>
    </div>
  );
}
