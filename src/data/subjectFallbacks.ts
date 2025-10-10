export interface SubjectFallback {
  description: string;
  image?: string;
  poster_path?: string;
  sourceName: string;
  sourceUrl: string;
  id?: string;
  spotifyId?: string;
}

import { artistFallbacks } from '@/data/artistFallbacks';

const normalizeKey = (subject: string, category?: string) => {
  const name = subject.toLowerCase().trim();
  const cat = category ? category.toLowerCase().trim() : 'general';
  return `${name}|${cat}`;
};

export const subjectFallbacks: Record<string, SubjectFallback> = {
  [normalizeKey('The Beatles', 'Music')]: {
    description: 'The Beatles were an English rock band formed in Liverpool in 1960. Regarded as the most influential band of all time, they helped shape pop music as a serious art form.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/df/db/61/dfdb615d-47f8-06e9-9533-b96daccc029f/18UMGIM31076.rgb.jpg/600x600bb.jpg',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/df/db/61/dfdb615d-47f8-06e9-9533-b96daccc029f/18UMGIM31076.rgb.jpg/600x600bb.jpg',
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/the-beatles/136975'
  },
  [normalizeKey('The Rolling Stones', 'Music')]: {
    description: 'The Rolling Stones are an English rock band formed in London in 1962, famous for their gritty, blues-influenced rock sound and legendary live performances.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3c/7f/b9/3c7fb969-9497-fffd-0dee-ead68bbe10b3/25UM1IM23176.rgb.jpg/600x600bb.jpg',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3c/7f/b9/3c7fb969-9497-fffd-0dee-ead68bbe10b3/25UM1IM23176.rgb.jpg/600x600bb.jpg',
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/the-rolling-stones/4273569'
  },
  [normalizeKey('Radiohead', 'Music')]: {
    description: 'Radiohead are an English rock band formed in Abingdon in 1985, renowned for their experimental approach and influential albums that pushed the boundaries of modern rock.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg',
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/radiohead/657515'
  },
  [normalizeKey('Taylor Swift', 'Music')]: {
    description: 'Taylor Swift is an American singer-songwriter known for her narrative songwriting and genre-spanning albums, making her one of the most successful artists of her generation.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/32/b5/6b/32b56b49-0075-7128-e6ec-7c3c4c697242/00843930000821.rgb.jpg/600x600bb.jpg',
    artwork: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/32/b5/6b/32b56b49-0075-7128-e6ec-7c3c4c697242/00843930000821.rgb.jpg/600x600bb.jpg',
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/taylor-swift/159260351'
  },
  [normalizeKey('NBA', 'Sports')]: {
    description: 'The National Basketball Association is a North American professional basketball league composed of 30 teams and widely considered the premier men\'s professional basketball league in the world.',
    image: 'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/National_Basketball_Association'
  },
  [normalizeKey('The Hunger Games', 'Books')]: {
    description: 'The Hunger Games is a dystopian young adult novel series by Suzanne Collins following Katniss Everdeen in the authoritarian nation of Panem.',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/The_Hunger_Games.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Hunger_Games'
  },
  [normalizeKey('Dune', 'Books')]: {
    description: 'Dune is a 1965 epic science fiction novel by Frank Herbert, set in the distant future amidst a huge interstellar empire. It is considered one of the greatest science fiction novels of all time.',
    image: 'https://upload.wikimedia.org/wikipedia/en/d/de/Dune-Frank_Herbert_%281965%29_First_edition.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Dune_(novel)'
  },
  [normalizeKey('The Lord of the Rings', 'Movies')]: {
    description: 'The Lord of the Rings is an epic fantasy adventure film trilogy based on J.R.R. Tolkien\'s novels, directed by Peter Jackson and produced by New Line Cinema.',
    image: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    sourceName: 'TMDB',
    sourceUrl: 'https://www.themoviedb.org/movie/120'
  },
  [normalizeKey('Breaking Bad', 'TV Shows')]: {
    description: 'Breaking Bad is an American neo-Western crime drama following Walter White, a chemistry teacher who turns to manufacturing methamphetamine with former student Jesse Pinkman.',
    image: 'https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Breaking_Bad',
    id: '1396'
  },
  [normalizeKey('Better Call Saul', 'TV Shows')]: {
    description: 'Better Call Saul chronicles the transformation of earnest lawyer Jimmy McGill into the morally flexible attorney Saul Goodman in the years leading up to Breaking Bad.',
    image: 'https://image.tmdb.org/t/p/w500/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg',
    poster_path: '/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Better_Call_Saul',
    id: '60059'
  },
  [normalizeKey('The Sopranos', 'TV Shows')]: {
    description: 'The Sopranos explores the life of mob boss Tony Soprano as he balances family responsibilities with running a criminal organization in New Jersey.',
    image: 'https://image.tmdb.org/t/p/w500/ivtY9lZ7DAGg5yO9Dzh9O8zC0Tm.jpg',
    poster_path: '/ivtY9lZ7DAGg5yO9Dzh9O8zC0Tm.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/The_Sopranos',
    id: '1398'
  },
  [normalizeKey('Ozark', 'TV Shows')]: {
    description: 'Ozark follows financial planner Marty Byrde as he relocates his family to the Ozarks, laundering money for a Mexican drug cartel with dire consequences.',
    image: 'https://image.tmdb.org/t/p/w500/84XPpjGvxNyExjSuLQe0SzioErt.jpg',
    poster_path: '/84XPpjGvxNyExjSuLQe0SzioErt.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Ozark_(TV_series)',
    id: '69740'
  },
  [normalizeKey('Narcos', 'TV Shows')]: {
    description: 'Narcos is a crime drama detailing the rise of drug kingpins such as Pablo Escobar and the efforts of law enforcement to bring them down in Colombia.',
    image: 'https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg',
    poster_path: '/rTmal9fDbwh5F0waol2hq35U4ah.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Narcos',
    id: '63351'
  },
  [normalizeKey('Succession', 'TV Shows')]: {
    description: 'Succession follows the Roy family as they navigate power struggles inside their global media empire, blending biting satire with high-stakes corporate drama.',
    image: 'https://image.tmdb.org/t/p/w500/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg',
    poster_path: '/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Succession_(TV_series)',
    id: '76331'
  },
  [normalizeKey('Portrait Photography', 'Photography')]: {
    description: 'Portrait photography focuses on capturing the personality, expressions, and mood of a person or group through thoughtful composition, lighting, and direction.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Portrait_photography'
  },
  [normalizeKey('Landscape Photography', 'Photography')]: {
    description: 'Landscape photography is devoted to capturing nature and the great outdoors, highlighting the beauty of natural scenery from sweeping vistas to intimate details.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg/440px-Tunnel_View%2C_Yosemite_Valley%2C_Yosemite_NP_-_Diliff.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Landscape_photography'
  },
  [normalizeKey('Street Photography', 'Photography')]: {
    description: 'Street photography captures everyday life and candid moments in public spaces, emphasizing spontaneity, storytelling, and the human condition.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Henri_Cartier-Bresson%2C_Hyères%2C_France%2C_1932.jpg/440px-Henri_Cartier-Bresson%2C_Hyères%2C_France%2C_1932.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Street_photography'
  },
  [normalizeKey('Wedding Photography', 'Photography')]: {
    description: 'Wedding photography documents one of the most important celebrations in life, blending portrait, documentary, and fashion styles to tell a love story.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Wedding_bouquet_and_church.jpg/440px-Wedding_bouquet_and_church.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Wedding_photography'
  },
  [normalizeKey('Wildlife Photography', 'Photography')]: {
    description: 'Wildlife photography involves capturing images of animals in their natural habitats, requiring patience, technical skill, and respect for nature.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheetah_4_Luca_Galuzzi_2007.jpg/440px-Cheetah_4_Luca_Galuzzi_2007.jpg',
    sourceName: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Wildlife_photography'
  }
};

