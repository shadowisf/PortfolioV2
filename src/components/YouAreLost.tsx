import { useState, useEffect } from "react";
import { LinkWithNoIcon } from "./Link";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

interface MemeData {
  postLink: string;
  subreddit: string;
  title: string;
  url: string;
  nsfw: boolean;
  spoiler: boolean;
  author: string;
  ups: number;
  preview: string[];
}

export default function YouAreLost() {
  const [meme, setMeme] = useState<MemeData | null>(null);

  async function fetchMeme() {
    const subReddits = [
      "shitposting",
      "Memes_Of_The_Dank",
      "shid_and_camed",
      "PrequelMemes",
      "TikTokCringe",
      "ProgrammerHumor",
    ];

    const randomIndex = Math.floor(Math.random() * subReddits.length);
    const selectedSubReddit = subReddits[randomIndex];

    const response = await fetch(
      `https://meme-api.com/gimme/${selectedSubReddit}`
    ).then((res) => {
      return res.json();
    });

    setMeme(response);
  }

  useEffect(() => {
    fetchMeme();
  }, []);

  return (
    <main className="lostWrapper">
      <section>
        <strong>error 404</strong>
        <p>you seem to be lost but here's a meme:</p>
      </section>

      <section className="memeContainer">
        <Zoom zoomMargin={50}>
          <img src={meme?.url} />
        </Zoom>
      </section>

      <section className="links">
        <a href={"/"} className="linkWithNoIcon">
          back to home
        </a>

        <LinkWithNoIcon
          onClick={() => {
            fetchMeme();
          }}
        >
          generate new meme
        </LinkWithNoIcon>
      </section>
    </main>
  );
}
