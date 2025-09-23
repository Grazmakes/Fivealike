import { List, Notification, TMDbItem, Artist, Comment, Achievement } from '@/types';

export const categories = [
  'Music', 'Movies', 'Books', 'TV Shows', 'Games', 'Podcasts', 'Technology', 
  'Food', 'Travel', 'Art', 'Sports', 'Fashion', 'Photography',
  'Fitness', 'Science', 'History', 'Politics', 'Comedy', 'Horror',
  'Romance', 'Adventure'
];

export const mockTMDbData: Record<string, TMDbItem> = {
  'The Matrix': {
    id: 603,
    title: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster_path: 'https://via.placeholder.com/200x300/1a1a1a/ffffff?text=The+Matrix',
    release_date: '1999-03-30',
    vote_average: 8.7,
    genre_ids: [28, 878]
  },
  'Blade Runner 2049': {
    id: 335984,
    title: 'Blade Runner 2049',
    overview: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what\'s left of society into chaos.',
    poster_path: 'https://via.placeholder.com/200x300/2a2a2a/ffffff?text=Blade+Runner+2049',
    release_date: '2017-10-04',
    vote_average: 8.0,
    genre_ids: [878, 18]
  },
  'Inception': {
    id: 27205,
    title: 'Inception',
    overview: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.',
    poster_path: 'https://via.placeholder.com/200x300/3a3a3a/ffffff?text=Inception',
    release_date: '2010-07-16',
    vote_average: 8.8,
    genre_ids: [28, 878, 53]
  },
  'Interstellar': {
    id: 157336,
    title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: 'https://via.placeholder.com/200x300/4a4a4a/ffffff?text=Interstellar',
    release_date: '2014-11-05',
    vote_average: 8.6,
    genre_ids: [18, 878]
  },
  'The Prestige': {
    id: 1124,
    title: 'The Prestige',
    overview: 'A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy.',
    poster_path: 'https://via.placeholder.com/200x300/5a5a5a/ffffff?text=The+Prestige',
    release_date: '2006-10-17',
    vote_average: 8.5,
    genre_ids: [18, 9648, 878]
  },
  'Better Call Saul': {
    id: 60059,
    title: 'Better Call Saul',
    overview: 'Six years before Saul Goodman meets Walter White. We meet him when the man who will become Saul Goodman is known as Jimmy McGill, a small-time lawyer searching for his destiny.',
    poster_path: 'https://via.placeholder.com/200x300/6a6a6a/ffffff?text=Better+Call+Saul',
    first_air_date: '2015-02-08',
    vote_average: 8.9,
    genre_ids: [80, 18]
  },
  'The Wire': {
    id: 1438,
    title: 'The Wire',
    overview: 'Told from the points of view of both the Baltimore homicide and narcotics detectives and their targets, the series captures a universe in which the national war on drugs has become a permanent, self-sustaining bureaucracy.',
    poster_path: 'https://via.placeholder.com/200x300/7a7a7a/ffffff?text=The+Wire',
    first_air_date: '2002-06-02',
    vote_average: 9.3,
    genre_ids: [80, 18]
  }
};

export const mockArtistData: Record<string, Artist> = {
  'The Rolling Stones': {
    id: 1,
    name: 'The Rolling Stones',
    biography: 'The Rolling Stones are an English rock band formed in London in 1962. Active for six decades, they are one of the most popular and enduring bands of the rock era.',
    image: 'https://via.placeholder.com/200x200/2a2a2a/ffffff?text=Rolling+Stones',
    formed: '1962',
    genres: ['Rock', 'Blues Rock', 'Hard Rock'],
    members: ['Mick Jagger', 'Keith Richards', 'Charlie Watts', 'Ronnie Wood']
  },
  'The Kinks': {
    id: 2,
    name: 'The Kinks',
    biography: 'The Kinks were an English rock band formed in Muswell Hill, north London, in 1963 by brothers Ray and Dave Davies.',
    image: 'https://via.placeholder.com/200x200/3a3a3a/ffffff?text=The+Kinks',
    formed: '1963',
    genres: ['Rock', 'Pop Rock', 'British Invasion'],
    members: ['Ray Davies', 'Dave Davies', 'Mick Avory', 'Pete Quaife']
  },
  'The Who': {
    id: 3,
    name: 'The Who',
    biography: 'The Who are an English rock band formed in London in 1964. Known for powerful live performances.',
    image: 'https://via.placeholder.com/200x200/4a4a4a/ffffff?text=The+Who',
    formed: '1964',
    genres: ['Rock', 'Hard Rock', 'Art Rock'],
    members: ['Roger Daltrey', 'Pete Townshend', 'John Entwistle', 'Keith Moon']
  },
  'Led Zeppelin': {
    id: 4,
    name: 'Led Zeppelin',
    biography: 'Led Zeppelin were an English rock band formed in London in 1968. Pioneers of heavy metal and hard rock.',
    image: 'https://via.placeholder.com/200x200/5a5a5a/ffffff?text=Led+Zeppelin',
    formed: '1968',
    genres: ['Rock', 'Hard Rock', 'Heavy Metal', 'Blues Rock'],
    members: ['Robert Plant', 'Jimmy Page', 'John Paul Jones', 'John Bonham']
  },
  'Pink Floyd': {
    id: 5,
    name: 'Pink Floyd',
    biography: 'Pink Floyd were an English rock band formed in London in 1965. Known for their progressive and psychedelic music.',
    image: 'https://via.placeholder.com/200x200/6a6a6a/ffffff?text=Pink+Floyd',
    formed: '1965',
    genres: ['Progressive Rock', 'Psychedelic Rock', 'Art Rock'],
    members: ['David Gilmour', 'Roger Waters', 'Richard Wright', 'Nick Mason']
  },
  'Lorde': {
    id: 6,
    name: 'Lorde',
    biography: 'Ella Marija Lani Yelich-O\'Connor, known professionally as Lorde, is a New Zealand singer-songwriter.',
    image: 'https://via.placeholder.com/200x200/7a7a7a/ffffff?text=Lorde',
    formed: '2011',
    genres: ['Electropop', 'Art Pop', 'Dream Pop'],
    members: ['Lorde']
  },
  'Phoebe Bridgers': {
    id: 7,
    name: 'Phoebe Bridgers',
    biography: 'Phoebe Lucille Bridgers is an American singer-songwriter known for her indie rock and indie folk sound.',
    image: 'https://via.placeholder.com/200x200/8a8a8a/ffffff?text=Phoebe+Bridgers',
    formed: '2017',
    genres: ['Indie Rock', 'Indie Folk', 'Alternative Rock'],
    members: ['Phoebe Bridgers']
  },
  'Clairo': {
    id: 8,
    name: 'Clairo',
    biography: 'Claire Elizabeth Cottrill, known professionally as Clairo, is an American singer-songwriter.',
    image: 'https://via.placeholder.com/200x200/9a9a9a/ffffff?text=Clairo',
    formed: '2017',
    genres: ['Bedroom Pop', 'Indie Pop', 'Lo-fi'],
    members: ['Clairo']
  },
  'Olivia Rodrigo': {
    id: 9,
    name: 'Olivia Rodrigo',
    biography: 'Olivia Isabel Rodrigo is an American singer-songwriter and actress.',
    image: 'https://via.placeholder.com/200x200/aa9a9a/ffffff?text=Olivia+Rodrigo',
    formed: '2020',
    genres: ['Pop', 'Alternative Rock', 'Pop Rock'],
    members: ['Olivia Rodrigo']
  },
  'Conan Gray': {
    id: 10,
    name: 'Conan Gray',
    biography: 'Conan Lee Gray is an American singer-songwriter and social media personality.',
    image: 'https://via.placeholder.com/200x200/ba9a9a/ffffff?text=Conan+Gray',
    formed: '2018',
    genres: ['Pop', 'Indie Pop', 'Bedroom Pop'],
    members: ['Conan Gray']
  }
};