Object.values(artistFallbacks).forEach((artist) => {
  let sourceName = 'Five Alike Library';
  if (artist.sourceUrl) {
    if (artist.sourceUrl.includes('music.apple.com')) {
      sourceName = 'Apple Music';
    } else {
      sourceName = 'Wikipedia';
    }
  }

  subjectFallbacks[normalizeKey(artist.name, 'Music')] = {
    description: artist.biography,
    image: artist.image,
    artwork: artist.image,
    sourceName: sourceName,
    sourceUrl: artist.sourceUrl || '',
    id: artist.id,
    spotifyId: artist.id
  };
});

// Add Wordle with a square icon
subjectFallbacks[normalizeKey('Wordle', 'Games')] = {
  description: 'Wordle - a word puzzle game. Find the words by moving the mouse among the letters represented. There are many thematic exercises to choose from and they smoothly increase the complexity of the puzzle. Work your head hard or use hints.',
  image: 'https://www.nytimes.com/games-assets/v2/metadata/nyt-wordle-logo.png',
  artwork: 'https://www.nytimes.com/games-assets/v2/metadata/nyt-wordle-logo.png',
  sourceName: 'New York Times Games',
  sourceUrl: 'https://www.nytimes.com/games/wordle/index.html'
};

// Add comprehensive podcast fallbacks with Wikipedia descriptions
// Note: Using placeholder images as Spotify artwork URLs require authentication
subjectFallbacks[normalizeKey('Lex Fridman Podcast', 'Podcasts')] = {
  description: 'A podcast where Lex Fridman interviews notable figures from various fields such as science, technology, sports, the arts, and politics, originally titled "The Artificial Intelligence Podcast" before being renamed in 2020.',
  image: 'https://placehold.co/300x300/2A2A2A/FFFFFF?text=LF',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Lex_Fridman_Podcast',
  id: '2MAi0BvDc6GTFvKFPXnkCL'
};

subjectFallbacks[normalizeKey('The Tim Ferriss Show', 'Podcasts')] = {
  description: 'A podcast hosted by Tim Ferriss that features weekly interviews with successful people who share how they\'ve achieved success in their profession.',
  image: 'https://placehold.co/300x300/4A90E2/FFFFFF?text=TF',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Tim_Ferriss_Show',
  id: '5qSUyCrk9KR69lEiXbjwXM'
};

subjectFallbacks[normalizeKey('Tim Ferriss Show', 'Podcasts')] = {
  description: 'A podcast hosted by Tim Ferriss that features weekly interviews with successful people who share how they\'ve achieved success in their profession.',
  image: 'https://placehold.co/300x300/4A90E2/FFFFFF?text=TF',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Tim_Ferriss_Show',
  id: '5qSUyCrk9KR69lEiXbjwXM'
};

