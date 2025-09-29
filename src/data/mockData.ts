import { List, Notification, TMDbItem, Artist, Comment, Achievement } from '@/types';

export const categories = [
  'Music', 'Movies', 'Books', 'TV Shows', 'Games', 'Podcasts', 'Technology', 
  'Food', 'Travel', 'Art', 'Sports', 'Fashion', 'Photography',
  'Fitness', 'Science', 'History', 'Politics', 'Comedy', 'Horror',
  'Romance', 'Adventure'
];

export const mockTMDbData: Record<string, TMDbItem> = {
  'Good Will Hunting': {
    id: 175,
    title: 'Good Will Hunting',
    overview: 'Will Hunting, a janitor at MIT, has a gift for mathematics but needs help from a psychologist to find direction in his life. A touching story about genius, friendship, and self-discovery.',
    poster_path: '/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg',
    release_date: '1997-12-05',
    vote_average: 8.3,
    genre_ids: [18, 10749]
  },
  'The Matrix': {
    id: 603,
    title: 'The Matrix',
    overview: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    poster_path: '/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    release_date: '1999-03-30',
    vote_average: 8.7,
    genre_ids: [28, 878]
  },
  'Blade Runner 2049': {
    id: 335984,
    title: 'Blade Runner 2049',
    overview: 'Thirty years after the events of the first film, a new blade runner, LAPD Officer K, unearths a long-buried secret that has the potential to plunge what\'s left of society into chaos.',
    poster_path: '/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    release_date: '2017-10-04',
    vote_average: 8.0,
    genre_ids: [878, 18]
  },
  'Inception': {
    id: 27205,
    title: 'Inception',
    overview: 'Dom Cobb is a skilled thief, the absolute best in the dangerous art of extraction, stealing valuable secrets from deep within the subconscious during the dream state.',
    poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    genre_ids: [28, 878, 53]
  },
  'Interstellar': {
    id: 157336,
    title: 'Interstellar',
    overview: 'The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.',
    poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    release_date: '2014-11-05',
    vote_average: 8.6,
    genre_ids: [18, 878]
  },
  'The Prestige': {
    id: 1124,
    title: 'The Prestige',
    overview: 'A mysterious story of two magicians whose intense rivalry leads them on a life-long battle for supremacy -- full of obsession, deceit and jealousy.',
    poster_path: '/tRNlZbgNCNOpLpbPEz5L8G8A0JN.jpg',
    release_date: '2006-10-17',
    vote_average: 8.5,
    genre_ids: [18, 9648, 878]
  },
  'Better Call Saul': {
    id: 60059,
    title: 'Better Call Saul',
    overview: 'Six years before Saul Goodman meets Walter White. We meet him when the man who will become Saul Goodman is known as Jimmy McGill, a small-time lawyer searching for his destiny.',
    poster_path: '/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg',
    first_air_date: '2015-02-08',
    vote_average: 8.9,
    genre_ids: [80, 18]
  },
  'The Wire': {
    id: 1438,
    title: 'The Wire',
    overview: 'Told from the points of view of both the Baltimore homicide and narcotics detectives and their targets, the series captures a universe in which the national war on drugs has become a permanent, self-sustaining bureaucracy.',
    poster_path: '/4lbclFySvugI51fwsyxBTOm4DqK.jpg',
    first_air_date: '2002-06-02',
    vote_average: 9.3,
    genre_ids: [80, 18]
  },
  'The Departed': {
    id: 1422,
    title: 'The Departed',
    overview: 'To take down South Boston\'s Irish Mafia, the police send in one of their own to infiltrate the underworld, not realizing the syndicate has done likewise. A gripping crime thriller from Martin Scorsese.',
    poster_path: '/nT97ifVT2J1yMQmeq20Qblg61T.jpg',
    release_date: '2006-10-06',
    vote_average: 8.5,
    genre_ids: [80, 18, 53]
  },
  'The Town': {
    id: 36669,
    title: 'The Town',
    overview: 'A longtime thief, planning his next job, tries to balance his feelings for a bank manager connected to an earlier heist and a hell-bent FBI agent looking to bring him and his crew down.',
    poster_path: '/3NIe7BPWysOCJ9VSwCthmKfQwGr.jpg',
    release_date: '2010-09-17',
    vote_average: 7.4,
    genre_ids: [80, 18, 53]
  },
  'Mystic River': {
    id: 1995,
    title: 'Mystic River',
    overview: 'The lives of three men who were childhood friends are shattered when one of them has a family tragedy. A powerful drama about friendship, loss, and the secrets we keep.',
    poster_path: '/hCY4Yf5GvKr6qs1es4XQFe3xDGX.jpg',
    release_date: '2003-10-08',
    vote_average: 7.9,
    genre_ids: [80, 18, 53]
  },
  'Fever Pitch': {
    id: 9603,
    title: 'Fever Pitch',
    overview: 'A romantic comedy about a man\'s obsession with the Boston Red Sox and how it affects his relationship with his girlfriend. Can love triumph over baseball?',
    poster_path: '/xdyJ6VF6SgPPKEKhZW5I5ANlMZ.jpg',
    release_date: '2005-04-08',
    vote_average: 6.2,
    genre_ids: [35, 10749]
  },
  'Ted': {
    id: 72190,
    title: 'Ted',
    overview: 'John Bennett, a man whose childhood wish of bringing his teddy bear to life came true, now must decide between keeping the relationship with the bear or his girlfriend, Lori.',
    poster_path: '/vNBIPr0TYVZVHiNw9iMJhZoyCzW.jpg',
    release_date: '2012-06-29',
    vote_average: 6.4,
    genre_ids: [35, 14]
  }
};