const mockComments: Comment[] = [
  {
    id: 1,
    user: '@swiftie13',
    content: 'This is such a perfect list! Lorde and Phoebe are incredible.',
    time: '1 hour ago',
    avatar: 'S',
    replies: [
      {
        id: 2,
        user: '@musiclover',
        content: 'Thanks! I think you\'d also love Clairo if you haven\'t checked her out yet.',
        time: '45 minutes ago',
        avatar: 'M'
      }
    ]
  },
  {
    id: 3,
    user: '@indievibes',
    content: 'You should add Mitski to this list too!',
    time: '2 hours ago',
    avatar: 'I'
  }
];

// Generate a hash for exact list matching (title + items)
const generateListHash = (title: string, items: string[]): string => {
  const normalizedTitle = title.toLowerCase().replace(/[^\w\s]/g, '').trim();
  const normalizedItems = items.map(item => item.toLowerCase().replace(/[^\w\s]/g, '').trim()).join('|');
  return `${normalizedTitle}::${normalizedItems}`;
};

// Detect and mark twin lists (exact duplicates)
const detectTwins = (lists: List[]): List[] => {
  const hashMap = new Map<string, List[]>();

  // Group lists by their hash
  lists.forEach(list => {
    const hash = generateListHash(list.title, list.items);
    if (!hashMap.has(hash)) {
      hashMap.set(hash, []);
    }
    hashMap.get(hash)!.push(list);
  });

  // Mark twins and update lists
  hashMap.forEach(duplicateGroup => {
    if (duplicateGroup.length > 1) {
      const allAuthors = duplicateGroup.map(list => list.author);
      duplicateGroup.forEach(list => {
        list.twins = allAuthors;
        list.twinCount = allAuthors.length;
      });
    }
  });

  return lists;
};


// Generate random comments for lists
const generateRandomComments = (count: number): Comment[] => {
  const commentTemplates = [
    { user: '@musicfan', content: 'Great recommendations! Love these choices.', avatar: 'M' },
    { user: '@booklover', content: 'Thanks for sharing, definitely adding these to my list!', avatar: 'B' },
    { user: '@cinephile', content: 'Excellent taste! Have you tried...', avatar: 'C' },
    { user: '@gamer', content: 'This list is spot on!', avatar: 'G' },
    { user: '@foodie', content: 'Amazing suggestions, can\'t wait to try these.', avatar: 'F' },
    { user: '@traveler', content: 'Perfect timing, I was looking for exactly this!', avatar: 'T' },
    { user: '@artist', content: 'Brilliant curation, well done!', avatar: 'A' },
    { user: '@techie', content: 'Solid picks, I agree with all of these.', avatar: 'T' },
  ];
  
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    ...commentTemplates[i % commentTemplates.length],
    time: `${(i % 24) + 1} hours ago`
  }));
};

// Generate compelling "Why you'll love these" descriptions
const generateWyltDescription = (category: string, baseTitle: string, items: string[]): string => {
  const templates = {
    'Music': [
      `If ${baseTitle} gets your head nodding, these artists will have you completely hooked! Each one captures that same energy and musical genius that makes ${baseTitle} special. ${items[1]} brings similar vibes with their own unique twist, ${items[2]} adds layers of complexity you'll appreciate, ${items[3]} takes the sound in an exciting direction, and ${items[4]} rounds out the perfect playlist. These picks will expand your musical horizons while staying true to what you love about ${baseTitle}.`,
      `${baseTitle} fans, prepare for your new obsessions! These artists share that same emotional depth and musical craftsmanship. From ${items[1]}'s captivating melodies to ${items[4]}'s innovative sound, each recommendation builds on what makes ${baseTitle} resonate with you. Perfect for discovering your next favorite artist while staying in your comfort zone.`,
      `Love ${baseTitle}? These picks capture that same magic but with fresh perspectives that will blow you away! ${items[1]} delivers similar emotional intensity, ${items[2]} adds incredible production value, ${items[3]} brings storytelling that hits just as hard, and ${items[4]} creates atmosphere you can get lost in. Your playlist is about to get a serious upgrade.`
    ],
    'Movies': [
      `If ${baseTitle} left you wanting more, these films deliver that same cinematic excellence with fresh stories that will captivate you! ${items[1]} brings similar themes with stunning visuals, ${items[2]} adds complexity that will keep you thinking, ${items[3]} delivers the same emotional impact, and ${items[4]} rounds out the perfect movie night lineup. Each film captures what made ${baseTitle} special while offering something uniquely compelling.`,
      `${baseTitle} fans will absolutely love these carefully selected films! They share that same directorial vision and storytelling magic. From ${items[1]}'s incredible performances to ${items[4]}'s mind-blowing cinematography, each movie builds on the elements that made ${baseTitle} unforgettable. Perfect for your next binge-watching session.`,
      `Ready for more films that capture ${baseTitle}'s brilliance? These picks deliver similar thrills, emotional depth, and cinematic craftsmanship. ${items[1]} offers that same genre-defining experience, ${items[2]} brings comparable character development, ${items[3]} delivers matching intensity, and ${items[4]} provides the perfect conclusion to an epic movie marathon.`
    ],
    'TV Shows': [
      `If you binged ${baseTitle}, these shows will give you that same addictive viewing experience! Each series captures similar storytelling brilliance with characters you'll fall in love with. ${items[1]} brings comparable drama and complexity, ${items[2]} adds layers of intrigue you'll appreciate, ${items[3]} delivers the same emotional investment, and ${items[4]} rounds out the perfect binge-watch lineup. Say goodbye to your free time - these shows are about to consume your weekends!`,
      `${baseTitle} set the bar high, and these shows absolutely clear it! They share that same quality writing and character development that keeps you coming back episode after episode. From ${items[1]}'s incredible plot twists to ${items[4]}'s satisfying story arcs, each recommendation captures what made ${baseTitle} binge-worthy. Your streaming queue just got a major upgrade.`,
      `Love ${baseTitle}? These series deliver that same perfect blend of entertainment and storytelling craftsmanship. ${items[1]} offers similar pacing and character depth, ${items[2]} brings the same attention to detail, ${items[3]} captures comparable emotional resonance, and ${items[4]} provides that same "just one more episode" feeling you crave.`
    ],
    'Books': [
      `If ${baseTitle} kept you turning pages late into the night, these books will give you that same unputdownable reading experience! Each author captures similar storytelling magic with unique voices you'll absolutely love. ${items[1]} brings comparable depth and character development, ${items[2]} adds plot complexity that will keep you guessing, ${items[3]} delivers the same emotional impact, and ${items[4]} rounds out the perfect reading list. Clear your calendar - these books are about to take over your life!`,
      `${baseTitle} fans, these books are exactly what you've been searching for! They share that same literary excellence and page-turning quality. From ${items[1]}'s compelling narrative to ${items[4]}'s unforgettable characters, each recommendation builds on what made ${baseTitle} such a powerful read. Perfect for your next literary adventure.`,
      `Ready for more books that capture ${baseTitle}'s brilliance? These authors deliver similar themes and writing quality with fresh perspectives that will expand your reading horizons. ${items[1]} offers comparable storytelling mastery, ${items[2]} brings the same attention to character detail, ${items[3]} captures similar emotional depth, and ${items[4]} provides that same satisfying reading experience you crave.`
    ],
    'Games': [
      `If ${baseTitle} had you completely hooked, these games will deliver that same addictive gameplay experience! Each title captures similar mechanics and that special something that made ${baseTitle} impossible to put down. ${items[1]} brings comparable challenge and reward systems, ${items[2]} adds innovative features you'll love, ${items[3]} delivers the same satisfying progression, and ${items[4]} rounds out the perfect gaming collection. Prepare for many late nights - these games are about to dominate your free time!`,
      `${baseTitle} set the standard, and these games absolutely live up to it! They share that same quality design and engaging gameplay that keeps you coming back for more. From ${items[1]}'s incredible mechanics to ${items[4]}'s immersive worlds, each recommendation captures what made ${baseTitle} special while offering fresh experiences. Your gaming library is about to get much better.`,
      `Love ${baseTitle}? These games deliver that same perfect balance of challenge and fun with innovative twists you'll appreciate. ${items[1]} offers similar complexity and depth, ${items[2]} brings the same attention to detail, ${items[3]} captures comparable replay value, and ${items[4]} provides that same "just one more level" addiction you know and love.`
    ],
    'Food': [
      `If ${baseTitle} is your go-to comfort food, these dishes will become your new favorites! Each option captures similar flavors and that same satisfaction factor that makes ${baseTitle} irresistible. ${items[1]} brings comparable comfort with exciting variations, ${items[2]} adds layers of flavor you'll appreciate, ${items[3]} delivers the same indulgent experience, and ${items[4]} rounds out the perfect meal rotation. Your taste buds are in for a treat - these dishes are about to become your new obsessions!`,
      `${baseTitle} lovers, these culinary delights are exactly what your cravings have been asking for! They share that same flavor profile and satisfaction level with unique twists that will expand your palate. From ${items[1]}'s incredible taste to ${items[4]}'s perfect preparation, each recommendation builds on what makes ${baseTitle} so delicious. Perfect for your next food adventure.`,
      `Ready for more dishes that capture ${baseTitle}'s deliciousness? These picks deliver similar comfort and flavor with fresh takes that will surprise and delight you. ${items[1]} offers comparable satisfaction, ${items[2]} brings the same quality ingredients, ${items[3]} captures similar comfort levels, and ${items[4]} provides that same "this is exactly what I needed" feeling.`
    ],
    'Technology': [
      `If ${baseTitle} impressed you with its innovation, these tech solutions will blow you away! Each option captures similar cutting-edge features with unique advantages that make them standout choices. ${items[1]} brings comparable performance with exciting new capabilities, ${items[2]} adds functionality you didn't know you needed, ${items[3]} delivers the same user-friendly experience, and ${items[4]} rounds out the perfect tech ecosystem. Your digital life is about to get a major upgrade!`,
      `${baseTitle} set your expectations high, and these technologies absolutely meet them! They share that same quality engineering and innovative design that makes technology truly useful. From ${items[1]}'s impressive features to ${items[4]}'s seamless integration, each recommendation builds on what made ${baseTitle} essential to your workflow. Perfect for staying ahead of the curve.`,
      `Love ${baseTitle}? These tech picks deliver that same perfect blend of innovation and practicality with features that will enhance your daily life. ${items[1]} offers similar reliability and performance, ${items[2]} brings the same attention to user experience, ${items[3]} captures comparable ease of use, and ${items[4]} provides that same "how did I live without this?" value.`
    ]
  };

  const fallbackTemplate = `If you love ${baseTitle}, these handpicked recommendations will be right up your alley! Each ${category.toLowerCase()} selection captures what makes ${baseTitle} special while offering its own unique appeal. ${items[1]} brings similar quality with fresh perspective, ${items[2]} adds exciting elements you'll appreciate, ${items[3]} delivers comparable excellence, and ${items[4]} rounds out the perfect collection. These picks are carefully chosen to match your taste while introducing you to new favorites!`;

  const categoryTemplates = templates[category as keyof typeof templates] || [fallbackTemplate];
  const randomTemplate = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];

  return randomTemplate;
};

