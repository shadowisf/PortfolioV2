import { useState, useEffect } from "react";

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

  useEffect(() => {
    async function fetchMeme() {
      try {
        const response = await fetch("https://meme-api.com/gimme");

        if (response.ok) {
          const data = await response.json();
          setMeme(data);
        } else {
          throw new Error("failed to fetch meme.");
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchMeme();
  }, []);

  return (
    <main className="lostWrapper">
      <div className="memeContainer">
        <img src={meme?.url} alt="Refuses to elaborate" />
      </div>
      <p>
        <strong>error 404</strong>: <br />
        page not found.
      </p>
    </main>
  );
}
