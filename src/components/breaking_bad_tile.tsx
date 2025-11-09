import { useEffect, useState } from "react";
import RotatingTile from "./rotatingCube/rotatingTile";
import axios from "axios";
interface Quote {
  quote: string;
  author: string;
}

export default function BreakingBadTile() {
  const api_url = "https://api.breakingbadquotes.xyz/v1/quotes/6";
  const [quotes, setQuotes] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [chuckJokes, setChuckJokes] = useState<string[]>([]);

  function getChuckNorris() {
    for (let i = 0; i < 3; i++) {
      axios.get("https://api.chucknorris.io/jokes/random").then((response) => {
        setChuckJokes((prevJokes) => [...prevJokes, response.data.value]);
      });
    }
  }

  useEffect(() => {
    axios.get(api_url).then((response) => {
      const quotesData = response.data.map((item: Quote) => item.quote);
      const authorsData = response.data.map((item: Quote) => item.author);
      setQuotes(quotesData);
      setAuthors(authorsData);
    });
    getChuckNorris();
  }, []);
  return (
    <div className="justify-center items-center flex flex-col gap-5">
      <div className="w-full justify-center items-center flex flex-col gap-1">
        <h1 className="text-2xl font-serif">Or you can do quotes!</h1>
        <span className="mb-2 opacity-40">Click the tile!</span>
        <div className="grid grid-cols-3 gap-2">
          <RotatingTile>
            <RotatingTile.Front className="bg-accent! font-bold">
              {quotes[0]}
            </RotatingTile.Front>
            <RotatingTile.Right className="!bg-emerald-900">
              by {authors[0]}, Breaking Bad
            </RotatingTile.Right>
            <RotatingTile.Back className="bg-accent! font-bold">
              {quotes[1]}
            </RotatingTile.Back>
            <RotatingTile.Left className="!bg-emerald-900">
              by {authors[1]}, Breaking Bad
            </RotatingTile.Left>
          </RotatingTile>
          <RotatingTile>
            <RotatingTile.Front className="bg-accent! font-bold">
              {quotes[2]}
            </RotatingTile.Front>
            <RotatingTile.Right className="!bg-emerald-900">
              by {authors[2]}, Breaking Bad
            </RotatingTile.Right>
            <RotatingTile.Back className="bg-accent! font-bold">
              {quotes[3]}
            </RotatingTile.Back>
            <RotatingTile.Left className="!bg-emerald-900">
              by {authors[3]}, Breaking Bad
            </RotatingTile.Left>
          </RotatingTile>
          <RotatingTile>
            <RotatingTile.Front className="bg-accent! font-bold">
              {quotes[4]}
            </RotatingTile.Front>
            <RotatingTile.Right className="!bg-emerald-900">
              by {authors[4]}, Breaking Bad
            </RotatingTile.Right>
            <RotatingTile.Back className="bg-accent! font-bold">
              {quotes[5]}
            </RotatingTile.Back>
            <RotatingTile.Left className="!bg-emerald-900">
              by {authors[5]}, Breaking Bad
            </RotatingTile.Left>
          </RotatingTile>
          {/* 3 end */}
          <RotatingTile>
            <RotatingTile.Front className="bg-accent! font-bold">
              {chuckJokes[0]}
            </RotatingTile.Front>
            <RotatingTile.Right className="!bg-emerald-900">
              by Chuck Norris
            </RotatingTile.Right>
            <RotatingTile.Back className="bg-accent! font-bold">
              {chuckJokes[1]}
            </RotatingTile.Back>
            <RotatingTile.Left className="!bg-emerald-900">
              by Chuck Norris
            </RotatingTile.Left>
          </RotatingTile>
          <RotatingTile>
            <RotatingTile.Front className="bg-accent! font-bold">
              {chuckJokes[2]}
            </RotatingTile.Front>
            <RotatingTile.Right className="!bg-emerald-900">
              by Chuck Norris
            </RotatingTile.Right>
            <RotatingTile.Back className="bg-accent! font-bold">
              {chuckJokes[3]}
            </RotatingTile.Back>
            <RotatingTile.Left className="!bg-emerald-900">
              by Chuck Norris
            </RotatingTile.Left>
          </RotatingTile>
          <RotatingTile>
            <RotatingTile.Front className="bg-accent! font-bold">
              {chuckJokes[4]}
            </RotatingTile.Front>
            <RotatingTile.Right className="!bg-emerald-900">
              by Chuck Norris
            </RotatingTile.Right>
            <RotatingTile.Back className="bg-accent! font-bold">
              {chuckJokes[5]}
            </RotatingTile.Back>
            <RotatingTile.Left className="!bg-emerald-900">
              by Chuck Norris
            </RotatingTile.Left>
          </RotatingTile>
        </div>
      </div>
    </div>
  );
}