subjectFallbacks[normalizeKey('Huberman Lab', 'Podcasts')] = {
  description: 'A health and science-focused podcast hosted by Andrew Huberman, a neuroscientist and Stanford University associate professor, covering topics like neuroscience, stress management, and wellness.',
  image: 'https://placehold.co/300x300/E63946/FFFFFF?text=HL',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Huberman_Lab',
  id: '79CkJF3UJTHFV8Dse3Oy0P'
};

subjectFallbacks[normalizeKey('Conan Needs a Friend', 'Podcasts')] = {
  description: 'A weekly comedy podcast hosted by Conan O\'Brien, along with his executive assistant Sona Movsesian and producer Matt Gourley, featuring interviews with comedians, actors, and other notable personalities in casual, often humorous conversations.',
  image: 'https://placehold.co/300x300/FF6B35/FFFFFF?text=CN',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Conan_O%27Brien_Needs_a_Friend',
  id: '3u26tlz7A3WyWRtXliX9a9'
};

subjectFallbacks[normalizeKey('SmartLess', 'Podcasts')] = {
  description: 'A comedy podcast hosted by actors Jason Bateman, Sean Hayes, and Will Arnett that features a unique format where one host reveals a mystery guest to the other two hosts each episode, and they then interview the guest together.',
  image: 'https://placehold.co/300x300/4ECDC4/FFFFFF?text=SL',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/SmartLess',
  id: '0Yzd0g8NYmn27k2HFNplv7'
};

subjectFallbacks[normalizeKey('Call Her Daddy', 'Podcasts')] = {
  description: 'A sex advice and comedy podcast created and hosted by Alex Cooper that discusses sexuality, relationships, and culture, with episodes typically running 30-60 minutes.',
  image: 'https://placehold.co/300x300/FF1744/FFFFFF?text=CHD',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Call_Her_Daddy',
  id: '7bnjJ7Va1nM07Um4Od55dW'
};

subjectFallbacks[normalizeKey('My Favorite Murder', 'Podcasts')] = {
  description: 'A weekly true crime comedy podcast hosted by American comedians Karen Kilgariff and Georgia Hardstark that features the hosts discussing true crime stories with a comedic approach.',
  image: 'https://placehold.co/300x300/9C27B0/FFFFFF?text=MFM',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/My_Favorite_Murder',
  id: '0U9S5J2ltMaKdxIfLuEjzE'
};

subjectFallbacks[normalizeKey('Crime Junkie', 'Podcasts')] = {
  description: 'A true crime podcast hosted by Ashley Flowers and Brit Prawat, based in Indianapolis, Indiana, that covers murder, missing persons, and serial killer cases in episodes typically 30 minutes to an hour long.',
  image: 'https://placehold.co/300x300/D32F2F/FFFFFF?text=CJ',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Crime_Junkie',
  id: '3DgfoleqaW61T2amZQKINx'
};

subjectFallbacks[normalizeKey('Serial', 'Podcasts')] = {
  description: 'An investigative journalism podcast hosted by Sarah Koenig and co-produced by Koenig and Julie Snyder that tells a nonfiction story over multiple episodes, with each season exploring a different true story.',
  image: 'https://placehold.co/300x300/00897B/FFFFFF?text=SE',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Serial_(podcast)',
  id: '2AWznEM757Yb1csHPzUnhw'
};

subjectFallbacks[normalizeKey('Radiolab', 'Podcasts')] = {
  description: 'A radio program and podcast produced by WNYC and hosted by Latif Nasser and Lulu Miller that focuses on scientific, philosophical, and political topics, attempting to approach broad subjects in an accessible manner.',
  image: 'https://placehold.co/300x300/FF5722/FFFFFF?text=RL',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Radiolab',
  id: '2hmkzUtix0qTqvtpPcMzEL'
};

subjectFallbacks[normalizeKey('WTF with Marc Maron', 'Podcasts')] = {
  description: 'A weekly podcast and radio show hosted by stand-up comedian Marc Maron, launched in September 2009, featuring in-depth interviews and produced by Brendan McDonald.',
  image: 'https://placehold.co/300x300/795548/FFFFFF?text=WTF',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/WTF_with_Marc_Maron',
  id: '6L47MDMO3xuN2XBed7miEI'
};

subjectFallbacks[normalizeKey('Armchair Expert', 'Podcasts')] = {
  description: 'A weekly comedy podcast hosted by actors Dax Shepard and Monica Padman that features interviews with celebrities, journalists, and academics about "the messiness of being human."',
  image: 'https://placehold.co/300x300/5C6BC0/FFFFFF?text=AE',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Armchair_Expert',
  id: '6kAsbP8pxwaU2kPibKTuHE'
};

subjectFallbacks[normalizeKey('Casefile', 'Podcasts')] = {
  description: 'An Australian true crime podcast hosted by an anonymous male narrator that covers solved and cold criminal cases, primarily focusing on murders and serial crimes through fully scripted episodes based on original documents and recordings.',
  image: 'https://placehold.co/300x300/37474F/FFFFFF?text=CF',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Casefile_True_Crime_Podcast',
  id: '4V3K3zyD0k789eaSWFXzhc'
};

