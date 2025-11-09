import Home1 from "./home_one";
import Home2 from "./home_two";
export default function Home() {
  return (
    <div className="grid grod-cols-1 gap-5">
      <Home1 />
      <Home2 />
      <div className="text-center">

      <h1 className="text-xl font-serif">If you want to see more, check out the <a href="https://github.com/yehorscode/gridtiles" className="underline">Github</a>!</h1>
      </div>
    </div>
  );
}
