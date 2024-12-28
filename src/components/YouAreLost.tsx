import { useState, useEffect } from "react";
import { LinkWithNoIcon } from "./Link";

type MemeData = {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
};

export default function YouAreLost() {
  const [meme, setMeme] = useState<MemeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMeme();
  }, []);

  async function fetchMeme() {
    setIsLoading(true);

    const subReddits = [
      "shitposting",
      "Memes_Of_The_Dank",
      "shid_and_camed",
      "PrequelMemes",
      "TikTokCringe",
      "ProgrammerHumor",
      "memes",
      "memesopdidnotlike",
      "raimimemes",
      "HistoryMemes",
      "idksterling",
      "darussianbadger",
    ];

    const randomIndex = Math.floor(Math.random() * subReddits.length);
    const selectedSubReddit = subReddits[randomIndex];

    const response = await fetch(
      `https://meme-api.com/gimme/${selectedSubReddit}`
    );
    const responseJson = await response.json();

    setMeme(responseJson);

    setIsLoading(false);
  }

  return (
    <main className="lostWrapper">
      <section>
        <strong>error 404</strong>
        <p>you seem to be lost but here's a meme:</p>
      </section>

      <section className="memeContainer">
        {!isLoading ? (
          <img src={meme?.url} data-action="zoom" onError={() => fetchMeme()} />
        ) : (
          <p style={{ color: "gray" }}>loading...</p>
        )}
      </section>

      <section className="links">
        <LinkWithNoIcon onClick={() => fetchMeme()}>
          generate new meme
        </LinkWithNoIcon>
      </section>
    </main>
  );
}