subjectFallbacks[normalizeKey('Criminal', 'Podcasts')] = {
  description: 'A true crime podcast hosted by Phoebe Judge that tells "stories of people who\'ve done wrong, been wronged, or gotten caught somewhere in the middle."',
  image: 'https://placehold.co/300x300/6A1B9A/FFFFFF?text=CR',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Criminal_(podcast)',
  id: '3ictIqfumbmEuWdt9xWQp5'
};

subjectFallbacks[normalizeKey('Doughboys', 'Podcasts')] = {
  description: 'A comedy podcast hosted by Mike Mitchell and Nick Wiger that reviews chain restaurants, featuring a weekly guest and rating restaurants on a "fork" scale.',
  image: 'https://placehold.co/300x300/FFC107/000000?text=DB',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Doughboys_(podcast)',
  id: '5fRBo7ROBQNq8IAavbO64H'
};

subjectFallbacks[normalizeKey('Fresh Air', 'Podcasts')] = {
  description: 'An American radio talk show broadcast on NPR, hosted by Terry Gross and Tonya Mosley, primarily featuring interviews with prominent figures in entertainment, arts, culture, and current affairs.',
  image: 'https://placehold.co/300x300/0288D1/FFFFFF?text=FA',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Fresh_Air',
  id: '0HF5T1BVjaUR6dMlAamdB5'
};

subjectFallbacks[normalizeKey('Hollywood Handbook', 'Podcasts')] = {
  description: 'A weekly comedy podcast hosted by Sean Clements and Hayes Davenport that satirically offers "advice, telling stories, and doing segments" in an absurdist style, featuring celebrity guests in what\'s been described as "essentially a mockery of entertainment niceties."',
  image: 'https://placehold.co/300x300/E91E63/FFFFFF?text=HH',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Hollywood_Handbook',
  id: '41zLPN9dAphB9zrJx3KVo5'
};

subjectFallbacks[normalizeKey('How Did This Get Made?', 'Podcasts')] = {
  description: 'A comedy podcast hosted by Paul Scheer, June Diane Raphael, and Jason Mantzoukas that features "the deconstruction and mockery of outlandish films that are widely considered to be the worst."',
  image: 'https://placehold.co/300x300/673AB7/FFFFFF?text=HDTGM',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/How_Did_This_Get_Made%3F',
  id: '7imJ7yoSPaYJGZtxH1EFve'
};

subjectFallbacks[normalizeKey('In the Dark', 'Podcasts')] = {
  description: 'An investigative journalism podcast hosted by Madeleine Baran that focuses on examining law enforcement and prosecutorial conduct in high-profile criminal cases.',
  image: 'https://placehold.co/300x300/424242/FFFFFF?text=ITD',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/In_the_Dark_(podcast)',
  id: '1aFyRYDJ1pHEaPMnZAGaOr'
};

subjectFallbacks[normalizeKey('Invisibilia', 'Podcasts')] = {
  description: 'An NPR podcast that explores "the intangible forces that shape human behavior—things like ideas, beliefs, assumptions and emotions," hosted by Kia Miakka Natisse and Yowei Shaw.',
  image: 'https://placehold.co/300x300/8E24AA/FFFFFF?text=IN',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Invisibilia',
  id: '1Tgsr2BDHLSQ44YsOwoguj'
};

subjectFallbacks[normalizeKey('Making Sense', 'Podcasts')] = {
  description: 'A podcast hosted by neuroscientist and philosopher Sam Harris that explores important and controversial questions about the mind, society, current events, moral philosophy, religion, and rationality.',
  image: 'https://placehold.co/300x300/1976D2/FFFFFF?text=MS',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Making_Sense',
  id: '5rgumWEx4FsqIY8e1wJNAk'
};

subjectFallbacks[normalizeKey('On Being', 'Podcasts')] = {
  description: 'A podcast hosted by Krista Tippett that examines what it calls the "animating questions at the center of human life: What does it mean to be human, and how do we want to live?" featuring interviews with a wide range of guests from poets to physicists.',
  image: 'https://placehold.co/300x300/00897B/FFFFFF?text=OB',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/On_Being',
  id: '08F60fHBihlcqWZTr7Thzc'
};

subjectFallbacks[normalizeKey('Planet Money', 'Podcasts')] = {
  description: 'An NPR podcast that aims to explain economics through "creative and entertaining" storytelling, hosted by a team including Amanda Aronczyk, Mary Childs, Nick Fountain, and Kenny Malone.',
  image: 'https://placehold.co/300x300/43A047/FFFFFF?text=PM',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Planet_Money',
  id: '4FYpq3lSeQMAhqNI81O0Cn'
};

subjectFallbacks[normalizeKey('Reply All', 'Podcasts')] = {
  description: 'An American podcast about "how people shape the internet, and how the internet shapes people" hosted by Alex Goldman, PJ Vogt, and Emmanuel Dzotsi from 2014 to 2022.',
  image: 'https://placehold.co/300x300/F57C00/FFFFFF?text=RA',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Reply_All_(podcast)',
  id: '7gozmLqbcbr6PScMjc0Zl4'
};

subjectFallbacks[normalizeKey('S-Town', 'Podcasts')] = {
  description: 'An investigative journalism podcast hosted by Brian Reed about John B. McLemore, a horologist from Woodstock, Alabama, who initially contacts the podcast to investigate an alleged murder, created by the producers of Serial and This American Life.',
  image: 'https://placehold.co/300x300/5D4037/FFFFFF?text=ST',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/S-Town',
  id: '1KPTM79Wn9vkWX0UoMYyrd'
};