export const mockArtistData: Record<string, Artist> = {
  'The Beatles': {
    id: 0,
    name: 'The Beatles',
    biography: 'The Beatles were an English rock band formed in Liverpool in 1960. Regarded as the most influential band of all time, they were integral to pop music\'s evolution into an art form and to popular culture\'s evolution into a counterculture.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/The_Fabs.JPG/440px-The_Fabs.JPG',
    formed: '1960',
    genres: ['Rock', 'Pop Rock', 'Psychedelic Rock'],
    members: ['John Lennon', 'Paul McCartney', 'George Harrison', 'Ringo Starr']
  },
  'The Rolling Stones': {
    id: 1,
    name: 'The Rolling Stones',
    biography: 'The Rolling Stones are an English rock band formed in London in 1962. Active for six decades, they are one of the most popular and enduring bands of the rock era.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Rolling_Stones_1964.jpg/440px-Rolling_Stones_1964.jpg',
    formed: '1962',
    genres: ['Rock', 'Blues Rock', 'Hard Rock'],
    members: ['Mick Jagger', 'Keith Richards', 'Charlie Watts', 'Ronnie Wood']
  },
  'The Kinks': {
    id: 2,
    name: 'The Kinks',
    biography: 'The Kinks were an English rock band formed in Muswell Hill, north London, in 1963 by brothers Ray and Dave Davies.',
    image: 'https://i.scdn.co/image/ab6761610000e5eb2fead84e3dfc96c5db3cd337',
    formed: '1963',
    genres: ['Rock', 'Pop Rock', 'British Invasion'],
    members: ['Ray Davies', 'Dave Davies', 'Mick Avory', 'Pete Quaife']
  },
  'The Who': {
    id: 3,
    name: 'The Who',
    biography: 'The Who are an English rock band formed in London in 1964. Known for explosive live performances and rock operas.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/The_Who_1975.jpg/440px-The_Who_1975.jpg',
    formed: '1964',
    genres: ['Rock', 'Hard Rock', 'Art Rock'],
    members: ['Roger Daltrey', 'Pete Townshend', 'John Entwistle', 'Keith Moon']
  },
  'Led Zeppelin': {
    id: 4,
    name: 'Led Zeppelin',
    biography: 'Led Zeppelin were an English rock band formed in London in 1968. Pioneers of heavy metal and hard rock.',
    image: 'https://i.scdn.co/image/ab6761610000e5eb4416aac22560dbb93f886f8c',
    formed: '1968',
    genres: ['Rock', 'Hard Rock', 'Heavy Metal', 'Blues Rock'],
    members: ['Robert Plant', 'Jimmy Page', 'John Paul Jones', 'John Bonham']
  },
  'Pink Floyd': {
    id: 5,
    name: 'Pink Floyd',
    biography: 'Pink Floyd were an English rock band formed in London in 1965. Known for their progressive and psychedelic music.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Pink_Floyd_1971.jpg/440px-Pink_Floyd_1971.jpg',
    formed: '1965',
    genres: ['Progressive Rock', 'Psychedelic Rock', 'Art Rock'],
    members: ['David Gilmour', 'Roger Waters', 'Richard Wright', 'Nick Mason']
  },
  'Lorde': {
    id: 6,
    name: 'Lorde',
    biography: 'Ella Marija Lani Yelich-O\'Connor, known professionally as Lorde, is a New Zealand singer-songwriter.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Lorde_Primavera19_%281%29_%28cropped%29.jpg/440px-Lorde_Primavera19_%281%29_%28cropped%29.jpg',
    formed: '2011',
    genres: ['Electropop', 'Art Pop', 'Dream Pop'],
    members: ['Lorde']
  },
  'Phoebe Bridgers': {
    id: 7,
    name: 'Phoebe Bridgers',
    biography: 'Phoebe Lucille Bridgers is an American singer-songwriter known for her indie rock and indie folk sound.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Phoebe_Bridgers_-_Green_Man_Festival_2022_%2852335%29_%28cropped%29.jpg/440px-Phoebe_Bridgers_-_Green_Man_Festival_2022_%2852335%29_%28cropped%29.jpg',
    formed: '2017',
    genres: ['Indie Rock', 'Indie Folk', 'Alternative Rock'],
    members: ['Phoebe Bridgers']
  },
  'Clairo': {
    id: 8,
    name: 'Clairo',
    biography: 'Claire Elizabeth Cottrill, known professionally as Clairo, is an American singer-songwriter.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Clairo_-_Primavera_Sound_2019_%28cropped%29.jpg/440px-Clairo_-_Primavera_Sound_2019_%28cropped%29.jpg',
    formed: '2017',
    genres: ['Bedroom Pop', 'Indie Pop', 'Lo-fi'],
    members: ['Clairo']
  },
  'Olivia Rodrigo': {
    id: 9,
    name: 'Olivia Rodrigo',
    biography: 'Olivia Isabel Rodrigo is an American singer-songwriter and actress.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Olivia_Rodrigo_VMA_2023.png/440px-Olivia_Rodrigo_VMA_2023.png',
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
    title: 'If you like "The Beatles", try these FIVE ALIKE...',
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
    title: 'If you like "Inception", try these FIVE ALIKE...',
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
    title: 'If you like "Taylor Swift", try these FIVE ALIKE...',
    author: '@musiclover',
    category: 'Music',
    date: '8/20/2025',
    votes: 892,
    upvotes: 1000,
    downvotes: 108,
    userVote: null,
    highFives: 9,
    userHighFived: false,
    items: ['Lorde', 'Phoebe Bridgers', 'Clairo', 'Olivia Rodrigo', 'Conan Gray'],
    description: 'These artists share Taylor Swift\'s gift for turning personal experiences into universal anthems that hit you right in the feels! Lorde captures that same raw honesty about growing up and finding yourself, Phoebe Bridgers writes devastatingly beautiful songs about heartbreak and healing, Clairo creates dreamy indie-pop perfect for late-night introspection, Olivia Rodrigo channels teenage emotions with the intensity Taylor perfected, and Conan Gray tells stories of youth and longing with cinematic detail. Each artist masters the art of making you feel understood through their vulnerability and storytelling genius.',
    comments: mockComments,
    saves: 678
  },
  {
    id: 4,
    title: 'If you like "Breaking Bad", try these FIVE ALIKE...',
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
    title: 'If you like "Stranger Things", try these FIVE ALIKE...',
    author: '@tvfan',
    category: 'TV Shows',
    date: '8/19/2025',
    votes: 445,
    upvotes: 520,
    downvotes: 75,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Dark', 'The OA', 'Twin Peaks', 'X-Files', 'Supernatural'],
    description: 'Get ready for more supernatural mysteries that blend sci-fi thrills with incredible ensemble storytelling! Dark is a German masterpiece that makes Stranger Things look simple - it\'s a time-travel puzzle that will have you drawing diagrams, The OA creates one of the most unique and controversial supernatural narratives ever filmed, Twin Peaks pioneered the "small town with dark secrets" genre that Stranger Things perfected, X-Files gives you that classic "monster of the week" format with an overarching alien conspiracy, and Supernatural delivers 15 seasons of brotherhood, monsters, and mythology. Each show captures that perfect blend of supernatural terror and character-driven storytelling that makes you binge entire seasons.',
    comments: [],
    saves: 334
  },

  // Removed duplicate Beatles list (was ID 6)
  // Removed duplicate Taylor Swift list (was ID 7)
  // Removed duplicate Beatles list (was ID 8)

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

    // Ensure we have a valid baseTitle - fallback to first item from category's first set if needed
    let baseTitle = items[0];
    if (!baseTitle && itemSets[category] && itemSets[category].length > 0) {
      baseTitle = itemSets[category][0][0];
    }
    if (!baseTitle) {
      baseTitle = defaultItems[0];
    }

    const title = `If you like "${baseTitle}", try these FIVE ALIKE...`;
    
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
    title: 'If you like "Nickelback", try these FIVE ALIKE...',
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
    title: 'If you like "Cats (2019)", try these FIVE ALIKE...',
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
    title: 'If you like "Twilight", try these FIVE ALIKE...',
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
    title: 'If you like "The Big Bang Theory", try these FIVE ALIKE...',
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
    title: 'If you like "Cyberpunk 2077 (Launch)", try these FIVE ALIKE...',
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
    title: 'If you like "Pineapple on Pizza", try these FIVE ALIKE...',
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
    title: 'If you like "Crocs", try these FIVE ALIKE...',
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
    title: 'If you like "Vertical Phone Videos", try these FIVE ALIKE...',
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
    title: 'If you like "CrossFit", try these FIVE ALIKE...',
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
    title: 'If you like "Comic Sans", try these FIVE ALIKE...',
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
    id: 201,
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
    id: 202,
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
    id: 203,
    title: 'If you like "Fenway Park", try these 5 Boston sports experiences...',
    author: '@redsoxfan',
    category: 'Sports',
    date: '8/23/2025',
    votes: 89,
    upvotes: 95,
    downvotes: 6,
    userVote: null,
    highFives: 12, // Keep this one as High Fived
    userHighFived: false,
    items: ['TD Garden (Celtics/Bruins)', 'Gillette Stadium (Patriots)', 'Harvard Stadium', 'Boston Marathon Route', 'Head of the Charles Regatta'],
    description: 'Iconic Boston sports venues and events that capture the city\'s athletic spirit.',
    comments: [],
    saves: 41
  },
  {
    id: 204,
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
    id: 205,
    title: 'If you like "Freedom Trail", try these 5 Boston historic sites...',
    author: '@historyboston',
    category: 'History',
    date: '8/21/2025',
    votes: 56,
    upvotes: 65,
    downvotes: 9,
    userVote: null,
    highFives: 7,
    userHighFived: false,
    items: ['USS Constitution', 'Boston Tea Party Ships', 'Paul Revere House', 'Old South Meeting House', 'Bunker Hill Monument'],
    description: 'Revolutionary War sites that shaped American history.',
    comments: [],
    saves: 29
  },
  {
    id: 206,
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
    id: 207,
    title: 'If you like "Good Will Hunting", try these 5 Boston movies...',
    author: '@bostonfilmbuff',
    category: 'Movies',
    date: '8/19/2025',
    votes: 84,
    upvotes: 90,
    downvotes: 6,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['The Departed', 'The Town', 'Mystic River', 'Fever Pitch', 'Ted'],
    description: 'Films that perfectly capture Boston\'s spirit and character.',
    comments: [],
    saves: 47
  },
  {
    id: 208,
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
    id: 209,
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
    id: 210,
    title: 'If you like "Sam Adams", try these 5 Boston breweries...',
    author: '@beerboston',
    category: 'Food',
    date: '8/16/2025',
    votes: 71,
    upvotes: 80,
    downvotes: 9,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Harpoon Brewery', 'Trillium Brewing', 'Night Shift Brewing', 'Aeronaut Brewing', 'Lamplighter Brewing'],
    description: 'Local Boston breweries making incredible craft beer.',
    comments: [],
    saves: 45
  },
  {
    id: 211,
    title: 'If you like "MIT", try these 5 Boston tech companies...',
    author: '@bostontechie',
    category: 'Technology',
    date: '8/15/2025',
    votes: 92,
    upvotes: 100,
    downvotes: 8,
    userVote: null,
    highFives: 9,
    userHighFived: false,
    items: ['HubSpot', 'Wayfair', 'Toast', 'DraftKings', 'TripAdvisor'],
    description: 'Innovative tech companies that call Boston home.',
    comments: [],
    saves: 58
  },
  {
    id: 212,
    title: 'If you like "Boston Marathon", try these 5 running routes...',
    author: '@bostonrunner',
    category: 'Fitness',
    date: '8/14/2025',
    votes: 64,
    upvotes: 70,
    downvotes: 6,
    userVote: null,
    highFives: 7,
    userHighFived: false,
    items: ['Charles River Esplanade', 'Minuteman Bikeway', 'Emerald Necklace', 'Harbour Walk', 'Fresh Pond Loop'],
    description: 'Best running and walking paths around Boston.',
    comments: [],
    saves: 36
  },
  {
    id: 213,
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
    id: 214,
    title: 'If you like "Isabella Stewart Gardner Museum", try these 5 Boston museums...',
    author: '@bostonart',
    category: 'Art',
    date: '8/12/2025',
    votes: 49,
    upvotes: 55,
    downvotes: 6,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Museum of Fine Arts', 'Institute of Contemporary Art', 'Harvard Art Museums', 'Museum of Science', 'Boston Children\'s Museum'],
    description: 'World-class museums showcasing art, science, and culture in Boston.',
    comments: [],
    saves: 31
  },
  {
    id: 215,
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
    id: 216,
    title: 'If you like "Dunkin\' Donuts", try these 5 Boston coffee shops...',
    author: '@bostoncoffee',
    category: 'Food',
    date: '8/10/2025',
    votes: 78,
    upvotes: 85,
    downvotes: 7,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Blue Bottle Coffee', 'George Howell Coffee', 'Thinking Cup', 'Pavement Coffeehouse', 'Render Coffee'],
    description: 'Local Boston coffee roasters and cafes beyond the chains.',
    comments: [],
    saves: 43
  },
  {
    id: 217,
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
    id: 218,
    title: 'If you like "Dropkick Murphys", try these 5 Boston bands...',
    author: '@bostonpunk',
    category: 'Music',
    date: '8/8/2025',
    votes: 69,
    upvotes: 75,
    downvotes: 6,
    userVote: null,
    highFives: 9,
    userHighFived: false,
    items: ['The Mighty Mighty Bosstones', 'Street Dogs', 'The Bruisers', 'Blood for Blood', 'Gang Green'],
    description: 'Boston punk and ska bands that rock as hard as the Dropkicks.',
    comments: [],
    saves: 37
  },
  {
    id: 219,
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
    highFives: 8,
    userHighFived: false,
    items: ['Trillium Brewing Company', 'Night Shift Brewing', 'Harpoon Brewery', 'Samuel Adams Boston Brewery', 'Cambridge Brewing Company'],
    description: 'The best local breweries and beer bars in Boston and Cambridge.',
    comments: [],
    saves: 42
  },
  // Boston Restaurants
  {
    id: 303,
    title: 'If you like "Giacomo\'s Ristorante", try these 5 North End Italian restaurants...',
    author: '@south_end_local',
    category: 'Food',
    date: '8/24/2025',
    votes: 156,
    upvotes: 165,
    downvotes: 9,
    userVote: null,
    highFives: 8, // Keep this one as High Fived
    userHighFived: false,
    items: ['Giacomo\'s Ristorante', 'Bricco', 'Neptune Oyster', 'Regina Pizzeria', 'Modern Pastry'],
    description: 'Authentic Italian dining experiences in Boston\'s historic North End.',
    comments: [],
    saves: 78
  },
  // Boston Colleges
  {
    id: 304,
    title: 'If you like "Harvard University", try these 5 Boston area universities...',
    author: '@harvard_grad',
    category: 'Travel',
    date: '8/23/2025',
    votes: 134,
    upvotes: 142,
    downvotes: 8,
    userVote: null,
    highFives: 8,
    userHighFived: false,
    items: ['Harvard University', 'MIT', 'Boston University', 'Northeastern University', 'Emerson College'],
    description: 'Beautiful campuses and student life in the Boston area.',
    comments: [],
    saves: 56
  },
  // Boston Shopping
  {
    id: 305,
    title: 'If you like "Newbury Street", try these 5 Boston shopping districts...',
    author: '@beacon_hill_guide',
    category: 'Travel',
    date: '8/22/2025',
    votes: 98,
    upvotes: 107,
    downvotes: 9,
    userVote: null,
    highFives: 7,
    userHighFived: false,
    items: ['Newbury Street', 'Faneuil Hall Marketplace', 'Prudential Center', 'Harvard Square', 'Legacy Place'],
    description: 'From high-end boutiques to local markets in Boston.',
    comments: [],
    saves: 43
  },
  // Boston Sightseeing
  {
    id: 306,
    title: 'If you like "Paul Revere House", try these 5 Freedom Trail must-sees...',
    author: '@bostonexplorer',
    category: 'Travel',
    date: '8/21/2025',
    votes: 201,
    upvotes: 215,
    downvotes: 14,
    userVote: null,
    highFives: 25, // Keep this one as High Fived
    userHighFived: false,
    items: ['Boston Common', 'Faneuil Hall', 'Paul Revere House', 'Old North Church', 'USS Constitution'],
    description: 'Historic landmarks along Boston\'s famous Freedom Trail.',
    comments: [],
    saves: 89
  },
  // Boston Museums
  {
    id: 307,
    title: 'If you like "Museum of Fine Arts", try these 5 Boston museums...',
    author: '@patriots_fan',
    category: 'Art',
    date: '8/20/2025',
    votes: 167,
    upvotes: 178,
    downvotes: 11,
    userVote: null,
    highFives: 18, // Keep this one as High Fived
    userHighFived: false,
    items: ['Museum of Fine Arts', 'Boston Tea Party Ships', 'MIT Museum', 'Isabella Stewart Gardner Museum', 'Boston Children\'s Museum'],
    description: 'World-class museums and cultural attractions in Boston.',
    comments: [],
    saves: 72
  },

  // DUPLICATE LISTS TO TEST STACKED EFFECT
  // These identical lists will be detected by detectTwins() and merged with twinCount

  // First duplicate set - Marvel Movies
  {
    id: 1001,
    title: 'If you like "Iron Man", try these FIVE ALIKE...',
    author: '@marvel_fan',
    category: 'Movies',
    date: '8/15/2025',
    votes: 95,
    upvotes: 120,
    downvotes: 25,
    userVote: null,
    highFives: 15,
    userHighFived: false,
    items: ['The Dark Knight', 'Spider-Man: Into the Spider-Verse', 'Wonder Woman', 'Guardians of the Galaxy', 'Captain America: The Winter Soldier'],
    description: 'If you love Iron Man\'s mix of tech, humor, and heroics, these superhero films deliver the same energy with their own unique twists.',
    comments: [],
    saves: 45
  },
  {
    id: 1002,
    title: 'If you like "Iron Man", try these FIVE ALIKE...',
    author: '@superhero_guru',
    category: 'Movies',
    date: '8/14/2025',
    votes: 88,
    upvotes: 115,
    downvotes: 27,
    userVote: null,
    highFives: 12,
    userHighFived: false,
    items: ['The Dark Knight', 'Spider-Man: Into the Spider-Verse', 'Wonder Woman', 'Guardians of the Galaxy', 'Captain America: The Winter Soldier'],
    description: 'If you love Iron Man\'s mix of tech, humor, and heroics, these superhero films deliver the same energy with their own unique twists.',
    comments: [],
    saves: 38
  },
  {
    id: 1003,
    title: 'If you like "Iron Man", try these FIVE ALIKE...',
    author: '@comic_book_lover',
    category: 'Movies',
    date: '8/13/2025',
    votes: 102,
    upvotes: 125,
    downvotes: 23,
    userVote: null,
    highFives: 18,
    userHighFived: false,
    items: ['The Dark Knight', 'Spider-Man: Into the Spider-Verse', 'Wonder Woman', 'Guardians of the Galaxy', 'Captain America: The Winter Soldier'],
    description: 'If you love Iron Man\'s mix of tech, humor, and heroics, these superhero films deliver the same energy with their own unique twists.',
    comments: [],
    saves: 52
  },

  // Second duplicate set - Coding Music
  {
    id: 1004,
    title: 'If you like "Lo-Fi Hip Hop", try these FIVE ALIKE...',
    author: '@coder_vibes',
    category: 'Music',
    date: '8/12/2025',
    votes: 67,
    upvotes: 82,
    downvotes: 15,
    userVote: null,
    highFives: 9,
    userHighFived: false,
    items: ['Chillhop Essentials', 'Jazz Vibes', 'Ambient Study Music', 'Piano Collections', 'Synthwave Chill'],
    description: 'Perfect background music for coding, studying, or just relaxing. These genres complement lo-fi hip hop\'s peaceful, focused energy.',
    comments: [],
    saves: 34
  },
  {
    id: 1005,
    title: 'If you like "Lo-Fi Hip Hop", try these FIVE ALIKE...',
    author: '@study_beats',
    category: 'Music',
    date: '8/11/2025',
    votes: 73,
    upvotes: 89,
    downvotes: 16,
    userVote: null,
    highFives: 11,
    userHighFived: false,
    items: ['Chillhop Essentials', 'Jazz Vibes', 'Ambient Study Music', 'Piano Collections', 'Synthwave Chill'],
    description: 'Perfect background music for coding, studying, or just relaxing. These genres complement lo-fi hip hop\'s peaceful, focused energy.',
    comments: [],
    saves: 41
  },

  // Third duplicate set - Fantasy Books (5 duplicates!)
  {
    id: 1006,
    title: 'If you like "Harry Potter", try these FIVE ALIKE...',
    author: '@fantasy_reader',
    category: 'Books',
    date: '8/10/2025',
    votes: 134,
    upvotes: 156,
    downvotes: 22,
    userVote: null,
    highFives: 25,
    userHighFived: false,
    items: ['Percy Jackson & The Olympians', 'The Chronicles of Narnia', 'His Dark Materials', 'Artemis Fowl', 'The Inheritance Cycle'],
    description: 'These magical adventures capture the wonder, friendship, and coming-of-age themes that make Harry Potter so beloved.',
    comments: [],
    saves: 78
  },
  {
    id: 1007,
    title: 'If you like "Harry Potter", try these FIVE ALIKE...',
    author: '@bookworm_magic',
    category: 'Books',
    date: '8/9/2025',
    votes: 128,
    upvotes: 149,
    downvotes: 21,
    userVote: null,
    highFives: 22,
    userHighFived: false,
    items: ['Percy Jackson & The Olympians', 'The Chronicles of Narnia', 'His Dark Materials', 'Artemis Fowl', 'The Inheritance Cycle'],
    description: 'These magical adventures capture the wonder, friendship, and coming-of-age themes that make Harry Potter so beloved.',
    comments: [],
    saves: 71
  },
  {
    id: 1008,
    title: 'If you like "Harry Potter", try these FIVE ALIKE...',
    author: '@young_adult_novels',
    category: 'Books',
    date: '8/8/2025',
    votes: 145,
    upvotes: 167,
    downvotes: 22,
    userVote: null,
    highFives: 28,
    userHighFived: false,
    items: ['Percy Jackson & The Olympians', 'The Chronicles of Narnia', 'His Dark Materials', 'Artemis Fowl', 'The Inheritance Cycle'],
    description: 'These magical adventures capture the wonder, friendship, and coming-of-age themes that make Harry Potter so beloved.',
    comments: [],
    saves: 85
  },
  {
    id: 1009,
    title: 'If you like "Harry Potter", try these FIVE ALIKE...',
    author: '@library_lover',
    category: 'Books',
    date: '8/7/2025',
    votes: 139,
    upvotes: 162,
    downvotes: 23,
    userVote: null,
    highFives: 26,
    userHighFived: false,
    items: ['Percy Jackson & The Olympians', 'The Chronicles of Narnia', 'His Dark Materials', 'Artemis Fowl', 'The Inheritance Cycle'],
    description: 'These magical adventures capture the wonder, friendship, and coming-of-age themes that make Harry Potter so beloved.',
    comments: [],
    saves: 82
  },
  {
    id: 1010,
    title: 'If you like "Harry Potter", try these FIVE ALIKE...',
    author: '@fantasy_enthusiast',
    category: 'Books',
    date: '8/6/2025',
    votes: 142,
    upvotes: 165,
    downvotes: 23,
    userVote: null,
    highFives: 29,
    userHighFived: false,
    items: ['Percy Jackson & The Olympians', 'The Chronicles of Narnia', 'His Dark Materials', 'Artemis Fowl', 'The Inheritance Cycle'],
    description: 'These magical adventures capture the wonder, friendship, and coming-of-age themes that make Harry Potter so beloved.',
    comments: [],
    saves: 88
  },
  // San Francisco Lists
  {
    id: 101,
    title: 'If you like "Blue Bottle Coffee", try these 5 SF coffee spots',
    author: 'sfcoffeeguide',
    category: 'Food & Drink',
    items: ['Ritual Coffee Roasters', 'Four Barrel Coffee', 'Sightglass Coffee', 'Philz Coffee', 'Saint Frank Coffee'],
    votes: 142,
    created_at: '2024-01-28T10:30:00Z',
    isRejected: false,
    description: 'The best third-wave coffee culture San Francisco has to offer, from Mission District gems to SOMA favorites.',
    comments: [
      { id: '101-1', username: '@caffeinehunter', content: 'Ritual Coffee is my daily go-to! Their espresso is unmatched.', timestamp: '2024-01-28T14:15:00Z', avatar: '☕' },
      { id: '101-2', username: '@fogcitybeans', content: 'You missed Andytown Coffee! Their Snowy Plover is legendary.', timestamp: '2024-01-29T09:22:00Z', avatar: '🌊' }
    ],
    saves: 89
  },
  {
    id: 102,
    title: 'If you like "Golden Gate Park hiking", try these 5 SF outdoor spots',
    author: 'sfhiker',
    category: 'Travel',
    items: ['Lands End', 'Mount Davidson', 'Twin Peaks', 'Crissy Field', 'Baker Beach'],
    votes: 98,
    created_at: '2024-01-27T16:45:00Z',
    isRejected: false,
    description: 'Escape the city bustle with these stunning outdoor spaces perfect for hiking, walking, and nature photography.',
    comments: [
      { id: '102-1', username: '@outdoorSF', content: 'Twin Peaks at sunset is absolutely magical! Great views of the whole city.', timestamp: '2024-01-27T18:30:00Z', avatar: '🏔️' },
      { id: '102-2', username: '@naturelover415', content: 'Lands End has the best coastal trails. Don\'t forget the Camera Obscura!', timestamp: '2024-01-28T07:45:00Z', avatar: '📸' }
    ],
    saves: 76
  },
  // New York City Lists
  {
    id: 103,
    title: 'If you like "Joe\'s Pizza", try these 5 NYC slice shops',
    author: 'nycsliceguide',
    category: 'Food & Drink',
    items: ['Prince Street Pizza', 'Di Fara Pizza', 'Lucali', 'Roberta\'s', 'L\'industrie Pizzeria'],
    votes: 234,
    created_at: '2024-01-26T12:20:00Z',
    isRejected: false,
    description: 'From classic New York slices to artisanal pies, these spots represent the best pizza culture NYC has to offer.',
    comments: [
      { id: '103-1', username: '@pizzanyc', content: 'Prince Street Pizza pepperoni is life! Worth the wait every time.', timestamp: '2024-01-26T15:10:00Z', avatar: '🍕' },
      { id: '103-2', username: '@brooklynfoodie', content: 'Di Fara is legendary but Roberta\'s wood-fired pies are incredible too.', timestamp: '2024-01-27T11:35:00Z', avatar: '🔥' }
    ],
    saves: 156
  },
  {
    id: 104,
    title: 'If you like "Central Park", try these 5 NYC green spaces',
    author: 'nyparks',
    category: 'Travel',
    items: ['Prospect Park', 'Bryant Park', 'Washington Square Park', 'The High Line', 'Brooklyn Bridge Park'],
    votes: 187,
    created_at: '2024-01-25T14:30:00Z',
    isRejected: false,
    description: 'Discover NYC\'s incredible park system beyond the famous Central Park, from Brooklyn gems to Manhattan oases.',
    comments: [
      { id: '104-1', username: '@parkhopper', content: 'The High Line is such a unique experience! Walking above the city streets.', timestamp: '2024-01-25T16:45:00Z', avatar: '🌿' },
      { id: '104-2', username: '@greenspacenyc', content: 'Brooklyn Bridge Park has the best Manhattan skyline views, especially at golden hour.', timestamp: '2024-01-26T08:20:00Z', avatar: '🌉' }
    ],
    saves: 123
  },
  // Burbank, CA Lists
  {
    id: 105,
    title: 'If you like "Warner Bros Studio Tour", try these 5 Burbank film spots',
    author: 'burbankfilmbuff',
    category: 'Entertainment',
    items: ['Disney Studios', 'NBC Universal Studios', 'Nickelodeon Animation Studio', 'Cartoon Network Studios', 'DreamWorks Animation'],
    votes: 76,
    created_at: '2024-01-24T11:15:00Z',
    isRejected: false,
    description: 'Burbank is the heart of entertainment! These studios and locations showcase the magic of film and TV production.',
    comments: [
      { id: '105-1', username: '@hollywoodtours', content: 'The Disney Studios tour is amazing but sadly not open to public. Warner Bros is the best you can actually visit!', timestamp: '2024-01-24T13:30:00Z', avatar: '🎬' },
      { id: '105-2', username: '@animationfan', content: 'Love seeing where all my favorite cartoons are made! Burbank is animation central.', timestamp: '2024-01-25T09:45:00Z', avatar: '🎨' }
    ],
    saves: 45
  },
  {
    id: 106,
    title: 'If you like "Olive Garden", try these 5 Burbank Italian restaurants',
    author: 'burbankfoodie',
    category: 'Food & Drink',
    items: ['Castaway Restaurant', 'Tony\'s Little Bit Pizza', 'Pinocchio Restaurant', 'Granville Cafe', 'Casa Vega'],
    votes: 52,
    created_at: '2024-01-23T18:45:00Z',
    isRejected: false,
    description: 'Step up your Italian dining game with these local Burbank favorites that beat chain restaurants every time.',
    comments: [
      { id: '106-1', username: '@localeats', content: 'Castaway has the most incredible view! Perfect for date nights.', timestamp: '2024-01-23T20:15:00Z', avatar: '🌆' },
      { id: '106-2', username: '@pastaperfection', content: 'Tony\'s Little Bit Pizza has been a family favorite for decades. Classic Italian-American comfort food.', timestamp: '2024-01-24T07:30:00Z', avatar: '🍝' }
    ],
    saves: 38
  },
  // Toms River, NJ Lists
  {
    id: 107,
    title: 'If you like "Seaside Heights Boardwalk", try these 5 Toms River area attractions',
    author: 'jerseyshorelocal',
    category: 'Travel',
    items: ['Island Beach State Park', 'Cattus Island County Park', 'Ocean County Park', 'Double Trouble State Park', 'Tices Shoal'],
    votes: 43,
    created_at: '2024-01-22T15:20:00Z',
    isRejected: false,
    description: 'Beyond the famous boardwalk, Toms River area offers incredible natural beauty and outdoor recreation.',
    comments: [
      { id: '107-1', username: '@jerseyexplorer', content: 'Island Beach State Park is pristine! So much wildlife and beautiful beaches.', timestamp: '2024-01-22T17:40:00Z', avatar: '🦅' },
      { id: '107-2', username: '@naturenj', content: 'Cattus Island has great hiking trails and the butterfly garden is lovely in summer.', timestamp: '2024-01-23T12:10:00Z', avatar: '🦋' }
    ],
    saves: 29
  },
  {
    id: 108,
    title: 'If you like "Jersey Shore pizza", try these 5 Toms River pizza spots',
    author: 'tomsriverpizza',
    category: 'Food & Drink',
    items: ['Santoros Pizza', 'Gino\'s Pizza', 'Tony\'s Brick Oven Pizza', 'Villa Roma Pizza', 'Jerry\'s Pizza'],
    votes: 38,
    created_at: '2024-01-21T13:55:00Z',
    isRejected: false,
    description: 'The Jersey Shore has its own pizza style, and Toms River delivers some of the best pies down the shore.',
    comments: [
      { id: '108-1', username: '@shorepizza', content: 'Santoros has been my family\'s go-to since I was a kid. Their grandma pie is incredible!', timestamp: '2024-01-21T16:25:00Z', avatar: '🍕' },
      { id: '108-2', username: '@jerseyslice', content: 'Tony\'s brick oven makes all the difference. You can taste the smoky flavor in every bite.', timestamp: '2024-01-22T10:40:00Z', avatar: '🔥' }
    ],
    saves: 27
  },
  // Boston Lists
  {
    id: 109,
    title: 'If you like "the Freedom Trail", try these 5 Boston historical walks',
    author: 'bostonhistorian',
    category: 'Travel',
    items: ['Black Heritage Trail', 'Women\'s Heritage Trail', 'Literary Trail', 'Boston Harborwalk', 'Irish Heritage Trail'],
    votes: 156,
    created_at: '2024-01-20T09:30:00Z',
    isRejected: false,
    description: 'Dive deeper into Boston\'s rich history beyond the famous Freedom Trail with these specialized walking tours.',
    comments: [
      { id: '109-1', username: '@beantown walker', content: 'The Black Heritage Trail is so important and beautifully presented. Learned so much about Boston\'s abolitionist history.', timestamp: '2024-01-20T11:45:00Z', avatar: '📚' },
      { id: '109-2', username: '@literaryboston', content: 'The Literary Trail takes you through all the spots where famous authors lived and worked. Perfect for book lovers!', timestamp: '2024-01-21T08:15:00Z', avatar: '✍️' }
    ],
    saves: 98
  },
  {
    id: 110,
    title: 'If you like "Fenway Park", try these 5 Boston sports experiences',
    author: 'bostonsportsfan',
    category: 'Sports',
    items: ['TD Garden (Celtics/Bruins)', 'Gillette Stadium Patriots Hall of Fame', 'Boston Marathon finish line', 'Head of the Charles Regatta', 'Boston Common Baseball Fields'],
    votes: 203,
    created_at: '2024-01-19T16:20:00Z',
    isRejected: false,
    description: 'Boston is Sports Town USA! Experience the passion and history that makes this city\'s sports culture legendary.',
    comments: [
      { id: '110-1', username: '@redsoxforever', content: 'Nothing beats Fenway, but TD Garden during playoffs is absolutely electric!', timestamp: '2024-01-19T18:35:00Z', avatar: '⚾' },
      { id: '110-2', username: '@marathonrunner', content: 'Standing at the Boston Marathon finish line on Patriots Day gives me chills every time. The energy is incredible.', timestamp: '2024-01-20T06:50:00Z', avatar: '🏃' }
    ],
    saves: 134
  },
  // Additional diverse lists
  {
    id: 111,
    title: 'If you like "Stranger Things", try these 5 supernatural shows',
    author: 'supernaturaltv',
    category: 'TV Shows',
    items: ['Dark', 'The OA', 'Twin Peaks', 'Supernatural', 'X-Files'],
    votes: 412,
    created_at: '2024-01-18T14:25:00Z',
    isRejected: false,
    description: 'Mind-bending mysteries and supernatural phenomena that will keep you questioning reality just like Hawkins did.',
    comments: [
      { id: '111-1', username: '@mysteryfiend', content: 'Dark is incredible! The time travel elements are so well done, even more complex than Stranger Things.', timestamp: '2024-01-18T16:40:00Z', avatar: '🕰️' },
      { id: '111-2', username: '@upside down fan', content: 'Twin Peaks was the original weird small town mystery. Still holds up decades later!', timestamp: '2024-01-19T11:20:00Z', avatar: '🌲' }
    ],
    saves: 267
  },
  {
    id: 112,
    title: 'If you like "Taylor Swift", try these 5 singer-songwriters',
    author: 'swiftiemusic',
    category: 'Music',
    items: ['Phoebe Bridgers', 'Clairo', 'Lorde', 'Gracie Abrams', 'Olivia Rodrigo'],
    votes: 523,
    created_at: '2024-01-17T12:10:00Z',
    isRejected: false,
    description: 'Emotional storytelling and beautiful melodies from artists who share Taylor\'s gift for connecting with listeners.',
    comments: [
      { id: '112-1', username: '@indieswiftie', content: 'Phoebe Bridgers\' lyrics are pure poetry. If you love Taylor\'s storytelling, you\'ll be obsessed.', timestamp: '2024-01-17T15:30:00Z', avatar: '🎭' },
      { id: '112-2', username: '@popgirlstan', content: 'Olivia Rodrigo gives me early Taylor vibes! Her songwriting at such a young age is incredible.', timestamp: '2024-01-18T09:45:00Z', avatar: '💜' }
    ],
    saves: 345
  },
  {
    id: 113,
    title: 'If you like "Sourdough bread", try these 5 fermented foods',
    author: 'fermentationstation',
    category: 'Food & Drink',
    items: ['Kombucha', 'Kimchi', 'Sauerkraut', 'Kefir', 'Miso'],
    votes: 156,
    created_at: '2024-01-16T08:40:00Z',
    isRejected: false,
    description: 'Explore the wonderful world of fermentation beyond bread - these cultured foods offer amazing flavors and health benefits.',
    comments: [
      { id: '113-1', username: '@gutbeast', content: 'Once you start making your own kombucha, store-bought just doesn\'t compare. So much flavor variety!', timestamp: '2024-01-16T10:55:00Z', avatar: '🫧' },
      { id: '113-2', username: '@fermentfanatic', content: 'Miso is such an underrated ingredient! Adds umami depth to everything from soup to salad dressing.', timestamp: '2024-01-17T07:20:00Z', avatar: '🥣' }
    ],
    saves: 89
  },
  {
    id: 114,
    title: 'If you like "The Office", try these 5 workplace comedies',
    author: 'workplacecomedy',
    category: 'TV Shows',
    items: ['Parks and Recreation', 'Brooklyn Nine-Nine', 'Superstore', 'Abbott Elementary', 'Ted Lasso'],
    votes: 445,
    created_at: '2024-01-15T11:15:00Z',
    isRejected: false,
    description: 'Hilarious workplace dynamics and heartwarming characters that capture the same mockumentary magic.',
    comments: [
      { id: '114-1', username: '@dundiefan', content: 'Parks and Rec starts slow but becomes pure joy. Leslie Knope is the anti-Michael Scott and I love both!', timestamp: '2024-01-15T13:30:00Z', avatar: '🏛️' },
      { id: '114-2', username: '@workplacehumor', content: 'Abbott Elementary is so good! Gives me early Office vibes with the documentary style and workplace chaos.', timestamp: '2024-01-16T06:45:00Z', avatar: '📚' }
    ],
    saves: 298
  },
  {
    id: 115,
    title: 'If you like "Minecraft", try these 5 creative sandbox games',
    author: 'sandboxgamer',
    category: 'Games',
    items: ['Terraria', 'No Man\'s Sky', 'Garry\'s Mod', 'LittleBigPlanet 3', 'Dreams'],
    votes: 287,
    created_at: '2024-01-14T17:30:00Z',
    isRejected: false,
    description: 'Unleash your creativity with these games that offer endless building, crafting, and world-creation possibilities.',
    comments: [
      { id: '115-1', username: '@blockcrafterr', content: 'Terraria is like 2D Minecraft but with so much more content! The boss fights and progression are amazing.', timestamp: '2024-01-14T19:45:00Z', avatar: '⚔️' },
      { id: '115-2', username: '@creativegamer', content: 'Dreams is mind-blowing! You can literally create anything - games, movies, music. The community creations are incredible.', timestamp: '2024-01-15T08:20:00Z', avatar: '🎨' }
    ],
    saves: 198
  },
  {
    id: 116,
    title: 'If you like "Italian pasta", try these 5 global noodle dishes',
    author: 'noodleslover',
    category: 'Food & Drink',
    items: ['Vietnamese Pho', 'Japanese Ramen', 'Thai Pad Thai', 'Chinese Dan Dan Noodles', 'Korean Naengmyeon'],
    votes: 334,
    created_at: '2024-01-13T13:45:00Z',
    isRejected: false,
    description: 'Expand your noodle horizons! These international dishes showcase how different cultures celebrate the art of noodles.',
    comments: [
      { id: '116-1', username: '@noodletraveler', content: 'Dan Dan noodles are criminally underrated! The numbing spice and sesame flavor is addictive.', timestamp: '2024-01-13T16:10:00Z', avatar: '🌶️' },
      { id: '116-2', username: '@ramenobsessed', content: 'Each region of Japan has its own ramen style. Once you go down the ramen rabbit hole, there\'s no coming back!', timestamp: '2024-01-14T09:35:00Z', avatar: '🍜' }
    ],
    saves: 223
  },
  {
    id: 117,
    title: 'If you like "National Parks", try these 5 hidden natural gems',
    author: 'hiddengems explorer',
    category: 'Travel',
    items: ['Antelope Canyon, Arizona', 'Havasu Falls, Arizona', 'Oneonta Gorge, Oregon', 'Thor\'s Well, Oregon', 'Fly Geyser, Nevada'],
    votes: 412,
    created_at: '2024-01-12T10:20:00Z',
    isRejected: false,
    description: 'Incredible natural wonders that rival National Parks but without the crowds - true hidden gems for adventurous travelers.',
    comments: [
      { id: '117-1', username: '@photographynomad', content: 'Antelope Canyon is otherworldly! The light beams through the slot canyon are pure magic.', timestamp: '2024-01-12T12:40:00Z', avatar: '📸' },
      { id: '117-2', username: '@hikemore', content: 'Havasu Falls requires a permit and hiking, but it\'s worth every step. Those turquoise waters are unreal!', timestamp: '2024-01-13T07:15:00Z', avatar: '💧' }
    ],
    saves: 289
  },
  {
    id: 118,
    title: 'If you like "Marvel movies", try these 5 superhero comics',
    author: 'comicbookguru',
    category: 'Books',
    items: ['Watchmen', 'The Boys', 'Saga', 'Invincible', 'The Umbrella Academy'],
    votes: 376,
    created_at: '2024-01-11T15:55:00Z',
    isRejected: false,
    description: 'Dive into the source material and beyond! These comics offer complex superhero stories that go deeper than movies.',
    comments: [
      { id: '118-1', username: '@comicfan4life', content: 'Watchmen is the greatest superhero story ever told. It completely deconstructs the genre in brilliant ways.', timestamp: '2024-01-11T18:20:00Z', avatar: '⚡' },
      { id: '118-2', username: '@graphicnovelgeek', content: 'Saga is so creative! Space opera meets fantasy with incredible art and storytelling. Nothing else like it.', timestamp: '2024-01-12T06:30:00Z', avatar: '🚀' }
    ],
    saves: 245
  },
  {
    id: 119,
    title: 'If you like "The Beatles", try these 5 classic rock bands',
    author: 'classicrockfan',
    category: 'Music',
    items: ['The Beach Boys', 'The Kinks', 'The Zombies', 'Love', 'The Hollies'],
    votes: 298,
    created_at: '2024-01-10T14:30:00Z',
    isRejected: false,
    description: 'Explore the 60s music scene that surrounded and influenced The Beatles with these incredible harmony-driven bands.',
    comments: [
      { id: '119-1', username: '@60smusic', content: 'The Beach Boys\' Pet Sounds is as groundbreaking as Sgt. Pepper\'s! Brian Wilson was a genius.', timestamp: '2024-01-10T16:45:00Z', avatar: '🌊' },
      { id: '119-2', username: '@harmonylover', content: 'The Zombies are so underrated! "Odessey and Oracle" is a masterpiece of psychedelic pop.', timestamp: '2024-01-11T08:55:00Z', avatar: '🧟' }
    ],
    saves: 187
  },
  {
    id: 120,
    title: 'If you like "horror movies", try these 5 psychological thrillers',
    author: 'thrillseeker',
    category: 'Movies',
    items: ['Black Swan', 'Shutter Island', 'The Machinist', 'Memento', 'Mulholland Drive'],
    votes: 445,
    created_at: '2024-01-09T12:15:00Z',
    isRejected: false,
    description: 'Mind-bending films that create horror through psychological tension rather than jump scares or gore.',
    comments: [
      { id: '120-1', username: '@mindBender', content: 'Black Swan made me question everything! Natalie Portman\'s performance is absolutely haunting.', timestamp: '2024-01-09T14:30:00Z', avatar: '🩰' },
      { id: '120-2', username: '@nolancult', content: 'Memento still blows my mind every rewatch. The reverse chronology creates such unique tension.', timestamp: '2024-01-10T11:20:00Z', avatar: '🔄' }
    ],
    saves: 312
  },
  // Continue with more lists covering various interests and locations...
  {
    id: 121,
    title: 'If you like "Starbucks", try these 5 independent coffee roasters',
    author: 'coffeesnob',
    category: 'Food & Drink',
    items: ['Intelligentsia Coffee', 'Counter Culture Coffee', 'Stumptown Coffee', 'Blue Bottle Coffee', 'La Colombe'],
    votes: 198,
    created_at: '2024-01-08T09:40:00Z',
    isRejected: false,
    description: 'Discover the artisanal coffee world beyond corporate chains with these exceptional independent roasters.',
    comments: [
      { id: '121-1', username: '@beanhead', content: 'Intelligentsia opened my eyes to what coffee could really taste like. Their single origins are incredible!', timestamp: '2024-01-08T11:55:00Z', avatar: '☕' },
      { id: '121-2', username: '@thirdwavecoffee', content: 'Counter Culture does amazing direct trade relationships. You can taste the difference ethical sourcing makes.', timestamp: '2024-01-09T07:10:00Z', avatar: '🌱' }
    ],
    saves: 134
  },
  {
    id: 122,
    title: 'If you like "Friends", try these 5 ensemble comedies',
    author: 'sitcomaddict',
    category: 'TV Shows',
    items: ['How I Met Your Mother', 'New Girl', 'The Good Place', 'Community', 'Happy Endings'],
    votes: 523,
    created_at: '2024-01-07T16:25:00Z',
    isRejected: false,
    description: 'Group dynamics and friendship chemistry that captures the same warm, funny feeling as your favorite Central Perk gang.',
    comments: [
      { id: '122-1', username: '@grouphugfan', content: 'New Girl has the best ensemble chemistry since Friends! Schmidt and Nick\'s friendship is hilarious.', timestamp: '2024-01-07T18:40:00Z', avatar: '👥' },
      { id: '122-2', username: '@communitygeek', content: 'Community is so meta and clever! Dan Harmon created something really special with that study group.', timestamp: '2024-01-08T06:15:00Z', avatar: '🎓' }
    ],
    saves: 356
  },
  {
    id: 123,
    title: 'If you like "Instagram", try these 5 creative photo apps',
    author: 'mobilephotog',
    category: 'Technology',
    items: ['VSCO', 'Snapseed', 'Lightroom Mobile', 'Canva', 'Unfold'],
    votes: 267,
    created_at: '2024-01-06T13:50:00Z',
    isRejected: false,
    description: 'Take your mobile photography and content creation to the next level with these powerful creative tools.',
    comments: [
      { id: '123-1', username: '@mobileeditor', content: 'VSCO presets are so clean! Way better than Instagram\'s built-in filters for that aesthetic look.', timestamp: '2024-01-06T15:35:00Z', avatar: '📱' },
      { id: '123-2', username: '@contentcreator', content: 'Canva makes graphic design so accessible! Perfect for creating Instagram story templates and posts.', timestamp: '2024-01-07T09:20:00Z', avatar: '🎨' }
    ],
    saves: 178
  },
  {
    id: 124,
    title: 'If you like "yoga", try these 5 mindful movement practices',
    author: 'mindfulmovement',
    category: 'Fitness',
    items: ['Tai Chi', 'Qigong', 'Pilates', 'Feldenkrais Method', 'Alexander Technique'],
    votes: 156,
    created_at: '2024-01-05T11:30:00Z',
    isRejected: false,
    description: 'Explore mind-body practices that share yoga\'s focus on breath, awareness, and gentle movement.',
    comments: [
      { id: '124-1', username: '@zenmovement', content: 'Tai Chi is like meditation in motion! So calming and surprisingly challenging for balance and focus.', timestamp: '2024-01-05T13:45:00Z', avatar: '☯️' },
      { id: '124-2', username: '@pilatesteacher', content: 'Pilates and yoga complement each other perfectly! Pilates really builds that deep core strength.', timestamp: '2024-01-06T08:10:00Z', avatar: '💪' }
    ],
    saves: 98
  },
  {
    id: 125,
    title: 'If you like "sushi", try these 5 Japanese dishes',
    author: 'japanfoodlover',
    category: 'Food & Drink',
    items: ['Ramen', 'Yakitori', 'Tempura', 'Donburi', 'Okonomiyaki'],
    votes: 312,
    created_at: '2024-01-04T14:20:00Z',
    isRejected: false,
    description: 'Expand your Japanese cuisine knowledge beyond sushi with these delicious and authentic dishes.',
    comments: [
      { id: '125-1', username: '@ramenlover', content: 'Once you try real tonkotsu ramen, you\'ll never go back to instant noodles! The broth is pure silk.', timestamp: '2024-01-04T16:35:00Z', avatar: '🍜' },
      { id: '125-2', username: '@izakayafan', content: 'Yakitori is the perfect drinking food! Those charcoal-grilled chicken skewers are addictive.', timestamp: '2024-01-05T07:50:00Z', avatar: '🍢' }
    ],
    saves: 209
  },
  {
    id: 126,
    title: 'If you like "Game of Thrones", try these 5 fantasy book series',
    author: 'fantasybooklover',
    category: 'Books',
    items: ['The Wheel of Time', 'The First Law', 'The Stormlight Archive', 'The Kingkiller Chronicle', 'The Broken Earth'],
    votes: 445,
    created_at: '2024-01-03T10:45:00Z',
    isRejected: false,
    description: 'Epic fantasy worlds with complex characters, political intrigue, and rich world-building that rivals Westeros.',
    comments: [
      { id: '126-1', username: '@fantasyepic', content: 'The Stormlight Archive is Brandon Sanderson at his absolute best! The magic system is so unique and logical.', timestamp: '2024-01-03T13:00:00Z', avatar: '⚡' },
      { id: '126-2', username: '@worldbuilder', content: 'The Wheel of Time is massive but so worth it! Jordan created one of the most detailed fantasy worlds ever.', timestamp: '2024-01-04T08:25:00Z', avatar: '🌪️' }
    ],
    saves: 334
  },
  {
    id: 127,
    title: 'If you like "Tesla", try these 5 innovative car companies',
    author: 'evfuture',
    category: 'Technology',
    items: ['Rivian', 'Lucid Motors', 'NIO', 'Polestar', 'Genesis'],
    votes: 234,
    created_at: '2024-01-02T15:15:00Z',
    isRejected: false,
    description: 'The electric vehicle revolution extends beyond Tesla - these companies are pushing automotive innovation forward.',
    comments: [
      { id: '127-1', username: '@evdriver', content: 'Rivian trucks are perfect for outdoor adventures! Finally an electric vehicle that can handle real off-roading.', timestamp: '2024-01-02T17:30:00Z', avatar: '🚗' },
      { id: '127-2', username: '@luxuryev', content: 'Lucid Air has the longest range of any EV! The interior feels more premium than traditional luxury cars.', timestamp: '2024-01-03T09:45:00Z', avatar: '✨' }
    ],
    saves: 167
  },
  {
    id: 128,
    title: 'If you like "Spotify", try these 5 music discovery platforms',
    author: 'musicdiscovery',
    category: 'Music',
    items: ['Bandcamp', 'SoundCloud', 'Last.fm', 'Rate Your Music', 'Discogs'],
    votes: 189,
    created_at: '2024-01-01T12:00:00Z',
    isRejected: false,
    description: 'Discover new music and support artists through these platforms that offer unique features beyond mainstream streaming.',
    comments: [
      { id: '128-1', username: '@indiemusic', content: 'Bandcamp directly supports artists! Plus you can discover so much underground music that\'s not on streaming.', timestamp: '2024-01-01T14:15:00Z', avatar: '🎵' },
      { id: '128-2', username: '@musicdata', content: 'Last.fm scrobbling gives you incredible insights into your listening habits. The recommendation engine is surprisingly good!', timestamp: '2024-01-02T10:30:00Z', avatar: '📊' }
    ],
    saves: 123
  },
  {
    id: 129,
    title: 'If you like "hiking boots", try these 5 outdoor gear brands',
    author: 'gearhead',
    category: 'Sports',
    items: ['Patagonia', 'Arc\'teryx', 'Merrell', 'Salomon', 'Danner'],
    votes: 167,
    created_at: '2023-12-31T11:30:00Z',
    isRejected: false,
    description: 'Quality outdoor gear that will last for years of adventures, from technical mountain wear to everyday outdoor clothing.',
    comments: [
      { id: '129-1', username: '@mountaineer', content: 'Arc\'teryx is expensive but worth every penny! Their Gore-Tex jackets have saved me in brutal weather.', timestamp: '2023-12-31T13:45:00Z', avatar: '🏔️' },
      { id: '129-2', username: '@trailrunner', content: 'Salomon trail runners are my go-to! Great grip on technical terrain and they last through hundreds of miles.', timestamp: '2024-01-01T08:20:00Z', avatar: '👟' }
    ],
    saves: 112
  },
  {
    id: 130,
    title: 'If you like "meditation", try these 5 wellness apps',
    author: 'wellnessjourney',
    category: 'Health',
    items: ['Headspace', 'Calm', 'Ten Percent Happier', 'Insight Timer', 'Waking Up'],
    votes: 203,
    created_at: '2023-12-30T16:45:00Z',
    isRejected: false,
    description: 'Digital tools to support your mindfulness practice with guided meditations, sleep stories, and wellness tracking.',
    comments: [
      { id: '130-1', username: '@mindfulnesss', content: 'Insight Timer has thousands of free meditations! The timer with ambient sounds is perfect for self-guided practice.', timestamp: '2023-12-30T18:20:00Z', avatar: '🧘' },
      { id: '130-2', username: '@calmmind', content: 'Headspace animations make meditation concepts so clear! Great for beginners who find meditation intimidating.', timestamp: '2023-12-31T09:10:00Z', avatar: '💭' }
    ],
    saves: 145
  },
  // More San Francisco specific lists
  {
    id: 131,
    title: 'If you like "Alcatraz", try these 5 SF historical sites',
    author: 'sfhistory',
    category: 'Travel',
    items: ['Angel Island State Park', 'Presidio of San Francisco', 'Mission Dolores', 'Cable Car Museum', 'Coit Tower'],
    votes: 134,
    created_at: '2023-12-29T14:20:00Z',
    isRejected: false,
    description: 'Discover San Francisco\'s fascinating past through these historical landmarks that tell the city\'s unique story.',
    comments: [
      { id: '131-1', username: '@sfexplorer', content: 'Angel Island is called the "Ellis Island of the West" - such important immigration history!', timestamp: '2023-12-29T16:35:00Z', avatar: '🏝️' },
      { id: '131-2', username: '@historybuff415', content: 'The Cable Car Museum is free and so cool! You can see the actual cables and machinery that moves the cars.', timestamp: '2023-12-30T10:15:00Z', avatar: '🚋' }
    ],
    saves: 89
  },
  // More NYC lists
  {
    id: 132,
    title: 'If you like "Broadway shows", try these 5 NYC performance venues',
    author: 'nyctheater',
    category: 'Entertainment',
    items: ['Lincoln Center', 'Apollo Theater', 'Madison Square Garden', 'Music Hall of Williamsburg', 'The Bowery Ballroom'],
    votes: 278,
    created_at: '2023-12-28T13:15:00Z',
    isRejected: false,
    description: 'NYC\'s incredible live performance scene extends far beyond Times Square with these iconic venues.',
    comments: [
      { id: '132-1', username: '@broadwaybaby', content: 'Lincoln Center is world-class! The Met Opera house acoustics are absolutely perfect.', timestamp: '2023-12-28T15:30:00Z', avatar: '🎭' },
      { id: '132-2', username: '@livemusicnyc', content: 'The Bowery Ballroom has the best sound system! Intimate venue where every seat feels close to the stage.', timestamp: '2023-12-29T08:45:00Z', avatar: '🎵' }
    ],
    saves: 198
  },
  // More diverse category lists
  {
    id: 133,
    title: 'If you like "cooking shows", try these 5 food documentaries',
    author: 'fooddocfan',
    category: 'Food & Drink',
    items: ['Chef\'s Table', 'Jiro Dreams of Sushi', 'Salt Fat Acid Heat', 'Ugly Delicious', 'The Mind of a Chef'],
    votes: 345,
    created_at: '2023-12-27T11:40:00Z',
    isRejected: false,
    description: 'Deep dives into culinary culture that go beyond entertainment to explore the art and science of cooking.',
    comments: [
      { id: '133-1', username: '@culinaryart', content: 'Chef\'s Table is pure food porn! The cinematography makes every dish look like a work of art.', timestamp: '2023-12-27T13:55:00Z', avatar: '🎬' },
      { id: '133-2', username: '@foodiephilosophy', content: 'Salt Fat Acid Heat changed how I cook! Samin Nosrat explains the science in such an accessible way.', timestamp: '2023-12-28T07:20:00Z', avatar: '🧂' }
    ],
    saves: 234
  },
  {
    id: 134,
    title: 'If you like "true crime podcasts", try these 5 investigative series',
    author: 'truecrimejunkie',
    category: 'Podcasts',
    items: ['Serial', 'My Favorite Murder', 'Criminal', 'Casefile', 'The Murder Squad'],
    votes: 423,
    created_at: '2023-12-26T09:25:00Z',
    isRejected: false,
    description: 'Gripping investigative storytelling that explores real crimes with the depth and respect the stories deserve.',
    comments: [
      { id: '134-1', username: '@crimepodcastr', content: 'Serial Season 1 changed podcasting forever! Sarah Koenig\'s investigative journalism is incredible.', timestamp: '2023-12-26T11:40:00Z', avatar: '🔍' },
      { id: '134-2', username: '@mysterysolver', content: 'Casefile has the best research and storytelling! The anonymous host\'s Australian accent is somehow perfect for true crime.', timestamp: '2023-12-27T06:15:00Z', avatar: '🎧' }
    ],
    saves: 289
  },
  {
    id: 135,
    title: 'If you like "vintage clothing", try these 5 sustainable fashion brands',
    author: 'sustainablestyle',
    category: 'Fashion',
    items: ['Patagonia', 'Eileen Fisher', 'Reformation', 'Everlane', 'Girlfriend Collective'],
    votes: 198,
    created_at: '2023-12-25T15:50:00Z',
    isRejected: false,
    description: 'Ethical fashion brands that prioritize sustainability without sacrificing style - the future of conscious clothing.',
    comments: [
      { id: '135-1', username: '@ecofashion', content: 'Reformation\'s vintage-inspired pieces are so cute! Love that they publish their environmental impact data.', timestamp: '2023-12-25T18:05:00Z', avatar: '♻️' },
      { id: '135-2', username: '@consciousstyle', content: 'Girlfriend Collective makes the best activewear from recycled bottles! Proof that sustainable can be stylish.', timestamp: '2023-12-26T08:30:00Z', avatar: '🌿' }
    ],
    saves: 156
  },
  // Continue with remaining lists to reach 100...
  {
    id: 136,
    title: 'If you like "board games", try these 5 modern strategy games',
    author: 'boardgamegeek',
    category: 'Games',
    items: ['Wingspan', 'Azul', 'Ticket to Ride', 'Splendor', 'King of Tokyo'],
    votes: 267,
    created_at: '2023-12-24T12:30:00Z',
    isRejected: false,
    description: 'Gateway games that prove modern board gaming is more innovative and accessible than ever before.',
    comments: [
      { id: '136-1', username: '@tabletopfan', content: 'Wingspan is gorgeous! The bird theme works so well with the engine-building mechanics.', timestamp: '2023-12-24T14:45:00Z', avatar: '🦅' },
      { id: '136-2', username: '@gamenight', content: 'Azul is perfect for introducing people to modern board games. Beautiful tiles and simple but deep strategy.', timestamp: '2023-12-25T09:20:00Z', avatar: '🎲' }
    ],
    saves: 178
  },
  {
    id: 137,
    title: 'If you like "craft beer", try these 5 beer styles',
    author: 'beerconnoisseur',
    category: 'Food & Drink',
    items: ['Sour Ales', 'Belgian Tripels', 'New England IPAs', 'Imperial Stouts', 'Saisons'],
    votes: 189,
    created_at: '2023-12-23T16:15:00Z',
    isRejected: false,
    description: 'Expand your beer palate with these distinctive styles that showcase the creativity of modern brewing.',
    comments: [
      { id: '137-1', username: '@hops lover', content: 'New England IPAs are so juicy and smooth! Completely different from traditional bitter IPAs.', timestamp: '2023-12-23T18:30:00Z', avatar: '🍺' },
      { id: '137-2', username: '@sourale', content: 'Sour ales are like wine for beer drinkers! The complexity and tartness is so refreshing in summer.', timestamp: '2023-12-24T10:45:00Z', avatar: '😋' }
    ],
    saves: 134
  },
  {
    id: 138,
    title: 'If you like "science fiction", try these 5 speculative fiction authors',
    author: 'scifibookclub',
    category: 'Books',
    items: ['N.K. Jemisin', 'Liu Cixin', 'Becky Chambers', 'Martha Wells', 'Andy Weir'],
    votes: 356,
    created_at: '2023-12-22T14:40:00Z',
    isRejected: false,
    description: 'Contemporary voices pushing the boundaries of science fiction with diverse perspectives and innovative storytelling.',
    comments: [
      { id: '138-1', username: '@hugowinner', content: 'N.K. Jemisin\'s Broken Earth trilogy is phenomenal! Fantasy that reads like sci-fi with incredible world-building.', timestamp: '2023-12-22T16:55:00Z', avatar: '🌍' },
      { id: '138-2', username: '@hardscifi', content: 'Liu Cixin\'s Three-Body Problem blew my mind! Chinese science fiction brings such a unique perspective.', timestamp: '2023-12-23T08:10:00Z', avatar: '🚀' }
    ],
    saves: 245
  },
  {
    id: 139,
    title: 'If you like "smartphones", try these 5 emerging tech gadgets',
    author: 'techgadgets',
    category: 'Technology',
    items: ['Smart Glasses', 'Wireless Earbuds', 'Smartwatches', 'Portable Monitors', 'VR Headsets'],
    votes: 234,
    created_at: '2023-12-21T13:25:00Z',
    isRejected: false,
    description: 'The next wave of personal technology that will change how we interact with the digital world.',
    comments: [
      { id: '139-1', username: '@futuretech', content: 'Smart glasses are finally getting good! Meta and Apple are both working on some impressive AR features.', timestamp: '2023-12-21T15:40:00Z', avatar: '👓' },
      { id: '139-2', username: '@vrexplorer', content: 'VR has come so far! The Quest 3 is wireless and the graphics are getting close to console quality.', timestamp: '2023-12-22T09:15:00Z', avatar: '🥽' }
    ],
    saves: 167
  },
  {
    id: 140,
    title: 'If you like "morning runs", try these 5 cardio alternatives',
    author: 'cardiocoach',
    category: 'Fitness',
    items: ['Cycling', 'Swimming', 'Jump Rope', 'Rowing', 'Dance Fitness'],
    votes: 178,
    created_at: '2023-12-20T10:50:00Z',
    isRejected: false,
    description: 'Mix up your cardio routine with these effective alternatives that can be just as energizing as running.',
    comments: [
      { id: '140-1', username: '@swimlife', content: 'Swimming is the perfect low-impact cardio! Great for recovery days when your joints need a break from running.', timestamp: '2023-12-20T13:05:00Z', avatar: '🏊' },
      { id: '140-2', username: '@jumprope pro', content: 'Jump rope is incredibly efficient! 10 minutes feels like a 30-minute run but it\'s easier on the knees.', timestamp: '2023-12-21T07:30:00Z', avatar: '🪢' }
    ],
    saves: 123
  },
  // More location-specific lists for the remaining slots
  {
    id: 141,
    title: 'If you like "Boston clam chowder", try these 5 New England seafood dishes',
    author: 'newenglandseafood',
    category: 'Food & Drink',
    items: ['Lobster Roll', 'Fish and Chips', 'Fried Clams', 'Scallops', 'Fish Tacos'],
    votes: 198,
    created_at: '2023-12-19T12:15:00Z',
    isRejected: false,
    description: 'Celebrate New England\'s incredible seafood tradition with these classic dishes that showcase the region\'s coastal bounty.',
    comments: [
      { id: '141-1', username: '@lobsterroll', content: 'Maine lobster rolls are perfection! The sweet lobster meat with just a touch of mayo and celery.', timestamp: '2023-12-19T14:30:00Z', avatar: '🦞' },
      { id: '141-2', username: '@clamshack', content: 'Ipswich fried clams are the gold standard! Whole belly clams with that perfect crispy coating.', timestamp: '2023-12-20T08:45:00Z', avatar: '🦪' }
    ],
    saves: 134
  },
  {
    id: 142,
    title: 'If you like "Jersey Shore beaches", try these 5 East Coast beach towns',
    author: 'eastcoastbeaches',
    category: 'Travel',
    items: ['Cape May, NJ', 'Outer Banks, NC', 'Rehoboth Beach, DE', 'Ocean City, MD', 'Myrtle Beach, SC'],
    votes: 167,
    created_at: '2023-12-18T15:30:00Z',
    isRejected: false,
    description: 'Explore the diverse beach culture of the East Coast with these charming seaside destinations.',
    comments: [
      { id: '142-1', username: '@beachhopper', content: 'Cape May has the most beautiful Victorian architecture! Like stepping back in time with gorgeous beaches.', timestamp: '2023-12-18T17:45:00Z', avatar: '🏖️' },
      { id: '142-2', username: '@obxlover', content: 'Outer Banks wild horses are magical! Plus the Wright Brothers memorial and amazing kiteboarding.', timestamp: '2023-12-19T09:20:00Z', avatar: '🐎' }
    ],
    saves: 112
  },
  {
    id: 143,
    title: 'If you like "California burritos", try these 5 West Coast Mexican dishes',
    author: 'westcoastmexican',
    category: 'Food & Drink',
    items: ['Fish Tacos', 'Carne Asada Fries', 'Elote', 'Pozole', 'Carnitas'],
    votes: 234,
    created_at: '2023-12-17T11:45:00Z',
    isRejected: false,
    description: 'Discover the incredible Mexican food culture of the West Coast with these regional specialties.',
    comments: [
      { id: '143-1', username: '@tacotruck', content: 'San Diego fish tacos are the best! Fresh fish with cabbage slaw and that creamy sauce.', timestamp: '2023-12-17T14:00:00Z', avatar: '🌮' },
      { id: '143-2', username: '@mexicanfood', content: 'Carne asada fries are pure genius! Only in California would someone put amazing grilled steak on fries.', timestamp: '2023-12-18T08:15:00Z', avatar: '🍟' }
    ],
    saves: 189
  },
  {
    id: 144,
    title: 'If you like "photography", try these 5 visual art forms',
    author: 'visualartist',
    category: 'Art',
    items: ['Film Photography', 'Digital Art', 'Graphic Design', 'Street Art', 'Installation Art'],
    votes: 189,
    created_at: '2023-12-16T13:20:00Z',
    isRejected: false,
    description: 'Expand your visual creativity beyond photography with these related art forms that share compositional principles.',
    comments: [
      { id: '144-1', username: '@filmphoto', content: 'Film photography is making a huge comeback! The colors and grain you get from real film can\'t be replicated digitally.', timestamp: '2023-12-16T15:35:00Z', avatar: '📷' },
      { id: '144-2', username: '@streetartist', content: 'Street art is photography\'s rebellious cousin! Both capture moments and tell stories about urban life.', timestamp: '2023-12-17T07:50:00Z', avatar: '🎨' }
    ],
    saves: 145
  },
  {
    id: 145,
    title: 'If you like "escape rooms", try these 5 puzzle-solving games',
    author: 'puzzlemaster',
    category: 'Games',
    items: ['Return of the Obra Dinn', 'The Witness', 'Portal 2', 'Professor Layton series', 'Outer Wilds'],
    votes: 223,
    created_at: '2023-12-15T16:40:00Z',
    isRejected: false,
    description: 'Challenge your problem-solving skills with these games that capture the satisfaction of escape room puzzles.',
    comments: [
      { id: '145-1', username: '@puzzlegamer', content: 'Return of the Obra Dinn is pure detective work! Figuring out what happened to each crew member is so satisfying.', timestamp: '2023-12-15T18:55:00Z', avatar: '🔍' },
      { id: '145-2', username: '@portalfan', content: 'Portal 2 co-op is like an escape room for two! The communication and teamwork required is amazing.', timestamp: '2023-12-16T10:10:00Z', avatar: '🧩' }
    ],
    saves: 167
  },
  {
    id: 146,
    title: 'If you like "stand-up comedy", try these 5 comedy podcast formats',
    author: 'comedypodcasts',
    category: 'Podcasts',
    items: ['Improv Comedy', 'Comedy Interview Shows', 'Comedy Panel Shows', 'Storytelling Podcasts', 'Comedy News Shows'],
    votes: 178,
    created_at: '2023-12-14T14:15:00Z',
    isRejected: false,
    description: 'Explore different comedy formats that showcase humor beyond traditional stand-up routines.',
    comments: [
      { id: '146-1', username: '@improv4life', content: 'Comedy Bang Bang is pure chaos! The improvised characters and scenarios are hilarious and unpredictable.', timestamp: '2023-12-14T16:30:00Z', avatar: '🎭' },
      { id: '146-2', username: '@storytelling', content: 'The Moth storytelling format is incredible! Real people sharing funny, touching, and bizarre life experiences.', timestamp: '2023-12-15T09:45:00Z', avatar: '📚' }
    ],
    saves: 134
  },
  {
    id: 147,
    title: 'If you like "minimalism", try these 5 lifestyle philosophies',
    author: 'simplifiedlife',
    category: 'Lifestyle',
    items: ['Hygge', 'Marie Kondo Method', 'Digital Minimalism', 'Slow Living', 'Essentialism'],
    votes: 167,
    created_at: '2023-12-13T12:50:00Z',
    isRejected: false,
    description: 'Discover approaches to intentional living that share minimalism\'s focus on what truly matters.',
    comments: [
      { id: '147-1', username: '@hyggelife', content: 'Hygge is about creating cozy, meaningful moments! Like minimalism but with more candles and warm blankets.', timestamp: '2023-12-13T15:05:00Z', avatar: '🕯️' },
      { id: '147-2', username: '@digitaldetox', content: 'Digital minimalism changed my relationship with technology! Being intentional about screen time is so freeing.', timestamp: '2023-12-14T08:20:00Z', avatar: '📱' }
    ],
    saves: 123
  },
  {
    id: 148,
    title: 'If you like "environmental documentaries", try these 5 nature films',
    author: 'naturedocs',
    category: 'Movies',
    items: ['Planet Earth', 'My Octopus Teacher', 'March of the Penguins', 'Free Solo', 'The Cove'],
    votes: 245,
    created_at: '2023-12-12T11:25:00Z',
    isRejected: false,
    description: 'Stunning cinematography and compelling storytelling that showcase the beauty and urgency of environmental protection.',
    comments: [
      { id: '148-1', username: '@planetearth', content: 'My Octopus Teacher is so moving! The relationship between the filmmaker and octopus is pure magic.', timestamp: '2023-12-12T13:40:00Z', avatar: '🐙' },
      { id: '148-2', username: '@wildlifephoto', content: 'Planet Earth\'s cinematography is unreal! How they capture those animal behaviors is beyond incredible.', timestamp: '2023-12-13T07:55:00Z', avatar: '🎬' }
    ],
    saves: 189
  },
  {
    id: 149,
    title: 'If you like "journaling", try these 5 self-reflection practices',
    author: 'selfgrowth',
    category: 'Health',
    items: ['Gratitude Practice', 'Meditation', 'Morning Pages', 'Dream Journaling', 'Bullet Journaling'],
    votes: 156,
    created_at: '2023-12-11T09:35:00Z',
    isRejected: false,
    description: 'Complement your journaling habit with these practices that promote self-awareness and personal growth.',
    comments: [
      { id: '149-1', username: '@bulletjournal', content: 'Bullet journaling combines productivity with creativity! It\'s like journaling but with a organizational system.', timestamp: '2023-12-11T11:50:00Z', avatar: '📝' },
      { id: '149-2', username: '@morningpages', content: 'Morning pages cleared my mental clutter! Three pages of stream-of-consciousness writing every morning.', timestamp: '2023-12-12T06:15:00Z', avatar: '🌅' }
    ],
    saves: 112
  },
  {
    id: 150,
    title: 'If you like "local farmers markets", try these 5 sustainable shopping habits',
    author: 'sustainableliving',
    category: 'Lifestyle',
    items: ['CSA Subscriptions', 'Zero Waste Stores', 'Tool Libraries', 'Clothing Swaps', 'Buy Nothing Groups'],
    votes: 134,
    created_at: '2023-12-10T14:45:00Z',
    isRejected: false,
    description: 'Extend your commitment to local, sustainable consumption with these community-focused shopping alternatives.',
    comments: [
      { id: '150-1', username: '@zerowaste', content: 'Tool libraries are genius! Why buy a drill you\'ll use twice when you can borrow one from the community?', timestamp: '2023-12-10T16:20:00Z', avatar: '🔧' },
      { id: '150-2', username: '@communitysharing', content: 'Buy Nothing groups are amazing! So much good stuff gets shared instead of thrown away.', timestamp: '2023-12-11T08:30:00Z', avatar: '♻️' }
    ],
    saves: 98
  },
  {
    id: 151,
    title: 'If you like "The Adventures of Pete & Pete", try these FIVE ALIKE...',
    author: '@nostalgiatv',
    category: 'TV Shows',
    date: '12/15/2024',
    votes: 89,
    upvotes: 92,
    downvotes: 3,
    userVote: null,
    highFives: 34,
    userHighFived: false,
    items: [
      'Freaks and Geeks',
      'The Wonder Years',
      'Eerie, Indiana',
      'Are You Afraid of the Dark?',
      'Hey Dude'
],
    description: 'Shows that capture the same surreal, nostalgic childhood magic with quirky characters and coming-of-age themes.',
    comments: [
      {
        id: 1,
        user: '@90skid',
        content: 'Eerie, Indiana was so underrated! Same weird small-town vibes.',
        time: '2 hours ago',
        avatar: '📺'
      },
      {
        id: 2,
        user: '@petehead',
        content: 'Freaks and Geeks is perfect here. Both shows understood teenage awkwardness so well.',
        time: '4 hours ago',
        avatar: '🎭'
      }
    ],
    saves: 67,
    isRejected: false
  },
  {
    id: 152,
    title: 'If you like "The Office (UK)", try these FIVE ALIKE...',
    author: '@britcomedy',
    category: 'TV Shows',
    date: '12/14/2024',
    votes: 156,
    upvotes: 164,
    downvotes: 8,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: [
      'Peep Show',
      'The Thick of It',
      'Extras',
      'This Country',
      'People Just Do Nothing'
],
    description: 'Cringe comedies that master the art of uncomfortable humor and brilliant character development, just like Ricky Gervais\'s original masterpiece.',
    comments: [
      {
        id: 1,
        user: '@cringemaster',
        content: 'Peep Show is absolutely essential. The secondhand embarrassment is perfect.',
        time: '3 hours ago',
        avatar: '😬'
      },
      {
        id: 2,
        user: '@uktvfan',
        content: 'This Country is so good! Really captures that small-town British awkwardness.',
        time: '6 hours ago',
        avatar: '🇬🇧'
      }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 153,
    title: 'If you like "The Mighty Boosh", try these FIVE ALIKE...',
    author: '@surrealist',
    category: 'TV Shows',
    date: '12/13/2024',
    votes: 143,
    upvotes: 149,
    downvotes: 6,
    userVote: null,
    highFives: 91,
    userHighFived: false,
    items: [
      'Flight of the Conchords',
      'What We Do in the Shadows',
      'Toast of London',
      'Garth Marenghi\'s Darkplace',
      'The IT Crowd'
],
    description: 'Brilliantly absurd British comedies with musical elements, surreal storylines, and unforgettable characters that match Boosh\'s creative madness.',
    comments: [
      {
        id: 1,
        user: '@crimp',
        content: 'Toast of London is pure genius! Ray Bloody Purchase!',
        time: '1 hour ago',
        avatar: '🍞'
      },
      {
        id: 2,
        user: '@vintagecomedian',
        content: 'Garth Marenghi\'s Darkplace is the most underrated show ever. So perfectly bad it\'s good.',
        time: '5 hours ago',
        avatar: '📚'
      },
      {
        id: 3,
        user: '@musiccomedy',
        content: 'Flight of the Conchords! The musical comedy duo energy is spot on.',
        time: '7 hours ago',
        avatar: '🎵'
      }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 154,
    title: 'If you like "Lost", try these FIVE ALIKE...',
    author: '@mysterysolver',
    category: 'TV Shows',
    date: '12/12/2024',
    votes: 198,
    upvotes: 211,
    downvotes: 13,
    userVote: null,
    highFives: 127,
    userHighFived: false,
    items: [
      'Dark',
      'Westworld',
      'The Leftovers',
      'Fringe',
      'The OA'
],
    description: 'Mind-bending shows with complex mysteries, time manipulation, parallel dimensions, and philosophical questions that will leave you theorizing for years.',
    comments: [
      {
        id: 1,
        user: '@timeloop',
        content: 'Dark is basically German Lost but somehow even more confusing. In the best way.',
        time: '2 hours ago',
        avatar: '🕰️'
      },
      {
        id: 2,
        user: '@mysterylover',
        content: 'The Leftovers by the same showrunner as Lost! Damon Lindelof knows how to mess with our heads.',
        time: '4 hours ago',
        avatar: '❓'
      },
      {
        id: 3,
        user: '@scifiaddict',
        content: 'Fringe has that perfect blend of procedural and mythology that Lost mastered.',
        time: '6 hours ago',
        avatar: '🔬'
      },
      {
        id: 4,
        user: '@philosophytv',
        content: 'Westworld season 1 gave me the same "what is reality" feelings as Lost.',
        time: '8 hours ago',
        avatar: '🤖'
      }
    ],
    saves: 156,
    isRejected: false
  },
  {
    id: 155,
    title: 'If you like "Dr. Dog", try these FIVE ALIKE...',
    author: '@indiefolkfan',
    category: 'Music',
    date: '12/11/2024',
    votes: 127,
    upvotes: 134,
    downvotes: 7,
    userVote: null,
    highFives: 68,
    userHighFived: false,
    items: ['The Shins', 'Fleet Foxes', 'Broken Social Scene', 'Band of Horses', 'Deer Tick'],
    description: 'Indie folk bands with lush harmonies, psychedelic touches, and that perfect blend of vintage and modern songcraft that Dr. Dog masters.',
    comments: [],
    saves: 89
  },
  {
    id: 156,
    title: 'If you like "Tom Waits", try these FIVE ALIKE...',
    author: '@gravellysounds',
    category: 'Music',
    date: '12/10/2024',
    votes: 189,
    upvotes: 198,
    downvotes: 9,
    userVote: null,
    highFives: 134,
    userHighFived: false,
    items: [
      'Captain Beefheart',
      'Nick Cave & The Bad Seeds',
      'Leonard Cohen',
      'The Pogues',
      'Howlin\' Wolf'
],
    description: 'Artists who share Waits\' theatrical storytelling, gravelly vocals, and experimental approach to blues, jazz, and folk traditions.',
    comments: [],
    saves: 156
  },
  {
    id: 157,
    title: 'If you like "Mark Lanegan", try these FIVE ALIKE...',
    author: '@grungememories',
    category: 'Music',
    date: '12/9/2024',
    votes: 98,
    upvotes: 103,
    downvotes: 5,
    userVote: null,
    highFives: 52,
    userHighFived: false,
    items: ['Chris Cornell', 'Johnny Cash (American Recordings)', 'Mazzy Star', 'The Afghan Whigs', 'PJ Harvey'],
    description: 'Artists with that same haunting, weathered voice and dark, introspective songwriting that made Lanegan\'s solo work so compelling.',
    comments: [],
    saves: 71
  },
  {
    id: 158,
    title: 'If you like "Megadeth", try these FIVE ALIKE...',
    author: '@thrashmaster',
    category: 'Music',
    date: '12/8/2024',
    votes: 167,
    upvotes: 178,
    downvotes: 11,
    userVote: null,
    highFives: 89,
    userHighFived: false,
    items: [
      'Testament',
      'Exodus',
      'Overkill',
      'Anthrax',
      'Death Angel'
],
    description: 'Thrash metal legends with technical precision, aggressive riffs, and the speed and intensity that defined the genre alongside Megadeth.',
    comments: [],
    saves: 123
  },
  {
    id: 159,
    title: 'If you like "Spirit Adrift", try these FIVE ALIKE...',
    author: '@doomrevival',
    category: 'Music',
    date: '12/7/2024',
    votes: 84,
    upvotes: 87,
    downvotes: 3,
    userVote: null,
    highFives: 41,
    userHighFived: false,
    items: [
      'Khemmis',
      'Eternal Champion',
      'Crypt Sermon',
      'Visigoth',
      'Pallbearer'
],
    description: 'Modern doom and traditional heavy metal bands that blend melody with heaviness, creating that epic, anthemic sound Spirit Adrift perfected.',
    comments: [
      {
        id: 1,
        user: '@doomcrusader',
        content: 'Khemmis is incredible! Perfect blend of doom and melody.',
        time: '4 hours ago',
        avatar: '⚔️'
      },
      {
        id: 2,
        user: '@epicmetal',
        content: 'Eternal Champion brings those fantasy vibes perfectly.',
        time: '7 hours ago',
        avatar: '🛡️'
      }
    ],
    saves: 63,
    isRejected: false
  },
  {
    id: 160,
    title: 'If you like "Clutch", try these FIVE ALIKE...',
    author: '@stonerrockking',
    category: 'Music',
    date: '12/6/2024',
    votes: 142,
    upvotes: 151,
    downvotes: 9,
    userVote: null,
    highFives: 78,
    userHighFived: false,
    items: [
      'Fu Manchu',
      'Red Fang',
      'Torche',
      'The Sword',
      'Monolord'
],
    description: 'Stoner rock and metal bands with groove-heavy riffs, powerful vocals, and that same infectious energy that makes Clutch legendary.',
    comments: [
      {
        id: 1,
        user: '@groovemetal',
        content: 'Fu Manchu! The groove is unmatched. Perfect recommendation.',
        time: '3 hours ago',
        avatar: '🎸'
      },
      {
        id: 2,
        user: '@riffmaster',
        content: 'The Sword brings those epic stoner metal vibes perfectly.',
        time: '5 hours ago',
        avatar: '⚔️'
      }
    ],
    saves: 108,
    isRejected: false
  },
  {
    id: 161,
    title: 'If you like "Red Fang", try these FIVE ALIKE...',
    author: '@portlandriff',
    category: 'Music',
    date: '12/5/2024',
    votes: 119,
    upvotes: 125,
    downvotes: 6,
    userVote: null,
    highFives: 67,
    userHighFived: false,
    items: [
      'Torche',
      'Baroness',
      'Mastodon',
      'High on Fire',
      'Elder'
],
    description: 'Heavy rock bands that balance crushing riffs with melodic sensibilities, creating that perfect blend of accessible and heavy that Red Fang nails.',
    comments: [
      {
        id: 1,
        user: '@sludgelord',
        content: 'Torche! Those guys know how to make heavy music catchy.',
        time: '2 hours ago',
        avatar: '🔥'
      },
      {
        id: 2,
        user: '@progmetal',
        content: 'Baroness and Mastodon - the holy trinity of modern heavy rock!',
        time: '4 hours ago',
        avatar: '👑'
      }
    ],
    saves: 89,
    isRejected: false
  },
  {
    id: 162,
    title: 'If you like "Converge", try these FIVE ALIKE...',
    author: '@mathcorelegend',
    category: 'Music',
    date: '12/4/2024',
    votes: 156,
    upvotes: 164,
    downvotes: 8,
    userVote: null,
    highFives: 94,
    userHighFived: false,
    items: [
      'The Dillinger Escape Plan',
      'Botch',
      'Coalesce',
      'Poison the Well',
      'Norma Jean'
],
    description: 'Mathcore and metalcore pioneers with complex rhythms, emotional intensity, and the technical chaos that Converge helped define.',
    comments: [
      {
        id: 1,
        user: '@chaostheory',
        content: 'The Dillinger Escape Plan! Pure mathematical madness.',
        time: '1 hour ago',
        avatar: '🌀'
      },
      {
        id: 2,
        user: '@hardcorekid',
        content: 'Botch is so underrated. "We Are the Romans" is a masterpiece.',
        time: '3 hours ago',
        avatar: '💥'
      },
      {
        id: 3,
        user: '@emotionalcore',
        content: 'Poison the Well brought that melodic element that works so well.',
        time: '5 hours ago',
        avatar: '🖤'
      }
    ],
    saves: 112,
    isRejected: false
  },
  {
    id: 163,
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
    comments: [],
    saves: 54
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
