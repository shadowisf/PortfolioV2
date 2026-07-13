import { useState, useEffect } from "react";
import { LinkWithIcon } from "../components/Link";
import Spinner from "../components/Spinner";
import { IconSwirl } from "../utils/iconSetting";

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
  const [retryCount, setRetryCount] = useState(0);

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
      "distressingmemes",
      "DiabolicalMemes",
      "dankmemes",
      "surrealmemes",
      "Ooer",
      "ooerintensifies",
      "hmmm",
      "cursedimages",
      "blursedimages",
      "wtfstockphotos",
      "GoCommitDie",
      "195",
      "comedyheaven",
      "reactionpics",
      "ReactionMemes",
    ];

    const randomIndex = Math.floor(Math.random() * subReddits.length);
    const selectedSubReddit = subReddits[randomIndex];

    try {
      // Fixed: removed space in URL
      const response = await fetch(
        `https://meme-api.com/gimme/${selectedSubReddit}`,
      );
      const responseJson = await response.json();

      // Check for empty/invalid URL and retry (max 3 attempts)
      if (!responseJson.url || responseJson.url === "") {
        if (retryCount < 3) {
          setRetryCount((prev) => prev + 1);
          fetchMeme();
          return;
        }
      }

      setRetryCount(0);
      setMeme(responseJson);
    } catch (error) {
      console.error("Failed to fetch meme:", error);
      if (retryCount < 3) {
        setRetryCount((prev) => prev + 1);
        fetchMeme();
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleImageError() {
    fetchMeme();
  }

  return (
    <main className="lostWrapper">
      <section>
        <h1>error 404</h1>
        <p>you seem to be lost but here's a meme:</p>
      </section>

      <section className="memeContainer">
        {!isLoading ? (
          <>
            <img
              src={meme?.url}
              data-action="zoom"
              onError={handleImageError}
              alt={meme?.title}
            />

            <p>r/{meme?.subreddit}</p>
          </>
        ) : (
          <Spinner />
        )}
      </section>

      <section className="links">
        <LinkWithIcon onClick={() => fetchMeme()} img={<img src={IconSwirl} />}>
          generate new meme
        </LinkWithIcon>
      </section>
    </main>
  );
}