subjectFallbacks[normalizeKey('The Hilarious World of Depression', 'Podcasts')] = {
  description: 'A comedy interview podcast hosted by John Moe, featuring conversations with comedians and entertainers about their experiences with major depressive disorder, distributed by American Public Media from November 2016 to June 2020.',
  image: 'https://placehold.co/300x300/7B1FA2/FFFFFF?text=THWOD',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Hilarious_World_of_Depression',
  id: '0nVNURZtqEoycVvrsIWAM5'
};

subjectFallbacks[normalizeKey('The Jordan Harbinger Show', 'Podcasts')] = {
  description: 'A podcast hosted by Jordan Harbinger featuring in-depth conversations with people at the top of their game where he unpacks guests\' wisdom into practical nuggets, interviewing scientists, entertainers, athletes, artists, leaders, and spies.',
  image: 'https://placehold.co/300x300/0277BD/FFFFFF?text=JH',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Jordan_Harbinger_Show',
  id: '5RVoEOIACQbBDZnGBJ7Ec2'
};

subjectFallbacks[normalizeKey('The Moth', 'Podcasts')] = {
  description: 'A nonprofit organization that builds empathy through live storytelling shows, presenting thousands of true stories told live and without notes to audiences worldwide since 1997, available through The Moth Radio Hour and podcast.',
  image: 'https://placehold.co/300x300/D84315/FFFFFF?text=TM',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Moth',
  id: '5UKrcYdaGbq10z97yqi81N'
};

subjectFallbacks[normalizeKey('The Murder Squad', 'Podcasts')] = {
  description: 'A true crime podcast where retired cold case investigator Paul Holes and investigative journalist Billy Jensen examine unsolved murders, unidentified remains and missing persons cases (the podcast ended in May 2022).',
  image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/The_Murder_Squad_podcast_logo.png/440px-The_Murder_Squad_podcast_logo.png',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Murder_Squad',
  id: ''
};

subjectFallbacks[normalizeKey('U Talkin U2 To Me?', 'Podcasts')] = {
  description: 'A comedy podcast hosted by Adam Scott and Scott Aukerman, ostensibly devoted to discussing the music and impact of U2, combining discussion of the band with running gags and comedy bits only marginally related to the band.',
  image: 'https://placehold.co/300x300/424242/FFFFFF?text=U2',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/U_Talkin%27_U2_To_Me%3F',
  id: '6NDRHxCmNlSjMoUAFzRkwE'
};

subjectFallbacks[normalizeKey('Comedy Death-Ray', 'Podcasts')] = {
  description: 'An improvisational comedy podcast hosted by Scott Aukerman, which began on May 1, 2009 as Comedy Death-Ray (later renamed Comedy Bang! Bang!), featuring celebrity interviews and comedians performing character-based comedy with largely improvised conversations.',
  image: 'https://placehold.co/300x300/EC407A/FFFFFF?text=CDR',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Comedy_Bang!_Bang!_(podcast)',
  id: '1tnKU0o0aXq2iGHdMy44jm'
};

// Food fallbacks - using placeholder images to avoid CORS issues
subjectFallbacks[normalizeKey('Japanese Mochi', 'Food')] = {
  description: 'Mochi is a Japanese rice cake made of mochigome, a short-grain japonica glutinous rice, and sometimes other ingredients such as water, sugar, and cornstarch. The rice is pounded into paste and molded into the desired shape.',
  image: 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Mochi'
};

subjectFallbacks[normalizeKey('Italian Gelato', 'Food')] = {
  description: 'Gelato is a frozen dessert of Italian origin. Artisanal gelato in Italy generally contains 6-9% butterfat, which is lower than other styles of frozen dessert. Gelato typically contains 35% air and more flavoring than other types of frozen desserts.',
  image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Gelato'
};

subjectFallbacks[normalizeKey('Middle Eastern Baklava', 'Food')] = {
  description: 'Baklava is a layered pastry dessert made of filo pastry, filled with chopped nuts, and sweetened with syrup or honey. It was one of the most popular sweet pastries of Ottoman cuisine.',
  image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Baklava'
};

subjectFallbacks[normalizeKey('Austrian Strudel', 'Food')] = {
  description: 'A strudel is a type of layered pastry with a filling that is usually sweet, but savoury fillings are also common. It became popular in the 18th century throughout the Habsburg Empire. Strudel is part of Austrian cuisine and German cuisine.',
  image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Strudel'
};

subjectFallbacks[normalizeKey('Spanish Churros', 'Food')] = {
  description: 'A churro is a type of fried dough from Spanish and Portuguese cuisine. They are also found in Latin American cuisine and in other areas that have received immigration from Spanish and Portuguese-speaking countries, especially in the Southwestern United States and France.',
  image: 'https://images.unsplash.com/photo-1590791863668-0afdb07cfd90?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Churro'
};

subjectFallbacks[normalizeKey('French Pastries', 'Food')] = {
  description: 'French pastries include a wide variety of baked goods made from ingredients such as flour, sugar, milk, butter, shortening, baking powder, and eggs. The term encompasses many different types including croissants, pain au chocolat, éclairs, and macarons.',
  image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/French_cuisine#Pastries'
};

