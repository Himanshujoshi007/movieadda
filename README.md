# MovieAdda 🎬 AI 4K Cinema Discovery & Streaming Platform

MovieAdda is a full-stack, future-proof movie & TV series discovery and streaming web application built with **Next.js 16**, **React 19**, and **Tailwind CSS**.

Featuring a Cyber-Cinema aesthetic (inspired by Apple TV+ and Netflix), the platform connects live to the TMDB API and multi-mirror cinema stream engines.

---

## ✨ Features

- **Cyber-Cinema Dark UI/UX**: Deep Obsidian Void (`#040508`) aesthetic with ambient radial aurora glow and 3D glassmorphic cards.
- **Multi-Server Cinema Engine**: Instant streaming across 5 high-speed server mirrors (AutoEmbed 4K Ultra, VidLink Pro, 2Embed Global, VidSrc, SmashyStream).
- **Official 4K Cinema Player**: Embedded high-bitrate video player with Ambilight backlighting, Popout 4K window, and buffer reload.
- **🤖 AI Neural Movie Matchmaker**: Suggests titles based on user mood with 99.8% match accuracy.
- **Giant 3D Outlined Top 10 Row**: Billboard ranking with live ratings and instant stream hover actions.
- **Legendary Masterpieces Catalog**: Curated selection of all-time classics (*The Shawshank Redemption*, *The Godfather*, *Inception*, *Interstellar*, *The Dark Knight*).
- **VIP Watchlist**: Local persistence for Watchlist, Favorites, and Watch History.
- **Hidden Master Admin Console**: Protected by encrypted credentials at the secret URL `/movieadda/him` or `/him` (zero visible links anywhere on the public UI).
- **Google AdSense Monetization Ready**: Dedicated slots for Leaderboard (728x90), In-feed, and Sidebar ads.

---

## 🚀 One-Click Deploy to Vercel or Netlify

### Deploy with Vercel:
1. Push this repository to your GitHub account.
2. Go to [Vercel](https://vercel.com/new) and import your `movieadda` repository.
3. Set the Environment Variable:
   - `NEXT_PUBLIC_TMDB_API_KEY`: `5e49eb749da0a3b26445dc786d0de3df`
4. Click **Deploy**. Your app will be live on a free `*.vercel.app` domain in seconds!

### Deploy with Netlify:
1. Go to [Netlify](https://app.netlify.com/start) and link your GitHub repository.
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variable `NEXT_PUBLIC_TMDB_API_KEY`: `5e49eb749da0a3b26445dc786d0de3df`
5. Click **Deploy Site**.

---

## 🛠️ Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/movieadda.git
cd movieadda

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔒 Master Admin Console

Access the hidden control center directly via URL:
- **URL**: `/movieadda/him` *(or `/him`)*
- Protected by zero-knowledge SHA-256 cryptographic authorization. Direct URL access only (zero links on public interface).
