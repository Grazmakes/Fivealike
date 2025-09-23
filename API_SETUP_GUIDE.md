# 🚀 API Integration Setup Guide

This guide will help you set up API integrations for Five Alike to get rich content from various services.

## 🎵 Spotify API Setup

1. **Create a Spotify Developer Account**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/applications)
   - Log in with your Spotify account
   - Click "Create an App"

2. **Configure Your App**
   - Name: "Five Alike"
   - Description: "Recommendation platform integration"
   - Website: `http://localhost:3000` (or your domain)
   - Redirect URI: `http://localhost:3000/api/auth/callback/spotify`

3. **Get Your Keys**
   - Copy the **Client ID** and **Client Secret**
   - Add them to your `.env.local` file:
   ```
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=25254b9653f84784859fb337979febb1
   SPOTIFY_CLIENT_SECRET=ff697af71c9546d1950275ee71605f22
   ```

## 🎬 OMDB API Setup (Movies/TV Shows)

1. **Get API Key**
   - Go to [OMDB API](http://www.omdbapi.com/apikey.aspx)
   - Choose the free tier (1,000 requests/day)
   - Enter your email and verify

2. **Add to Environment**
   ```
   NEXT_PUBLIC_OMDB_API_KEY=http://www.omdbapi.com/?i=tt3896198&apikey=9931cf4c
   ```

## 📚 Google Books API Setup

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.developers.google.com/)
   - Create a new project or select existing one
   - Enable the "Books API"

2. **Create API Key**
   - Go to "Credentials" → "Create Credentials" → "API Key"
   - Restrict the key to "Books API" for security

3. **Add to Environment**
   ```
   NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY=AIzaSyCKwEY3W45NYZttE2GGdCv-9YsjspMZOKA
   ```

## 🎮 RAWG Games API Setup

1. **Create RAWG Account**
   - Go to [RAWG.io](https://rawg.io/apidocs)
   - Sign up for a free account
   - Go to your profile and get your API key

2. **Add to Environment**
   ```
   NEXT_PUBLIC_RAWG_API_KEY=b4ebe335fff94bff8964041c0636846d
   ```

## 🎯 Alternative APIs

### TMDB (Alternative Movie API)
- More detailed than OMDB
- Free tier: 1,000 requests/day
- Get key: [TMDB API](https://www.themoviedb.org/settings/api)

### Steam API (Optional)
- For Steam-specific game data
- Get key: [Steam API](https://steamcommunity.com/dev/apikey)

## 🔧 Setup Instructions

1. **Copy Environment File**
   ```bash
   cp .env.example .env.local
   ```

2. **Add Your API Keys**
   - Edit `.env.local` with your actual API keys
   - Never commit this file to version control

3. **Restart Development Server**
   ```bash
   npm run dev
   ```

## ✨ Features Enabled

Once configured, you'll get:

### 🎵 Music Integration
- Real-time Spotify search
- Track previews and album art
- Artist information and top tracks
- Direct links to Spotify

### 🎬 Movie/TV Integration  
- IMDB ratings and metadata
- Plot summaries and cast info
- Release dates and genres
- Poster images

### 📚 Book Integration
- Google Books search
- Author information and descriptions
- Publication dates and page counts
- Preview links and ratings

### 🎮 Game Integration
- Game ratings and screenshots  
- Platform availability
- Developer and publisher info
- Metacritic scores

## 🚨 Rate Limits

Be aware of rate limits:
- **Spotify**: 100 requests/hour (Client Credentials)
- **OMDB**: 1,000 requests/day (free tier)
- **Google Books**: 1,000 requests/day (free tier)
- **RAWG**: 20,000 requests/month (free tier)

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit API keys to version control
   - Use `.env.local` for local development
   - Use environment variables in production

2. **API Key Restrictions**
   - Restrict keys to specific domains when possible
   - Regularly rotate API keys
   - Monitor usage to detect unusual activity

3. **Error Handling**
   - The system gracefully handles API failures
   - Fallback to cached data when APIs are unavailable
   - User-friendly error messages

## 🛠️ Testing API Setup

1. **Check API Health**
   ```javascript
   import { APIHealthCheck } from '@/utils/apiIntegrations';
   
   const status = await APIHealthCheck.checkAllAPIs();
   console.log(status); // Shows which APIs are working
   ```

2. **Test Individual APIs**
   ```javascript
   import { SpotifyAPI, MovieAPI } from '@/utils/apiIntegrations';
   
   // Test Spotify
   const tracks = await SpotifyAPI.searchTracks('Beatles');
   
   // Test Movies
   const movie = await MovieAPI.searchMovies('Inception');
   ```

## 🤝 Need Help?

- Check the browser console for API errors
- Verify your API keys are correct
- Ensure your `.env.local` file is properly formatted
- Test APIs individually using the provided methods

## 🚀 What's Next?

With APIs configured, users can:
- See rich details when clicking on list items
- Get recommendations based on their preferences  
- Export lists with enhanced metadata
- Discover new content through API suggestions

The system automatically uses the best available API for each content type, providing a seamless experience even if some APIs are unavailable.