// Pizza list items
subjectFallbacks[normalizeKey('Pizza', 'Food')] = {
  description: 'Pizza is a dish of Italian origin consisting of a usually round, flat base of leavened wheat-based dough topped with tomatoes, cheese, and often various other ingredients, which is then baked at a high temperature, traditionally in a wood-fired oven.',
  image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Pizza'
};

subjectFallbacks[normalizeKey('Pasta', 'Food')] = {
  description: 'Pasta is a type of food typically made from an unleavened dough of wheat flour mixed with water or eggs, and formed into sheets or other shapes, then cooked by boiling or baking. Rice flour, or legumes such as beans or lentils, are sometimes used in place of wheat flour.',
  image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Pasta'
};

subjectFallbacks[normalizeKey('Burgers', 'Food')] = {
  description: 'A hamburger is a food consisting of fillings—usually a patty of ground meat, typically beef—placed inside a sliced bun or bread roll. Hamburgers are often served with cheese, lettuce, tomato, onion, pickles, bacon, or chilis.',
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Hamburger'
};

subjectFallbacks[normalizeKey('Tacos', 'Food')] = {
  description: 'A taco is a traditional Mexican food consisting of a small hand-sized corn- or wheat-based tortilla topped with a filling. The tortilla is then folded around the filling and eaten by hand. Tacos are a common form of antojitos, or Mexican street food.',
  image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Taco'
};

subjectFallbacks[normalizeKey('Ramen', 'Food')] = {
  description: 'Ramen is a Japanese noodle dish. It consists of Chinese-style wheat noodles served in a broth. Common flavors are soy sauce and miso, with typical toppings including sliced pork, nori, menma, and scallions.',
  image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Ramen'
};

subjectFallbacks[normalizeKey('Sandwiches', 'Food')] = {
  description: 'A sandwich is a food typically consisting of vegetables, sliced cheese or meat, placed on or between slices of bread, or more generally any dish wherein bread serves as a container or wrapper for another food type.',
  image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Sandwich'
};

// Sushi list items
subjectFallbacks[normalizeKey('Sushi', 'Food')] = {
  description: 'Sushi is a Japanese dish of prepared vinegared rice, usually with some sugar and salt, accompanied by a variety of ingredients, such as seafood, often raw, and vegetables. Styles of sushi and its presentation vary widely.',
  image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Sushi'
};

subjectFallbacks[normalizeKey('Poke', 'Food')] = {
  description: 'Poke is a raw fish salad served as an appetizer in Hawaiian cuisine, and sometimes as a main course. Traditional forms are aku and heʻe. Heʻe poke is usually called by its Japanese name tako poke, except in places like the island of Niʻihau where the Hawaiian language is spoken.',
  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Poke_(Hawaiian_dish)'
};

subjectFallbacks[normalizeKey('Ceviche', 'Food')] = {
  description: 'Ceviche is a South American seafood dish that originated in Peru, typically made from fresh raw fish cured in fresh citrus juices, most commonly lime or lemon. It is also spiced with ají, chili peppers or other seasonings, and julienned red onions, salt, and coriander are also added.',
  image: 'https://images.unsplash.com/photo-1576866209830-589e1bfbaa4d?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Ceviche'
};

subjectFallbacks[normalizeKey('Tartare', 'Food')] = {
  description: 'Steak tartare is a dish of raw ground beef. It is usually served with onions, capers, mushrooms, pepper, Worcestershire sauce, and other seasonings, often presented separately, to be added to taste. It is often served with a raw egg yolk on top.',
  image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Steak_tartare'
};

subjectFallbacks[normalizeKey('Crudo', 'Food')] = {
  description: 'Crudo is an Italian method of preparing raw fish and shellfish. It is similar to sashimi and carpaccio. The fish or shellfish is sliced thinly and dressed with olive oil, citrus juice, salt, and sometimes chili peppers or herbs.',
  image: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Crudo'
};

subjectFallbacks[normalizeKey('Sashimi', 'Food')] = {
  description: 'Sashimi is a Japanese delicacy consisting of fresh raw fish or meat sliced into thin pieces and often eaten with soy sauce. The word sashimi means "pierced body", i.e. "刺身" = sashimi, where 刺 = sashi (pierced, stuck) and 身 = mi (body, meat).',
  image: 'https://images.unsplash.com/photo-1583623025817-d180a2221d0a?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Sashimi'
};

// BBQ list items
subjectFallbacks[normalizeKey('BBQ', 'Food')] = {
  description: 'Barbecue or barbeque is a term used with significant regional and national variations to describe various cooking methods that use live fire and smoke to cook the food. The term is also generally applied to the devices associated with those methods, the broader cuisines that these methods produce, and the meals or gatherings at which this style of food is cooked and served.',
  image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Barbecue'
};

subjectFallbacks[normalizeKey('Korean BBQ', 'Food')] = {
  description: 'Korean barbecue refers to the popular method in Korean cuisine of grilling meat, typically beef, pork or chicken. Such dishes are often prepared on gas or charcoal grills built into the dining table itself. Some Korean restaurants that do not have built-in grills provide customers with portable stoves for diners to use at their tables.',
  image: 'https://images.unsplash.com/photo-1606850780554-b55ef18909c0?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Korean_barbecue'
};

