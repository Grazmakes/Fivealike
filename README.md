# Five Alike

A modern social recommendation platform where users create curated "if you like X, you'll like Y" lists.

## Features

- 🏠 **Home Feed** - Personalized recommendations from followed users
- 🔥 **Voting System** - Vote on individual items and entire lists
- 📝 **Create Lists** - Share your own recommendations
- 🔍 **Browse by Category** - Discover lists by genre
- 📊 **Trending Lists** - See what's popular
- 💾 **Save Lists** - Bookmark your favorite recommendations
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📱 **Responsive Design** - Works on desktop and mobile
- 👥 **Social Features** - Follow users, notifications, messaging
- 🏆 **Achievements** - Gamified user experience

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Mock Data** - Ready for API integration

## Getting Started

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Run the development server:**
   \`\`\`bash
   npm run dev
   \`\`\`

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Test Accounts

Use these credentials to login:
- **Email:** music@test.com | **Password:** test123
- **Email:** graz@test.com | **Password:** 123

## Project Structure

\`\`\`
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── auth/           # Authentication components
│   ├── browse/         # Browse/category components
│   ├── community/      # Social features
│   ├── feed/           # Home feed components
│   ├── lists/          # List display components
│   ├── messages/       # Messaging components
│   ├── modals/         # Modal components
│   ├── notifications/  # Notification system
│   ├── profile/        # User profile components
│   ├── saved/          # Saved lists components
│   └── trending/       # Trending lists components
├── data/               # Mock data and constants
├── types/              # TypeScript type definitions
└── styles/             # Global styles
\`\`\`

## API Integration

The app is structured to easily integrate with real APIs:

- **TMDb API** - For movie/TV data
- **Music APIs** - Spotify, Last.fm, etc.
- **Book APIs** - Google Books, etc.
- **Authentication** - Firebase, Auth0, etc.
- **Database** - Supabase, Firebase, etc.

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript check

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details