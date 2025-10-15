# Mobile Search Theme for qBittorrent WebUI

Mobile-first qBittorrent WebUI theme that adds a touch-friendly layout and an integrated torrent search overlay powered by qBittorrent's native search API.

## Features
- Responsive layout, condensed sidebar, and thumb-friendly action bar for phones/tablets.
- Overlay search interface that talks to `/api/v2/search` and `/api/v2/torrents/add`.
- Quick actions to refresh the transfer list or toggle the compact mode.
- Lightweight: pure CSS/JS, no build system required.

## Requirements
- qBittorrent 4.5.0 or newer with the WebUI enabled.
- Python search plugins installed and enabled on the seedbox (`View ▸ Search Engines` in the desktop client).
- HTTPS + authenticated access recommended when exposing the WebUI remotely.

## Installation
1. Copy the contents of this folder into a zip archive (for example from this directory run `zip -r mobile-search-theme.zip manifest.json style.css script.js`).
2. Log into the qBittorrent WebUI and open `Options ▸ WebUI ▸ Use alternative Web UI`.
3. Upload the generated `mobile-search-theme.zip`.
4. Refresh the WebUI. You should see the mobile FAB bar at the bottom; tap `Search` to launch the overlay.

## Customisation
- Colours: edit the CSS custom properties defined at the top of `style.css`.
- Default compact mode: remove `document.body.classList.add("mobile-compact")` from `script.js` if you prefer the classic desktop layout on load.
- Available search sources: update the search plugins inside qBittorrent (Desktop client ▸ `Search ▸ Plugins`). The WebUI uses whichever plugins are enabled.

## Troubleshooting
- **Search does not start** – verify that python-based search plugins are installed on the seedbox and that the WebUI session has search enabled (qBittorrent must be built with search support).
- **No mobile bar** – check your browser cache or ensure the theme is selected as the alternative WebUI.
- **Add to qBittorrent fails** – make sure you are authenticated and that the magnet/download URL is accessible from the seedbox.

## License
MIT © 2024 Codex Assistant
