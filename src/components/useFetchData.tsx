import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

// File imported from my other project: TheTerminal https://github.com/yehorscode/TheTerminalNews

const feeds = {
  world: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
  europe: "https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml",
  africa: "https://rss.nytimes.com/services/xml/rss/nyt/Africa.xml",
  americas: "https://rss.nytimes.com/services/xml/rss/nyt/Americas.xml",
  asia: "https://rss.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml",
  middle_east: "https://rss.nytimes.com/services/xml/rss/nyt/MiddleEast.xml",
  business: "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
  technology: "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
};

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  image?: string;
  author?: string;
  content?: string;
};

type Feed = {
  title: string;
  items: FeedItem[];
};

export function getFeedList() {
  return feeds;
}

export default function useFetchData(
  select_feed: keyof typeof feeds = "world",
) {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [feed_url, setFeedUrl] = useState<string | null>(feeds[select_feed]);

  useEffect(() => {
    setFeedUrl(feeds[select_feed]);
  }, [select_feed]);

  useEffect(() => {
    if (!feed_url) return;
    const FetchRss = async () => {
      try {
        // Use the new API route as a CORS proxy
        const response = await axios.get(
          `/api/rss?url=${encodeURIComponent(feed_url)}`,
        );

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, "text/xml");

        const channel = xmlDoc.getElementsByTagName("channel")[0];
        const title =
          channel.getElementsByTagName("title")[0].textContent ?? "";
        const items = xmlDoc.getElementsByTagName("item");

        const feedData: Feed = {
          title,
          items: Array.from(items).map((item) => {
            const title =
              item.getElementsByTagName("title")[0].textContent ?? "";
            const link = item.getElementsByTagName("link")[0].textContent ?? "";
            const pubDate =
              item.getElementsByTagName("pubDate")[0].textContent ?? "";
            const description =
              item.getElementsByTagName("description")[0].textContent ?? "";
            const image =
              item
                .getElementsByTagName("media:content")[0]
                ?.getAttribute("url") ||
              item
                .getElementsByTagName("media:thumbnail")[0]
                ?.getAttribute("url") ||
              "";

            return { title, link, pubDate, description, image };
          }),
        };
        setFeed(feedData);
        setError(null);
        console.log("Feed succesfully(?) fetched");
      } catch (err) {
        toast.error("An error occurred while fetching the RSS feed.");
        setError("Failed to fetch RSS feed");
        console.error("Error fetching/parsing RSS:", err);
      }
    };
    FetchRss();
  }, [feed_url]);
  return { feed, error };
}