const rawMockLists: List[] = [
  // Original lists
  {
    id: 1,
    title: 'If you like "The Beatles", try these 5...',
    author: '@musiclover',
    category: 'Music',
    date: '8/17/2025',
    votes: 127,
    upvotes: 150,
    downvotes: 23,
    userVote: null,
    highFives: 12,
    userHighFived: false,
    items: ['The Rolling Stones', 'The Kinks', 'The Who', 'Led Zeppelin', 'Pink Floyd'],
    description: 'Each of these bands captures The Beatles\' genius for unforgettable melodies and boundary-pushing studio creativity. The Rolling Stones brings the raw energy and blues influence, The Kinks delivers witty British storytelling with catchy hooks, The Who adds explosive power and rock opera innovation, Led Zeppelin takes you on epic musical journeys with mystical themes, and Pink Floyd creates sonic landscapes that transport you to other dimensions. Perfect for anyone who loves The Beatles\' blend of accessibility and artistic ambition.',
    comments: [],
    saves: 89
  },
  {
    id: 2,
    title: 'If you like "Inception", try these 5...',
    author: '@cinephile',
    category: 'Movies',
    date: '8/16/2025',
    votes: 156,
    upvotes: 200,
    downvotes: 44,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['The Matrix', 'Blade Runner 2049', 'Memento', 'Interstellar', 'The Prestige'],
    description: 'If Inception left you questioning what\'s real and what\'s a dream, these films will blow your mind even further! The Matrix revolutionized sci-fi with its "reality is a simulation" concept, Blade Runner 2049 creates a visually stunning dystopia that questions what makes us human, Memento tells its story backwards to put you in the mind of someone with memory loss, Interstellar combines hard science with emotional depth across space and time, and The Prestige weaves a tale of obsession and illusion that will have you rewatching to catch every twist. Each one will leave you discussing theories long after the credits roll.',
    comments: [],
    saves: 134,
    isOrdered: true
  },
  {
    id: 3,
    title: 'If you like "Taylor Swift", try these 5...',
    author: '@musiclover',
    category: 'Music',
    date: '8/20/2025',
    votes: 892,
    upvotes: 1000,
    downvotes: 108,
    userVote: null,
    highFives: 23,
    userHighFived: false,
    items: ['Lorde', 'Phoebe Bridgers', 'Clairo', 'Olivia Rodrigo', 'Conan Gray'],
    description: 'These artists share Taylor Swift\'s gift for turning personal experiences into universal anthems that hit you right in the feels! Lorde captures that same raw honesty about growing up and finding yourself, Phoebe Bridgers writes devastatingly beautiful songs about heartbreak and healing, Clairo creates dreamy indie-pop perfect for late-night introspection, Olivia Rodrigo channels teenage emotions with the intensity Taylor perfected, and Conan Gray tells stories of youth and longing with cinematic detail. Each artist masters the art of making you feel understood through their vulnerability and storytelling genius.',
    comments: mockComments,
    saves: 678
  },
  {
    id: 4,
    title: 'If you like "Breaking Bad", try these 5...',
    author: '@tvfan',
    category: 'TV Shows',
    date: '8/13/2025',
    votes: 234,
    upvotes: 300,
    downvotes: 66,
    userVote: null,
    highFives: 5,
    userHighFived: false,
    items: ['Better Call Saul', 'The Wire', 'Ozark', 'Narcos', 'Fargo'],
    description: 'If you loved watching Walter White\'s transformation into Heisenberg, these shows will give you that same addictive character study experience! Better Call Saul is literally the perfect prequel showing how Jimmy McGill becomes Saul Goodman, The Wire presents the most realistic portrayal of urban crime and politics ever filmed, Ozark puts a family in impossible situations where every choice leads deeper into darkness, Narcos chronicles the rise and fall of real drug cartels with incredible attention to detail, and Fargo blends dark comedy with shocking violence in anthology seasons that will keep you guessing. Each show excels at making you root for morally complex characters you probably shouldn\'t.',
    comments: [],
    saves: 267
  },
  {
    id: 5,
    title: 'If you like "Stranger Things", try these 5...',
    author: '@tvfan',
    category: 'TV Shows',
    date: '8/19/2025',
    votes: 445,
    upvotes: 520,
    downvotes: 75,
    userVote: null,
    highFives: 15,
    userHighFived: false,
    items: ['Dark', 'The OA', 'Twin Peaks', 'X-Files', 'Supernatural'],
    description: 'Get ready for more supernatural mysteries that blend sci-fi thrills with incredible ensemble storytelling! Dark is a German masterpiece that makes Stranger Things look simple - it\'s a time-travel puzzle that will have you drawing diagrams, The OA creates one of the most unique and controversial supernatural narratives ever filmed, Twin Peaks pioneered the "small town with dark secrets" genre that Stranger Things perfected, X-Files gives you that classic "monster of the week" format with an overarching alien conspiracy, and Supernatural delivers 15 seasons of brotherhood, monsters, and mythology. Each show captures that perfect blend of supernatural terror and character-driven storytelling that makes you binge entire seasons.',
    comments: [],
    saves: 334
  },

  // Twin lists - intentional duplicates to showcase the feature
  {
    id: 6,
    title: 'If you like "The Beatles", try these 5...',
    author: '@indievibes',  // Different author, same list as id: 1
    category: 'Music',
    date: '8/18/2025',
    votes: 89,
    upvotes: 120,
    downvotes: 31,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['The Rolling Stones', 'The Kinks', 'The Who', 'Led Zeppelin', 'Pink Floyd'], // Exact same items
    description: 'These classic rock legends share The Beatles\' revolutionary spirit and musical innovation.',
    comments: [],
    saves: 67
  },
  {
    id: 7,
    title: 'If you like "Taylor Swift", try these 5...',
    author: '@readingcorner',  // Different author, same list as id: 3
    category: 'Music',
    date: '8/21/2025',
    votes: 445,
    upvotes: 556,
    downvotes: 111,
    userVote: null,
    highFives: 19,
    userHighFived: false,
    items: ['Lorde', 'Phoebe Bridgers', 'Clairo', 'Olivia Rodrigo', 'Conan Gray'], // Exact same items
    description: 'Perfect artists for Swifties looking to expand their playlists with similar emotional depth.',
    comments: [],
    saves: 389
  },
  {
    id: 8,
    title: 'If you like "The Beatles", try these 5...',
    author: '@artlover',  // Third person with same Beatles list
    category: 'Music',
    date: '8/22/2025',
    votes: 156,
    upvotes: 198,
    downvotes: 42,
    userVote: null,
    highFives: 12,
    userHighFived: false,
    items: ['The Rolling Stones', 'The Kinks', 'The Who', 'Led Zeppelin', 'Pink Floyd'], // Exact same items again
    description: 'Iconic bands that defined rock music alongside The Beatles.',
    comments: [],
    saves: 134
  },

  // 92 additional lists (reduced since we added 3 twins)
  ...Array.from({ length: 92 }, (_, i) => {
    const id = i + 9;
    // Use deterministic selection based on index to avoid hydration mismatch
    const category = categories[i % categories.length];
    const authors = ['@musiclover', '@cinephile', '@bookworm', '@tvfan', '@gamer', '@foodie', '@traveler', '@artist', '@techie', '@fitness_guru'];
    const author = authors[i % authors.length];
    // Add some lists with high downvote ratios for testing
    const shouldReject = (i % 20) === 0; // Every 20th list is rejected for testing
    let upvotes, downvotes;
    
    if (shouldReject) {
      upvotes = (i % 50) + 10; // Low upvotes
      downvotes = (i % 200) + 150; // High downvotes (70%+ ratio)
    } else {
      upvotes = (i % 800) + 50;
      downvotes = (i % 300) + 10;
    }
    const votes = upvotes - downvotes;
    const highFives = (i % 50) + 1;
    const saves = (i % 500) + 5;
    const commentCount = i % 8;
    
    // Category-specific items
    const itemSets: { [key: string]: string[][] } = {
      'Music': [
        ['Arctic Monkeys', 'The Strokes', 'Franz Ferdinand', 'Interpol', 'Vampire Weekend'],
        ['Kendrick Lamar', 'J. Cole', 'Tyler The Creator', 'Frank Ocean', 'Childish Gambino'],
        ['Radiohead', 'Muse', 'Coldplay', 'Oasis', 'Blur'],
        ['Billie Eilish', 'Lana Del Rey', 'Halsey', 'Melanie Martinez', 'Grimes'],
        ['Queen', 'David Bowie', 'Elton John', 'The Police', 'Fleetwood Mac']
      ],
      'Movies': [
        ['The Godfather', 'Goodfellas', 'Scarface', 'Casino', 'The Departed'],
        ['Pulp Fiction', 'Kill Bill', 'Inglourious Basterds', 'Django Unchained', 'Once Upon a Time in Hollywood'],
        ['The Lord of the Rings', 'The Hobbit', 'Harry Potter', 'Star Wars', 'The Chronicles of Narnia'],
        ['The Avengers', 'Iron Man', 'Captain America', 'Thor', 'Guardians of the Galaxy'],
        ['Titanic', 'The Notebook', 'Casablanca', 'When Harry Met Sally', 'Pride and Prejudice']
      ],
      'Books': [
        ['To Kill a Mockingbird', '1984', 'Pride and Prejudice', 'The Great Gatsby', 'Lord of the Flies'],
        ['Harry Potter', 'Game of Thrones', 'The Lord of the Rings', 'Chronicles of Narnia', 'His Dark Materials'],
        ['The Hunger Games', 'Divergent', 'The Maze Runner', 'Percy Jackson', 'The Fault in Our Stars'],
        ['Sherlock Holmes', 'Agatha Christie', 'Gone Girl', 'The Girl with the Dragon Tattoo', 'The Silent Patient'],
        ['Dune', 'Foundation', 'Ender\'s Game', 'The Martian', 'Ready Player One']
      ],
      'TV Shows': [
        ['The Office', 'Parks and Recreation', 'Brooklyn Nine-Nine', 'Community', 'Arrested Development'],
        ['Game of Thrones', 'The Walking Dead', 'Westworld', 'Lost', 'The X-Files'],
        ['Friends', 'How I Met Your Mother', 'Seinfeld', 'Cheers', 'Frasier'],
        ['The Crown', 'Downton Abbey', 'Outlander', 'Bridgerton', 'Anne with an E'],
        ['The Witcher', 'Vikings', 'The Last Kingdom', 'Marco Polo', 'Rome']
      ],
      'Games': [
        ['The Legend of Zelda', 'Super Mario', 'Metroid', 'Donkey Kong', 'Kirby'],
        ['Call of Duty', 'Halo', 'Gears of War', 'Battlefield', 'Titanfall'],
        ['The Witcher 3', 'Skyrim', 'Red Dead Redemption', 'Grand Theft Auto', 'Assassin\'s Creed'],
        ['Minecraft', 'Terraria', 'Stardew Valley', 'Animal Crossing', 'Roblox'],
        ['Dark Souls', 'Bloodborne', 'Sekiro', 'Elden Ring', 'Nioh']
      ],
      'Technology': [
        ['iPhone', 'Samsung Galaxy', 'Google Pixel', 'OnePlus', 'Xiaomi'],
        ['MacBook Pro', 'ThinkPad', 'Surface Laptop', 'Dell XPS', 'HP Spectre'],
        ['React', 'Angular', 'Vue.js', 'Svelte', 'Next.js'],
        ['PlayStation 5', 'Xbox Series X', 'Nintendo Switch', 'Steam Deck', 'Asus ROG Ally'],
        ['ChatGPT', 'Claude', 'Gemini', 'Copilot', 'Midjourney']
      ],
      'Food': [
        ['Pizza Margherita', 'Pepperoni', 'Hawaiian', 'Meat Lovers', 'Veggie Supreme'],
        ['Pad Thai', 'Green Curry', 'Tom Yum', 'Massaman', 'Som Tam'],
        ['Sushi', 'Ramen', 'Tempura', 'Yakitori', 'Miso Soup'],
        ['Tacos Al Pastor', 'Carnitas', 'Barbacoa', 'Fish Tacos', 'Quesadillas'],
        ['Chocolate Cake', 'Cheesecake', 'Tiramisu', 'Crème Brûlée', 'Apple Pie']
      ],
      'Travel': [
        ['Paris', 'Rome', 'Barcelona', 'Amsterdam', 'Prague'],
        ['Tokyo', 'Kyoto', 'Seoul', 'Bangkok', 'Singapore'],
        ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'],
        ['London', 'Edinburgh', 'Dublin', 'Cardiff', 'Belfast'],
        ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide']
      ],
      'Art': [
        ['Van Gogh', 'Picasso', 'Da Vinci', 'Monet', 'Rembrandt'],
        ['Banksy', 'Basquiat', 'Warhol', 'Haring', 'Koons'],
        ['Frida Kahlo', 'Georgia O\'Keeffe', 'Yayoi Kusama', 'Louise Bourgeois', 'Kara Walker'],
        ['The Louvre', 'MoMA', 'Tate Modern', 'Guggenheim', 'Metropolitan Museum'],
        ['Photography', 'Sculpture', 'Abstract Art', 'Street Art', 'Digital Art']
      ],
      'Comedy': [
        ['Stand-up Comedy', 'Improv', 'Sketch Shows', 'Comedy Central', 'Saturday Night Live'],
        ['Dave Chappelle', 'Kevin Hart', 'Amy Schumer', 'John Mulaney', 'Ali Wong'],
        ['The Office', 'Parks and Recreation', 'Brooklyn Nine-Nine', 'Community', 'Arrested Development'],
        ['Comedy Movies', 'Romantic Comedies', 'Dark Comedy', 'Slapstick', 'Satire'],
        ['Comedy Clubs', 'Netflix Specials', 'Comedy Podcasts', 'Late Night Shows', 'Comedy Festivals']
      ],
      'Horror': [
        ['The Exorcist', 'Halloween', 'A Nightmare on Elm Street', 'Friday the 13th', 'The Shining'],
        ['Get Out', 'Hereditary', 'The Conjuring', 'It Follows', 'Midsommar'],
        ['Stephen King', 'H.P. Lovecraft', 'Edgar Allan Poe', 'Clive Barker', 'Anne Rice'],
        ['Zombie Movies', 'Vampire Films', 'Ghost Stories', 'Slasher Films', 'Psychological Horror'],
        ['Horror Podcasts', 'Creepypasta', 'Horror Games', 'Haunted Houses', 'Horror Conventions']
      ],
      'Romance': [
        ['The Notebook', 'Titanic', 'Casablanca', 'When Harry Met Sally', 'Pride and Prejudice'],
        ['Romance Novels', 'Nicholas Sparks', 'Jane Austen', 'Emily Henry', 'Colleen Hoover'],
        ['Romantic Comedies', 'Date Night Movies', 'Wedding Films', 'Love Stories', 'Chick Flicks'],
        ['Valentine\'s Day', 'Anniversary Ideas', 'Romantic Dinners', 'Love Songs', 'Couple Activities'],
        ['Dating Apps', 'Long Distance', 'Wedding Planning', 'Relationship Advice', 'Love Languages']
      ],
      'Adventure': [
        ['Indiana Jones', 'Tomb Raider', 'Uncharted', 'The Mummy', 'National Treasure'],
        ['Rock Climbing', 'Skydiving', 'Bungee Jumping', 'White Water Rafting', 'Mountain Biking'],
        ['Backpacking', 'Solo Travel', 'Road Trips', 'Camping', 'Hiking Trails'],
        ['Adventure Sports', 'Extreme Sports', 'Outdoor Gear', 'Survival Skills', 'Nature Photography'],
        ['Travel Blogs', 'Adventure Movies', 'Outdoor Magazines', 'National Parks', 'Adventure Tours']
      ],
      'Podcasts': [
        ['The Joe Rogan Experience', 'Serial', 'This American Life', 'Radiolab', 'The Daily'],
        ['Crime Junkie', 'My Favorite Murder', 'True Crime Garage', 'Casefile', 'Criminal'],
        ['Conan O\'Brien Needs a Friend', 'SmartLess', 'WTF with Marc Maron', 'The Tim Ferriss Show', 'Armchair Expert'],
        ['Planet Money', 'How I Built This', 'Freakonomics Radio', 'The Indicator', 'Marketplace'],
        ['Reply All', 'StartUp', 'Note to Self', 'IRL', 'Darknet Diaries']
      ],
      'Sports': [
        ['NBA', 'NFL', 'Premier League', 'Champions League', 'World Cup'],
        ['LeBron James', 'Tom Brady', 'Messi', 'Cristiano Ronaldo', 'Stephen Curry'],
        ['Lakers', 'Patriots', 'Manchester United', 'Real Madrid', 'Warriors'],
        ['ESPN', 'Sports Center', 'The Athletic', 'Bleacher Report', 'Sky Sports'],
        ['Fantasy Football', 'March Madness', 'Super Bowl', 'Olympics', 'Wimbledon']
      ],
      'Fashion': [
        ['Gucci', 'Louis Vuitton', 'Chanel', 'Prada', 'Versace'],
        ['Zara', 'H&M', 'Uniqlo', 'Nike', 'Adidas'],
        ['Vogue', 'Elle', 'Harper\'s Bazaar', 'GQ', 'Vanity Fair'],
        ['Fashion Week', 'Met Gala', 'Runway Shows', 'Street Style', 'Vintage Fashion'],
        ['Sustainable Fashion', 'Fast Fashion', 'Designer Outlets', 'Thrift Shopping', 'Personal Styling']
      ],
      'Photography': [
        ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Leica'],
        ['iPhone Photography', 'DSLR', 'Mirrorless', 'Film Photography', 'Instant Cameras'],
        ['Portrait Photography', 'Landscape Photography', 'Street Photography', 'Wedding Photography', 'Wildlife Photography'],
        ['Lightroom', 'Photoshop', 'VSCO', 'Snapseed', 'Capture One'],
        ['Instagram', 'Flickr', '500px', 'Unsplash', 'Getty Images']
      ],
      'Fitness': [
        ['CrossFit', 'Yoga', 'Pilates', 'Running', 'Weight Lifting'],
        ['Peloton', 'Orange Theory', 'SoulCycle', 'Barry\'s Bootcamp', 'F45'],
        ['Nike Training', 'Apple Fitness+', 'Beachbody', 'Daily Burn', 'Fitness Blender'],
        ['Protein Powder', 'Pre-Workout', 'BCAAs', 'Creatine', 'Multivitamins'],
        ['MyFitnessPal', 'Strava', 'Fitbit', 'Garmin', 'Apple Watch']
      ],
      'Science': [
        ['NASA', 'SpaceX', 'Tesla', 'MIT', 'Stanford'],
        ['Neil deGrasse Tyson', 'Bill Nye', 'Brian Cox', 'Michio Kaku', 'Carl Sagan'],
        ['Cosmos', 'Planet Earth', 'Blue Planet', 'Our Planet', 'Life'],
        ['National Geographic', 'Scientific American', 'Nature', 'Science', 'Popular Science'],
        ['Physics', 'Biology', 'Chemistry', 'Astronomy', 'Neuroscience']
      ],
      'History': [
        ['World War II', 'Ancient Rome', 'Medieval Times', 'Renaissance', 'Industrial Revolution'],
        ['Winston Churchill', 'Abraham Lincoln', 'Julius Caesar', 'Napoleon', 'Alexander the Great'],
        ['History Channel', 'BBC History', 'Smithsonian', 'National Geographic', 'PBS'],
        ['The Colosseum', 'Great Wall of China', 'Pyramids of Giza', 'Machu Picchu', 'Stonehenge'],
        ['Dan Carlin', 'Mike Duncan', 'Hardcore History', 'The History of Rome', 'Revolutions']
      ],
      'Politics': [
        ['CNN', 'BBC News', 'NPR', 'Reuters', 'Associated Press'],
        ['The Daily Show', 'Last Week Tonight', 'Saturday Night Live', 'The Late Show', 'Real Time'],
        ['The New York Times', 'The Washington Post', 'The Guardian', 'Wall Street Journal', 'Politico'],
        ['Democracy', 'Republic', 'Socialism', 'Capitalism', 'Federalism'],
        ['Presidential Elections', 'Congressional Debates', 'Supreme Court', 'Local Government', 'International Relations']
      ]
    };
    
    const defaultItems = ['The Office', 'Spotify Premium', 'iPhone', 'YouTube Premium', 'Amazon Prime'];
    const items = itemSets[category] ? itemSets[category][i % itemSets[category].length] : defaultItems;
    
    const baseTitle = items[0] || 'Something Great';
    const title = `If you like "${baseTitle}", try these 5...`;
    
    return {
      id,
      title,
      author,
      category,
      date: `8/${(i % 21) + 1}/2025`,
      votes,
      upvotes,
      downvotes,
      userVote: null,
      highFives,
      userHighFived: false,
      items,
      description: generateWyltDescription(category, baseTitle, items),
      comments: generateRandomComments(commentCount),
      saves,
      isRejected: shouldReject
    };
  }),
  
  // 10 explicit rejected lists
  {
    id: 101,
    title: 'If you like "Nickelback", try these 5...',
    author: '@musiclover',
    category: 'Music',
    date: '8/5/2025',
    votes: -245,
    upvotes: 25,
    downvotes: 270,
    userVote: null,
    highFives: 2,
    userHighFived: false,
    items: ['Creed', 'Theory of a Deadman', 'Default', 'Three Days Grace', 'Seether'],
    description: 'Post-grunge bands with similar commercial appeal and controversial reception.',
    comments: [],
    saves: 12,
    isRejected: true
  },
  {
    id: 102,
    title: 'If you like "Cats (2019)", try these 5...',
    author: '@cinephile',
    category: 'Movies',
    date: '8/7/2025',
    votes: -189,
    upvotes: 18,
    downvotes: 207,
    userVote: null,
    highFives: 1,
    userHighFived: false,
    items: ['The Emoji Movie', 'Jack and Jill', 'Gigli', 'Battlefield Earth', 'The Room'],
    description: 'Movies that are so bad they\'re... still just bad.',
    comments: [],
    saves: 3,
    isRejected: true
  },
  {
    id: 103,
    title: 'If you like "Twilight", try these 5...',
    author: '@bookworm',
    category: 'Books',
    date: '8/9/2025',
    votes: -156,
    upvotes: 34,
    downvotes: 190,
    userVote: null,
    highFives: 4,
    userHighFived: false,
    items: ['Fifty Shades of Grey', 'After', 'Beautiful Disaster', 'Hush Hush', 'Fallen'],
    description: 'Romantic novels with problematic relationships and questionable writing.',
    comments: [],
    saves: 8,
    isRejected: true
  },
  {
    id: 104,
    title: 'If you like "The Big Bang Theory", try these 5...',
    author: '@tvfan',
    category: 'TV Shows',
    date: '8/11/2025',
    votes: -134,
    upvotes: 42,
    downvotes: 176,
    userVote: null,
    highFives: 3,
    userHighFived: false,
    items: ['Two and a Half Men', 'How I Met Your Mother', 'Friends', 'Young Sheldon', 'The Ranch'],
    description: 'Sitcoms with laugh tracks and outdated humor.',
    comments: [],
    saves: 15,
    isRejected: true
  },
  {
    id: 105,
    title: 'If you like "Cyberpunk 2077 (Launch)", try these 5...',
    author: '@gamer',
    category: 'Games',
    date: '8/13/2025',
    votes: -201,
    upvotes: 19,
    downvotes: 220,
    userVote: null,
    highFives: 1,
    userHighFived: false,
    items: ['No Man\'s Sky (Launch)', 'Anthem', 'Fallout 76', 'Mass Effect Andromeda', 'SimCity (2013)'],
    description: 'Games that launched broken and disappointed fans.',
    comments: [],
    saves: 5,
    isRejected: true
  },
  {
    id: 106,
    title: 'If you like "Pineapple on Pizza", try these 5...',
    author: '@foodie',
    category: 'Food',
    date: '8/15/2025',
    votes: -178,
    upvotes: 31,
    downvotes: 209,
    userVote: null,
    highFives: 2,
    userHighFived: false,
    items: ['Ketchup on Steak', 'Milk with Cereal', 'Well-done Wagyu', 'Instant Coffee', 'Microwave Pizza'],
    description: 'Controversial food combinations that divide people.',
    comments: [],
    saves: 7,
    isRejected: true
  },
  {
    id: 107,
    title: 'If you like "Crocs", try these 5...',
    author: '@fashionista',
    category: 'Fashion',
    date: '8/17/2025',
    votes: -143,
    upvotes: 38,
    downvotes: 181,
    userVote: null,
    highFives: 5,
    userHighFived: false,
    items: ['Socks with Sandals', 'Cargo Shorts', 'Fedoras', 'Fanny Packs', 'Jean Shorts'],
    description: 'Fashion choices that are... questionable.',
    comments: [],
    saves: 11,
    isRejected: true
  },
  {
    id: 108,
    title: 'If you like "Vertical Phone Videos", try these 5...',
    author: '@techie',
    category: 'Technology',
    date: '8/19/2025',
    votes: -167,
    upvotes: 23,
    downvotes: 190,
    userVote: null,
    highFives: 1,
    userHighFived: false,
    items: ['Autoplay Videos with Sound', 'Pop-up Ads', 'Infinite Scroll', 'Notification Spam', 'Auto-correct Fails'],
    description: 'Tech features everyone secretly hates.',
    comments: [],
    saves: 4,
    isRejected: true
  },
  {
    id: 109,
    title: 'If you like "CrossFit", try these 5...',
    author: '@fitness_guru',
    category: 'Fitness',
    date: '8/21/2025',
    votes: -112,
    upvotes: 45,
    downvotes: 157,
    userVote: null,
    highFives: 6,
    userHighFived: false,
    items: ['Talking About CrossFit', 'Posting Workout Videos', 'Keto Diet Evangelism', 'Essential Oil MLMs', 'Vegan Activism'],
    description: 'Things people won\'t stop talking about.',
    comments: [],
    saves: 13,
    isRejected: true
  },
  {
    id: 110,
    title: 'If you like "Comic Sans", try these 5...',
    author: '@designer',
    category: 'Art',
    date: '8/23/2025',
    votes: -198,
    upvotes: 16,
    downvotes: 214,
    userVote: null,
    highFives: 0,
    userHighFived: false,
    items: ['Papyrus', 'Times New Roman for Everything', 'WordArt', 'Clip Art', 'Rainbow Gradients'],
    description: 'Design choices that make designers cry.',
    comments: [],
    saves: 2,
    isRejected: true
  },

  // Boston-themed lists
  {
    id: 101,
    title: 'If you like "Boston Common", try these 5 parks...',
    author: '@bostonexplorer',
    category: 'Travel',
    date: '8/25/2025',
    votes: 45,
    upvotes: 50,
    downvotes: 5,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Public Garden', 'Arnold Arboretum', 'Franklin Park', 'Castle Island', 'Chestnut Hill Reservoir'],
    description: 'Beautiful green spaces around Boston perfect for walks and relaxation.',
    comments: [],
    saves: 23
  },
  {
    id: 102,
    title: 'If you like "North End", try these 5 Boston neighborhoods...',
    author: '@bostonfoodie',
    category: 'Travel',
    date: '8/24/2025',
    votes: 62,
    upvotes: 70,
    downvotes: 8,
    userVote: null,
    highFives: 12,
    userHighFived: false,
    items: ['Back Bay', 'Beacon Hill', 'South End', 'Cambridge', 'Somerville'],
    description: 'Historic neighborhoods with incredible character, food, and walkability.',
    comments: [],
    saves: 34
  },
  {
    id: 103,
    title: 'If you like "Fenway Park", try these 5 Boston sports experiences...',
    author: '@redsoxfan',
    category: 'Sports',
    date: '8/23/2025',
    votes: 89,
    upvotes: 95,
    downvotes: 6,
    userVote: null,
    highFives: 15,
    userHighFived: false,
    items: ['TD Garden (Celtics/Bruins)', 'Gillette Stadium (Patriots)', 'Harvard Stadium', 'Boston Marathon Route', 'Head of the Charles Regatta'],
    description: 'Iconic Boston sports venues and events that capture the city\'s athletic spirit.',
    comments: [],
    saves: 41
  },
  {
    id: 104,
    title: 'If you like "Clam Chowder", try these 5 Boston foods...',
    author: '@bostoneats',
    category: 'Food',
    date: '8/22/2025',
    votes: 73,
    upvotes: 80,
    downvotes: 7,
    userVote: null,
    highFives: 18,
    userHighFived: false,
    items: ['Boston Baked Beans', 'Lobster Roll', 'Italian Sub from North End', 'Boston Cream Pie', 'Roast Beef Sandwich'],
    description: 'Quintessential Boston dishes you must try when visiting.',
    comments: [],
    saves: 52
  },
  {
    id: 105,
    title: 'If you like "Freedom Trail", try these 5 Boston historic sites...',
    author: '@historyboston',
    category: 'History',
    date: '8/21/2025',
    votes: 56,
    upvotes: 65,
    downvotes: 9,
    userVote: null,
    highFives: 11,
    userHighFived: false,
    items: ['USS Constitution', 'Boston Tea Party Ships', 'Paul Revere House', 'Old South Meeting House', 'Bunker Hill Monument'],
    description: 'Revolutionary War sites that shaped American history.',
    comments: [],
    saves: 29
  },
  {
    id: 106,
    title: 'If you like "Harvard Square", try these 5 Boston student areas...',
    author: '@cambridgestudent',
    category: 'Travel',
    date: '8/20/2025',
    votes: 67,
    upvotes: 75,
    downvotes: 8,
    userVote: null,
    highFives: 9,
    userHighFived: false,
    items: ['Davis Square (Somerville)', 'Porter Square', 'Central Square', 'Kendall Square', 'MIT Campus'],
    description: 'Vibrant areas around Boston\'s universities with great food and nightlife.',
    comments: [],
    saves: 38
  },
  {
    id: 107,
    title: 'If you like "Good Will Hunting", try these 5 Boston movies...',
    author: '@bostonfilmbuff',
    category: 'Movies',
    date: '8/19/2025',
    votes: 84,
    upvotes: 90,
    downvotes: 6,
    userVote: null,
    highFives: 16,
    userHighFived: false,
    items: ['The Departed', 'The Town', 'Mystic River', 'Fever Pitch', 'Ted'],
    description: 'Films that perfectly capture Boston\'s spirit and character.',
    comments: [],
    saves: 47
  },
  {
    id: 108,
    title: 'If you like "Newbury Street", try these 5 Boston shopping areas...',
    author: '@bostonshopper',
    category: 'Fashion',
    date: '8/18/2025',
    votes: 41,
    upvotes: 48,
    downvotes: 7,
    userVote: null,
    highFives: 6,
    userHighFived: false,
    items: ['Faneuil Hall Marketplace', 'Copley Place', 'Prudential Center', 'Harvard Square shops', 'SoWa Vintage Market'],
    description: 'Best shopping destinations in Boston from luxury to vintage finds.',
    comments: [],
    saves: 25
  },
  {
    id: 109,
    title: 'If you like "Boston Symphony Orchestra", try these 5 music venues...',
    author: '@bostonmusic',
    category: 'Music',
    date: '8/17/2025',
    votes: 38,
    upvotes: 45,
    downvotes: 7,
    userVote: null,
    highFives: 7,
    userHighFived: false,
    items: ['Berklee Performance Center', 'House of Blues', 'The Paradise Rock Club', 'Brighton Music Hall', 'Royale Nightclub'],
    description: 'Boston\'s best live music venues across all genres.',
    comments: [],
    saves: 21
  },
  {
    id: 110,
    title: 'If you like "Sam Adams", try these 5 Boston breweries...',
    author: '@beerboston',
    category: 'Food',
    date: '8/16/2025',
    votes: 71,
    upvotes: 80,
    downvotes: 9,
    userVote: null,
    highFives: 14,
    userHighFived: false,
    items: ['Harpoon Brewery', 'Trillium Brewing', 'Night Shift Brewing', 'Aeronaut Brewing', 'Lamplighter Brewing'],
    description: 'Local Boston breweries making incredible craft beer.',
    comments: [],
    saves: 45
  },
  {
    id: 111,
    title: 'If you like "MIT", try these 5 Boston tech companies...',
    author: '@bostontechie',
    category: 'Technology',
    date: '8/15/2025',
    votes: 92,
    upvotes: 100,
    downvotes: 8,
    userVote: null,
    highFives: 19,
    userHighFived: false,
    items: ['HubSpot', 'Wayfair', 'Toast', 'DraftKings', 'TripAdvisor'],
    description: 'Innovative tech companies that call Boston home.',
    comments: [],
    saves: 58
  },
  {
    id: 112,
    title: 'If you like "Boston Marathon", try these 5 running routes...',
    author: '@bostonrunner',
    category: 'Fitness',
    date: '8/14/2025',
    votes: 64,
    upvotes: 70,
    downvotes: 6,
    userVote: null,
    highFives: 13,
    userHighFived: false,
    items: ['Charles River Esplanade', 'Minuteman Bikeway', 'Emerald Necklace', 'Harbour Walk', 'Fresh Pond Loop'],
    description: 'Best running and walking paths around Boston.',
    comments: [],
    saves: 36
  },
  {
    id: 113,
    title: 'If you like "Cheers", try these 5 Boston TV shows...',
    author: '@bostontv',
    category: 'TV Shows',
    date: '8/13/2025',
    votes: 55,
    upvotes: 62,
    downvotes: 7,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Boston Legal', 'Boston Public', 'Ally McBeal', 'St. Elsewhere', 'The Practice'],
    description: 'TV shows set in Boston that capture the city\'s character.',
    comments: [],
    saves: 27
  },
  {
    id: 114,
    title: 'If you like "Isabella Stewart Gardner Museum", try these 5 Boston museums...',
    author: '@bostonart',
    category: 'Art',
    date: '8/12/2025',
    votes: 49,
    upvotes: 55,
    downvotes: 6,
    userVote: null,
    highFives: 10,
    userHighFived: false,
    items: ['Museum of Fine Arts', 'Institute of Contemporary Art', 'Harvard Art Museums', 'Museum of Science', 'Boston Children\'s Museum'],
    description: 'World-class museums showcasing art, science, and culture in Boston.',
    comments: [],
    saves: 31
  },
  {
    id: 115,
    title: 'If you like "Boston University", try these 5 college towns...',
    author: '@collegeboston',
    category: 'Travel',
    date: '8/11/2025',
    votes: 43,
    upvotes: 50,
    downvotes: 7,
    userVote: null,
    highFives: 6,
    userHighFived: false,
    items: ['Ann Arbor, MI', 'Chapel Hill, NC', 'Boulder, CO', 'Madison, WI', 'Burlington, VT'],
    description: 'College towns with similar energy and student culture to Boston.',
    comments: [],
    saves: 22
  },
  {
    id: 116,
    title: 'If you like "Dunkin\' Donuts", try these 5 Boston coffee shops...',
    author: '@bostoncoffee',
    category: 'Food',
    date: '8/10/2025',
    votes: 78,
    upvotes: 85,
    downvotes: 7,
    userVote: null,
    highFives: 17,
    userHighFived: false,
    items: ['Blue Bottle Coffee', 'George Howell Coffee', 'Thinking Cup', 'Pavement Coffeehouse', 'Render Coffee'],
    description: 'Local Boston coffee roasters and cafes beyond the chains.',
    comments: [],
    saves: 43
  },
  {
    id: 117,
    title: 'If you like "Boston Harbor", try these 5 waterfront activities...',
    author: '@bostonwater',
    category: 'Travel',
    date: '8/9/2025',
    votes: 52,
    upvotes: 60,
    downvotes: 8,
    userVote: null,
    highFives: 9,
    userHighFived: false,
    items: ['Harbor Islands Ferry', 'Whale Watching Tours', 'Seaport District Walk', 'Boston Harbor Cruise', 'Kayaking from Community Boating'],
    description: 'Ways to enjoy Boston\'s beautiful harbor and waterfront.',
    comments: [],
    saves: 28
  },
  {
    id: 118,
    title: 'If you like "Dropkick Murphys", try these 5 Boston bands...',
    author: '@bostonpunk',
    category: 'Music',
    date: '8/8/2025',
    votes: 69,
    upvotes: 75,
    downvotes: 6,
    userVote: null,
    highFives: 12,
    userHighFived: false,
    items: ['The Mighty Mighty Bosstones', 'Street Dogs', 'The Bruisers', 'Blood for Blood', 'Gang Green'],
    description: 'Boston punk and ska bands that rock as hard as the Dropkicks.',
    comments: [],
    saves: 37
  },
  {
    id: 119,
    title: 'If you like "Boston Public Library", try these 5 study spots...',
    author: '@bostonstudent',
    category: 'Travel',
    date: '8/7/2025',
    votes: 36,
    upvotes: 42,
    downvotes: 6,
    userVote: null,
    highFives: 5,
    userHighFived: false,
    items: ['Widener Library (Harvard)', 'MIT Libraries', 'Northeastern Library', 'BU Mugar Library', 'Tatte Cafe & Bakery'],
    description: 'Best places to study and work in Boston beyond BPL.',
    comments: [],
    saves: 19
  },
  {
    id: 120,
    title: 'If you like "Boston Winter", try these 5 cold weather activities...',
    author: '@bostonwinter',
    category: 'Travel',
    date: '8/6/2025',
    votes: 47,
    upvotes: 54,
    downvotes: 7,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Ice Skating on Boston Common Frog Pond', 'Skiing at Blue Hills', 'First Night Boston', 'Museum hopping', 'Hot chocolate at L.A. Burdick'],
    description: 'Ways to enjoy Boston even when it\'s freezing outside.',
    comments: [],
    saves: 24
  },
  // Boston Bars
  {
    id: 102,
    title: 'If you like "Harpoon Brewery", try these 5 Boston craft beer bars...',
    author: '@beantown_foodie',
    category: 'Food',
    date: '8/25/2025',
    votes: 89,
    upvotes: 95,
    downvotes: 6,
    userVote: null,
    highFives: 15,
    userHighFived: false,
    items: ['Trillium Brewing Company', 'Night Shift Brewing', 'Harpoon Brewery', 'Samuel Adams Boston Brewery', 'Cambridge Brewing Company'],
    description: 'The best local breweries and beer bars in Boston and Cambridge.',
    comments: [],
    saves: 42
  },
  // Boston Restaurants
  {
    id: 103,
    title: 'If you like "Giacomo\'s Ristorante", try these 5 North End Italian restaurants...',
    author: '@south_end_local',
    category: 'Food',
    date: '8/24/2025',
    votes: 156,
    upvotes: 165,
    downvotes: 9,
    userVote: null,
    highFives: 28,
    userHighFived: false,
    items: ['Giacomo\'s Ristorante', 'Bricco', 'Neptune Oyster', 'Regina Pizzeria', 'Modern Pastry'],
    description: 'Authentic Italian dining experiences in Boston\'s historic North End.',
    comments: [],
    saves: 78
  },
  // Boston Colleges
  {
    id: 104,
    title: 'If you like "Harvard University", try these 5 Boston area universities...',
    author: '@harvard_grad',
    category: 'Travel',
    date: '8/23/2025',
    votes: 134,
    upvotes: 142,
    downvotes: 8,
    userVote: null,
    highFives: 22,
    userHighFived: false,
    items: ['Harvard University', 'MIT', 'Boston University', 'Northeastern University', 'Emerson College'],
    description: 'Beautiful campuses and student life in the Boston area.',
    comments: [],
    saves: 56
  },
  // Boston Shopping
  {
    id: 105,
    title: 'If you like "Newbury Street", try these 5 Boston shopping districts...',
    author: '@beacon_hill_guide',
    category: 'Travel',
    date: '8/22/2025',
    votes: 98,
    upvotes: 107,
    downvotes: 9,
    userVote: null,
    highFives: 18,
    userHighFived: false,
    items: ['Newbury Street', 'Faneuil Hall Marketplace', 'Prudential Center', 'Harvard Square', 'Legacy Place'],
    description: 'From high-end boutiques to local markets in Boston.',
    comments: [],
    saves: 43
  },
  // Boston Sightseeing
  {
    id: 106,
    title: 'If you like "Paul Revere House", try these 5 Freedom Trail must-sees...',
    author: '@bostonexplorer',
    category: 'Travel',
    date: '8/21/2025',
    votes: 201,
    upvotes: 215,
    downvotes: 14,
    userVote: null,
    highFives: 35,
    userHighFived: false,
    items: ['Boston Common', 'Faneuil Hall', 'Paul Revere House', 'Old North Church', 'USS Constitution'],
    description: 'Historic landmarks along Boston\'s famous Freedom Trail.',
    comments: [],
    saves: 89
  },
  // Boston Museums
  {
    id: 107,
    title: 'If you like "Museum of Fine Arts", try these 5 Boston museums...',
    author: '@patriots_fan',
    category: 'Art',
    date: '8/20/2025',
    votes: 167,
    upvotes: 178,
    downvotes: 11,
    userVote: null,
    highFives: 31,
    userHighFived: false,
    items: ['Museum of Fine Arts', 'Boston Tea Party Ships', 'MIT Museum', 'Isabella Stewart Gardner Museum', 'Boston Children\'s Museum'],
    description: 'World-class museums and cultural attractions in Boston.',
    comments: [],
    saves: 72
  }
];

