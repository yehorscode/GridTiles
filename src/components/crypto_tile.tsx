import axios from "axios";
import VerticalRotatingTile from "./verticalRotatingCube/verticalRotatingTile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import eth from "@/assets/eth.svg";
import btc from "@/assets/btc.svg";
import sol from "@/assets/sol.svg";
import xmr from "@/assets/monero.svg";
export default function CryptoTile() {
  const request_url = 'https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=solana%2Cbitcoin%2Cmonero%2Cethereum&names=Solana%2CBitcoin%2CMonero%2CEthereum&symbols=sol%2Cbtc%2Cxmr%2Ceth&include_24hr_change=true';
  const [bitcoinPrice, setBitcoinPrice] = useState(0);
  const [bitcoinChange, setBitcoinChange] = useState(0);
  const [isBitcoinUp, setIsBitcoinUp] = useState(true);
  const [ethereumPrice, setEthereumPrice] = useState(0);
  const [ethereumChange, setEthereumChange] = useState(0);
  const [isEthereumUp, setIsEthereumUp] = useState(true);
  const [moneroPrice, setMoneroPrice] = useState(0);
  const [moneroChange, setMoneroChange] = useState(0);
  const [isMoneroUp, setIsMoneroUp] = useState(true);
  const [solanaPrice, setSolanaPrice] = useState(0);
  const [solanaChange, setSolanaChange] = useState(0);
  const [isSolanaUp, setIsSolanaUp] = useState(true);
  function getCoinsPrice() {
    axios
      .get(request_url, {
        method: "GET",
        headers: {
          "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
        },
      })
      .then((response) => {
        console.log("Bitcoin price: (USD)", response.data.bitcoin.usd);
        console.log(response.data);
        setBitcoinPrice(response.data.bitcoin.usd);
        setBitcoinChange(response.data.bitcoin.usd_24h_change);
        setEthereumPrice(response.data.ethereum.usd);
        setEthereumChange(response.data.ethereum.usd_24h_change);
        setMoneroPrice(response.data.monero.usd);
        setMoneroChange(response.data.monero.usd_24h_change);
        setSolanaPrice(response.data.solana.usd);
        setSolanaChange(response.data.solana.usd_24h_change);
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching Bitcoin price:", error);
        toast.error("Error fetching Bitcoin price", error);
      });
  }
  useEffect(() => {
    getCoinsPrice();
  }, []);

  useEffect(() => {
    if (bitcoinChange > 0) {
      setIsBitcoinUp(true);
    } else {
      setIsBitcoinUp(false);
    }
    if (ethereumChange > 0) {
      setIsEthereumUp(true);
    } else {
      setIsEthereumUp(false);
    }
    if (moneroChange > 0) {
      setIsMoneroUp(true);
    } else {
      setIsMoneroUp(false);
    }
    if (solanaChange > 0) {
      setIsSolanaUp(true);
    } else {
      setIsSolanaUp(false);
    }
  }, [bitcoinChange, ethereumChange, moneroChange, solanaChange]);

  return (
    <VerticalRotatingTile width="100%">
      <VerticalRotatingTile.Front
        className={`${
          isBitcoinUp
            ? "bg-linear-to-b from-green-500 to-green-700"
            : "bg-linear-to-b from-red-500 to-red-700"
        }`}
      >
        <span className="flex font-serif text-4xl gap-1 align-middle">
          <img src={btc} alt="Bitcoin" />
          {bitcoinPrice} USD
        </span>
        <div className="flex items-center gap-1">
          <span className="flex font-serif text-2xl ml-3">
            {bitcoinChange.toFixed(2)} %
          </span>
          <span>{isBitcoinUp ? "▲" : "▼"}</span>
        </div>
      </VerticalRotatingTile.Front>

      <VerticalRotatingTile.Top className={`${
          isEthereumUp
            ? "bg-linear-to-b from-green-500 to-green-700"
            : "bg-linear-to-b from-red-500 to-red-700"
        }`}
      >
        <span className="flex font-serif text-4xl gap-1">
          <img src={eth} alt="Ethereum" />
          {ethereumPrice} USD
        </span>
        <div className="flex items-center gap-1">
          <span className="flex font-serif text-2xl ml-3">
            {ethereumChange.toFixed(2)} %
          </span>
          <span>{isEthereumUp ? "▲" : "▼"}</span>
        </div>

      </VerticalRotatingTile.Top>
      <VerticalRotatingTile.Back className={`${
          isSolanaUp
            ? "bg-linear-to-b from-green-500 to-green-700"
            : "bg-linear-to-b from-red-500 to-red-700"
        }`}
      >
        <span className="flex font-serif text-4xl gap-1">
          <img src={sol} alt="Ethereum" />
          {solanaPrice} USD
        </span>
        <div className="flex items-center gap-1">
          <span className="flex font-serif text-2xl ml-3">
            {solanaChange.toFixed(2)} %
          </span>
          <span>{isSolanaUp ? "▲" : "▼"}</span>
        </div>

      </VerticalRotatingTile.Back>
      <VerticalRotatingTile.Bottom className={`${
          isMoneroUp
            ? "bg-linear-to-b from-green-500 to-green-700"
            : "bg-linear-to-b from-red-500 to-red-700"
        }`}
      >
        <span className="flex font-serif text-4xl gap-1">
          <img src={xmr} alt="Monero" className="h-9"/>
          {moneroPrice} USD
        </span>
        <div className="flex items-center gap-1">
          <span className="flex font-serif text-2xl ml-3">
            {moneroChange.toFixed(2)} %
          </span>
          <span>{isMoneroUp ? "▲" : "▼"}</span>
        </div>
        </VerticalRotatingTile.Bottom>
    </VerticalRotatingTile>
  );
}
