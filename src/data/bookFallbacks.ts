export interface BookFallback {
  title: string;
  authors?: string[];
  description: string;
  thumbnail?: string;
  publishedDate?: string;
  pageCount?: number;
}

const withHttps = (url: string) => url.replace(/^http:/, 'https:');

export const bookFallbacks: Record<string, BookFallback> = {
  'The Hunger Games Companion Stories': {
    title: 'The Hunger Games Companion Stories',
    authors: ['Suzanne Collins'],
    description: 'Explore additional lore, interviews, and behind-the-scenes commentary from Panem in this companion collection to The Hunger Games trilogy.',
    thumbnail: withHttps('https://upload.wikimedia.org/wikipedia/en/1/18/The_Hunger_Games_cover.jpg'),
    publishedDate: '2012',
    pageCount: 320
  },
  'Divergent': {
    title: 'Divergent',
    authors: ['Veronica Roth'],
    description: 'In a dystopian Chicago, Tris Prior uncovers a conspiracy that threatens her society when she discovers she is Divergent and does not fit into any one faction.',
    thumbnail: withHttps('https://upload.wikimedia.org/wikipedia/en/d/d4/Divergent_%28book%29_by_Veronica_Roth_US_Hardcover_2011.jpg'),
    publishedDate: '2011',
    pageCount: 487
  },
  'The Maze Runner': {
    title: 'The Maze Runner',
    authors: ['James Dashner'],
    description: 'When Thomas awakens in a mysterious maze with no memory, he must work with other Gladers to uncover the secrets of the labyrinth and escape.',
    thumbnail: withHttps('https://upload.wikimedia.org/wikipedia/en/d/db/The_Maze_Runner_cover.png'),
    publishedDate: '2009',
    pageCount: 375
  },
  'Percy Jackson': {
    title: 'Percy Jackson & the Olympians: The Lightning Thief',
    authors: ['Rick Riordan'],
    description: 'Percy discovers he is a demigod and embarks on a quest involving Greek gods, monsters, and a stolen lightning bolt.',
    thumbnail: withHttps('https://upload.wikimedia.org/wikipedia/en/8/85/Percy_Jackson.jpg'),
    publishedDate: '2005',
    pageCount: 377
  },
  'The Fault in Our Stars': {
    title: 'The Fault in Our Stars',
    authors: ['John Green'],
    description: 'Hazel and Augustus navigate love, illness, and meaning with wit and honesty in this contemporary YA classic.',
    thumbnail: withHttps('https://upload.wikimedia.org/wikipedia/en/3/3c/The_Fault_in_Our_Stars.jpg'),
    publishedDate: '2012',
    pageCount: 313
  }
};

export const getBookFallback = (title: string) => bookFallbacks[title];
