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