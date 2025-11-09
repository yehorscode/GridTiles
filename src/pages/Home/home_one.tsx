import CryptoTile from "@/components/crypto_tile";
export default function Home1() {
  return (
    <div className="justify-center items-center flex flex-col gap-5">
      <div className="w-full justify-center items-center flex flex-col gap-1">
        <h1 className="text-2xl font-serif">
          Example of using tiles as a crypto tracker
        </h1>
        <span className="mb-2 opacity-40">Click the tile!</span>
        <CryptoTile />
      </div>
    </div>
  );
}
