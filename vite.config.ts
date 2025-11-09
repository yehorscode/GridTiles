import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import axios from "axios";
import { defineConfig } from "vite";

function rssProxyPlugin() {
  const ALLOWED_FEEDS = new Set([
    "https://rss.nytimes.com/services/xml/rss/nyt/World.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Africa.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Americas.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/AsiaPacific.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/MiddleEast.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
    "https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml",
  ]);

  async function handler(req: any, res: any, next: any) {
    if (!req.url) return next();
    try {
      const urlObj = new URL(req.url, "http://localhost");
      const url = urlObj.searchParams.get("url");
      if (!url || !ALLOWED_FEEDS.has(url)) {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Invalid or missing feed URL" }));
        return;
      }

      const response = await axios.get(url, {
        headers: {
          Accept:
            "application/rss+xml, application/xml, text/xml; q=0.9, */*;q=0.8",
          "User-Agent": "GridTiles/1.0 (+https://github.com/yehorscode)",
        },
        responseType: "text",
        timeout: 10_000,
        maxRedirects: 5,
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.end(response.data);
    } catch (error) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ error: "Failed to fetch RSS" }));
    }
  }

  return {
    name: "gridtiles-rss-proxy",
    configureServer(server: any) {
      server.middlewares.use("/api/rss", handler);
    },
    configurePreviewServer(server: any) {
      server.middlewares.use("/api/rss", handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), rssProxyPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.html"],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
      },
    },
  },
});