subjectFallbacks[normalizeKey('Brazilian Churrasco', 'Food')] = {
  description: 'Churrasco is a Portuguese and Spanish term for grilled meat. In Brazil, churrasco typically consists of various cuts of beef, pork, lamb, and chicken which may be cooked on a purpose-built churrasqueira, a barbecue grill. The meats are seasoned with coarse salt and cooked over wood or charcoal.',
  image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Churrasco'
};

subjectFallbacks[normalizeKey('Argentinian Asado', 'Food')] = {
  description: 'Asado is the technique and the social event of having or attending a barbecue in various South American countries, especially Argentina and Uruguay where it is also a traditional event. An asado usually consists of beef, pork, chicken, chorizo, and morcilla which are cooked on a grill, called a parrilla, or an open fire.',
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Asado'
};

subjectFallbacks[normalizeKey('Jamaican Jerk', 'Food')] = {
  description: 'Jerk is a style of cooking native to Jamaica, in which meat is dry-rubbed or wet marinated with a hot spice mixture called Jamaican jerk spice. The main ingredients of the spice mixture are allspice and Scotch bonnet peppers. Jerk chicken or pork is traditionally cooked over pimento wood.',
  image: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Jerk_(cooking)'
};

subjectFallbacks[normalizeKey('Turkish Kebab', 'Food')] = {
  description: 'Kebab is a cooked meat dish, with its origins in Middle Eastern cuisines. Many variants are popular around the world. In Turkey, kebab is typically prepared with lamb, but beef, chicken, or fish may also be used. The meat is marinated with spices, threaded onto skewers, and grilled over a fire.',
  image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Kebab'
};

// Curry list items
subjectFallbacks[normalizeKey('Indian Curry', 'Food')] = {
  description: 'Curry is a variety of dishes originating in the Indian subcontinent. It uses a complex combination of spices or herbs, usually including ground turmeric, cumin, coriander, ginger, and fresh or dried chilies. Curry is generally prepared in a sauce.',
  image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Curry'
};

subjectFallbacks[normalizeKey('Thai Curry', 'Food')] = {
  description: 'Thai curry refers to dishes in Thai cuisine that are made with various types of curry paste. Thai curries are typically made with curry paste, coconut milk, meat, seafood, vegetables and herbs. Different curry types are distinguished by their colors, which come from different curry paste ingredients.',
  image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Thai_curry'
};

subjectFallbacks[normalizeKey('Japanese Curry', 'Food')] = {
  description: 'Japanese curry is commonly served in three main forms: curry over rice, curry udon, and curry bread. It is one of the most popular dishes in Japan. The curry sauce is usually made from curry powder or roux, which are combinations of spices such as turmeric, cumin, coriander, and cayenne pepper.',
  image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Japanese_curry'
};

subjectFallbacks[normalizeKey('Ethiopian Stew', 'Food')] = {
  description: 'Ethiopian stews, known as wat or wot, are thick stews served atop injera flatbread. The most popular is doro wat, a spicy chicken stew. Other varieties include key wat (red beef stew), alicha (mild yellow stew), and gomen (collard greens stew). Ethiopian stews feature berbere spice blend.',
  image: 'https://images.unsplash.com/photo-1591218406539-bded6ec24601?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Ethiopian_cuisine'
};

subjectFallbacks[normalizeKey('Moroccan Tagine', 'Food')] = {
  description: 'A tagine is a North African dish, named after the earthenware pot in which it is cooked. It is a slow-cooked stew that typically includes meat, poultry, or fish, along with vegetables, nuts, and dried fruits. The conical lid allows steam to circulate and creates moist, flavorful dishes.',
  image: 'https://images.unsplash.com/photo-1580870069867-74c02987636b?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Tajine'
};

subjectFallbacks[normalizeKey('Caribbean Curry', 'Food')] = {
  description: 'Caribbean curry is a curry dish popular throughout the Caribbean. Curries were brought to the Caribbean by Indian indentured laborers. Caribbean curries typically include curry powder, hot peppers, and coconut milk, and feature meats like goat, chicken, seafood, or vegetables.',
  image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Curry#Caribbean'
};

// Additional Food Items
subjectFallbacks[normalizeKey('Pho', 'Food')] = {
  description: 'Pho is a Vietnamese soup dish consisting of broth, rice noodles, herbs, and meat (usually beef or chicken). Pho is a popular food in Vietnam where it is served in households, street stalls and restaurants countrywide. It is considered Vietnam\'s national dish.',
  image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Pho'
};

subjectFallbacks[normalizeKey('Udon', 'Food')] = {
  description: 'Udon are thick noodles made from wheat flour, used in Japanese cuisine. They are thicker than soba noodles and are often served hot as a noodle soup in a mildly flavoured broth, in a dish called kake udon. The broth is usually made of dashi, soy sauce, and mirin.',
  image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Udon'
};

subjectFallbacks[normalizeKey('Laksa', 'Food')] = {
  description: 'Laksa is a spicy noodle dish popular in Southeast Asia. It consists of various types of noodles, most commonly thick rice noodles, in a rich and spicy curry or tamarind-based soup. Laksa is commonly served with ingredients such as chicken, prawn or fish, and garnished with ingredients such as bean sprouts and boiled egg.',
  image: 'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Laksa'
};