// Apply twin detection and export
export const mockLists: List[] = detectTwins(rawMockLists);

export const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'like',
    user: '@bookworm',
    content: 'liked your comment on "The Beatles" recommendations',
    time: '5 minutes ago',
    unread: true
  },
  {
    id: 2,
    type: 'follow',
    user: '@cinephile',
    content: 'started following you',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'comment',
    user: '@graz',
    content: 'commented on your "Taylor Swift" list',
    time: '2 hours ago',
    unread: false
  },
  {
    id: 4,
    type: 'like',
    user: '@musiclover',
    content: 'liked your "Harry Potter" list',
    time: '3 hours ago',
    unread: true
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Create your first list',
    icon: '👶',
    condition: (stats) => stats.listsCreated >= 1,
  },
  {
    id: 'socialite',
    name: 'Socialite',
    description: 'Follow 5 users',
    icon: '🤝',
    condition: (stats) => stats.following >= 5,
  },
  {
    id: 'high_fiver',
    name: 'High Fiver',
    description: 'Give 10 high fives',
    icon: '✈️',
    condition: (stats) => stats.highFivesGiven >= 10,
  },
  {
    id: 'selective',
    name: 'Selective',
    description: 'Save 25 lists',
    icon: '🏆',
    condition: (stats) => stats.listsSaved >= 25,
  },
  {
    id: 'voice',
    name: 'Voice',
    description: 'Cast 50 votes',
    icon: '🗳️',
    condition: (stats) => stats.totalVotes >= 50,
  },
  {
    id: 'critic',
    name: 'Critic',
    description: 'Post 20 comments',
    icon: '💬',
    condition: (stats) => stats.commentsPosted >= 20,
  },
  {
    id: 'popular',
    name: 'Popular',
    description: 'Get 100 followers',
    icon: '⭐',
    condition: (stats) => stats.followers >= 100,
  },
  {
    id: 'prolific',
    name: 'Prolific',
    description: 'Create 10 lists',
    icon: '📝',
    condition: (stats) => stats.listsCreated >= 10,
  },
  {
    id: 'great_minds',
    name: 'Multiple Creators',
    description: 'Created a list that others also made',
    icon: '2',
    condition: (stats) => stats.twinsFound > 0,
  }
];

export const categoryEmojis: Record<string, string> = {
  'Music': '🎵',
  'Movies': '🎬',
  'Books': '📚',
  'TV Shows': '📺',
  'Games': '🎮',
  'Podcasts': '🎙️',
  'Technology': '💻',
  'Food': '🍕',
  'Travel': '✈️',
  'Art': '🎨',
  'Sports': '⚽',
  'Fashion': '👗',
  'Photography': '📸',
  'Fitness': '💪',
  'Science': '🔬',
  'History': '🏛️',
  'Politics': '🏛️',
  'Comedy': '😂',
  'Horror': '😱',
  'Romance': '💕',
  'Adventure': '🗺️'
};