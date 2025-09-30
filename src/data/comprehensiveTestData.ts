import { List, Notification } from '@/types';

export const comprehensiveTestLists: List[] = [
  // MUSIC (5 lists)
  {
    id: 1,
    title: 'If you like "The Sheila Divine", try these FIVE ALIKE...',
    author: '@bostonrockscene',
    category: 'Music',
    date: '12/3/2024',
    votes: 73,
    upvotes: 76,
    downvotes: 3,
    userVote: null,
    highFives: 34,
    userHighFived: false,
    items: ['The Get Up Kids', 'Piebald', 'The Promise Ring', 'Jets to Brazil', 'Texas Is the Reason'],
    description: 'Emo and indie rock bands with heartfelt lyrics, melodic guitars, and that same earnest emotional intensity that made The Sheila Divine special.',
    comments: [
      { id: 1, user: '@emofan', content: 'The Promise Ring! Amazing choice.', time: '2 hours ago', avatar: '🎸' },
      { id: 2, user: '@indierock', content: 'Texas Is the Reason is so underrated', time: '1 hour ago', avatar: '🎵' }
    ],
    saves: 54,
    isRejected: false
  },
  {
    id: 2,
    title: 'If you like "The Beatles", try these FIVE ALIKE...',
    author: '@musiclover',
    category: 'Music',
    date: '12/1/2024',
    votes: 150,
    upvotes: 155,
    downvotes: 5,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['The Beach Boys', 'The Kinks', 'The Byrds', 'The Zombies', 'The Hollies'],
    description: 'British Invasion and psychedelic pop bands that defined the 60s sound with innovative harmonies and songwriting.',
    comments: [
      { id: 1, user: '@60smusic', content: 'Pet Sounds is as good as Sgt Pepper!', time: '3 hours ago', avatar: '🎤' },
      { id: 2, user: '@classicrock', content: 'The Kinks are criminally underrated', time: '2 hours ago', avatar: '🎸' }
    ],
    saves: 120,
    isRejected: false
  },
  {
    id: 3,
    title: 'If you like "Radiohead", try these FIVE ALIKE...',
    author: '@alternativemusic',
    category: 'Music',
    date: '12/5/2024',
    votes: 98,
    upvotes: 102,
    downvotes: 4,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['Portishead', 'Massive Attack', 'Thom Yorke', 'Sigur Rós', 'Aphex Twin'],
    description: 'Experimental electronic and post-rock artists who push boundaries like Radiohead.',
    comments: [
      { id: 1, user: '@electronicfan', content: 'Aphex Twin is perfect here', time: '4 hours ago', avatar: '🔊' },
      { id: 2, user: '@postrock', content: 'Sigur Rós gives me chills every time', time: '1 hour ago', avatar: '🌌' }
    ],
    saves: 78,
    isRejected: false
  },
  {
    id: 4,
    title: 'If you like "Taylor Swift", try these FIVE ALIKE...',
    author: '@popmusic',
    category: 'Music',
    date: '12/7/2024',
    votes: 134,
    upvotes: 140,
    downvotes: 6,
    userVote: null,
    highFives: 92,
    userHighFived: false,
    items: ['Lorde', 'Phoebe Bridgers', 'Clairo', 'Mitski', 'Lana Del Rey'],
    description: 'Singer-songwriters with introspective lyrics and evolving sounds.',
    comments: [
      { id: 1, user: '@swiftie', content: 'Phoebe Bridgers is amazing!', time: '5 hours ago', avatar: '✨' },
      { id: 2, user: '@indiepop', content: 'This list is perfection', time: '3 hours ago', avatar: '💕' }
    ],
    saves: 105,
    isRejected: false
  },
  {
    id: 5,
    title: 'If you like "Kendrick Lamar", try these FIVE ALIKE...',
    author: '@hiphophead',
    category: 'Music',
    date: '12/9/2024',
    votes: 87,
    upvotes: 92,
    downvotes: 5,
    userVote: null,
    highFives: 58,
    userHighFived: false,
    items: ['J. Cole', 'Joey Bada$$', 'Danny Brown', 'Earl Sweatshirt', 'Vince Staples'],
    description: 'Conscious rap artists with complex lyricism and social commentary.',
    comments: [
      { id: 1, user: '@lyricalgenius', content: 'Joey Bada$$ is so slept on', time: '2 hours ago', avatar: '🎤' },
      { id: 2, user: '@consciousrap', content: 'Danny Brown brings the experimental edge', time: '1 hour ago', avatar: '🔥' }
    ],
    saves: 71,
    isRejected: false
  },

  // MOVIES (5 lists)
  {
    id: 6,
    title: 'If you like "Pulp Fiction", try these FIVE ALIKE...',
    author: '@cinephile',
    category: 'Movies',
    date: '12/2/2024',
    votes: 200,
    upvotes: 210,
    downvotes: 10,
    userVote: null,
    highFives: 156,
    userHighFived: false,
    items: ['Reservoir Dogs', 'Kill Bill', 'Jackie Brown', 'True Romance', 'Natural Born Killers'],
    description: 'Tarantino films and similar crime thrillers with non-linear storytelling and memorable dialogue.',
    comments: [
      { id: 1, user: '@tarantinofan', content: 'True Romance is so underrated!', time: '6 hours ago', avatar: '🎬' },
      { id: 2, user: '@filmcritic', content: 'Jackie Brown deserves more love', time: '4 hours ago', avatar: '🍿' }
    ],
    saves: 98,
    isRejected: false
  },
  {
    id: 7,
    title: 'If you like "Inception", try these FIVE ALIKE...',
    author: '@scifimovies',
    category: 'Movies',
    date: '12/4/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Interstellar', 'The Matrix', 'Blade Runner 2049', 'Memento', 'Shutter Island'],
    description: 'Mind-bending sci-fi films that challenge perception and reality.',
    comments: [
      { id: 1, user: '@mindbender', content: 'Memento still confuses me in the best way', time: '3 hours ago', avatar: '🧠' },
      { id: 2, user: '@nolan', content: 'Christopher Nolan is a genius', time: '2 hours ago', avatar: '🎭' }
    ],
    saves: 142,
    isRejected: false
  },
  {
    id: 8,
    title: 'If you like "The Grand Budapest Hotel", try these FIVE ALIKE...',
    author: '@wesanderson',
    category: 'Movies',
    date: '12/6/2024',
    votes: 89,
    upvotes: 94,
    downvotes: 5,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['The Royal Tenenbaums', 'Moonrise Kingdom', 'The French Dispatch', 'Isle of Dogs', 'Fantastic Mr. Fox'],
    description: 'Wes Anderson films with quirky characters and distinctive visual style.',
    comments: [
      { id: 1, user: '@quirkyfan', content: 'The symmetry in these films is perfect', time: '7 hours ago', avatar: '🎨' },
      { id: 2, user: '@indiefilm', content: 'Isle of Dogs is criminally underrated', time: '5 hours ago', avatar: '🐕' }
    ],
    saves: 76,
    isRejected: false
  },
  {
    id: 9,
    title: 'If you like "Parasite", try these FIVE ALIKE...',
    author: '@foreignfilm',
    category: 'Movies',
    date: '12/8/2024',
    votes: 156,
    upvotes: 162,
    downvotes: 6,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['The Handmaiden', 'Burning', 'Oldboy', 'Train to Busan', 'Decision to Leave'],
    description: 'Korean cinema masterpieces with social commentary and stunning cinematography.',
    comments: [
      { id: 1, user: '@koreancinema', content: 'Park Chan-wook is a master', time: '4 hours ago', avatar: '🇰🇷' },
      { id: 2, user: '@thriller', content: 'Train to Busan had me crying', time: '3 hours ago', avatar: '😱' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 10,
    title: 'If you like "Mad Max: Fury Road", try these FIVE ALIKE...',
    author: '@actionfan',
    category: 'Movies',
    date: '12/10/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['John Wick', 'The Raid', 'Atomic Blonde', 'Baby Driver', 'Speed'],
    description: 'High-octane action films with incredible stunts and minimal CGI.',
    comments: [
      { id: 1, user: '@stuntlover', content: 'The Raid fight scenes are insane', time: '8 hours ago', avatar: '💥' },
      { id: 2, user: '@practical', content: 'Practical effects > CGI always', time: '6 hours ago', avatar: '🚗' }
    ],
    saves: 118,
    isRejected: false
  },

  // BOOKS (5 lists)
  {
    id: 11,
    title: 'If you like "The Hobbit", try these FIVE ALIKE...',
    author: '@booklover',
    category: 'Books',
    date: '12/6/2024',
    votes: 120,
    upvotes: 125,
    downvotes: 5,
    userVote: null,
    highFives: 45,
    userHighFived: false,
    items: ['Lord of the Rings', 'Chronicles of Narnia', 'Harry Potter', 'Earthsea', 'The Dark Tower'],
    description: 'Epic fantasy series with rich world-building, memorable characters, and magical adventures.',
    comments: [
      { id: 1, user: '@fantasyfan', content: 'Earthsea is so underrated!', time: '5 hours ago', avatar: '🧙‍♂️' },
      { id: 2, user: '@tolkien', content: 'Nothing beats Middle-earth', time: '3 hours ago', avatar: '💍' }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 12,
    title: 'If you like "1984", try these FIVE ALIKE...',
    author: '@dystopian',
    category: 'Books',
    date: '12/8/2024',
    votes: 167,
    upvotes: 173,
    downvotes: 6,
    userVote: null,
    highFives: 92,
    userHighFived: false,
    items: ['Brave New World', 'Fahrenheit 451', 'The Handmaids Tale', 'Animal Farm', 'We'],
    description: 'Dystopian classics that explore authoritarian control and human freedom.',
    comments: [
      { id: 1, user: '@orwellian', content: 'We by Zamyatin inspired Orwell', time: '4 hours ago', avatar: '👁️' },
      { id: 2, user: '@reader', content: 'These are all terrifyingly relevant', time: '2 hours ago', avatar: '📚' }
    ],
    saves: 145,
    isRejected: false
  },
  {
    id: 13,
    title: 'If you like "Gone Girl", try these FIVE ALIKE...',
    author: '@thriller',
    category: 'Books',
    date: '12/10/2024',
    votes: 134,
    upvotes: 140,
    downvotes: 6,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['The Girl with the Dragon Tattoo', 'Big Little Lies', 'Sharp Objects', 'The Silent Patient', 'In the Woods'],
    description: 'Psychological thrillers with unreliable narrators and shocking twists.',
    comments: [
      { id: 1, user: '@mystery', content: 'The Silent Patient blew my mind', time: '6 hours ago', avatar: '🔍' },
      { id: 2, user: '@pageturner', content: 'Gillian Flynn is a master', time: '4 hours ago', avatar: '📖' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 14,
    title: 'If you like "The Alchemist", try these FIVE ALIKE...',
    author: '@spiritualreader',
    category: 'Books',
    date: '12/12/2024',
    votes: 98,
    upvotes: 104,
    downvotes: 6,
    userVote: null,
    highFives: 56,
    userHighFived: false,
    items: ['Siddhartha', 'The Prophet', 'Jonathan Livingston Seagull', 'Life of Pi', 'The Celestine Prophecy'],
    description: 'Spiritual and philosophical novels about self-discovery and life purpose.',
    comments: [
      { id: 1, user: '@seeker', content: 'Siddhartha changed my perspective', time: '7 hours ago', avatar: '🧘' },
      { id: 2, user: '@wisdom', content: 'The Prophet has amazing quotes', time: '5 hours ago', avatar: '✨' }
    ],
    saves: 87,
    isRejected: false
  },
  {
    id: 15,
    title: 'If you like "Atomic Habits", try these FIVE ALIKE...',
    author: '@productivity',
    category: 'Books',
    date: '12/14/2024',
    votes: 176,
    upvotes: 182,
    downvotes: 6,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['The Power of Habit', 'Mindset', 'Deep Work', 'The 7 Habits', 'Think and Grow Rich'],
    description: 'Self-improvement books about building better habits and achieving success.',
    comments: [
      { id: 1, user: '@habits', content: 'Deep Work transformed my career', time: '3 hours ago', avatar: '⚡' },
      { id: 2, user: '@growth', content: 'Mindset is life-changing', time: '2 hours ago', avatar: '🧠' }
    ],
    saves: 158,
    isRejected: false
  },

  // TV SHOWS (5 lists)
  {
    id: 16,
    title: 'If you like "Breaking Bad", try these FIVE ALIKE...',
    author: '@tvfan',
    category: 'TV Shows',
    date: '12/4/2024',
    votes: 180,
    upvotes: 185,
    downvotes: 5,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['Better Call Saul', 'The Sopranos', 'The Wire', 'Ozark', 'Narcos'],
    description: 'Crime dramas with complex characters and moral ambiguity that rival Breaking Bad\'s intensity.',
    comments: [
      { id: 1, user: '@crimefan', content: 'The Wire is the GOAT', time: '5 hours ago', avatar: '🎭' },
      { id: 2, user: '@antihero', content: 'Better Call Saul is perfect', time: '3 hours ago', avatar: '⚖️' }
    ],
    saves: 167,
    isRejected: false
  },
  {
    id: 17,
    title: 'If you like "The Office", try these FIVE ALIKE...',
    author: '@sitcomfan',
    category: 'TV Shows',
    date: '12/6/2024',
    votes: 156,
    upvotes: 161,
    downvotes: 5,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Parks and Recreation', 'Brooklyn Nine-Nine', 'Community', 'Arrested Development', 'Schitts Creek'],
    description: 'Workplace comedies with heart, great characters, and quotable moments.',
    comments: [
      { id: 1, user: '@comedy', content: 'Parks and Rec > The Office fight me', time: '4 hours ago', avatar: '😂' },
      { id: 2, user: '@workplace', content: 'B99 is criminally underrated', time: '2 hours ago', avatar: '👮‍♀️' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 18,
    title: 'If you like "Game of Thrones", try these FIVE ALIKE...',
    author: '@fantasy',
    category: 'TV Shows',
    date: '12/8/2024',
    votes: 201,
    upvotes: 210,
    downvotes: 9,
    userVote: null,
    highFives: 156,
    userHighFived: false,
    items: ['House of the Dragon', 'The Witcher', 'Vikings', 'The Last Kingdom', 'Rome'],
    description: 'Epic fantasy and historical dramas with political intrigue and large-scale battles.',
    comments: [
      { id: 1, user: '@dragons', content: 'House of Dragon redeemed the franchise', time: '6 hours ago', avatar: '🐉' },
      { id: 2, user: '@medieval', content: 'The Last Kingdom is so good', time: '4 hours ago', avatar: '⚔️' }
    ],
    saves: 189,
    isRejected: false
  },
  {
    id: 19,
    title: 'If you like "Stranger Things", try these FIVE ALIKE...',
    author: '@nostalgia',
    category: 'TV Shows',
    date: '12/10/2024',
    votes: 143,
    upvotes: 149,
    downvotes: 6,
    userVote: null,
    highFives: 87,
    userHighFived: false,
    items: ['Dark', 'The X-Files', 'Twin Peaks', 'Supernatural', 'Fringe'],
    description: 'Supernatural mysteries with 80s nostalgia and government conspiracies.',
    comments: [
      { id: 1, user: '@supernatural', content: 'Dark is mind-bendingly good', time: '7 hours ago', avatar: '🌌' },
      { id: 2, user: '@80s', content: 'Twin Peaks walked so Stranger Things could run', time: '5 hours ago', avatar: '🔮' }
    ],
    saves: 125,
    isRejected: false
  },
  {
    id: 20,
    title: 'If you like "The Crown", try these FIVE ALIKE...',
    author: '@royalty',
    category: 'TV Shows',
    date: '12/12/2024',
    votes: 112,
    upvotes: 118,
    downvotes: 6,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['Downton Abbey', 'Bridgerton', 'Victoria', 'The Queens Gambit', 'Mad Men'],
    description: 'Period dramas with lavish production values and compelling characters.',
    comments: [
      { id: 1, user: '@period', content: 'Downton Abbey makes me cry every time', time: '3 hours ago', avatar: '👑' },
      { id: 2, user: '@drama', content: 'The Queens Gambit is perfection', time: '2 hours ago', avatar: '♕' }
    ],
    saves: 98,
    isRejected: false
  },

  // GAMES (5 lists)
  {
    id: 21,
    title: 'If you like "The Legend of Zelda", try these FIVE ALIKE...',
    author: '@gamer',
    category: 'Games',
    date: '12/8/2024',
    votes: 140,
    upvotes: 145,
    downvotes: 5,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['Skyrim', 'The Witcher 3', 'Horizon Zero Dawn', 'Red Dead Redemption 2', 'Ghost of Tsushima'],
    description: 'Open-world adventure games with exploration, questing, and immersive storytelling.',
    comments: [
      { id: 1, user: '@openworld', content: 'Breath of the Wild changed everything', time: '4 hours ago', avatar: '🗺️' },
      { id: 2, user: '@adventure', content: 'Ghost of Tsushima is beautiful', time: '2 hours ago', avatar: '⚔️' }
    ],
    saves: 103,
    isRejected: false
  },
  {
    id: 22,
    title: 'If you like "Dark Souls", try these FIVE ALIKE...',
    author: '@hardcore',
    category: 'Games',
    date: '12/10/2024',
    votes: 98,
    upvotes: 105,
    downvotes: 7,
    userVote: null,
    highFives: 56,
    userHighFived: false,
    items: ['Elden Ring', 'Bloodborne', 'Sekiro', 'Hollow Knight', 'Nioh'],
    description: 'Challenging action RPGs that test your patience and skill.',
    comments: [
      { id: 1, user: '@souls', content: 'Elden Ring is the perfect evolution', time: '6 hours ago', avatar: '💀' },
      { id: 2, user: '@challenge', content: 'Hollow Knight made me cry tears of joy', time: '4 hours ago', avatar: '🗡️' }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 23,
    title: 'If you like "Among Us", try these FIVE ALIKE...',
    author: '@social',
    category: 'Games',
    date: '12/12/2024',
    votes: 87,
    upvotes: 93,
    downvotes: 6,
    userVote: null,
    highFives: 43,
    userHighFived: false,
    items: ['Fall Guys', 'Jackbox Games', 'Phasmophobia', 'Keep Talking and Nobody Explodes', 'Overcooked'],
    description: 'Social party games perfect for playing with friends.',
    comments: [
      { id: 1, user: '@party', content: 'Jackbox saved my quarantine', time: '5 hours ago', avatar: '🎉' },
      { id: 2, user: '@friends', content: 'Overcooked tests friendships', time: '3 hours ago', avatar: '👥' }
    ],
    saves: 76,
    isRejected: false
  },
  {
    id: 24,
    title: 'If you like "Stardew Valley", try these FIVE ALIKE...',
    author: '@cozy',
    category: 'Games',
    date: '12/14/2024',
    votes: 156,
    upvotes: 162,
    downvotes: 6,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Animal Crossing', 'Spiritfarer', 'A Short Hike', 'Coffee Talk', 'Unpacking'],
    description: 'Relaxing cozy games that focus on calm gameplay and emotional storytelling.',
    comments: [
      { id: 1, user: '@cozy', content: 'Spiritfarer made me sob', time: '7 hours ago', avatar: '🌙' },
      { id: 2, user: '@chill', content: 'A Short Hike is perfect for anxiety', time: '5 hours ago', avatar: '🏔️' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 25,
    title: 'If you like "Hades", try these FIVE ALIKE...',
    author: '@indie',
    category: 'Games',
    date: '12/16/2024',
    votes: 134,
    upvotes: 140,
    downvotes: 6,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Dead Cells', 'The Binding of Isaac', 'Rogue Legacy', 'Risk of Rain 2', 'Curse of the Dead Gods'],
    description: 'Roguelike games with tight gameplay loops and addictive progression.',
    comments: [
      { id: 1, user: '@roguelike', content: 'Dead Cells has perfect combat', time: '4 hours ago', avatar: '⚔️' },
      { id: 2, user: '@supergiant', content: 'Supergiant Games can do no wrong', time: '2 hours ago', avatar: '🏛️' }
    ],
    saves: 112,
    isRejected: false
  },

  // PODCASTS (5 lists)
  {
    id: 26,
    title: 'If you like "The Joe Rogan Experience", try these FIVE ALIKE...',
    author: '@podcastfan',
    category: 'Podcasts',
    date: '12/12/2024',
    votes: 92,
    upvotes: 97,
    downvotes: 5,
    userVote: null,
    highFives: 34,
    userHighFived: false,
    items: ['Lex Fridman Podcast', 'Tim Ferriss Show', 'Conan Needs a Friend', 'SmartLess', 'Call Her Daddy'],
    description: 'Long-form conversation podcasts with interesting guests and engaging hosts.',
    comments: [
      { id: 1, user: '@longform', content: 'Lex Fridman asks the best questions', time: '4 hours ago', avatar: '🤖' },
      { id: 2, user: '@conversation', content: 'SmartLess is hilarious', time: '2 hours ago', avatar: '🎙️' }
    ],
    saves: 67,
    isRejected: false
  },
  {
    id: 27,
    title: 'If you like "Serial", try these FIVE ALIKE...',
    author: '@truecrime',
    category: 'Podcasts',
    date: '12/14/2024',
    votes: 156,
    upvotes: 162,
    downvotes: 6,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['My Favorite Murder', 'Crime Junkie', 'Criminal', 'In the Dark', 'S-Town'],
    description: 'True crime podcasts with investigative journalism and compelling storytelling.',
    comments: [
      { id: 1, user: '@mystery', content: 'In the Dark is incredible journalism', time: '5 hours ago', avatar: '🔍' },
      { id: 2, user: '@crime', content: 'S-Town blew my mind', time: '3 hours ago', avatar: '📰' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 28,
    title: 'If you like "This American Life", try these FIVE ALIKE...',
    author: '@storytelling',
    category: 'Podcasts',
    date: '12/16/2024',
    votes: 123,
    upvotes: 129,
    downvotes: 6,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['Radiolab', 'Reply All', 'The Moth', 'Invisibilia', 'Planet Money'],
    description: 'Story-driven podcasts that explore human experiences and current events.',
    comments: [
      { id: 1, user: '@stories', content: 'Radiolab changed how I think', time: '6 hours ago', avatar: '🧠' },
      { id: 2, user: '@humanity', content: 'The Moth stories are so powerful', time: '4 hours ago', avatar: '🎭' }
    ],
    saves: 98,
    isRejected: false
  },
  {
    id: 29,
    title: 'If you like "Comedy Bang! Bang!", try these FIVE ALIKE...',
    author: '@improv',
    category: 'Podcasts',
    date: '12/18/2024',
    votes: 87,
    upvotes: 93,
    downvotes: 6,
    userVote: null,
    highFives: 45,
    userHighFived: false,
    items: ['Hollywood Handbook', 'How Did This Get Made?', 'Doughboys', 'Comedy Death-Ray', 'U Talkin U2 To Me?'],
    description: 'Comedy podcasts with improv, celebrity guests, and absurd humor.',
    comments: [
      { id: 1, user: '@comedy', content: 'Hollywood Handbook is genius', time: '3 hours ago', avatar: '😂' },
      { id: 2, user: '@improv', content: 'HDTGM makes bad movies fun', time: '2 hours ago', avatar: '🎬' }
    ],
    saves: 76,
    isRejected: false
  },
  {
    id: 30,
    title: 'If you like "Conan O\'Brien Needs a Friend", try these FIVE ALIKE...',
    author: '@latenight',
    category: 'Podcasts',
    date: '12/20/2024',
    votes: 134,
    upvotes: 140,
    downvotes: 6,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['WTF with Marc Maron', 'Armchair Expert', 'Fresh Air', 'On Being', 'The Hilarious World of Depression'],
    description: 'Interview podcasts with deep conversations and genuine connections.',
    comments: [
      { id: 1, user: '@interview', content: 'Terry Gross is the GOAT interviewer', time: '5 hours ago', avatar: '🎤' },
      { id: 2, user: '@depth', content: 'Marc Maron gets so real', time: '3 hours ago', avatar: '💭' }
    ],
    saves: 112,
    isRejected: false
  },

  // TECHNOLOGY (5 lists)
  {
    id: 31,
    title: 'If you like "JavaScript", try these FIVE ALIKE...',
    author: '@developer',
    category: 'Technology',
    date: '12/5/2024',
    votes: 95,
    upvotes: 100,
    downvotes: 5,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['TypeScript', 'Python', 'Go', 'Rust', 'Swift'],
    description: 'Modern programming languages that offer great developer experience and powerful features.',
    comments: [
      { id: 1, user: '@coder', content: 'TypeScript saves so much debugging time', time: '4 hours ago', avatar: '💻' },
      { id: 2, user: '@backend', content: 'Go is perfect for microservices', time: '2 hours ago', avatar: '⚡' }
    ],
    saves: 78,
    isRejected: false
  },
  {
    id: 32,
    title: 'If you like "React", try these FIVE ALIKE...',
    author: '@frontend',
    category: 'Technology',
    date: '12/7/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Vue.js', 'Svelte', 'Angular', 'Next.js', 'Astro'],
    description: 'Frontend frameworks and libraries for building modern web applications.',
    comments: [
      { id: 1, user: '@frontend', content: 'Svelte is so clean and fast', time: '6 hours ago', avatar: '🚀' },
      { id: 2, user: '@webdev', content: 'Next.js makes React even better', time: '4 hours ago', avatar: '⚛️' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 33,
    title: 'If you like "iPhone", try these FIVE ALIKE...',
    author: '@techreview',
    category: 'Technology',
    date: '12/9/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Google Pixel', 'Samsung Galaxy', 'OnePlus', 'Nothing Phone', 'Fairphone'],
    description: 'Premium smartphones with excellent cameras and user experience.',
    comments: [
      { id: 1, user: '@android', content: 'Pixel cameras are incredible', time: '5 hours ago', avatar: '📱' },
      { id: 2, user: '@sustainable', content: 'Fairphone is the ethical choice', time: '3 hours ago', avatar: '🌱' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 34,
    title: 'If you like "ChatGPT", try these FIVE ALIKE...',
    author: '@ai',
    category: 'Technology',
    date: '12/11/2024',
    votes: 201,
    upvotes: 209,
    downvotes: 8,
    userVote: null,
    highFives: 145,
    userHighFived: false,
    items: ['Claude', 'Gemini', 'Copilot', 'Midjourney', 'Perplexity'],
    description: 'AI tools that enhance productivity and creativity in different ways.',
    comments: [
      { id: 1, user: '@prompt', content: 'Claude is amazing for coding help', time: '3 hours ago', avatar: '🤖' },
      { id: 2, user: '@creative', content: 'Midjourney creates stunning art', time: '2 hours ago', avatar: '🎨' }
    ],
    saves: 189,
    isRejected: false
  },
  {
    id: 35,
    title: 'If you like "MacBook", try these FIVE ALIKE...',
    author: '@laptop',
    category: 'Technology',
    date: '12/13/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['ThinkPad X1', 'Dell XPS', 'Surface Laptop', 'Framework Laptop', 'ASUS ZenBook'],
    description: 'Premium laptops with excellent build quality and performance.',
    comments: [
      { id: 1, user: '@business', content: 'ThinkPad keyboards are unmatched', time: '7 hours ago', avatar: '⌨️' },
      { id: 2, user: '@modular', content: 'Framework is the future of laptops', time: '5 hours ago', avatar: '🔧' }
    ],
    saves: 134,
    isRejected: false
  },

  // FOOD (5 lists)
  {
    id: 36,
    title: 'If you like "Pizza", try these FIVE ALIKE...',
    author: '@foodie',
    category: 'Food',
    date: '12/9/2024',
    votes: 95,
    upvotes: 100,
    downvotes: 5,
    userVote: null,
    highFives: 42,
    userHighFived: false,
    items: ['Pasta', 'Burgers', 'Tacos', 'Ramen', 'Sandwiches'],
    description: 'Comfort foods that are satisfying, customizable, and universally loved.',
    comments: [
      { id: 1, user: '@comfort', content: 'Nothing beats a good burger', time: '4 hours ago', avatar: '🍔' },
      { id: 2, user: '@carbs', content: 'Pasta is life', time: '2 hours ago', avatar: '🍝' }
    ],
    saves: 71,
    isRejected: false
  },
  {
    id: 37,
    title: 'If you like "Sushi", try these FIVE ALIKE...',
    author: '@japanese',
    category: 'Food',
    date: '12/11/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Poke', 'Ceviche', 'Tartare', 'Crudo', 'Sashimi'],
    description: 'Fresh raw fish dishes with clean flavors and artistic presentation.',
    comments: [
      { id: 1, user: '@fresh', content: 'Good poke is hard to find', time: '5 hours ago', avatar: '🐟' },
      { id: 2, user: '@raw', content: 'Ceviche is so refreshing', time: '3 hours ago', avatar: '🥗' }
    ],
    saves: 145,
    isRejected: false
  },
  {
    id: 38,
    title: 'If you like "BBQ", try these FIVE ALIKE...',
    author: '@smoker',
    category: 'Food',
    date: '12/13/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Korean BBQ', 'Brazilian Churrasco', 'Argentinian Asado', 'Jamaican Jerk', 'Turkish Kebab'],
    description: 'Grilled and smoked meats from different cultures with unique flavors.',
    comments: [
      { id: 1, user: '@meat', content: 'Korean BBQ banchan is amazing', time: '6 hours ago', avatar: '🥩' },
      { id: 2, user: '@fire', content: 'Nothing beats Argentine beef', time: '4 hours ago', avatar: '🔥' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 39,
    title: 'If you like "Indian Curry", try these FIVE ALIKE...',
    author: '@spicy',
    category: 'Food',
    date: '12/15/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Thai Curry', 'Japanese Curry', 'Ethiopian Stew', 'Moroccan Tagine', 'Caribbean Curry'],
    description: 'Aromatic stews and curries with complex spice blends from around the world.',
    comments: [
      { id: 1, user: '@spices', content: 'Ethiopian injera is incredible', time: '3 hours ago', avatar: '🌶️' },
      { id: 2, user: '@comfort', content: 'Japanese curry is so comforting', time: '2 hours ago', avatar: '🍛' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 40,
    title: 'If you like "French Pastries", try these FIVE ALIKE...',
    author: '@baker',
    category: 'Food',
    date: '12/17/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Italian Gelato', 'Japanese Mochi', 'Middle Eastern Baklava', 'Austrian Strudel', 'Spanish Churros'],
    description: 'Delicate desserts and sweets that showcase culinary artistry.',
    comments: [
      { id: 1, user: '@sweet', content: 'Mochi texture is unbeatable', time: '5 hours ago', avatar: '🍡' },
      { id: 2, user: '@pastry', content: 'Baklava layers are pure art', time: '3 hours ago', avatar: '🥐' }
    ],
    saves: 106,
    isRejected: false
  },

  // TRAVEL (5 lists)
  {
    id: 41,
    title: 'If you like "Italy", try these FIVE ALIKE...',
    author: '@wanderlust',
    category: 'Travel',
    date: '12/7/2024',
    votes: 85,
    upvotes: 90,
    downvotes: 5,
    userVote: null,
    highFives: 38,
    userHighFived: false,
    items: ['Greece', 'Spain', 'Portugal', 'France', 'Croatia'],
    description: 'Mediterranean destinations with stunning architecture, delicious cuisine, and rich cultural heritage.',
    comments: [
      { id: 1, user: '@mediterranean', content: 'Croatia is so underrated', time: '4 hours ago', avatar: '🏛️' },
      { id: 2, user: '@culture', content: 'Portugal has the best food', time: '2 hours ago', avatar: '🍷' }
    ],
    saves: 62,
    isRejected: false
  },
  {
    id: 42,
    title: 'If you like "Japan", try these FIVE ALIKE...',
    author: '@eastasia',
    category: 'Travel',
    date: '12/9/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['South Korea', 'Taiwan', 'Singapore', 'Vietnam', 'Thailand'],
    description: 'East Asian destinations with unique cultures, amazing food, and modern cities.',
    comments: [
      { id: 1, user: '@asia', content: 'South Korea has incredible street food', time: '6 hours ago', avatar: '🥢' },
      { id: 2, user: '@temples', content: 'Thai temples are breathtaking', time: '4 hours ago', avatar: '🏯' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 43,
    title: 'If you like "Iceland", try these FIVE ALIKE...',
    author: '@nature',
    category: 'Travel',
    date: '12/11/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Norway', 'Faroe Islands', 'New Zealand', 'Patagonia', 'Alaska'],
    description: 'Dramatic landscapes with glaciers, mountains, and otherworldly natural beauty.',
    comments: [
      { id: 1, user: '@outdoors', content: 'Faroe Islands are magical', time: '5 hours ago', avatar: '🏔️' },
      { id: 2, user: '@northern', content: 'Alaska Northern Lights are insane', time: '3 hours ago', avatar: '🌌' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 44,
    title: 'If you like "Backpacking Southeast Asia", try these FIVE ALIKE...',
    author: '@backpacker',
    category: 'Travel',
    date: '12/13/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Central America', 'Eastern Europe', 'India', 'Morocco', 'Peru'],
    description: 'Budget-friendly destinations perfect for backpacking adventures.',
    comments: [
      { id: 1, user: '@budget', content: 'Eastern Europe is so affordable', time: '7 hours ago', avatar: '🎒' },
      { id: 2, user: '@adventure', content: 'Morocco blew my mind', time: '5 hours ago', avatar: '🕌' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 45,
    title: 'If you like "Safari in Kenya", try these FIVE ALIKE...',
    author: '@wildlife',
    category: 'Travel',
    date: '12/15/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Tanzania Serengeti', 'Botswana Okavango', 'South Africa Kruger', 'Namibia Etosha', 'Rwanda Gorillas'],
    description: 'African wildlife experiences with incredible animal encounters.',
    comments: [
      { id: 1, user: '@animals', content: 'Gorilla trekking changed my life', time: '4 hours ago', avatar: '🦍' },
      { id: 2, user: '@conservation', content: 'Botswana is pristine wilderness', time: '2 hours ago', avatar: '🐘' }
    ],
    saves: 106,
    isRejected: false
  },

  // ART (5 lists)
  {
    id: 46,
    title: 'If you like "Van Gogh", try these FIVE ALIKE...',
    author: '@artcritic',
    category: 'Art',
    date: '12/10/2024',
    votes: 78,
    upvotes: 82,
    downvotes: 4,
    userVote: null,
    highFives: 29,
    userHighFived: false,
    items: ['Monet', 'Picasso', 'Da Vinci', 'Cezanne', 'Renoir'],
    description: 'Master painters known for their distinctive styles, emotional depth, and lasting influence on art.',
    comments: [
      { id: 1, user: '@impressionist', content: 'Monet\'s water lilies are transcendent', time: '5 hours ago', avatar: '🎨' },
      { id: 2, user: '@classic', content: 'Da Vinci was ahead of his time', time: '3 hours ago', avatar: '🖼️' }
    ],
    saves: 56,
    isRejected: false
  },
  {
    id: 47,
    title: 'If you like "Banksy", try these FIVE ALIKE...',
    author: '@streetart',
    category: 'Art',
    date: '12/12/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Shepard Fairey', 'Jean-Michel Basquiat', 'Kaws', 'Invader', 'JR'],
    description: 'Contemporary street artists who blend social commentary with accessible art.',
    comments: [
      { id: 1, user: '@urban', content: 'Basquiat\'s work is so powerful', time: '4 hours ago', avatar: '🎭' },
      { id: 2, user: '@contemporary', content: 'JR\'s installations are mind-blowing', time: '2 hours ago', avatar: '📸' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 48,
    title: 'If you like "Frida Kahlo", try these FIVE ALIKE...',
    author: '@feminist',
    category: 'Art',
    date: '12/14/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Georgia O\'Keeffe', 'Louise Bourgeois', 'Yayoi Kusama', 'Marina Abramović', 'Artemisia Gentileschi'],
    description: 'Female artists who challenged conventions and expressed personal narratives.',
    comments: [
      { id: 1, user: '@feminist', content: 'O\'Keeffe\'s flowers are iconic', time: '6 hours ago', avatar: '🌺' },
      { id: 2, user: '@performance', content: 'Marina\'s performances are intense', time: '4 hours ago', avatar: '🎪' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 49,
    title: 'If you like "Japanese Woodblock Prints", try these FIVE ALIKE...',
    author: '@traditional',
    category: 'Art',
    date: '12/16/2024',
    votes: 89,
    upvotes: 95,
    downvotes: 6,
    userVote: null,
    highFives: 56,
    userHighFived: false,
    items: ['Chinese Ink Paintings', 'Indian Miniatures', 'Persian Illuminated Manuscripts', 'Mexican Folk Art', 'Aboriginal Dot Paintings'],
    description: 'Traditional art forms with cultural significance and distinctive techniques.',
    comments: [
      { id: 1, user: '@culture', content: 'Chinese ink paintings are so serene', time: '5 hours ago', avatar: '🎋' },
      { id: 2, user: '@heritage', content: 'Aboriginal art tells amazing stories', time: '3 hours ago', avatar: '🎨' }
    ],
    saves: 78,
    isRejected: false
  },
  {
    id: 50,
    title: 'If you like "Digital Art", try these FIVE ALIKE...',
    author: '@digital',
    category: 'Art',
    date: '12/18/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['3D Modeling', 'Pixel Art', 'Generative AI Art', 'VR Sculptures', 'Interactive Installations'],
    description: 'Modern digital art forms that push the boundaries of technology and creativity.',
    comments: [
      { id: 1, user: '@tech', content: 'VR art is the future', time: '3 hours ago', avatar: '🥽' },
      { id: 2, user: '@pixels', content: 'Pixel art has such charm', time: '2 hours ago', avatar: '🎮' }
    ],
    saves: 145,
    isRejected: false
  },

  // SPORTS (5 lists)
  {
    id: 51,
    title: 'If you like "Basketball", try these FIVE ALIKE...',
    author: '@sportsfan',
    category: 'Sports',
    date: '12/11/2024',
    votes: 110,
    upvotes: 115,
    downvotes: 5,
    userVote: null,
    highFives: 51,
    userHighFived: false,
    items: ['Soccer', 'Tennis', 'Baseball', 'American Football', 'Hockey'],
    description: 'Team and individual sports that require skill, strategy, and athleticism to master.',
    comments: [
      { id: 1, user: '@team', content: 'Soccer is the beautiful game', time: '4 hours ago', avatar: '⚽' },
      { id: 2, user: '@strategy', content: 'Baseball is pure strategy', time: '2 hours ago', avatar: '⚾' }
    ],
    saves: 85,
    isRejected: false
  },
  {
    id: 52,
    title: 'If you like "Rock Climbing", try these FIVE ALIKE...',
    author: '@extreme',
    category: 'Sports',
    date: '12/13/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Bouldering', 'Mountaineering', 'Ice Climbing', 'Free Solo', 'Via Ferrata'],
    description: 'Climbing disciplines that test your strength, technique, and mental fortitude.',
    comments: [
      { id: 1, user: '@climber', content: 'Bouldering is pure problem solving', time: '5 hours ago', avatar: '🧗' },
      { id: 2, user: '@mountains', content: 'Ice climbing is terrifyingly beautiful', time: '3 hours ago', avatar: '❄️' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 53,
    title: 'If you like "Swimming", try these FIVE ALIKE...',
    author: '@aquatic',
    category: 'Sports',
    date: '12/15/2024',
    votes: 89,
    upvotes: 95,
    downvotes: 6,
    userVote: null,
    highFives: 45,
    userHighFived: false,
    items: ['Water Polo', 'Synchronized Swimming', 'Open Water Swimming', 'Triathlon', 'Diving'],
    description: 'Water sports that combine endurance, technique, and grace.',
    comments: [
      { id: 1, user: '@water', content: 'Open water swimming is meditation', time: '6 hours ago', avatar: '🏊' },
      { id: 2, user: '@endurance', content: 'Triathlon is the ultimate test', time: '4 hours ago', avatar: '🏃' }
    ],
    saves: 76,
    isRejected: false
  },
  {
    id: 54,
    title: 'If you like "Formula 1", try these FIVE ALIKE...',
    author: '@racing',
    category: 'Sports',
    date: '12/17/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['MotoGP', 'IndyCar', 'WRC Rally', 'Le Mans', 'Formula E'],
    description: 'High-speed motorsports with cutting-edge technology and skilled drivers.',
    comments: [
      { id: 1, user: '@speed', content: 'MotoGP riders are insane', time: '3 hours ago', avatar: '🏍️' },
      { id: 2, user: '@endurance', content: 'Le Mans is the ultimate test', time: '2 hours ago', avatar: '🏁' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 55,
    title: 'If you like "Yoga", try these FIVE ALIKE...',
    author: '@mindful',
    category: 'Sports',
    date: '12/19/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Pilates', 'Tai Chi', 'Martial Arts', 'Dance', 'Gymnastics'],
    description: 'Mind-body practices that combine physical movement with mental focus.',
    comments: [
      { id: 1, user: '@balance', content: 'Pilates core strength is unreal', time: '4 hours ago', avatar: '🧘' },
      { id: 2, user: '@flow', content: 'Tai Chi is moving meditation', time: '2 hours ago', avatar: '☯️' }
    ],
    saves: 112,
    isRejected: false
  },

  // FASHION (5 lists)
  {
    id: 56,
    title: 'If you like "Streetwear", try these FIVE ALIKE...',
    author: '@hypebeast',
    category: 'Fashion',
    date: '12/8/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Vintage Band Tees', 'Skate Fashion', 'Japanese Avant-Garde', 'Techwear', 'Workwear'],
    description: 'Fashion subcultures that blend style with self-expression and functionality.',
    comments: [
      { id: 1, user: '@skate', content: 'Vintage band tees never go out of style', time: '5 hours ago', avatar: '🎸' },
      { id: 2, user: '@tech', content: 'Techwear is cyberpunk IRL', time: '3 hours ago', avatar: '🤖' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 57,
    title: 'If you like "Minimalist Fashion", try these FIVE ALIKE...',
    author: '@minimal',
    category: 'Fashion',
    date: '12/10/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Scandinavian Design', 'Capsule Wardrobe', 'Sustainable Fashion', 'Monochrome Looks', 'Investment Pieces'],
    description: 'Fashion approaches that prioritize quality, simplicity, and timeless appeal.',
    comments: [
      { id: 1, user: '@sustainable', content: 'Quality over quantity always', time: '4 hours ago', avatar: '🌱' },
      { id: 2, user: '@timeless', content: 'Scandinavian style is so clean', time: '2 hours ago', avatar: '❄️' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 58,
    title: 'If you like "Vintage 90s Fashion", try these FIVE ALIKE...',
    author: '@retro',
    category: 'Fashion',
    date: '12/12/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 112,
    userHighFived: false,
    items: ['Y2K Fashion', '80s Power Dressing', '70s Bohemian', '60s Mod', '50s Rockabilly'],
    description: 'Vintage fashion eras with distinctive aesthetics that influence modern style.',
    comments: [
      { id: 1, user: '@nostalgia', content: 'Y2K is having such a moment', time: '6 hours ago', avatar: '💿' },
      { id: 2, user: '@vintage', content: '70s boho never really left', time: '4 hours ago', avatar: '🌻' }
    ],
    saves: 139,
    isRejected: false
  },
  {
    id: 59,
    title: 'If you like "High Fashion", try these FIVE ALIKE...',
    author: '@couture',
    category: 'Fashion',
    date: '12/14/2024',
    votes: 89,
    upvotes: 96,
    downvotes: 7,
    userVote: null,
    highFives: 56,
    userHighFived: false,
    items: ['Avant-Garde Design', 'Conceptual Fashion', 'Art-to-Wear', 'Experimental Textiles', 'Fashion Photography'],
    description: 'Fashion as art form that pushes boundaries and challenges conventions.',
    comments: [
      { id: 1, user: '@runway', content: 'Avant-garde shows are performance art', time: '5 hours ago', avatar: '🎭' },
      { id: 2, user: '@artistic', content: 'Fashion photography tells stories', time: '3 hours ago', avatar: '📸' }
    ],
    saves: 78,
    isRejected: false
  },
  {
    id: 60,
    title: 'If you like "Athleisure", try these FIVE ALIKE...',
    author: '@activewear',
    category: 'Fashion',
    date: '12/16/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Technical Fabrics', 'Comfortable Sneakers', 'Wellness Fashion', 'Outdoor Gear', 'Lifestyle Brands'],
    description: 'Fashion that merges comfort, functionality, and style for active lifestyles.',
    comments: [
      { id: 1, user: '@comfort', content: 'Technical fabrics are game changers', time: '3 hours ago', avatar: '👟' },
      { id: 2, user: '@active', content: 'Wellness fashion is the future', time: '2 hours ago', avatar: '🧘' }
    ],
    saves: 145,
    isRejected: false
  },

  // PHOTOGRAPHY (5 lists)
  {
    id: 61,
    title: 'If you like "Street Photography", try these FIVE ALIKE...',
    author: '@photographer',
    category: 'Photography',
    date: '12/9/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Documentary Photography', 'Photojournalism', 'Urban Exploration', 'Candid Portraits', 'Social Commentary'],
    description: 'Photography styles that capture authentic moments and human stories.',
    comments: [
      { id: 1, user: '@documentary', content: 'Real moments are the most powerful', time: '4 hours ago', avatar: '📷' },
      { id: 2, user: '@urban', content: 'Cities tell incredible stories', time: '2 hours ago', avatar: '🏙️' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 62,
    title: 'If you like "Landscape Photography", try these FIVE ALIKE...',
    author: '@nature',
    category: 'Photography',
    date: '12/11/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Astrophotography', 'Macro Photography', 'Wildlife Photography', 'Seascape Photography', 'Aerial Photography'],
    description: 'Nature photography that reveals the beauty and drama of the natural world.',
    comments: [
      { id: 1, user: '@stars', content: 'Astrophotography is pure magic', time: '5 hours ago', avatar: '⭐' },
      { id: 2, user: '@wildlife', content: 'Wildlife photos require such patience', time: '3 hours ago', avatar: '🦅' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 63,
    title: 'If you like "Film Photography", try these FIVE ALIKE...',
    author: '@analog',
    category: 'Photography',
    date: '12/13/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Instant Photography', 'Darkroom Techniques', 'Alternative Processes', 'Medium Format', 'Vintage Cameras'],
    description: 'Analog photography techniques that emphasize craft and intentionality.',
    comments: [
      { id: 1, user: '@film', content: 'Darkroom magic never gets old', time: '6 hours ago', avatar: '🎞️' },
      { id: 2, user: '@instant', content: 'Polaroids have such character', time: '4 hours ago', avatar: '📸' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 64,
    title: 'If you like "Portrait Photography", try these FIVE ALIKE...',
    author: '@studio',
    category: 'Photography',
    date: '12/15/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Fashion Photography', 'Environmental Portraits', 'Fine Art Portraits', 'Headshots', 'Self-Portraits'],
    description: 'Portrait styles that capture personality, emotion, and human connection.',
    comments: [
      { id: 1, user: '@fashion', content: 'Fashion portraits are storytelling', time: '3 hours ago', avatar: '💄' },
      { id: 2, user: '@connection', content: 'Environmental portraits show context', time: '2 hours ago', avatar: '👤' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 65,
    title: 'If you like "Black and White Photography", try these FIVE ALIKE...',
    author: '@monochrome',
    category: 'Photography',
    date: '12/17/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['High Contrast Photography', 'Minimalist Photography', 'Shadow Play', 'Texture Studies', 'Infrared Photography'],
    description: 'Photography techniques that emphasize form, texture, and emotional impact.',
    comments: [
      { id: 1, user: '@contrast', content: 'High contrast is so dramatic', time: '5 hours ago', avatar: '⚫' },
      { id: 2, user: '@infrared', content: 'Infrared reveals hidden worlds', time: '3 hours ago', avatar: '🔴' }
    ],
    saves: 145,
    isRejected: false
  },

  // FITNESS (5 lists)
  {
    id: 66,
    title: 'If you like "Weight Training", try these FIVE ALIKE...',
    author: '@gains',
    category: 'Fitness',
    date: '12/10/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Powerlifting', 'Olympic Lifting', 'Bodybuilding', 'Calisthenics', 'Functional Training'],
    description: 'Strength training methods that build muscle, power, and athletic performance.',
    comments: [
      { id: 1, user: '@strength', content: 'Olympic lifting is pure power', time: '4 hours ago', avatar: '🏋️' },
      { id: 2, user: '@bodyweight', content: 'Calisthenics builds real strength', time: '2 hours ago', avatar: '💪' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 67,
    title: 'If you like "Running", try these FIVE ALIKE...',
    author: '@cardio',
    category: 'Fitness',
    date: '12/12/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Cycling', 'Swimming', 'Rowing', 'Hiking', 'Trail Running'],
    description: 'Cardiovascular exercises that build endurance and mental resilience.',
    comments: [
      { id: 1, user: '@endurance', content: 'Trail running is meditation in motion', time: '5 hours ago', avatar: '🏃' },
      { id: 2, user: '@outdoor', content: 'Hiking combines fitness and nature', time: '3 hours ago', avatar: '🥾' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 68,
    title: 'If you like "CrossFit", try these FIVE ALIKE...',
    author: '@intensity',
    category: 'Fitness',
    date: '12/14/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['F45', 'Orange Theory', 'Boot Camp', 'Circuit Training', 'HIIT Workouts'],
    description: 'High-intensity group fitness programs that combine strength and cardio.',
    comments: [
      { id: 1, user: '@community', content: 'Group fitness is so motivating', time: '6 hours ago', avatar: '🔥' },
      { id: 2, user: '@variety', content: 'HIIT keeps workouts interesting', time: '4 hours ago', avatar: '⚡' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 69,
    title: 'If you like "Yoga", try these FIVE ALIKE...',
    author: '@flexibility',
    category: 'Fitness',
    date: '12/16/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Pilates', 'Barre', 'Stretching', 'Meditation', 'Breathwork'],
    description: 'Mind-body practices that improve flexibility, balance, and mental clarity.',
    comments: [
      { id: 1, user: '@mindful', content: 'Breathwork is transformative', time: '3 hours ago', avatar: '🧘' },
      { id: 2, user: '@core', content: 'Barre burns in the best way', time: '2 hours ago', avatar: '🩰' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 70,
    title: 'If you like "Martial Arts", try these FIVE ALIKE...',
    author: '@warrior',
    category: 'Fitness',
    date: '12/18/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Boxing', 'Kickboxing', 'BJJ', 'Muay Thai', 'Wing Chun'],
    description: 'Combat sports that develop discipline, technique, and self-defense skills.',
    comments: [
      { id: 1, user: '@combat', content: 'BJJ is physical chess', time: '4 hours ago', avatar: '🥋' },
      { id: 2, user: '@discipline', content: 'Muay Thai builds character', time: '2 hours ago', avatar: '🥊' }
    ],
    saves: 145,
    isRejected: false
  },

  // SCIENCE (5 lists)
  {
    id: 71,
    title: 'If you like "Astronomy", try these FIVE ALIKE...',
    author: '@stargazer',
    category: 'Science',
    date: '12/11/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['Astrophysics', 'Cosmology', 'Planetary Science', 'Space Exploration', 'SETI Research'],
    description: 'Space sciences that explore the universe and our place within it.',
    comments: [
      { id: 1, user: '@cosmos', content: 'Webb telescope images are stunning', time: '5 hours ago', avatar: '🔭' },
      { id: 2, user: '@exploration', content: 'Mars missions are incredible', time: '3 hours ago', avatar: '🚀' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 72,
    title: 'If you like "Neuroscience", try these FIVE ALIKE...',
    author: '@brainiac',
    category: 'Science',
    date: '12/13/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Psychology', 'Cognitive Science', 'Artificial Intelligence', 'Philosophy of Mind', 'Behavioral Economics'],
    description: 'Fields that study consciousness, behavior, and the nature of mind.',
    comments: [
      { id: 1, user: '@consciousness', content: 'The hard problem fascinates me', time: '4 hours ago', avatar: '🧠' },
      { id: 2, user: '@behavior', content: 'Behavioral economics explains so much', time: '2 hours ago', avatar: '💭' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 73,
    title: 'If you like "Climate Science", try these FIVE ALIKE...',
    author: '@environmental',
    category: 'Science',
    date: '12/15/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Ecology', 'Conservation Biology', 'Renewable Energy', 'Environmental Engineering', 'Sustainability Studies'],
    description: 'Sciences focused on understanding and protecting our planet.',
    comments: [
      { id: 1, user: '@green', content: 'Renewable energy is the future', time: '6 hours ago', avatar: '🌱' },
      { id: 2, user: '@conservation', content: 'Every species matters', time: '4 hours ago', avatar: '🌍' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 74,
    title: 'If you like "Quantum Physics", try these FIVE ALIKE...',
    author: '@quantum',
    category: 'Science',
    date: '12/17/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Theoretical Physics', 'Particle Physics', 'String Theory', 'Quantum Computing', 'Mathematical Physics'],
    description: 'Advanced physics that explores the fundamental nature of reality.',
    comments: [
      { id: 1, user: '@theoretical', content: 'String theory is mind-bending', time: '5 hours ago', avatar: '⚛️' },
      { id: 2, user: '@computing', content: 'Quantum computers will change everything', time: '3 hours ago', avatar: '💻' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 75,
    title: 'If you like "Genetics", try these FIVE ALIKE...',
    author: '@dna',
    category: 'Science',
    date: '12/19/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Molecular Biology', 'Bioengineering', 'Evolutionary Biology', 'Bioinformatics', 'Synthetic Biology'],
    description: 'Life sciences that study and engineer biological systems.',
    comments: [
      { id: 1, user: '@evolution', content: 'Evolution is such elegant design', time: '3 hours ago', avatar: '🧬' },
      { id: 2, user: '@synthetic', content: 'Synthetic biology is programming life', time: '2 hours ago', avatar: '🔬' }
    ],
    saves: 145,
    isRejected: false
  },

  // HISTORY (5 lists)
  {
    id: 76,
    title: 'If you like "World War II", try these FIVE ALIKE...',
    author: '@historian',
    category: 'History',
    date: '12/8/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['World War I', 'Vietnam War', 'Civil War', 'Cold War', 'Korean War'],
    description: 'Major military conflicts that shaped modern history.',
    comments: [
      { id: 1, user: '@military', content: 'Cold War documentaries are fascinating', time: '4 hours ago', avatar: '⚔️' },
      { id: 2, user: '@historical', content: 'Civil War had such lasting impact', time: '2 hours ago', avatar: '📜' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 77,
    title: 'If you like "Ancient Rome", try these FIVE ALIKE...',
    author: '@antiquity',
    category: 'History',
    date: '12/10/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Ancient Greece', 'Ancient Egypt', 'Byzantine Empire', 'Persian Empire', 'Mesopotamia'],
    description: 'Ancient civilizations that laid the foundations of Western culture.',
    comments: [
      { id: 1, user: '@classical', content: 'Greek philosophy changed everything', time: '5 hours ago', avatar: '🏛️' },
      { id: 2, user: '@archaeology', content: 'Egyptian pyramids still amaze me', time: '3 hours ago', avatar: '🏺' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 78,
    title: 'If you like "Industrial Revolution", try these FIVE ALIKE...',
    author: '@progress',
    category: 'History',
    date: '12/12/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Renaissance', 'Scientific Revolution', 'Age of Exploration', 'Agricultural Revolution', 'Digital Revolution'],
    description: 'Transformative periods that revolutionized human society.',
    comments: [
      { id: 1, user: '@innovation', content: 'Renaissance art is timeless', time: '6 hours ago', avatar: '🎨' },
      { id: 2, user: '@technology', content: 'Digital revolution is still happening', time: '4 hours ago', avatar: '💻' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 79,
    title: 'If you like "Medieval Times", try these FIVE ALIKE...',
    author: '@feudal',
    category: 'History',
    date: '12/14/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Viking Age', 'Crusades', 'Black Death', 'Hundred Years War', 'Rise of Islam'],
    description: 'Medieval events and periods that shaped European and world history.',
    comments: [
      { id: 1, user: '@knights', content: 'Viking sagas are epic', time: '3 hours ago', avatar: '⚔️' },
      { id: 2, user: '@medieval', content: 'Black Death changed everything', time: '2 hours ago', avatar: '🏰' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 80,
    title: 'If you like "American Revolution", try these FIVE ALIKE...',
    author: '@freedom',
    category: 'History',
    date: '12/16/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['French Revolution', 'Russian Revolution', 'Chinese Revolution', 'Cuban Revolution', 'Arab Spring'],
    description: 'Revolutionary movements that overthrew existing powers.',
    comments: [
      { id: 1, user: '@revolution', content: 'French Revolution was so complex', time: '4 hours ago', avatar: '🗽' },
      { id: 2, user: '@change', content: 'Arab Spring showed power of social media', time: '2 hours ago', avatar: '📱' }
    ],
    saves: 145,
    isRejected: false
  },

  // POLITICS (5 lists)
  {
    id: 81,
    title: 'If you like "Democratic Systems", try these FIVE ALIKE...',
    author: '@democracy',
    category: 'Politics',
    date: '12/9/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Parliamentary Systems', 'Federal Republics', 'Direct Democracy', 'Constitutional Monarchies', 'City-States'],
    description: 'Different forms of democratic governance around the world.',
    comments: [
      { id: 1, user: '@civics', content: 'Swiss direct democracy is fascinating', time: '5 hours ago', avatar: '🗳️' },
      { id: 2, user: '@government', content: 'Parliamentary systems are so efficient', time: '3 hours ago', avatar: '🏛️' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 82,
    title: 'If you like "Political Philosophy", try these FIVE ALIKE...',
    author: '@thinker',
    category: 'Politics',
    date: '12/11/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Ethics', 'Social Contract Theory', 'Justice Theory', 'Political Economy', 'International Relations'],
    description: 'Philosophical approaches to understanding politics and society.',
    comments: [
      { id: 1, user: '@philosophy', content: 'Rawls theory of justice is brilliant', time: '4 hours ago', avatar: '⚖️' },
      { id: 2, user: '@theory', content: 'Social contract theory explains so much', time: '2 hours ago', avatar: '📚' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 83,
    title: 'If you like "Electoral Systems", try these FIVE ALIKE...',
    author: '@elections',
    category: 'Politics',
    date: '12/13/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Ranked Choice Voting', 'Proportional Representation', 'Campaign Finance', 'Gerrymandering', 'Voter Registration'],
    description: 'Electoral processes and reforms that shape democratic participation.',
    comments: [
      { id: 1, user: '@voting', content: 'Ranked choice voting makes so much sense', time: '6 hours ago', avatar: '📊' },
      { id: 2, user: '@reform', content: 'Gerrymandering is such a problem', time: '4 hours ago', avatar: '🗺️' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 84,
    title: 'If you like "Public Policy", try these FIVE ALIKE...',
    author: '@policy',
    category: 'Politics',
    date: '12/15/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Urban Planning', 'Healthcare Policy', 'Education Reform', 'Environmental Policy', 'Economic Policy'],
    description: 'Policy areas that affect daily life and societal outcomes.',
    comments: [
      { id: 1, user: '@urban', content: 'Good urban planning transforms cities', time: '3 hours ago', avatar: '🏙️' },
      { id: 2, user: '@healthcare', content: 'Healthcare policy is so complex', time: '2 hours ago', avatar: '🏥' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 85,
    title: 'If you like "International Relations", try these FIVE ALIKE...',
    author: '@diplomat',
    category: 'Politics',
    date: '12/17/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Diplomacy', 'Trade Agreements', 'International Law', 'Global Governance', 'Conflict Resolution'],
    description: 'How nations interact and cooperate in the global arena.',
    comments: [
      { id: 1, user: '@global', content: 'Diplomacy prevents so many conflicts', time: '5 hours ago', avatar: '🌍' },
      { id: 2, user: '@peace', content: 'International law needs more teeth', time: '3 hours ago', avatar: '⚖️' }
    ],
    saves: 145,
    isRejected: false
  },

  // COMEDY (5 lists)
  {
    id: 86,
    title: 'If you like "The Office", try these FIVE ALIKE...',
    author: '@comedylover',
    category: 'Comedy',
    date: '12/14/2024',
    votes: 156,
    upvotes: 161,
    downvotes: 5,
    userVote: null,
    highFives: 73,
    userHighFived: false,
    items: ['Parks and Recreation', 'Brooklyn Nine-Nine', 'Community', 'Arrested Development', 'Schitts Creek'],
    description: 'Workplace and situational comedies with great characters and witty writing.',
    comments: [
      { id: 1, user: '@mockumentary', content: 'Parks and Rec > The Office fight me', time: '4 hours ago', avatar: '😂' },
      { id: 2, user: '@workplace', content: 'B99 is criminally underrated', time: '2 hours ago', avatar: '👮‍♀️' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 87,
    title: 'If you like "Stand-up Comedy", try these FIVE ALIKE...',
    author: '@standup',
    category: 'Comedy',
    date: '12/16/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Improv Comedy', 'Sketch Comedy', 'Comedy Roasts', 'Comedy Panels', 'Comedy Podcasts'],
    description: 'Live comedy formats that showcase different styles of humor.',
    comments: [
      { id: 1, user: '@live', content: 'Improv is so impressive', time: '5 hours ago', avatar: '🎭' },
      { id: 2, user: '@roast', content: 'Comedy roasts are brutal but hilarious', time: '3 hours ago', avatar: '🔥' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 88,
    title: 'If you like "Saturday Night Live", try these FIVE ALIKE...',
    author: '@sketch',
    category: 'Comedy',
    date: '12/18/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Key & Peele', 'Chapelle Show', 'In Living Color', 'Mad TV', 'SCTV'],
    description: 'Sketch comedy shows that launched careers and defined eras.',
    comments: [
      { id: 1, user: '@sketch', content: 'Key & Peele had such clever writing', time: '6 hours ago', avatar: '🎬' },
      { id: 2, user: '@classic', content: 'Chapelle Show was revolutionary', time: '4 hours ago', avatar: '🎤' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 89,
    title: 'If you like "Comedy Movies", try these FIVE ALIKE...',
    author: '@filmcomedy',
    category: 'Comedy',
    date: '12/20/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Romantic Comedies', 'Action Comedies', 'Parody Films', 'Dark Comedies', 'Buddy Comedies'],
    description: 'Comedy film subgenres that blend humor with other elements.',
    comments: [
      { id: 1, user: '@romance', content: 'Rom-coms are comfort food', time: '3 hours ago', avatar: '💕' },
      { id: 2, user: '@dark', content: 'Dark comedies are so clever', time: '2 hours ago', avatar: '🖤' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 90,
    title: 'If you like "Memes", try these FIVE ALIKE...',
    author: '@internet',
    category: 'Comedy',
    date: '12/22/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['TikTok Comedy', 'Twitter Humor', 'YouTube Parodies', 'Reddit Jokes', 'Instagram Reels'],
    description: 'Internet comedy formats that define modern humor.',
    comments: [
      { id: 1, user: '@viral', content: 'TikTok comedy is so creative', time: '4 hours ago', avatar: '📱' },
      { id: 2, user: '@gen', content: 'Reddit has the best inside jokes', time: '2 hours ago', avatar: '💻' }
    ],
    saves: 145,
    isRejected: false
  },

  // HORROR (5 lists)
  {
    id: 91,
    title: 'If you like "Stranger Things", try these FIVE ALIKE...',
    author: '@scififan',
    category: 'Horror',
    date: '12/13/2024',
    votes: 125,
    upvotes: 130,
    downvotes: 5,
    userVote: null,
    highFives: 58,
    userHighFived: false,
    items: ['Dark', 'The X-Files', 'Twin Peaks', 'Black Mirror', 'The Twilight Zone'],
    description: 'Mind-bending supernatural shows with mystery, suspense, and otherworldly elements.',
    comments: [
      { id: 1, user: '@supernatural', content: 'Dark is mind-bendingly good', time: '7 hours ago', avatar: '🌌' },
      { id: 2, user: '@80s', content: 'Twin Peaks walked so Stranger Things could run', time: '5 hours ago', avatar: '🔮' }
    ],
    saves: 94,
    isRejected: false
  },
  {
    id: 92,
    title: 'If you like "Horror Movies", try these FIVE ALIKE...',
    author: '@horrorfan',
    category: 'Horror',
    date: '12/15/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Psychological Thrillers', 'Slasher Films', 'Supernatural Horror', 'Body Horror', 'Found Footage'],
    description: 'Horror subgenres that scare audiences in different ways.',
    comments: [
      { id: 1, user: '@psychological', content: 'Psychological horror is the scariest', time: '5 hours ago', avatar: '🧠' },
      { id: 2, user: '@classic', content: 'Nothing beats classic slashers', time: '3 hours ago', avatar: '🔪' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 93,
    title: 'If you like "Stephen King", try these FIVE ALIKE...',
    author: '@kingfan',
    category: 'Horror',
    date: '12/17/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['H.P. Lovecraft', 'Edgar Allan Poe', 'Clive Barker', 'Shirley Jackson', 'Richard Matheson'],
    description: 'Master horror writers who craft terrifying stories.',
    comments: [
      { id: 1, user: '@cosmic', content: 'Lovecraft cosmic horror is unmatched', time: '4 hours ago', avatar: '🐙' },
      { id: 2, user: '@classic', content: 'Poe invented the genre', time: '2 hours ago', avatar: '🖤' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 94,
    title: 'If you like "True Crime", try these FIVE ALIKE...',
    author: '@truecrime',
    category: 'Horror',
    date: '12/19/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['Serial Killer Documentaries', 'Cold Cases', 'Forensic Science', 'Criminal Psychology', 'Unsolved Mysteries'],
    description: 'Real-life crime that fascinates and terrifies.',
    comments: [
      { id: 1, user: '@mystery', content: 'Cold cases are so haunting', time: '6 hours ago', avatar: '🔍' },
      { id: 2, user: '@forensics', content: 'Forensic science is incredible', time: '4 hours ago', avatar: '🔬' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 95,
    title: 'If you like "Horror Video Games", try these FIVE ALIKE...',
    author: '@scareplay',
    category: 'Horror',
    date: '12/21/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Survival Horror', 'Psychological Horror Games', 'Jump Scare Games', 'Horror VR', 'Indie Horror'],
    description: 'Interactive horror experiences that immerse players in terror.',
    comments: [
      { id: 1, user: '@survival', content: 'Survival horror builds such tension', time: '3 hours ago', avatar: '🎮' },
      { id: 2, user: '@vr', content: 'VR horror is too intense for me', time: '2 hours ago', avatar: '🥽' }
    ],
    saves: 106,
    isRejected: false
  },

  // ROMANCE (5 lists)
  {
    id: 96,
    title: 'If you like "Pride and Prejudice", try these FIVE ALIKE...',
    author: '@regency',
    category: 'Romance',
    date: '12/10/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Jane Eyre', 'Sense and Sensibility', 'Emma', 'Persuasion', 'North and South'],
    description: 'Classic romance novels with strong heroines and timeless love stories.',
    comments: [
      { id: 1, user: '@classic', content: 'Jane Eyre is so passionate', time: '5 hours ago', avatar: '📚' },
      { id: 2, user: '@austen', content: 'Emma is Austen at her finest', time: '3 hours ago', avatar: '💕' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 97,
    title: 'If you like "Rom-Com Movies", try these FIVE ALIKE...',
    author: '@romcom',
    category: 'Romance',
    date: '12/12/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['K-Drama Romance', 'Period Romance Films', 'Friends to Lovers', 'Enemies to Lovers', 'Second Chance Romance'],
    description: 'Romance tropes and formats that make hearts flutter.',
    comments: [
      { id: 1, user: '@kdrama', content: 'K-dramas do romance perfectly', time: '4 hours ago', avatar: '💝' },
      { id: 2, user: '@trope', content: 'Enemies to lovers is my weakness', time: '2 hours ago', avatar: '⚔️' }
    ],
    saves: 145,
    isRejected: false
  },
  {
    id: 98,
    title: 'If you like "Love Songs", try these FIVE ALIKE...',
    author: '@romantic',
    category: 'Romance',
    date: '12/14/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Wedding Songs', 'Breakup Songs', 'First Dance Songs', 'Anniversary Songs', 'Valentine\'s Day Playlists'],
    description: 'Music for every stage and emotion of romantic relationships.',
    comments: [
      { id: 1, user: '@wedding', content: 'First dance songs are so important', time: '6 hours ago', avatar: '💃' },
      { id: 2, user: '@heartbreak', content: 'Good breakup songs heal the soul', time: '4 hours ago', avatar: '💔' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 99,
    title: 'If you like "Date Night Ideas", try these FIVE ALIKE...',
    author: '@couples',
    category: 'Romance',
    date: '12/16/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Anniversary Celebrations', 'Surprise Gestures', 'Couple\'s Activities', 'Romantic Getaways', 'Love Languages'],
    description: 'Ways to keep romance alive and strengthen relationships.',
    comments: [
      { id: 1, user: '@surprise', content: 'Small gestures mean the most', time: '3 hours ago', avatar: '🎁' },
      { id: 2, user: '@adventure', content: 'Travel together creates memories', time: '2 hours ago', avatar: '✈️' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 100,
    title: 'If you like "Fantasy Romance", try these FIVE ALIKE...',
    author: '@fantasyromance',
    category: 'Romance',
    date: '12/18/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Paranormal Romance', 'Historical Fantasy Romance', 'Urban Fantasy Romance', 'Sci-Fi Romance', 'Fairy Tale Retellings'],
    description: 'Romance stories set in magical and fantastical worlds.',
    comments: [
      { id: 1, user: '@fae', content: 'Fairy tale retellings are so creative', time: '5 hours ago', avatar: '🧚' },
      { id: 2, user: '@space', content: 'Sci-fi romance is underrated', time: '3 hours ago', avatar: '🚀' }
    ],
    saves: 106,
    isRejected: false
  },

  // ADVENTURE (5 lists)
  {
    id: 101,
    title: 'If you like "Indiana Jones", try these FIVE ALIKE...',
    author: '@adventurer',
    category: 'Adventure',
    date: '12/11/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['Tomb Raider', 'The Mummy', 'National Treasure', 'Uncharted', 'Pirates of the Caribbean'],
    description: 'Action-adventure stories with treasure hunting and exotic locations.',
    comments: [
      { id: 1, user: '@treasure', content: 'National Treasure is so fun', time: '5 hours ago', avatar: '🗺️' },
      { id: 2, user: '@archaeology', content: 'Tomb Raider games are amazing', time: '3 hours ago', avatar: '⛏️' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 102,
    title: 'If you like "Hiking", try these FIVE ALIKE...',
    author: '@outdoors',
    category: 'Adventure',
    date: '12/13/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Backpacking', 'Rock Climbing', 'Trail Running', 'Camping', 'Mountaineering'],
    description: 'Outdoor activities that connect you with nature and challenge your limits.',
    comments: [
      { id: 1, user: '@mountains', content: 'Mountaineering is the ultimate test', time: '4 hours ago', avatar: '🏔️' },
      { id: 2, user: '@wild', content: 'Camping under stars is magical', time: '2 hours ago', avatar: '⭐' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 103,
    title: 'If you like "Travel Adventure", try these FIVE ALIKE...',
    author: '@wanderer',
    category: 'Adventure',
    date: '12/15/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Solo Travel', 'Extreme Sports', 'Cultural Immersion', 'Off-the-Grid Destinations', 'Adventure Tours'],
    description: 'Travel experiences that push boundaries and create lasting memories.',
    comments: [
      { id: 1, user: '@solo', content: 'Solo travel is so empowering', time: '6 hours ago', avatar: '🎒' },
      { id: 2, user: '@extreme', content: 'Bungee jumping changed my life', time: '4 hours ago', avatar: '🪂' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 104,
    title: 'If you like "Breaking Bad", try these FIVE ALIKE...',
    author: '@tvjunkie',
    category: 'TV Shows',
    date: '12/17/2024',
    votes: 189,
    upvotes: 197,
    downvotes: 8,
    userVote: null,
    highFives: 145,
    userHighFived: false,
    items: ['Better Call Saul', 'The Sopranos', 'Ozark', 'Narcos', 'Fargo'],
    description: 'Dark, gritty crime dramas with complex antiheroes and moral ambiguity.',
    comments: [
      { id: 1, user: '@crime_fan', content: 'The Sopranos started it all', time: '3 hours ago', avatar: '🎭' },
      { id: 2, user: '@drama_lover', content: 'Ozark is criminally underrated', time: '2 hours ago', avatar: '💰' }
    ],
    saves: 167,
    isRejected: false
  },
  {
    id: 105,
    title: 'If you like "Adventure Sports", try these FIVE ALIKE...',
    author: '@adrenaline',
    category: 'Adventure',
    date: '12/19/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Skydiving', 'Whitewater Rafting', 'Mountain Biking', 'Paragliding', 'Base Jumping'],
    description: 'Extreme sports that provide adrenaline rushes and unforgettable experiences.',
    comments: [
      { id: 1, user: '@sky', content: 'Skydiving is pure freedom', time: '5 hours ago', avatar: '🪂' },
      { id: 2, user: '@rush', content: 'Mountain biking downhill is insane', time: '3 hours ago', avatar: '🚵' }
    ],
    saves: 134,
    isRejected: false
  },

  // BOARD GAMES (10 lists)
  {
    id: 109,
    title: 'If you like "Settlers of Catan", try these FIVE ALIKE...',
    author: '@boardgamer',
    category: 'Board Games',
    date: '12/5/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Ticket to Ride', 'Splendor', 'King of Tokyo', 'Azul', 'Wingspan'],
    description: 'Gateway board games perfect for introducing friends and family to modern tabletop gaming.',
    comments: [
      { id: 1, user: '@gateway', content: 'Ticket to Ride is the perfect next step', time: '4 hours ago', avatar: '🚂' },
      { id: 2, user: '@family', content: 'Azul is so beautiful and strategic', time: '2 hours ago', avatar: '🎨' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 110,
    title: 'If you like "Dungeons & Dragons", try these FIVE ALIKE...',
    author: '@dungeon_master',
    category: 'Board Games',
    date: '12/7/2024',
    votes: 178,
    upvotes: 185,
    downvotes: 7,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['Pathfinder', 'Gloomhaven', 'HeroQuest', 'Descent', 'Mice and Mystics'],
    description: 'Adventure board games and RPGs with rich storytelling and character progression.',
    comments: [
      { id: 1, user: '@rpg', content: 'Gloomhaven is D&D in a box', time: '6 hours ago', avatar: '⚔️' },
      { id: 2, user: '@adventure', content: 'Mice and Mystics has amazing storytelling', time: '4 hours ago', avatar: '🐭' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 111,
    title: 'If you like "Chess", try these FIVE ALIKE...',
    author: '@strategist',
    category: 'Board Games',
    date: '12/9/2024',
    votes: 145,
    upvotes: 152,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Go', 'Checkers', 'Xiangqi', 'Shogi', 'Hive'],
    description: 'Abstract strategy games that reward deep thinking and tactical planning.',
    comments: [
      { id: 1, user: '@abstract', content: 'Go is the most complex game ever created', time: '5 hours ago', avatar: '⚫' },
      { id: 2, user: '@tactics', content: 'Hive is chess without a board', time: '3 hours ago', avatar: '🐝' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 112,
    title: 'If you like "Monopoly", try these FIVE ALIKE...',
    author: '@classic',
    category: 'Board Games',
    date: '12/11/2024',
    votes: 89,
    upvotes: 96,
    downvotes: 7,
    userVote: null,
    highFives: 56,
    userHighFived: false,
    items: ['Lords of Waterdeep', 'Chinatown', 'Power Grid', 'Modern Art', 'For Sale'],
    description: 'Economic strategy games with trading, negotiation, and property management.',
    comments: [
      { id: 1, user: '@economics', content: 'Lords of Waterdeep is Monopoly for gamers', time: '7 hours ago', avatar: '🏰' },
      { id: 2, user: '@negotiation', content: 'Chinatown has the best wheeling and dealing', time: '5 hours ago', avatar: '🤝' }
    ],
    saves: 78,
    isRejected: false
  },
  {
    id: 113,
    title: 'If you like "Scrabble", try these FIVE ALIKE...',
    author: '@wordsmith',
    category: 'Board Games',
    date: '12/13/2024',
    votes: 123,
    upvotes: 130,
    downvotes: 7,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: ['Bananagrams', 'Paperback', 'Letter Tycoon', 'Hardback', 'Word Domination'],
    description: 'Word games that challenge vocabulary and strategic letter placement.',
    comments: [
      { id: 1, user: '@words', content: 'Paperback combines words with deck building', time: '4 hours ago', avatar: '📚' },
      { id: 2, user: '@letters', content: 'Bananagrams is Scrabble at lightning speed', time: '2 hours ago', avatar: '🍌' }
    ],
    saves: 106,
    isRejected: false
  },
  {
    id: 114,
    title: 'If you like "Risk", try these FIVE ALIKE...',
    author: '@warlord',
    category: 'Board Games',
    date: '12/15/2024',
    votes: 156,
    upvotes: 163,
    downvotes: 7,
    userVote: null,
    highFives: 98,
    userHighFived: false,
    items: ['Axis & Allies', 'Twilight Imperium', 'Blood Rage', 'Kemet', 'Cyclades'],
    description: 'Area control and war games with epic battles and territorial conquest.',
    comments: [
      { id: 1, user: '@war', content: 'Twilight Imperium is Risk in space', time: '6 hours ago', avatar: '🚀' },
      { id: 2, user: '@conquest', content: 'Blood Rage has the most satisfying combat', time: '4 hours ago', avatar: '⚔️' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 115,
    title: 'If you like "Clue", try these FIVE ALIKE...',
    author: '@detective',
    category: 'Board Games',
    date: '12/17/2024',
    votes: 134,
    upvotes: 141,
    downvotes: 7,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: ['Sherlock Holmes Consulting Detective', 'Mysterium', 'Deception: Murder in Hong Kong', 'Chronicles of Crime', 'Tragedy Looper'],
    description: 'Mystery and deduction games where players solve crimes and uncover secrets.',
    comments: [
      { id: 1, user: '@mystery', content: 'Sherlock Holmes CD is the ultimate detective game', time: '5 hours ago', avatar: '🔍' },
      { id: 2, user: '@ghost', content: 'Mysterium has beautiful ghost artwork', time: '3 hours ago', avatar: '👻' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 116,
    title: 'If you like "Pandemic", try these FIVE ALIKE...',
    author: '@cooperative',
    category: 'Board Games',
    date: '12/19/2024',
    votes: 167,
    upvotes: 174,
    downvotes: 7,
    userVote: null,
    highFives: 123,
    userHighFived: false,
    items: ['Forbidden Island', 'Flash Point: Fire Rescue', 'Spirit Island', 'Hanabi', 'The Crew'],
    description: 'Cooperative games where players work together against the game itself.',
    comments: [
      { id: 1, user: '@teamwork', content: 'Spirit Island is co-op perfection', time: '3 hours ago', avatar: '🌺' },
      { id: 2, user: '@together', content: 'The Crew trick-taking is brilliant', time: '2 hours ago', avatar: '🚀' }
    ],
    saves: 145,
    isRejected: false
  },
  {
    id: 117,
    title: 'If you like "Jenga", try these FIVE ALIKE...',
    author: '@dexterity',
    category: 'Board Games',
    date: '12/21/2024',
    votes: 98,
    upvotes: 105,
    downvotes: 7,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: ['Dread Jenga', 'Tokyo Highway', 'Rhino Hero', 'Villa Paletti', 'Suspend'],
    description: 'Dexterity games that test your steady hands and spatial reasoning.',
    comments: [
      { id: 1, user: '@steady', content: 'Tokyo Highway is engineering art', time: '4 hours ago', avatar: '🏗️' },
      { id: 2, user: '@balance', content: 'Rhino Hero is Jenga with superheroes', time: '2 hours ago', avatar: '🦏' }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 118,
    title: 'If you like "Warhammer 40,000", try these FIVE ALIKE...',
    author: '@grimdark',
    category: 'Board Games',
    date: '12/23/2024',
    votes: 189,
    upvotes: 196,
    downvotes: 7,
    userVote: null,
    highFives: 156,
    userHighFived: false,
    items: ['Space Hulk', 'Necromunda', 'Blood Bowl', 'Kill Team', 'Blackstone Fortress'],
    description: 'Epic miniature wargames set in the grim darkness of the far future where there is only war.',
    comments: [
      { id: 1, user: '@emperor', content: 'Space Hulk is the perfect gateway to 40k', time: '6 hours ago', avatar: '⚔️' },
      { id: 2, user: '@chaos', content: 'Blood Bowl brings comedy to the grimdark', time: '4 hours ago', avatar: '🏈' }
    ],
    saves: 167,
    isRejected: false
  },

  // REJECTED LISTS (for "The S#it List")
  {
    id: 106,
    title: 'If you like "Terrible Movies", try these FIVE ALIKE...',
    author: '@badtastefilm',
    category: 'Movies',
    date: '12/15/2024',
    votes: -45,
    upvotes: 12,
    downvotes: 57,
    userVote: null,
    highFives: 2,
    userHighFived: false,
    items: ['The Room', 'Plan 9 from Outer Space', 'Birdemic', 'Troll 2', 'Manos: The Hands of Fate'],
    description: 'So bad they\'re good movies that are unintentionally hilarious.',
    comments: [
      { id: 1, user: '@sobaditsgood', content: 'The Room is a masterpiece of badness', time: '8 hours ago', avatar: '🎬' },
      { id: 2, user: '@cult', content: 'Plan 9 is hilariously awful', time: '6 hours ago', avatar: '🛸' }
    ],
    saves: 8,
    isRejected: true
  },
  {
    id: 107,
    title: 'If you like "Pineapple on Pizza", try these FIVE ALIKE...',
    author: '@controversialfood',
    category: 'Food',
    date: '12/16/2024',
    votes: -38,
    upvotes: 15,
    downvotes: 53,
    userVote: null,
    highFives: 1,
    userHighFived: false,
    items: ['Ketchup on Steak', 'Milk with Cereal', 'Well-done Wagyu', 'Cold Coffee', 'Soggy Fries'],
    description: 'Controversial food combinations that divide people.',
    comments: [
      { id: 1, user: '@controversial', content: 'Pineapple pizza is actually good!', time: '5 hours ago', avatar: '🍍' },
      { id: 2, user: '@purist', content: 'This list is cursed', time: '3 hours ago', avatar: '😱' }
    ],
    saves: 3,
    isRejected: true
  },
  {
    id: 108,
    title: 'If you like "NFTs", try these FIVE ALIKE...',
    author: '@cryptobro',
    category: 'Technology',
    date: '12/17/2024',
    votes: -67,
    upvotes: 8,
    downvotes: 75,
    userVote: null,
    highFives: 0,
    userHighFived: false,
    items: ['Cryptocurrency Scams', 'Multi-level Marketing', 'Ponzi Schemes', 'Timeshares', 'Fake Diplomas'],
    description: 'Investment opportunities that are definitely not scams.',
    comments: [
      { id: 1, user: '@skeptic', content: 'This entire list is a red flag', time: '7 hours ago', avatar: '🚩' },
      { id: 2, user: '@warning', content: 'Please dont fall for any of these', time: '5 hours ago', avatar: '⚠️' }
    ],
    saves: 1,
    isRejected: true
  },
  {
    id: 301,
    title: 'If you like "Miracle Detox Smoothies", try these FIVE ALIKE...',
    author: '@wellness_scammer',
    category: 'Health',
    date: '12/10/2024',
    votes: -45,
    upvotes: 12,
    downvotes: 57,
    userVote: null,
    highFives: 2,
    items: ['Expensive Supplements with No Evidence', 'Essential Oils for Everything Cure', 'Alkaline Water MLM Scheme', 'Juice Cleanse for Weight Loss', 'Copper Bracelets for Arthritis'],
    comments: [
      { id: 1, user: '@doctor', content: 'This is dangerous medical misinformation', time: '4 hours ago', avatar: '⚕️' },
      { id: 2, user: '@scientist', content: 'None of these have scientific backing', time: '2 hours ago', avatar: '🔬' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 302,
    title: 'If you like "Toxic Relationships", try these FIVE ALIKE...',
    author: '@redpiller',
    category: 'Relationships',
    date: '12/08/2024',
    votes: -78,
    upvotes: 8,
    downvotes: 86,
    userVote: null,
    highFives: 1,
    items: ['Emotional Manipulation Tactics', 'Gaslighting for Beginners', 'How to Control Your Partner', 'Love Bombing Strategies', 'Isolation Techniques'],
    comments: [
      { id: 1, user: '@therapist', content: 'This promotes abusive behavior', time: '6 hours ago', avatar: '🚨' },
      { id: 2, user: '@support', content: 'If anyone needs help, reach out', time: '3 hours ago', avatar: '💜' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 303,
    title: 'If you like "Pyramid Schemes", try these FIVE ALIKE...',
    author: '@hun_bot',
    category: 'Business',
    date: '12/05/2024',
    votes: -92,
    upvotes: 4,
    downvotes: 96,
    userVote: null,
    highFives: 0,
    items: ['Herbalife Business Opportunity', 'LuLaRoe Fashion Empire', 'Amway Independent Business', 'Young Living Essential Oils', 'Vector Marketing Cutco Knives'],
    comments: [
      { id: 1, user: '@ftc', content: 'These are all MLM schemes', time: '8 hours ago', avatar: '⚖️' },
      { id: 2, user: '@victim', content: 'Lost thousands to these scams', time: '5 hours ago', avatar: '😢' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 304,
    title: 'If you like "Flat Earth Theory", try these FIVE ALIKE...',
    author: '@conspiracy_nut',
    category: 'Science',
    date: '12/03/2024',
    votes: -134,
    upvotes: 6,
    downvotes: 140,
    userVote: null,
    highFives: 1,
    items: ['Moon Landing Was Fake', 'Chemtrails Mind Control', 'Birds Aren\'t Real', 'Vaccines Cause Autism', 'QAnon Deep State'],
    comments: [
      { id: 1, user: '@nasa', content: 'Please stop spreading misinformation', time: '10 hours ago', avatar: '🚀' },
      { id: 2, user: '@teacher', content: 'This hurts science education', time: '7 hours ago', avatar: '📚' }
    ],
    saves: 1,
    isRejected: true
  },
  {
    id: 305,
    title: 'If you like "Spoiling Movies", try these FIVE ALIKE...',
    author: '@spoiler_king',
    category: 'Movies',
    date: '12/01/2024',
    votes: -67,
    upvotes: 15,
    downvotes: 82,
    userVote: null,
    highFives: 3,
    items: ['Dumbledore Dies in Book 6', 'Vader is Luke\'s Father', 'Tyler Durden is the Narrator', 'Rosebud is a Sled', 'Soylent Green is People'],
    comments: [
      { id: 1, user: '@moviefan', content: 'You ruined everything for me', time: '12 hours ago', avatar: '😭' },
      { id: 2, user: '@mod', content: 'This violates spoiler policy', time: '9 hours ago', avatar: '🔨' }
    ],
    saves: 2,
    isRejected: true
  },
  {
    id: 307,
    title: 'If you like "Overpriced Designer Water", try these FIVE ALIKE...',
    author: '@luxury_fool',
    category: 'Food',
    date: '11/25/2024',
    votes: -43,
    upvotes: 18,
    downvotes: 61,
    userVote: null,
    highFives: 4,
    items: ['$50 Blessed Water Bottles', 'Artisanal Air in Glass Jars', '$200 Raw Water from Springs', 'Diamond-Infused Alkaline Water', 'Himalayan Glacier Ice Cubes'],
    comments: [
      { id: 1, user: '@practical', content: 'Just drink tap water people', time: '2 days ago', avatar: '🚰' },
      { id: 2, user: '@economist', content: 'This is peak consumerism madness', time: '1 day ago', avatar: '📊' }
    ],
    saves: 5,
    isRejected: true
  },
  {
    id: 308,
    title: 'If you like "Clickbait Articles", try these FIVE ALIKE...',
    author: '@buzzfeed_wannabe',
    category: 'Technology',
    date: '11/22/2024',
    votes: -89,
    upvotes: 7,
    downvotes: 96,
    userVote: null,
    highFives: 1,
    items: ['You Won\'t Believe What Happens Next', 'Doctors Hate This One Trick', 'This Will Blow Your Mind', 'The Secret They Don\'t Want You to Know', 'Number 7 Will Shock You'],
    comments: [
      { id: 1, user: '@journalist', content: 'This ruins real journalism', time: '3 days ago', avatar: '📰' },
      { id: 2, user: '@reader', content: 'Stop wasting my time with these', time: '2 days ago', avatar: '⏰' }
    ],
    saves: 2,
    isRejected: true
  },
  {
    id: 309,
    title: 'If you like "Exam Cheating Methods", try these FIVE ALIKE...',
    author: '@academic_fraud',
    category: 'Education',
    date: '11/20/2024',
    votes: -123,
    upvotes: 5,
    downvotes: 128,
    userVote: null,
    highFives: 0,
    items: ['Invisible Ink Cheat Sheets', 'Phone Hidden in Calculator', 'Morse Code Foot Tapping', 'Fake Water Bottle Labels', 'Smartwatch Answer Bank'],
    comments: [
      { id: 1, user: '@professor', content: 'This promotes academic dishonesty', time: '4 days ago', avatar: '🎓' },
      { id: 2, user: '@student', content: 'Just study instead of cheating', time: '3 days ago', avatar: '📖' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 310,
    title: 'If you like "Loud Music at 3AM", try these FIVE ALIKE...',
    author: '@inconsiderate_neighbor',
    category: 'Music',
    date: '11/18/2024',
    votes: -76,
    upvotes: 11,
    downvotes: 87,
    userVote: null,
    highFives: 2,
    items: ['Bass-Heavy Dubstep Marathon', 'Death Metal Practice Sessions', 'Karaoke Party Until Dawn', 'Drum Kit Solo Adventures', 'Subwoofer Test Compilation'],
    comments: [
      { id: 1, user: '@tired_parent', content: 'Some of us have jobs tomorrow', time: '5 days ago', avatar: '😴' },
      { id: 2, user: '@neighbor', content: 'Calling noise control again', time: '4 days ago', avatar: '📞' }
    ],
    saves: 3,
    isRejected: true
  },
  {
    id: 311,
    title: 'If you like "Parking in Handicap Spots", try these FIVE ALIKE...',
    author: '@selfish_driver',
    category: 'Transportation',
    date: '11/15/2024',
    votes: -198,
    upvotes: 2,
    downvotes: 200,
    userVote: null,
    highFives: 0,
    items: ['Taking Up Two Parking Spaces', 'Blocking Fire Lane Access', 'Parking in Electric Car Spots', 'Using Expired Handicap Permits', 'Blocking Wheelchair Ramps'],
    comments: [
      { id: 1, user: '@disability_advocate', content: 'This is beyond inconsiderate', time: '6 days ago', avatar: '♿' },
      { id: 2, user: '@police', content: 'These are all ticketable offenses', time: '5 days ago', avatar: '👮' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 312,
    title: 'If you like "Fake Service Animals", try these FIVE ALIKE...',
    author: '@fake_esa',
    category: 'Pets',
    date: '11/12/2024',
    votes: -145,
    upvotes: 4,
    downvotes: 149,
    userVote: null,
    highFives: 1,
    items: ['Untrained Dogs in Restaurants', 'Emotional Support Peacocks', 'Therapy Cats on Airplanes', 'Comfort Pigs in Stores', 'Fake Service Dog Vests'],
    comments: [
      { id: 1, user: '@real_handler', content: 'This makes life harder for real service dogs', time: '7 days ago', avatar: '🐕‍🦺' },
      { id: 2, user: '@business_owner', content: 'This causes so many problems', time: '6 days ago', avatar: '🏪' }
    ],
    saves: 1,
    isRejected: true
  },
  {
    id: 313,
    title: 'If you like "Littering Everywhere", try these FIVE ALIKE...',
    author: '@planet_destroyer',
    category: 'Environment',
    date: '11/10/2024',
    votes: -167,
    upvotes: 3,
    downvotes: 170,
    userVote: null,
    highFives: 0,
    items: ['Throwing Cigarette Butts Anywhere', 'Fast Food Bags Out Car Windows', 'Plastic Bottles in Nature', 'Gum on Sidewalks Everywhere', 'Candy Wrappers in Parks'],
    comments: [
      { id: 1, user: '@earth_lover', content: 'Our planet deserves better', time: '8 days ago', avatar: '🌍' },
      { id: 2, user: '@cleaner', content: 'I have to clean this up', time: '7 days ago', avatar: '🧹' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 314,
    title: 'If you like "Cutting in Lines", try these FIVE ALIKE...',
    author: '@impatient_jerk',
    category: 'Social',
    date: '11/08/2024',
    votes: -112,
    upvotes: 8,
    downvotes: 120,
    userVote: null,
    highFives: 1,
    items: ['Express Lane with Full Cart', 'Merging at Last Second', 'Pretending to Know Someone Ahead', 'Using Emergency Lane in Traffic', 'Bathroom Line Jumping'],
    comments: [
      { id: 1, user: '@patient_person', content: 'We all have somewhere to be', time: '9 days ago', avatar: '⏱️' },
      { id: 2, user: '@queue_police', content: 'Wait your turn like everyone else', time: '8 days ago', avatar: '👮‍♀️' }
    ],
    saves: 2,
    isRejected: true
  },
  {
    id: 315,
    title: 'If you like "Loud Phone Conversations in Public", try these FIVE ALIKE...',
    author: '@no_inside_voice',
    category: 'Technology',
    date: '11/05/2024',
    votes: -84,
    upvotes: 12,
    downvotes: 96,
    userVote: null,
    highFives: 3,
    items: ['Speakerphone in Quiet Places', 'Personal Drama on Public Transit', 'Business Calls in Restaurants', 'Family Arguments in Libraries', 'Medical Details on Buses'],
    comments: [
      { id: 1, user: '@librarian', content: 'Please use headphones or step outside', time: '10 days ago', avatar: '📚' },
      { id: 2, user: '@commuter', content: 'Nobody wants to hear your drama', time: '9 days ago', avatar: '🚇' }
    ],
    saves: 4,
    isRejected: true
  },
  {
    id: 316,
    title: 'If you like "Not Picking Up Dog Poop", try these FIVE ALIKE...',
    author: '@lazy_dog_owner',
    category: 'Pets',
    date: '11/03/2024',
    votes: -156,
    upvotes: 6,
    downvotes: 162,
    userVote: null,
    highFives: 1,
    items: ['Leaving Bags on Walking Trails', 'Letting Dogs Poop in Playgrounds', 'Ignoring Sidewalk Accidents', 'Beach Cleanup Avoidance', 'Neighbor\'s Yard Violations'],
    comments: [
      { id: 1, user: '@park_ranger', content: 'Pack it in, pack it out', time: '11 days ago', avatar: '🏞️' },
      { id: 2, user: '@parent', content: 'My kids play where your dog poops', time: '10 days ago', avatar: '👨‍👩‍👧‍👦' }
    ],
    saves: 0,
    isRejected: true
  },
  {
    id: 317,
    title: 'If you like "Hoarding Toilet Paper", try these FIVE ALIKE...',
    author: '@pandemic_prepper',
    category: 'Shopping',
    date: '11/01/2024',
    votes: -73,
    upvotes: 14,
    downvotes: 87,
    userVote: null,
    highFives: 2,
    items: ['Buying All Hand Sanitizer', 'Clearing Shelves of Baby Formula', 'Stockpiling All the Bread', 'Hoarding All Cleaning Supplies', 'Taking Every Last Face Mask'],
    comments: [
      { id: 1, user: '@grocery_worker', content: 'Leave some for other families', time: '12 days ago', avatar: '🛒' },
      { id: 2, user: '@community', content: 'Hoarding hurts everyone', time: '11 days ago', avatar: '🤝' }
    ],
    saves: 3,
    isRejected: true
  },
  {
    id: 318,
    title: 'If you like "Spreading False Rumors", try these FIVE ALIKE...',
    author: '@gossip_queen',
    category: 'Social',
    date: '10/30/2024',
    votes: -94,
    upvotes: 9,
    downvotes: 103,
    userVote: null,
    highFives: 1,
    items: ['Making Up Celebrity Deaths', 'Fake Pregnancy Announcements', 'False Cheating Accusations', 'Invented Health Scares', 'Fabricated Relationship Drama'],
    comments: [
      { id: 1, user: '@fact_checker', content: 'Verify before you share', time: '13 days ago', avatar: '✅' },
      { id: 2, user: '@victim', content: 'False rumors destroyed my reputation', time: '12 days ago', avatar: '💔' }
    ],
    saves: 1,
    isRejected: true
  },
  {
    id: 319,
    title: 'If you like "Leaving Shopping Carts Everywhere", try these FIVE ALIKE...',
    author: '@cart_abandoner',
    category: 'Shopping',
    date: '10/28/2024',
    votes: -61,
    upvotes: 16,
    downvotes: 77,
    userVote: null,
    highFives: 4,
    items: ['Blocking Parking Spaces', 'Letting Carts Roll Into Cars', 'Leaving Carts in Handicap Spots', 'Abandoning Carts in Flower Beds', 'Cart Corrals Are Too Far Away'],
    comments: [
      { id: 1, user: '@cart_collector', content: 'This makes my job so much harder', time: '14 days ago', avatar: '🛒' },
      { id: 2, user: '@car_owner', content: 'Your cart scratched my car', time: '13 days ago', avatar: '🚗' }
    ],
    saves: 5,
    isRejected: true
  },
  {
    id: 320,
    title: 'If you like "Taking Credit for Others\' Work", try these FIVE ALIKE...',
    author: '@credit_stealer',
    category: 'Work',
    date: '10/25/2024',
    votes: -187,
    upvotes: 4,
    downvotes: 191,
    userVote: null,
    highFives: 0,
    items: ['Claiming Team Project Ideas', 'Presenting Others\' Research', 'Stealing Creative Concepts', 'Taking Recognition for Group Efforts', 'Plagiarizing Colleague\'s Proposals'],
    comments: [
      { id: 1, user: '@hardworker', content: 'This is why I trust no one at work', time: '15 days ago', avatar: '💼' },
      { id: 2, user: '@manager', content: 'This destroys team morale', time: '14 days ago', avatar: '👔' }
    ],
    saves: 1,
    isRejected: true
  },

  // ADDITIONAL POPULAR LISTS
  {
    id: 201,
    title: 'If you like "The Office", try these FIVE ALIKE...',
    author: '@comedy_central',
    category: 'Comedy',
    date: '12/25/2024',
    votes: 245,
    upvotes: 251,
    downvotes: 6,
    userVote: null,
    highFives: 189,
    userHighFived: false,
    items: ['Parks and Recreation', 'Brooklyn Nine-Nine', 'Community', 'Arrested Development', 'What We Do in the Shadows'],
    description: 'Mockumentary and workplace comedies with heart, great characters, and quotable moments.',
    comments: [
      { id: 1, user: '@paper_fan', content: 'Parks and Rec takes a season to get good but then its amazing', time: '4 hours ago', avatar: '📄' },
      { id: 2, user: '@nine_nine', content: 'Cool cool cool cool cool', time: '2 hours ago', avatar: '👮' }
    ],
    saves: 234,
    isRejected: false
  },
  {
    id: 202,
    title: 'If you like "Taylor Swift", try these FIVE ALIKE...',
    author: '@swiftie_forever',
    category: 'Music',
    date: '12/26/2024',
    votes: 312,
    upvotes: 321,
    downvotes: 9,
    userVote: null,
    highFives: 267,
    userHighFived: false,
    items: ['Phoebe Bridgers', 'Lorde', 'Clairo', 'Mitski', 'Lana Del Rey'],
    description: 'Introspective singer-songwriters with poetic lyrics, emotional depth, and indie-pop sensibilities.',
    comments: [
      { id: 1, user: '@indie_heart', content: 'Phoebe Bridgers hits different', time: '6 hours ago', avatar: '🎸' },
      { id: 2, user: '@lyrics_lover', content: 'Mitski is pure poetry', time: '4 hours ago', avatar: '💭' }
    ],
    saves: 298,
    isRejected: false
  },
  {
    id: 203,
    title: 'If you like "Wordle", try these FIVE ALIKE...',
    author: '@puzzle_master',
    category: 'Games',
    date: '12/27/2024',
    votes: 178,
    upvotes: 186,
    downvotes: 8,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: ['Connections', 'Heardle', 'Quordle', 'Spelling Bee', 'Mini Crossword'],
    description: 'Daily word puzzles and brain teasers that are perfect for your morning routine.',
    comments: [
      { id: 1, user: '@word_nerd', content: 'Connections is so addictive', time: '5 hours ago', avatar: '🧩' },
      { id: 2, user: '@daily_player', content: 'I do all of these every morning with coffee', time: '3 hours ago', avatar: '☕' }
    ],
    saves: 167,
    isRejected: false
  },
  {
    id: 204,
    title: 'If you like "Dune", try these FIVE ALIKE...',
    author: '@sci_fi_sage',
    category: 'Books',
    date: '12/28/2024',
    votes: 201,
    upvotes: 209,
    downvotes: 8,
    userVote: null,
    highFives: 156,
    userHighFived: false,
    items: ['Foundation by Isaac Asimov', 'Hyperion by Dan Simmons', 'The Left Hand of Darkness by Ursula K. Le Guin', 'Neuromancer by William Gibson', 'Leviathan Wakes by James S.A. Corey'],
    description: 'Epic space operas with complex politics, advanced civilizations, and philosophical depth.',
    comments: [
      { id: 1, user: '@space_reader', content: 'Foundation is the GOAT of sci-fi', time: '7 hours ago', avatar: '🚀' },
      { id: 2, user: '@bookworm', content: 'The Expanse series is incredible', time: '5 hours ago', avatar: '📚' }
    ],
    saves: 189,
    isRejected: false
  },
  {
    id: 205,
    title: 'If you like "Succession", try these FIVE ALIKE...',
    author: '@prestige_tv',
    category: 'TV Shows',
    date: '12/29/2024',
    votes: 233,
    upvotes: 241,
    downvotes: 8,
    userVote: null,
    highFives: 198,
    userHighFived: false,
    items: ['House of Cards', 'Billions', 'Industry', 'The White Lotus', 'Yellowjackets'],
    description: 'Power struggles, family dynasties, and dark satire of wealth and corruption.',
    comments: [
      { id: 1, user: '@roy_family', content: 'Nobody does dysfunction like the Roys', time: '6 hours ago', avatar: '👑' },
      { id: 2, user: '@hbo_fan', content: 'The White Lotus is perfection', time: '4 hours ago', avatar: '🏨' }
    ],
    saves: 221,
    isRejected: false
  },
  {
    id: 206,
    title: 'If you like "Ramen", try these FIVE ALIKE...',
    author: '@noodle_ninja',
    category: 'Food',
    date: '12/30/2024',
    votes: 189,
    upvotes: 197,
    downvotes: 8,
    userVote: null,
    highFives: 145,
    userHighFived: false,
    items: ['Pho', 'Udon', 'Laksa', 'Bun Bo Hue', 'Mazesoba'],
    description: 'Soul-warming noodle soups and dishes from across Asia that hit the spot.',
    comments: [
      { id: 1, user: '@slurp_master', content: 'Pho is life changing', time: '8 hours ago', avatar: '🍜' },
      { id: 2, user: '@noodle_lover', content: 'Laksa is so underrated', time: '6 hours ago', avatar: '🌶️' }
    ],
    saves: 176,
    isRejected: false
  },
  {
    id: 207,
    title: 'If you like "Studio Ghibli", try these FIVE ALIKE...',
    author: '@anime_dreams',
    category: 'Movies',
    date: '12/31/2024',
    votes: 267,
    upvotes: 275,
    downvotes: 8,
    userVote: null,
    highFives: 223,
    userHighFived: false,
    items: ['Your Name', 'Wolf Children', 'The Secret World of Arrietty', 'A Silent Voice', 'Weathering with You'],
    description: 'Beautiful hand-drawn animation with emotional storytelling and magical realism.',
    comments: [
      { id: 1, user: '@miyazaki_fan', content: 'Your Name made me cry for hours', time: '9 hours ago', avatar: '🌟' },
      { id: 2, user: '@animation_lover', content: 'Wolf Children is so underrated', time: '7 hours ago', avatar: '🐺' }
    ],
    saves: 254,
    isRejected: false
  },
  {
    id: 208,
    title: 'If you like "Joe Rogan Experience", try these FIVE ALIKE...',
    author: '@podcast_addict',
    category: 'Podcasts',
    date: '1/1/2025',
    votes: 156,
    upvotes: 164,
    downvotes: 8,
    userVote: null,
    highFives: 112,
    userHighFived: false,
    items: ['Lex Fridman Podcast', 'The Tim Ferriss Show', 'Huberman Lab', 'Making Sense', 'The Jordan Harbinger Show'],
    description: 'Long-form conversations with experts, scientists, and interesting personalities.',
    comments: [
      { id: 1, user: '@deep_dive', content: 'Lex asks the best questions', time: '10 hours ago', avatar: '🤖' },
      { id: 2, user: '@brain_science', content: 'Huberman changed how I think about sleep', time: '8 hours ago', avatar: '🧠' }
    ],
    saves: 143,
    isRejected: false
  },
  {
    id: 501,
    title: 'Best Boston Food Spots',
    author: '@bostonbites',
    location: 'Boston',
    category: 'Food',
    items: ['North End Pizza', 'Fenway Park Hot Dogs', 'Cambridge Seafood', 'Beacon Hill Bakery', 'South End Brunch'],
    votes: 89,
    date: '2024-01-15',
    highFives: 23,
    description: 'Must-try food experiences across Boston neighborhoods.',
    comments: [
      { id: 1, user: '@foodie_bean', content: 'North End is unbeatable!', time: '3 hours ago', avatar: '🍕' }
    ],
    saves: 67,
    isRejected: false
  },
  {
    id: 502,
    title: 'Historic Boston Walking Tours',
    author: '@freedom_trail',
    location: 'Boston',
    category: 'Travel',
    items: ['Freedom Trail', 'Boston Tea Party Ships', 'Paul Revere House', 'Old State House', 'Bunker Hill Monument'],
    votes: 112,
    date: '2024-01-14',
    highFives: 34,
    description: 'Revolutionary War history comes alive on these walking routes.',
    comments: [
      { id: 1, user: '@history_buff', content: 'Did the full trail in one day!', time: '5 hours ago', avatar: '🗽' }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 503,
    title: 'Boston Sports Experiences',
    author: '@bostonsports',
    location: 'Boston',
    category: 'Sports',
    items: ['Fenway Park Red Sox Game', 'TD Garden Celtics Game', 'Patriots at Gillette Stadium', 'Boston Marathon Route', 'Harvard-Yale Game'],
    votes: 156,
    date: '2024-01-13',
    highFives: 45,
    description: 'The ultimate Boston sports fan bucket list.',
    comments: [
      { id: 1, user: '@green_monster', content: 'Fenway is magical!', time: '1 hour ago', avatar: '⚾' }
    ],
    saves: 123,
    isRejected: false
  },
  {
    id: 504,
    title: 'Cambridge Coffee Culture',
    author: '@harvard_caffeine',
    location: 'Boston',
    category: 'Food',
    items: ['Harvard Square Cafe', 'MIT Student Center', 'Porter Square Coffee', 'Central Square Roasters', 'Davis Square Brew'],
    votes: 78,
    date: '2024-01-12',
    highFives: 19,
    description: 'Where students and locals fuel their minds in Cambridge.',
    comments: [
      { id: 1, user: '@study_buddy', content: 'Porter Square has the best wifi', time: '2 hours ago', avatar: '☕' }
    ],
    saves: 54,
    isRejected: false
  },
  {
    id: 505,
    title: 'Boston Music Venues',
    author: '@live_music_boston',
    location: 'Boston',
    category: 'Music',
    items: ['House of Blues', 'The Paradise Rock Club', 'Berklee Performance Center', 'Boston Opera House', 'Brighton Music Hall'],
    votes: 94,
    date: '2024-01-11',
    highFives: 28,
    description: 'From indie rock to classical, Boston\'s best live music spots.',
    comments: [
      { id: 1, user: '@music_lover', content: 'Paradise has amazing acoustics', time: '4 hours ago', avatar: '🎵' }
    ],
    saves: 71,
    isRejected: false
  },
  {
    id: 506,
    title: 'Back Bay Shopping Districts',
    author: '@fashionista_boston',
    location: 'Boston',
    category: 'Fashion',
    items: ['Newbury Street Boutiques', 'Copley Place Mall', 'Prudential Center', 'Charles Street Antiques', 'Harvard Square Vintage'],
    votes: 65,
    date: '2024-01-10',
    highFives: 15,
    description: 'From high-end to vintage, Boston\'s shopping destinations.',
    comments: [
      { id: 1, user: '@vintage_hunter', content: 'Charles Street has hidden gems', time: '6 hours ago', avatar: '👗' }
    ],
    saves: 43,
    isRejected: false
  },
  {
    id: 507,
    title: 'Boston Harbor Activities',
    author: '@harbor_explorer',
    location: 'Boston',
    category: 'Travel',
    items: ['Harbor Islands Ferry', 'Boston Harbor Cruise', 'Aquarium IMAX', 'Harborwalk Trail', 'Sunset Sailing'],
    votes: 87,
    date: '2024-01-09',
    highFives: 22,
    description: 'Discover Boston from the water with these harbor experiences.',
    comments: [
      { id: 1, user: '@sailor_boy', content: 'Sunset sailing is unforgettable', time: '7 hours ago', avatar: '⛵' }
    ],
    saves: 62,
    isRejected: false
  },
  {
    id: 508,
    title: 'Boston University Life',
    author: '@bu_student',
    location: 'Boston',
    category: 'Books',
    items: ['BU Library Study Spots', 'Commonwealth Ave Bookstores', 'Campus Coffee Shops', 'Student Activities Fair', 'Agganis Arena Events'],
    votes: 73,
    date: '2024-01-08',
    highFives: 18,
    description: 'The essential Boston University student experience.',
    comments: [
      { id: 1, user: '@terrier_pride', content: 'Mugar Library is my second home', time: '3 hours ago', avatar: '📚' }
    ],
    saves: 49,
    isRejected: false
  },
  {
    id: 509,
    title: 'Boston Winter Activities',
    author: '@winter_warrior',
    location: 'Boston',
    category: 'Sports',
    items: ['Boston Common Ice Skating', 'Duck Tours Winter Edition', 'Museum of Science Exhibits', 'Quincy Market Hot Chocolate', 'Fenway Winter Classic'],
    votes: 102,
    date: '2024-01-07',
    highFives: 31,
    description: 'Embrace Boston winters with these cold-weather activities.',
    comments: [
      { id: 1, user: '@ice_queen', content: 'Common skating rink is so romantic', time: '5 hours ago', avatar: '⛸️' }
    ],
    saves: 78,
    isRejected: false
  },
  {
    id: 510,
    title: 'Boston Tech Meetups',
    author: '@tech_networker',
    location: 'Boston',
    category: 'Technology',
    items: ['MIT Tech Talks', 'Boston Startup Meetup', 'Cambridge Innovation Lab', 'Harvard Tech Conference', 'Kendall Square Events'],
    votes: 84,
    date: '2024-01-06',
    highFives: 26,
    description: 'Network with Boston\'s thriving tech community.',
    comments: [
      { id: 1, user: '@startup_founder', content: 'Great networking opportunities', time: '8 hours ago', avatar: '💻' }
    ],
    saves: 58,
    isRejected: false
  },
  {
    id: 511,
    title: 'San Francisco Foodie Adventures',
    author: '@sf_eats',
    location: 'San Francisco',
    category: 'Food',
    items: ['Mission District Tacos', 'Chinatown Dim Sum', 'Fisherman\'s Wharf Clam Chowder', 'North Beach Italian', 'Castro District Brunch'],
    votes: 198,
    date: '2024-01-05',
    highFives: 67,
    description: 'A culinary tour through San Francisco\'s diverse neighborhoods.',
    comments: [
      { id: 1, user: '@taco_tuesday', content: 'Mission tacos are life-changing', time: '2 hours ago', avatar: '🌮' }
    ],
    saves: 145,
    isRejected: false
  },
  {
    id: 512,
    title: 'Golden Gate Park Essentials',
    author: '@park_explorer',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Japanese Tea Garden', 'de Young Museum', 'California Academy of Sciences', 'Conservatory of Flowers', 'Hippie Hill Hangout'],
    votes: 167,
    date: '2024-01-04',
    highFives: 52,
    description: 'Must-see attractions in San Francisco\'s massive urban park.',
    comments: [
      { id: 1, user: '@nature_lover', content: 'Tea garden is so peaceful', time: '4 hours ago', avatar: '🌸' }
    ],
    saves: 124,
    isRejected: false
  },
  {
    id: 513,
    title: 'SF Tech Scene Hotspots',
    author: '@silicon_valley',
    location: 'San Francisco',
    category: 'Technology',
    items: ['Twitter HQ Tours', 'Salesforce Tower', 'SOMA Startup Cafes', 'GitHub Universe', 'TechCrunch Disrupt'],
    votes: 143,
    date: '2024-01-03',
    highFives: 41,
    description: 'Where innovation happens in the heart of tech.',
    comments: [
      { id: 1, user: '@code_ninja', content: 'SOMA has the best networking', time: '1 hour ago', avatar: '💻' }
    ],
    saves: 108,
    isRejected: false
  },
  {
    id: 514,
    title: 'Alcatraz and Bay Views',
    author: '@island_hopper',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Alcatraz Island Tour', 'Pier 39 Sea Lions', 'Bay Bridge Lights', 'Angel Island Hiking', 'Sausalito Ferry'],
    votes: 189,
    date: '2024-01-02',
    highFives: 58,
    description: 'Explore San Francisco Bay\'s most iconic attractions.',
    comments: [
      { id: 1, user: '@bay_enthusiast', content: 'Alcatraz audio tour is incredible', time: '6 hours ago', avatar: '🏝️' }
    ],
    saves: 142,
    isRejected: false
  },
  {
    id: 515,
    title: 'Haight-Ashbury Culture',
    author: '@hippie_historian',
    location: 'San Francisco',
    category: 'Art',
    items: ['Vintage Clothing Stores', 'Summer of Love Museum', 'Grateful Dead House', 'Record Shops', 'Peace & Love Murals'],
    votes: 134,
    date: '2024-01-01',
    highFives: 39,
    description: 'Relive the counterculture movement in its birthplace.',
    comments: [
      { id: 1, user: '@flower_power', content: 'The vibe is still alive here', time: '7 hours ago', avatar: '🌻' }
    ],
    saves: 97,
    isRejected: false
  },
  {
    id: 516,
    title: 'SF Coffee Culture',
    author: '@caffeine_addict',
    location: 'San Francisco',
    category: 'Food',
    items: ['Blue Bottle Coffee', 'Philz Coffee Blends', 'Ritual Coffee Roasters', 'Sightglass Coffee', 'Four Barrel Coffee'],
    votes: 156,
    date: '2023-12-31',
    highFives: 45,
    description: 'Third-wave coffee culture at its finest in San Francisco.',
    comments: [
      { id: 1, user: '@espresso_expert', content: 'Blue Bottle changed my life', time: '3 hours ago', avatar: '☕' }
    ],
    saves: 118,
    isRejected: false
  },
  {
    id: 517,
    title: 'Castro District Nightlife',
    author: '@night_owl_sf',
    location: 'San Francisco',
    category: 'Music',
    items: ['Castro Theatre Shows', 'Twin Peaks Tavern', 'The Mix Bar', 'Lookout Bar Rooftop', 'Harvey\'s Bar'],
    votes: 122,
    date: '2023-12-30',
    highFives: 34,
    description: 'Experience the vibrant nightlife of San Francisco\'s most famous neighborhood.',
    comments: [
      { id: 1, user: '@rainbow_flag', content: 'Castro Theatre is a landmark', time: '5 hours ago', avatar: '🏳️‍🌈' }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 518,
    title: 'Lombard Street Adventures',
    author: '@steep_streets',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Lombard Street Drive', 'Russian Hill Walking', 'Coit Tower Views', 'Telegraph Hill Parrots', 'Filbert Street Steps'],
    votes: 178,
    date: '2023-12-29',
    highFives: 54,
    description: 'Navigate San Francisco\'s most famous steep streets and hidden stairs.',
    comments: [
      { id: 1, user: '@hill_climber', content: 'Filbert Steps are a workout!', time: '8 hours ago', avatar: '🏔️' }
    ],
    saves: 132,
    isRejected: false
  },
  {
    id: 519,
    title: 'Mission District Art Scene',
    author: '@mural_hunter',
    location: 'San Francisco',
    category: 'Art',
    items: ['Clarion Alley Murals', 'Women\'s Building', 'Balmy Alley Art', 'Mission Cultural Center', 'Galería de la Raza'],
    votes: 145,
    date: '2023-12-28',
    highFives: 42,
    description: 'Discover the vibrant street art and cultural centers of the Mission.',
    comments: [
      { id: 1, user: '@street_artist', content: 'Clarion Alley changes constantly', time: '4 hours ago', avatar: '🎨' }
    ],
    saves: 103,
    isRejected: false
  },
  {
    id: 520,
    title: 'Chinatown Hidden Gems',
    author: '@chinatown_explorer',
    location: 'San Francisco',
    category: 'Food',
    items: ['Grant Avenue Markets', 'Dragon Gate Entry', 'Portsmouth Square Tai Chi', 'Fortune Cookie Factory', 'Stockton Street Food'],
    votes: 167,
    date: '2023-12-27',
    highFives: 48,
    description: 'Authentic experiences in America\'s oldest Chinatown.',
    comments: [
      { id: 1, user: '@dumpling_fan', content: 'Stockton Street has the best prices', time: '2 hours ago', avatar: '🥟' }
    ],
    saves: 125,
    isRejected: false
  },
  {
    id: 521,
    title: 'Nob Hill Luxury',
    author: '@fancy_sf',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Grace Cathedral', 'Fairmont Hotel', 'Top of the Mark', 'Cable Car Museum', 'Huntington Park'],
    votes: 134,
    date: '2023-12-26',
    highFives: 38,
    description: 'Experience San Francisco\'s most prestigious neighborhood.',
    comments: [
      { id: 1, user: '@high_society', content: 'Top of the Mark has amazing views', time: '6 hours ago', avatar: '🏛️' }
    ],
    saves: 98,
    isRejected: false
  },
  {
    id: 522,
    title: 'SOMA Art Galleries',
    author: '@gallery_hopper',
    location: 'San Francisco',
    category: 'Art',
    items: ['SFMOMA Collection', 'Yerba Buena Arts', 'Gallery 16', 'Electric Works', 'Minnesota Street Project'],
    votes: 112,
    date: '2023-12-25',
    highFives: 31,
    description: 'Contemporary art scene in South of Market district.',
    comments: [
      { id: 1, user: '@modern_art', content: 'SFMOMA\'s contemporary collection is world-class', time: '7 hours ago', avatar: '🖼️' }
    ],
    saves: 84,
    isRejected: false
  },
  {
    id: 523,
    title: 'Presidio Outdoor Activities',
    author: '@nature_sf',
    location: 'San Francisco',
    category: 'Sports',
    items: ['Crissy Field Running', 'Presidio Golf Course', 'Battery Spencer Views', 'Lovers Lane Walking', 'Andy Goldsworthy Art'],
    votes: 156,
    date: '2023-12-24',
    highFives: 44,
    description: 'Outdoor recreation in San Francisco\'s former military base.',
    comments: [
      { id: 1, user: '@trail_runner', content: 'Crissy Field has perfect Golden Gate views', time: '1 hour ago', avatar: '🏃' }
    ],
    saves: 117,
    isRejected: false
  },
  {
    id: 524,
    title: 'Richmond District Exploration',
    author: '@outer_richmond',
    location: 'San Francisco',
    category: 'Food',
    items: ['Geary Boulevard Asian Food', 'Ocean Beach Bonfires', 'Golden Gate Park West', 'Clement Street Shopping', 'Land\'s End Lookout'],
    votes: 143,
    date: '2023-12-23',
    highFives: 40,
    description: 'Discover the diverse culture of San Francisco\'s Richmond neighborhood.',
    comments: [
      { id: 1, user: '@beach_walker', content: 'Ocean Beach sunsets are magical', time: '9 hours ago', avatar: '🌅' }
    ],
    saves: 105,
    isRejected: false
  },
  {
    id: 525,
    title: 'Ferry Building Food Hall',
    author: '@farmers_market',
    location: 'San Francisco',
    category: 'Food',
    items: ['Saturday Farmers Market', 'Acme Bread Company', 'Cowgirl Creamery', 'Blue Bottle Coffee', 'Hog Island Oysters'],
    votes: 187,
    date: '2023-12-22',
    highFives: 59,
    description: 'San Francisco\'s premier food destination at the waterfront.',
    comments: [
      { id: 1, user: '@foodie_paradise', content: 'Saturday market is a must-do', time: '3 hours ago', avatar: '🥕' }
    ],
    saves: 140,
    isRejected: false
  },
  {
    id: 526,
    title: 'Pacific Heights Architecture',
    author: '@architecture_sf',
    location: 'San Francisco',
    category: 'Art',
    items: ['Painted Ladies', 'Mansion Row', 'Alta Plaza Park', 'Fillmore Street Shopping', 'Steiner Street Views'],
    votes: 165,
    date: '2023-12-21',
    highFives: 47,
    description: 'Victorian architecture and luxury living in Pacific Heights.',
    comments: [
      { id: 1, user: '@victorian_lover', content: 'Painted Ladies are iconic for a reason', time: '5 hours ago', avatar: '🏘️' }
    ],
    saves: 122,
    isRejected: false
  },
  {
    id: 527,
    title: 'North Beach Italian Heritage',
    author: '@little_italy_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Tony\'s Little Star Pizza', 'Molinari Delicatessen', 'Caffe Trieste', 'Washington Square Park', 'Saints Peter and Paul Church'],
    votes: 174,
    date: '2023-12-20',
    highFives: 51,
    description: 'Authentic Italian-American culture in San Francisco\'s Little Italy.',
    comments: [
      { id: 1, user: '@pasta_lover', content: 'Molinari has the best sandwiches', time: '4 hours ago', avatar: '🍝' }
    ],
    saves: 129,
    isRejected: false
  },
  {
    id: 528,
    title: 'Union Square Shopping',
    author: '@shop_till_drop',
    location: 'San Francisco',
    category: 'Fashion',
    items: ['Macy\'s Flagship Store', 'Neiman Marcus', 'Apple Store', 'Maiden Lane Boutiques', 'Powell Street Cable Cars'],
    votes: 138,
    date: '2023-12-19',
    highFives: 36,
    description: 'Premier shopping destination in downtown San Francisco.',
    comments: [
      { id: 1, user: '@fashionista', content: 'Maiden Lane has unique boutiques', time: '6 hours ago', avatar: '🛍️' }
    ],
    saves: 101,
    isRejected: false
  },
  {
    id: 529,
    title: 'Sunset District Local Life',
    author: '@sunset_local',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Irving Street Shops', 'Golden Gate Heights Park', 'Judah Street N-Line', 'Moraga Steps Mosaic', 'Ocean Beach Access'],
    votes: 127,
    date: '2023-12-18',
    highFives: 33,
    description: 'Experience residential San Francisco in the foggy Sunset.',
    comments: [
      { id: 1, user: '@fog_city', content: 'Moraga Steps are a hidden treasure', time: '8 hours ago', avatar: '🌫️' }
    ],
    saves: 93,
    isRejected: false
  },
  {
    id: 530,
    title: 'Financial District Power Lunch',
    author: '@wall_street_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Tadich Grill Historic', 'One Market Restaurant', 'Benu Michelin Star', 'Ferry Plaza Wine Bar', 'Sam\'s Grill Classic'],
    votes: 152,
    date: '2023-12-17',
    highFives: 43,
    description: 'Where San Francisco\'s business elite dine and deal.',
    comments: [
      { id: 1, user: '@power_lunch', content: 'Tadich Grill is old-school elegance', time: '2 hours ago', avatar: '💼' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 531,
    title: 'Cambridge Student Life Essentials',
    author: '@harvard_mit_life',
    location: 'Boston',
    category: 'Books',
    items: ['Study Spots Near Harvard Square', 'MIT Campus Hidden Gems', 'Porter Square Late Night Eats', 'Central Square Music Venues', 'Davis Square Thrift Shops'],
    votes: 134,
    date: '2024-01-16',
    highFives: 38,
    description: 'The ultimate guide to student life in Cambridge, Massachusetts.',
    comments: [
      { id: 1, user: '@grad_student', content: 'Porter Square Coffee Co is my go-to', time: '4 hours ago', avatar: '📚' }
    ],
    saves: 96,
    isRejected: false
  },
  {
    id: 532,
    title: 'Boston Brewery Hop Route',
    author: '@craft_beer_bos',
    location: 'Boston',
    category: 'Food',
    items: ['Samuel Adams Brewery', 'Harpoon Brewery', 'Trillium Brewing', 'Night Shift Brewing', 'Lamplighter Brewing'],
    votes: 167,
    date: '2024-01-15',
    highFives: 49,
    description: 'Craft beer tour through Boston\'s finest local breweries.',
    comments: [
      { id: 1, user: '@beer_enthusiast', content: 'Trillium\'s IPAs are world class', time: '2 hours ago', avatar: '🍺' }
    ],
    saves: 128,
    isRejected: false
  },
  {
    id: 533,
    title: 'South End Victorian Architecture',
    author: '@architecture_walk',
    location: 'Boston',
    category: 'Art',
    items: ['Rutland Square Gardens', 'Union Park Historic District', 'Tremont Street Brownstones', 'Washington Street Gallery District', 'Peters Park Community'],
    votes: 98,
    date: '2024-01-14',
    highFives: 27,
    description: 'Explore Boston\'s most preserved Victorian neighborhood architecture.',
    comments: [
      { id: 1, user: '@design_lover', content: 'Union Park is absolutely stunning', time: '6 hours ago', avatar: '🏛️' }
    ],
    saves: 74,
    isRejected: false
  },
  {
    id: 534,
    title: 'North Shore Boston Day Trips',
    author: '@coastal_explorer',
    location: 'Boston',
    category: 'Travel',
    items: ['Salem Witch Museum', 'Marblehead Harbor', 'Gloucester Fishing Village', 'Newburyport Waterfront', 'Essex Antique Shopping'],
    votes: 145,
    date: '2024-01-13',
    highFives: 41,
    description: 'Discover the historic coastal towns just north of Boston.',
    comments: [
      { id: 1, user: '@history_seeker', content: 'Salem in October is incredible', time: '3 hours ago', avatar: '🎃' }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 535,
    title: 'Boston Marathon Training Routes',
    author: '@marathon_runner',
    location: 'Boston',
    category: 'Sports',
    items: ['Charles River Esplanade', 'Arnold Arboretum Hills', 'Fresh Pond Loop', 'Blue Hills Reservation', 'Minuteman Bikeway Run'],
    votes: 189,
    date: '2024-01-12',
    highFives: 56,
    description: 'Train like a champion on Boston\'s best running routes.',
    comments: [
      { id: 1, user: '@boston_runner', content: 'Heartbreak Hill training is brutal but worth it', time: '1 hour ago', avatar: '🏃' }
    ],
    saves: 143,
    isRejected: false
  },
  {
    id: 536,
    title: 'Boston Food Truck Culture',
    author: '@street_food_bos',
    location: 'Boston',
    category: 'Food',
    items: ['Chicken & Rice Guys', 'Bon Me Vietnamese', 'Roxy\'s Grilled Cheese', 'Moyzilla Asian Fusion', 'Pennypackers Food Truck'],
    votes: 123,
    date: '2024-01-11',
    highFives: 35,
    description: 'Mobile eats that define Boston\'s street food scene.',
    comments: [
      { id: 1, user: '@lunch_hunter', content: 'Chicken & Rice Guys downtown is legendary', time: '5 hours ago', avatar: '🌮' }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 537,
    title: 'Beacon Hill Secret Spots',
    author: '@beacon_insider',
    location: 'Boston',
    category: 'Travel',
    items: ['Hidden Gardens on Pinckney St', 'Louisburg Square Private Park', 'Acorn Street Photo Ops', 'Mount Vernon Street Mansions', 'Charles Street Antique Row'],
    votes: 156,
    date: '2024-01-10',
    highFives: 44,
    description: 'Discover the exclusive corners of Boston\'s most prestigious neighborhood.',
    comments: [
      { id: 1, user: '@old_money', content: 'Louisburg Square is pure elegance', time: '7 hours ago', avatar: '🏘️' }
    ],
    saves: 117,
    isRejected: false
  },
  {
    id: 538,
    title: 'Boston Underground Music Scene',
    author: '@indie_boston',
    location: 'Boston',
    category: 'Music',
    items: ['The Sinclair Cambridge', 'Great Scott Allston', 'ONCE Ballroom Somerville', 'Middle East Downstairs', 'Club Passim Folk'],
    votes: 142,
    date: '2024-01-09',
    highFives: 39,
    description: 'Where Boston\'s next big bands cut their teeth.',
    comments: [
      { id: 1, user: '@music_scout', content: 'Great Scott has launched so many careers', time: '4 hours ago', avatar: '🎸' }
    ],
    saves: 104,
    isRejected: false
  },
  {
    id: 539,
    title: 'Jamaica Plain Hipster Guide',
    author: '@jp_local',
    location: 'Boston',
    category: 'Art',
    items: ['Centre Street Murals', 'Spontaneous Celebrations Gallery', 'JP Licks Ice Cream', 'City Feed Vintage Shopping', 'Doyle\'s Tavern History'],
    votes: 118,
    date: '2024-01-08',
    highFives: 32,
    description: 'Explore Boston\'s most eclectic and artistic neighborhood.',
    comments: [
      { id: 1, user: '@alternative_life', content: 'JP has the best community vibe', time: '6 hours ago', avatar: '🎨' }
    ],
    saves: 85,
    isRejected: false
  },
  {
    id: 540,
    title: 'Boston Waterfront Adventures',
    author: '@harbor_life',
    location: 'Boston',
    category: 'Sports',
    items: ['Kayaking from Community Boating', 'Dragon Boat Racing', 'Stand-up Paddleboarding', 'Harbor Islands Camping', 'Sailing Lessons at Courageous'],
    votes: 134,
    date: '2024-01-07',
    highFives: 37,
    description: 'Get on the water and see Boston from a new perspective.',
    comments: [
      { id: 1, user: '@water_sports', content: 'Community Boating is such a steal', time: '2 hours ago', avatar: '⛵' }
    ],
    saves: 98,
    isRejected: false
  },
  {
    id: 541,
    title: 'Boston Pizza Quest',
    author: '@pizza_hunter_bos',
    location: 'Boston',
    category: 'Food',
    items: ['Santarpio\'s East Boston', 'Regina\'s North End', 'Ernesto\'s North End', 'Bianchi\'s Roxbury', 'Monte\'s East Boston'],
    votes: 178,
    date: '2024-01-06',
    highFives: 53,
    description: 'The definitive guide to Boston\'s best pizza joints.',
    comments: [
      { id: 1, user: '@pizza_expert', content: 'Santarpio\'s is worth the trip to Eastie', time: '3 hours ago', avatar: '🍕' }
    ],
    saves: 136,
    isRejected: false
  },
  {
    id: 542,
    title: 'Cambridge Bookstore Crawl',
    author: '@book_lover_cambridge',
    location: 'Boston',
    category: 'Books',
    items: ['Harvard Book Store', 'Porter Square Books', 'Pandemonium Science Fiction', 'Grolier Poetry Book Shop', 'MIT Press Bookstore'],
    votes: 145,
    date: '2024-01-05',
    highFives: 42,
    description: 'Literary treasures in the heart of academic Cambridge.',
    comments: [
      { id: 1, user: '@bibliophile', content: 'Grolier is a poetry lover\'s paradise', time: '5 hours ago', avatar: '📖' }
    ],
    saves: 109,
    isRejected: false
  },
  {
    id: 543,
    title: 'Boston Irish Heritage Trail',
    author: '@irish_boston',
    location: 'Boston',
    category: 'History',
    items: ['Irish Heritage Trail Markers', 'Kennedy Presidential Library', 'Boston Irish Famine Memorial', 'St. Patrick\'s Cathedral', 'South Boston Irish Cultural Centre'],
    votes: 123,
    date: '2024-01-04',
    highFives: 34,
    description: 'Trace the rich Irish-American history throughout Boston.',
    comments: [
      { id: 1, user: '@heritage_walker', content: 'The Famine Memorial is deeply moving', time: '4 hours ago', avatar: '☘️' }
    ],
    saves: 91,
    isRejected: false
  },
  {
    id: 544,
    title: 'Somerville Squares Exploration',
    author: '@somerville_guide',
    location: 'Boston',
    category: 'Travel',
    items: ['Davis Square Scene', 'Porter Square Shopping', 'Union Square Restaurants', 'Teele Square Hidden Gems', 'Ball Square Local Life'],
    votes: 112,
    date: '2024-01-03',
    highFives: 29,
    description: 'Discover the unique character of each Somerville square.',
    comments: [
      { id: 1, user: '@squares_fan', content: 'Union Square is having such a renaissance', time: '6 hours ago', avatar: '🏙️' }
    ],
    saves: 83,
    isRejected: false
  },
  {
    id: 545,
    title: 'Boston Rooftop Views',
    author: '@skyline_seeker',
    location: 'Boston',
    category: 'Travel',
    items: ['Skywalk Observatory', 'Top of the Hub Restaurant', 'Legal Harborside Rooftop', 'Prudential Center Top Floor', 'Marriott Copley View'],
    votes: 167,
    date: '2024-01-02',
    highFives: 48,
    description: 'See Boston from above at these stunning viewpoints.',
    comments: [
      { id: 1, user: '@height_lover', content: 'Top of the Hub at sunset is magical', time: '1 hour ago', avatar: '🌆' }
    ],
    saves: 124,
    isRejected: false
  },
  {
    id: 546,
    title: 'Boston Marathon Spectator Guide',
    author: '@marathon_fan',
    location: 'Boston',
    category: 'Sports',
    items: ['Heartbreak Hill Cheering', 'Wellesley College Scream Tunnel', 'Finish Line on Boylston', 'Newton Hills Strategy', 'Brookline Viewing Spots'],
    votes: 198,
    date: '2024-01-01',
    highFives: 62,
    description: 'The best spots to cheer on Marathon Monday runners.',
    comments: [
      { id: 1, user: '@marathon_mom', content: 'Wellesley girls are the absolute best', time: '2 hours ago', avatar: '🏃‍♀️' }
    ],
    saves: 151,
    isRejected: false
  },
  {
    id: 547,
    title: 'Boston Seafood Institution Tour',
    author: '@lobster_roll_expert',
    location: 'Boston',
    category: 'Food',
    items: ['Legal Sea Foods Original', 'Union Oyster House Historic', 'Neptune Oyster North End', 'Row 34 Fort Point', 'Island Creek Oyster Bar'],
    votes: 189,
    date: '2023-12-31',
    highFives: 57,
    description: 'Where Bostonians go for the freshest seafood in the city.',
    comments: [
      { id: 1, user: '@seafood_snob', content: 'Neptune Oyster is worth the wait', time: '3 hours ago', avatar: '🦞' }
    ],
    saves: 142,
    isRejected: false
  },
  {
    id: 548,
    title: 'Boston College Sports Experience',
    author: '@eagle_pride',
    location: 'Boston',
    category: 'Sports',
    items: ['BC Eagles Hockey at Conte Forum', 'Alumni Stadium Football Games', 'Beanpot Tournament', 'Boston College Basketball', 'Tailgating at Mod Lot'],
    votes: 156,
    date: '2023-12-30',
    highFives: 44,
    description: 'Experience the passion of Boston College athletics.',
    comments: [
      { id: 1, user: '@bc_alum', content: 'Hockey East tournaments are incredible', time: '5 hours ago', avatar: '🏒' }
    ],
    saves: 118,
    isRejected: false
  },
  {
    id: 549,
    title: 'Boston Common Four Seasons',
    author: '@common_walker',
    location: 'Boston',
    category: 'Travel',
    items: ['Spring Cherry Blossoms', 'Summer Swan Boat Rides', 'Fall Foliage Walking', 'Winter Ice Skating', 'Year-round People Watching'],
    votes: 143,
    date: '2023-12-29',
    highFives: 40,
    description: 'America\'s oldest public park beautiful in every season.',
    comments: [
      { id: 1, user: '@seasons_lover', content: 'Cherry blossoms in spring are breathtaking', time: '4 hours ago', avatar: '🌸' }
    ],
    saves: 107,
    isRejected: false
  },
  {
    id: 550,
    title: 'Boston Innovation District',
    author: '@seaport_tech',
    location: 'Boston',
    category: 'Technology',
    items: ['District Hall Startup Events', 'Seaport World Trade Center', 'Innovation and Design Building', 'Boston Convention Center Tech Shows', 'Pier 4 Coworking Spaces'],
    votes: 134,
    date: '2023-12-28',
    highFives: 36,
    description: 'Where Boston\'s tech future is being built on the waterfront.',
    comments: [
      { id: 1, user: '@startup_founder', content: 'District Hall networking events are gold', time: '6 hours ago', avatar: '💻' }
    ],
    saves: 98,
    isRejected: false
  },
  {
    id: 551,
    title: 'San Francisco Michelin Star Chase',
    author: '@michelin_hunter_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Atelier Crenn 3-Star', 'Benu Contemporary Asian', 'Quince Italian Fine Dining', 'State Bird Provisions', 'Californios Mexican Innovation'],
    votes: 234,
    date: '2023-12-27',
    highFives: 78,
    description: 'San Francisco\'s most prestigious culinary destinations.',
    comments: [
      { id: 1, user: '@fine_dining', content: 'Atelier Crenn is pure artistry', time: '2 hours ago', avatar: '⭐' }
    ],
    saves: 187,
    isRejected: false
  },
  {
    id: 552,
    title: 'Silicon Valley Tech Campus Tours',
    author: '@tech_tourist',
    location: 'San Francisco',
    category: 'Technology',
    items: ['Apple Park Visitor Center', 'Googleplex Mountain View', 'Facebook Menlo Park', 'Tesla Fremont Factory', 'Oracle Redwood City'],
    votes: 198,
    date: '2023-12-26',
    highFives: 64,
    description: 'Visit the headquarters of the world\'s biggest tech companies.',
    comments: [
      { id: 1, user: '@tech_pilgrim', content: 'Apple Park is like a spaceship landed', time: '4 hours ago', avatar: '🚀' }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 553,
    title: 'Marin County Nature Escapes',
    author: '@marin_explorer',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Muir Woods Redwood Forest', 'Mount Tamalpais Hiking', 'Point Reyes Lighthouse', 'Stinson Beach Relaxation', 'Sausalito Houseboats'],
    votes: 176,
    date: '2023-12-25',
    highFives: 52,
    description: 'Natural wonders just across the Golden Gate Bridge.',
    comments: [
      { id: 1, user: '@nature_escape', content: 'Muir Woods feels like another world', time: '3 hours ago', avatar: '🌲' }
    ],
    saves: 134,
    isRejected: false
  },
  {
    id: 554,
    title: 'SF Street Art Mission District',
    author: '@mural_walker_sf',
    location: 'San Francisco',
    category: 'Art',
    items: ['24th Street Murals', 'Clarion Alley Collective', 'Women\'s Building Facade', 'Balmy Alley Art Walk', 'Mission Cultural Center'],
    votes: 165,
    date: '2023-12-24',
    highFives: 47,
    description: 'The world\'s largest outdoor gallery in the Mission.',
    comments: [
      { id: 1, user: '@street_art_fan', content: '24th Street is constantly evolving', time: '5 hours ago', avatar: '🎨' }
    ],
    saves: 123,
    isRejected: false
  },
  {
    id: 555,
    title: 'Napa Valley Wine Day Trips',
    author: '@wine_country_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Castello di Amorosa Castle', 'Schramsberg Sparkling Wine', 'Opus One Bordeaux Blend', 'Inglenook Historic Estate', 'Oxbow Public Market'],
    votes: 201,
    date: '2023-12-23',
    highFives: 67,
    description: 'World-class wineries just an hour from San Francisco.',
    comments: [
      { id: 1, user: '@wine_enthusiast', content: 'Castello di Amorosa is like Tuscany', time: '1 hour ago', avatar: '🍷' }
    ],
    saves: 162,
    isRejected: false
  },
  {
    id: 556,
    title: 'Pacific Heights Mansion Tours',
    author: '@architecture_sf_elite',
    location: 'San Francisco',
    category: 'Art',
    items: ['Broadway Billionaire Row', 'Spreckels Mansion Views', 'Lyon Street Steps Architecture', 'Presidio Heights Estates', 'Fillmore Street Luxury Shopping'],
    votes: 143,
    date: '2023-12-22',
    highFives: 39,
    description: 'Where San Francisco\'s ultra-wealthy live in architectural splendor.',
    comments: [
      { id: 1, user: '@mansion_admirer', content: 'Broadway mansions are absolutely stunning', time: '6 hours ago', avatar: '🏛️' }
    ],
    saves: 108,
    isRejected: false
  },
  {
    id: 557,
    title: 'SF Food Truck Revolution',
    author: '@mobile_eats_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Off the Grid Markets', 'SoMa StrEat Food Park', 'Chairman Bao Truck', 'Curry Up Now Indian', 'The Grilled Cheese Guy'],
    votes: 134,
    date: '2023-12-21',
    highFives: 36,
    description: 'Gourmet cuisine on wheels throughout San Francisco.',
    comments: [
      { id: 1, user: '@street_food_lover', content: 'Off the Grid Friday nights are epic', time: '4 hours ago', avatar: '🚚' }
    ],
    saves: 99,
    isRejected: false
  },
  {
    id: 558,
    title: 'Fisherman\'s Wharf Beyond Tourists',
    author: '@wharf_local',
    location: 'San Francisco',
    category: 'Travel',
    items: ['Hyde Street Pier Historic Ships', 'Musée Mécanique Antique Arcade', 'Boudin Bakery Sourdough Demo', 'Sea Lion Viewing at Pier 39', 'Crab Stands Early Morning'],
    votes: 156,
    date: '2023-12-20',
    highFives: 44,
    description: 'Find the authentic experiences hidden among the tourist traps.',
    comments: [
      { id: 1, user: '@authentic_sf', content: 'Early morning crab stands are the real deal', time: '7 hours ago', avatar: '🦀' }
    ],
    saves: 117,
    isRejected: false
  },
  {
    id: 559,
    title: 'Golden Gate Bridge Photo Spots',
    author: '@bridge_photographer',
    location: 'San Francisco',
    category: 'Photography',
    items: ['Battery Spencer Overlook', 'Crissy Field Beach Level', 'Marin Headlands Vista Point', 'Marshall\'s Beach Sunset', 'Hawk Hill Best Overall'],
    votes: 187,
    date: '2023-12-19',
    highFives: 56,
    description: 'Capture the perfect shot of the world\'s most photogenic bridge.',
    comments: [
      { id: 1, user: '@photo_hunter', content: 'Hawk Hill at sunrise is unbeatable', time: '2 hours ago', avatar: '📸' }
    ],
    saves: 143,
    isRejected: false
  },
  {
    id: 560,
    title: 'SF Jazz Scene Deep Dive',
    author: '@jazz_sf_insider',
    location: 'San Francisco',
    category: 'Music',
    items: ['SFJAZZ Center Performances', 'The Fillmore Historic Jazz', 'Yoshi\'s Oakland Jazz Club', 'Black Cat Late Night Sets', 'Boom Boom Room Blues'],
    votes: 123,
    date: '2023-12-18',
    highFives: 33,
    description: 'Where jazz legends are born and legends return to play.',
    comments: [
      { id: 1, user: '@jazz_lover', content: 'SFJAZZ Center acoustics are perfect', time: '5 hours ago', avatar: '🎺' }
    ],
    saves: 92,
    isRejected: false
  },
  {
    id: 561,
    title: 'Castro District LGBTQ+ History',
    author: '@rainbow_historian',
    location: 'San Francisco',
    category: 'History',
    items: ['Harvey Milk Plaza', 'Castro Theatre Landmark', 'Twin Peaks Tavern First', 'AIDS Memorial Grove', 'GLBT Historical Society'],
    votes: 145,
    date: '2023-12-17',
    highFives: 41,
    description: 'The birthplace of the modern LGBTQ+ rights movement.',
    comments: [
      { id: 1, user: '@pride_history', content: 'Harvey Milk\'s legacy lives on', time: '3 hours ago', avatar: '🏳️‍🌈' }
    ],
    saves: 109,
    isRejected: false
  },
  {
    id: 562,
    title: 'SF Startup Ecosystem Tour',
    author: '@startup_scene_sf',
    location: 'San Francisco',
    category: 'Technology',
    items: ['Y Combinator Demo Days', 'SOMA Coworking Spaces', 'TechCrunch Disrupt SF', 'Founder Meetups at Galvanize', 'Sand Hill Road VC Offices'],
    votes: 167,
    date: '2023-12-16',
    highFives: 48,
    description: 'Where billion-dollar companies begin as two people in a garage.',
    comments: [
      { id: 1, user: '@entrepreneur', content: 'Y Combinator is startup mecca', time: '4 hours ago', avatar: '💡' }
    ],
    saves: 126,
    isRejected: false
  },
  {
    id: 563,
    title: 'Alcatraz Island Deep Exploration',
    author: '@island_historian',
    location: 'San Francisco',
    category: 'History',
    items: ['Main Cellhouse Audio Tour', 'Recreation Yard Stories', 'Dining Hall Recreations', 'Hospital Wing Mysteries', 'Escape Attempt Routes'],
    votes: 198,
    date: '2023-12-15',
    highFives: 62,
    description: 'Uncover every secret of America\'s most infamous prison.',
    comments: [
      { id: 1, user: '@prison_history', content: 'The audio tour gives me chills every time', time: '6 hours ago', avatar: '🏝️' }
    ],
    saves: 152,
    isRejected: false
  },
  {
    id: 564,
    title: 'SF Underground Speakeasy Hunt',
    author: '@cocktail_detective',
    location: 'San Francisco',
    category: 'Food',
    items: ['Bourbon & Branch Hidden Bar', 'Wilson & Wilson Secret Entrance', 'Treasury Lounge Speakeasy', 'Comstock Saloon Historic', 'Smuggler\'s Cove Tiki Underground'],
    votes: 178,
    date: '2023-12-14',
    highFives: 54,
    description: 'Secret bars and hidden cocktail lounges throughout the city.',
    comments: [
      { id: 1, user: '@mixology_fan', content: 'Bourbon & Branch requires a password!', time: '1 hour ago', avatar: '🍸' }
    ],
    saves: 138,
    isRejected: false
  },
  {
    id: 565,
    title: 'Twin Peaks Hiking Adventures',
    author: '@peak_climber_sf',
    location: 'San Francisco',
    category: 'Sports',
    items: ['Twin Peaks Summit Hike', 'Tank Hill Secret Views', 'Mount Davidson Cross', 'Bernal Heights Park Climb', 'Corona Heights Rock Outcrop'],
    votes: 156,
    date: '2023-12-13',
    highFives: 44,
    description: 'Conquer San Francisco\'s highest points for stunning 360° views.',
    comments: [
      { id: 1, user: '@hill_runner', content: 'Tank Hill is the hidden gem', time: '5 hours ago', avatar: '⛰️' }
    ],
    saves: 119,
    isRejected: false
  },
  {
    id: 566,
    title: 'SF Giants Baseball Culture',
    author: '@giants_superfan',
    location: 'San Francisco',
    category: 'Sports',
    items: ['Oracle Park Garlic Fries', 'McCovey Cove Kayaking', 'Giants Dugout Store Shopping', 'Pregame at MoMo\'s', 'World Series Trophy Room'],
    votes: 189,
    date: '2023-12-12',
    highFives: 58,
    description: 'Everything you need to know about San Francisco Giants fandom.',
    comments: [
      { id: 1, user: '@orange_friday', content: 'McCovey Cove splash hits are magical', time: '2 hours ago', avatar: '⚾' }
    ],
    saves: 144,
    isRejected: false
  },
  {
    id: 567,
    title: 'Chinatown Authentic Experiences',
    author: '@chinatown_insider_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Portsmouth Square Tai Chi', 'Grant Avenue Herb Shops', 'Stockton Street Markets', 'Golden Dragon Parade Route', 'Old St. Mary\'s Cathedral'],
    votes: 167,
    date: '2023-12-11',
    highFives: 47,
    description: 'Beyond the tourist shops: real Chinatown culture and community.',
    comments: [
      { id: 1, user: '@cultural_explorer', content: 'Morning tai chi in Portsmouth Square is zen', time: '3 hours ago', avatar: '🏮' }
    ],
    saves: 128,
    isRejected: false
  },
  {
    id: 568,
    title: 'SF Museum Mile Walking Tour',
    author: '@museum_curator_sf',
    location: 'San Francisco',
    category: 'Art',
    items: ['SFMOMA Contemporary Collection', 'de Young Museum Art', 'Legion of Honor European', 'Asian Art Museum Treasures', 'California Academy Sciences'],
    votes: 134,
    date: '2023-12-10',
    highFives: 36,
    description: 'World-class art and culture within walking distance.',
    comments: [
      { id: 1, user: '@art_enthusiast', content: 'SFMOMA\'s photography collection is incredible', time: '4 hours ago', avatar: '🖼️' }
    ],
    saves: 102,
    isRejected: false
  },
  {
    id: 569,
    title: 'SF Coffee Roastery Revolution',
    author: '@coffee_connoisseur_sf',
    location: 'San Francisco',
    category: 'Food',
    items: ['Blue Bottle Coffee Origins', 'Ritual Coffee Roasters Mission', 'Sightglass Coffee SOMA', 'Four Barrel Coffee Mission', 'Andytown Coffee Sunset'],
    votes: 145,
    date: '2023-12-09',
    highFives: 41,
    description: 'Where third-wave coffee culture was born and perfected.',
    comments: [
      { id: 1, user: '@espresso_expert', content: 'Blue Bottle changed coffee forever', time: '6 hours ago', avatar: '☕' }
    ],
    saves: 111,
    isRejected: false
  },
  {
    id: 570,
    title: 'Golden Gate Park Hidden Gems',
    author: '@park_secret_keeper',
    location: 'San Francisco',
    category: 'Travel',
    items: ['AIDS Memorial Grove Quiet Reflection', 'Buffalo Paddock Bison Viewing', 'Polo Fields Weekend Matches', 'Rose Garden Seasonal Blooms', 'Windmill Dutch Architecture'],
    votes: 156,
    date: '2023-12-08',
    highFives: 44,
    description: 'Discover the lesser-known corners of San Francisco\'s greatest park.',
    comments: [
      { id: 1, user: '@park_wanderer', content: 'The AIDS Memorial Grove is deeply moving', time: '7 hours ago', avatar: '🌳' }
    ],
    saves: 118,
    isRejected: false
  }
];

export const categories = [
  'Music', 'Movies', 'Books', 'TV Shows', 'Games', 'Board Games', 'Podcasts', 'Technology',
  'Food', 'Travel', 'Art', 'Sports', 'Fashion', 'Photography',
  'Fitness', 'Science', 'History', 'Politics', 'Comedy', 'Horror',
  'Romance', 'Adventure'
];

export const testNotifications: Notification[] = [
  {
    id: 1,
    type: 'like',
    user: '@someone',
    content: 'Someone liked your list',
    time: '2 hours ago',
    unread: true,
    listId: 1
  }
];