subjectFallbacks[normalizeKey('Bun Bo Hue', 'Food')] = {
  description: 'Bun bo Hue is a popular Vietnamese soup containing rice vermicelli and beef. Compared to pho, bun bo Hue has a spicy broth flavored with lemongrass and shrimp paste. The dish originates from Hue, a city in central Vietnam.',
  image: 'https://images.unsplash.com/photo-1626201735092-29c7f0c1f31e?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/B%C3%BAn_b%C3%B2_Hu%E1%BA%BF'
};

subjectFallbacks[normalizeKey('Mazesoba', 'Food')] = {
  description: 'Mazesoba is a type of dry ramen from Nagoya, Japan. Unlike traditional ramen served in broth, mazesoba features thick noodles tossed with a small amount of sauce, topped with ingredients like minced meat, scallions, and a raw egg yolk. Diners mix everything together before eating.',
  image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Mazesoba'
};

subjectFallbacks[normalizeKey('Well-done Wagyu', 'Food')] = {
  description: 'Wagyu beef is a high-quality Japanese beef from specific cattle breeds known for intense marbling and tender texture. "Well-done" refers to cooking the meat until fully cooked through. While Wagyu is typically served medium-rare to preserve its tenderness and flavor, some prefer it well-done.',
  image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Wagyu'
};

subjectFallbacks[normalizeKey('Ketchup on Steak', 'Food')] = {
  description: 'Ketchup on steak refers to the practice of using tomato ketchup as a condiment on beef steak. While controversial among steak enthusiasts who prefer to taste the natural flavors of quality beef, ketchup remains a popular condiment choice for many diners.',
  image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Steak'
};

subjectFallbacks[normalizeKey('Milk with Cereal', 'Food')] = {
  description: 'Cereal with milk is a popular breakfast dish consisting of breakfast cereal (often cold) served with milk poured over it. The milk softens the cereal and creates a combined flavor. This classic breakfast combination has been enjoyed worldwide since the late 19th century.',
  image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Breakfast_cereal'
};

subjectFallbacks[normalizeKey('Soggy Fries', 'Food')] = {
  description: 'Soggy fries are french fries that have lost their crispness, typically from being undercooked, over-steamed, or sitting too long after cooking. While usually considered undesirable, some people actually prefer the softer texture of less-crispy fries.',
  image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/French_fries'
};

subjectFallbacks[normalizeKey('Cold Coffee', 'Food')] = {
  description: 'Cold coffee refers to coffee served cold or iced, including iced coffee, cold brew coffee, and other chilled coffee beverages. Cold brew is made by steeping coffee grounds in cold water for 12-24 hours, resulting in a smooth, less acidic flavor profile compared to traditional hot-brewed coffee.',
  image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Iced_coffee'
};

// Books fallbacks
subjectFallbacks[normalizeKey('Gone Girl', 'Books')] = {
  description: 'Gone Girl by Gillian Flynn is a psychological thriller about a woman who disappears on her fifth wedding anniversary, and her husband becomes the prime suspect. The novel explores themes of marriage, media manipulation, and the facades people present to the world.',
  image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Gone_Girl_(novel)'
};

subjectFallbacks[normalizeKey('The Girl with the Dragon Tattoo', 'Books')] = {
  description: 'The Girl with the Dragon Tattoo by Stieg Larsson is a psychological thriller about journalist Mikael Blomkvist and hacker Lisbeth Salander investigating a decades-old disappearance. The novel combines mystery with social commentary on violence against women in Sweden.',
  image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Girl_with_the_Dragon_Tattoo'
};

subjectFallbacks[normalizeKey('Big Little Lies', 'Books')] = {
  description: 'Big Little Lies by Liane Moriarty follows three women whose seemingly perfect lives unravel to the point of murder. Set in a beachside Australian town, the novel explores themes of domestic violence, friendship, and the secrets people keep.',
  image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Big_Little_Lies_(novel)'
};

subjectFallbacks[normalizeKey('Sharp Objects', 'Books')] = {
  description: 'Sharp Objects by Gillian Flynn is a psychological thriller about reporter Camille Preaker who returns to her hometown to cover the murders of two young girls. The novel delves into her own troubled past and dysfunctional family relationships.',
  image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Sharp_Objects'
};

subjectFallbacks[normalizeKey('The Silent Patient', 'Books')] = {
  description: 'The Silent Patient by Alex Michaelides is a psychological thriller about a woman who shoots her husband and then never speaks another word. A psychotherapist becomes obsessed with uncovering her motive, leading to a shocking twist.',
  image: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Silent_Patient'
};

subjectFallbacks[normalizeKey('In the Woods', 'Books')] = {
  description: 'In the Woods by Tana French is a psychological mystery about detective Rob Ryan investigating a murder in the woods where he experienced a traumatic event as a child. The novel explores memory, trauma, and the unsolved mysteries of the past.',
  image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/In_the_Woods'
};

// TV Shows fallbacks
subjectFallbacks[normalizeKey('The Sopranos', 'TV Shows')] = {
  description: 'The Sopranos explores the life of mob boss Tony Soprano as he balances family responsibilities with running a criminal organization in New Jersey.',
  image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500',
  sourceName: 'TMDB',
  sourceUrl: 'https://www.themoviedb.org/tv/1398-the-sopranos'
};

export const normalizeSubjectKey = normalizeKey;
