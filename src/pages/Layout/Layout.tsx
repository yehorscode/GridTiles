import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className=" min-h-screen">
      <header className="bg-accent text-accent p-3">
        <h1 className="text-accent-foreground">GridTiles</h1>
      </header>
      <main className="bg-background p-3">
        <Outlet />
      </main>
    </div>
  );
}
