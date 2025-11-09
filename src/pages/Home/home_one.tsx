import CryptoTile from "@/components/crypto_tile";
export default function Home1() {
  return (
    <div className="justify-center items-center flex flex-col gap-5">
      <div className="w-full justify-center items-center flex flex-col gap-5">
        <h1 className="text-2xl font-serif">
          Example of an interesting tile usage:
        </h1>
        <CryptoTile />
      </div>
    </div>
  );
}
