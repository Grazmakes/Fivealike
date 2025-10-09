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
subjectFallbacks[normalizeKey('Lex Fridman Podcast', 'Podcasts')] = {
  description: 'A podcast where Lex Fridman interviews notable figures from various fields such as science, technology, sports, the arts, and politics, originally titled "The Artificial Intelligence Podcast" before being renamed in 2020.',
  image: 'https://i.scdn.co/image/ab6765630000ba8aaf81dbc5688c67c63a1cdca5',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Lex_Fridman_Podcast',
  id: '2MAi0BvDc6GTFvKFPXnkCL'
};

subjectFallbacks[normalizeKey('The Tim Ferriss Show', 'Podcasts')] = {
  description: 'A podcast hosted by Tim Ferriss that features weekly interviews with successful people who share how they\'ve achieved success in their profession.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a20d84595a00631e41d24f4ab',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Tim_Ferriss_Show',
  id: '5qSUyCrk9KR69lEiXbjwXM'
};

subjectFallbacks[normalizeKey('Tim Ferriss Show', 'Podcasts')] = {
  description: 'A podcast hosted by Tim Ferriss that features weekly interviews with successful people who share how they\'ve achieved success in their profession.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a20d84595a00631e41d24f4ab',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Tim_Ferriss_Show',
  id: '5qSUyCrk9KR69lEiXbjwXM'
};

subjectFallbacks[normalizeKey('Huberman Lab', 'Podcasts')] = {
  description: 'A health and science-focused podcast hosted by Andrew Huberman, a neuroscientist and Stanford University associate professor, covering topics like neuroscience, stress management, and wellness.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a2dcb895475520a152d56dd1d',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Huberman_Lab',
  id: '79CkJF3UJTHFV8Dse3Oy0P'
};

subjectFallbacks[normalizeKey('Conan Needs a Friend', 'Podcasts')] = {
  description: 'A weekly comedy podcast hosted by Conan O\'Brien, along with his executive assistant Sona Movsesian and producer Matt Gourley, featuring interviews with comedians, actors, and other notable personalities in casual, often humorous conversations.',
  image: 'https://i.scdn.co/image/ab6765630000ba8ad2b78a2a674fa0c801f6c0a9',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Conan_O%27Brien_Needs_a_Friend',
  id: '3u26tlz7A3WyWRtXliX9a9'
};

subjectFallbacks[normalizeKey('SmartLess', 'Podcasts')] = {
  description: 'A comedy podcast hosted by actors Jason Bateman, Sean Hayes, and Will Arnett that features a unique format where one host reveals a mystery guest to the other two hosts each episode, and they then interview the guest together.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a7a24e50979b1f553d7a48dd3',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/SmartLess',
  id: '0Yzd0g8NYmn27k2HFNplv7'
};

subjectFallbacks[normalizeKey('Call Her Daddy', 'Podcasts')] = {
  description: 'A sex advice and comedy podcast created and hosted by Alex Cooper that discusses sexuality, relationships, and culture, with episodes typically running 30-60 minutes.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a94c384f98d250e9ba87fbe73',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Call_Her_Daddy',
  id: '7bnjJ7Va1nM07Um4Od55dW'
};

subjectFallbacks[normalizeKey('My Favorite Murder', 'Podcasts')] = {
  description: 'A weekly true crime comedy podcast hosted by American comedians Karen Kilgariff and Georgia Hardstark that features the hosts discussing true crime stories with a comedic approach.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a8dbe3e41bfe53c08e8a06b56',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/My_Favorite_Murder',
  id: '0U9S5J2ltMaKdxIfLuEjzE'
};

subjectFallbacks[normalizeKey('Crime Junkie', 'Podcasts')] = {
  description: 'A true crime podcast hosted by Ashley Flowers and Brit Prawat, based in Indianapolis, Indiana, that covers murder, missing persons, and serial killer cases in episodes typically 30 minutes to an hour long.',
  image: 'https://i.scdn.co/image/ab6765630000ba8af0e6e41e6becea740870fe80',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Crime_Junkie',
  id: '3DgfoleqaW61T2amZQKINx'
};

subjectFallbacks[normalizeKey('Serial', 'Podcasts')] = {
  description: 'An investigative journalism podcast hosted by Sarah Koenig and co-produced by Koenig and Julie Snyder that tells a nonfiction story over multiple episodes, with each season exploring a different true story.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a19cfdf5e99f0629c63f3aa3e',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Serial_(podcast)',
  id: '2AWznEM757Yb1csHPzUnhw'
};

subjectFallbacks[normalizeKey('Radiolab', 'Podcasts')] = {
  description: 'A radio program and podcast produced by WNYC and hosted by Latif Nasser and Lulu Miller that focuses on scientific, philosophical, and political topics, attempting to approach broad subjects in an accessible manner.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a4d4ddb5766eb3caa2ca86c84',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Radiolab',
  id: '2hmkzUtix0qTqvtpPcMzEL'
};

subjectFallbacks[normalizeKey('WTF with Marc Maron', 'Podcasts')] = {
  description: 'A weekly podcast and radio show hosted by stand-up comedian Marc Maron, launched in September 2009, featuring in-depth interviews and produced by Brendan McDonald.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a1bc18767aed2c61822fe85c1',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/WTF_with_Marc_Maron',
  id: '6L47MDMO3xuN2XBed7miEI'
};

subjectFallbacks[normalizeKey('Armchair Expert', 'Podcasts')] = {
  description: 'A weekly comedy podcast hosted by actors Dax Shepard and Monica Padman that features interviews with celebrities, journalists, and academics about "the messiness of being human."',
  image: 'https://i.scdn.co/image/ab6765630000ba8a8fe9742f42e4ee57e73b820d',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Armchair_Expert',
  id: '6kAsbP8pxwaU2kPibKTuHE'
};

subjectFallbacks[normalizeKey('Casefile', 'Podcasts')] = {
  description: 'An Australian true crime podcast hosted by an anonymous male narrator that covers solved and cold criminal cases, primarily focusing on murders and serial crimes through fully scripted episodes based on original documents and recordings.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a77ab03830e5be0f8a8db69a1',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Casefile_True_Crime_Podcast',
  id: '4V3K3zyD0k789eaSWFXzhc'
};

subjectFallbacks[normalizeKey('Criminal', 'Podcasts')] = {
  description: 'A true crime podcast hosted by Phoebe Judge that tells "stories of people who\'ve done wrong, been wronged, or gotten caught somewhere in the middle."',
  image: 'https://i.scdn.co/image/ab6765630000ba8a03e5b196d5a1bb2bea17d324',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Criminal_(podcast)',
  id: '3ictIqfumbmEuWdt9xWQp5'
};

subjectFallbacks[normalizeKey('Doughboys', 'Podcasts')] = {
  description: 'A comedy podcast hosted by Mike Mitchell and Nick Wiger that reviews chain restaurants, featuring a weekly guest and rating restaurants on a "fork" scale.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a70ec4855f1b1c4ed0a8e5c11',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Doughboys_(podcast)',
  id: '5fRBo7ROBQNq8IAavbO64H'
};

subjectFallbacks[normalizeKey('Fresh Air', 'Podcasts')] = {
  description: 'An American radio talk show broadcast on NPR, hosted by Terry Gross and Tonya Mosley, primarily featuring interviews with prominent figures in entertainment, arts, culture, and current affairs.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a9e0c5b826c7b0e6d6f96789f',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Fresh_Air',
  id: '0HF5T1BVjaUR6dMlAamdB5'
};

subjectFallbacks[normalizeKey('Hollywood Handbook', 'Podcasts')] = {
  description: 'A weekly comedy podcast hosted by Sean Clements and Hayes Davenport that satirically offers "advice, telling stories, and doing segments" in an absurdist style, featuring celebrity guests in what\'s been described as "essentially a mockery of entertainment niceties."',
  image: 'https://i.scdn.co/image/ab6765630000ba8a63cb83df5b7acf84e01e04ac',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Hollywood_Handbook',
  id: '41zLPN9dAphB9zrJx3KVo5'
};

subjectFallbacks[normalizeKey('How Did This Get Made?', 'Podcasts')] = {
  description: 'A comedy podcast hosted by Paul Scheer, June Diane Raphael, and Jason Mantzoukas that features "the deconstruction and mockery of outlandish films that are widely considered to be the worst."',
  image: 'https://i.scdn.co/image/ab6765630000ba8a3d7f8920860f8bcee415f1a3',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/How_Did_This_Get_Made%3F',
  id: '7imJ7yoSPaYJGZtxH1EFve'
};

subjectFallbacks[normalizeKey('In the Dark', 'Podcasts')] = {
  description: 'An investigative journalism podcast hosted by Madeleine Baran that focuses on examining law enforcement and prosecutorial conduct in high-profile criminal cases.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a99583c78b1e8f7e80f8b35ae',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/In_the_Dark_(podcast)',
  id: '1aFyRYDJ1pHEaPMnZAGaOr'
};

subjectFallbacks[normalizeKey('Invisibilia', 'Podcasts')] = {
  description: 'An NPR podcast that explores "the intangible forces that shape human behavior—things like ideas, beliefs, assumptions and emotions," hosted by Kia Miakka Natisse and Yowei Shaw.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a0c0f2ecebb51c0e3e67dfb1d',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Invisibilia',
  id: '1Tgsr2BDHLSQ44YsOwoguj'
};

subjectFallbacks[normalizeKey('Making Sense', 'Podcasts')] = {
  description: 'A podcast hosted by neuroscientist and philosopher Sam Harris that explores important and controversial questions about the mind, society, current events, moral philosophy, religion, and rationality.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a39583e93f42dfce68e3b72d8',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Making_Sense',
  id: '5rgumWEx4FsqIY8e1wJNAk'
};

subjectFallbacks[normalizeKey('On Being', 'Podcasts')] = {
  description: 'A podcast hosted by Krista Tippett that examines what it calls the "animating questions at the center of human life: What does it mean to be human, and how do we want to live?" featuring interviews with a wide range of guests from poets to physicists.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a3f7f5c41fbb6612976da3efa',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/On_Being',
  id: '08F60fHBihlcqWZTr7Thzc'
};

subjectFallbacks[normalizeKey('Planet Money', 'Podcasts')] = {
  description: 'An NPR podcast that aims to explain economics through "creative and entertaining" storytelling, hosted by a team including Amanda Aronczyk, Mary Childs, Nick Fountain, and Kenny Malone.',
  image: 'https://i.scdn.co/image/ab6765630000ba8ae4e3f9bbaaef3a8e20c878d7',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Planet_Money',
  id: '4FYpq3lSeQMAhqNI81O0Cn'
};

subjectFallbacks[normalizeKey('Reply All', 'Podcasts')] = {
  description: 'An American podcast about "how people shape the internet, and how the internet shapes people" hosted by Alex Goldman, PJ Vogt, and Emmanuel Dzotsi from 2014 to 2022.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a2fa0b0f82c80d8f5c9b5e1b6',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Reply_All_(podcast)',
  id: '7gozmLqbcbr6PScMjc0Zl4'
};

subjectFallbacks[normalizeKey('S-Town', 'Podcasts')] = {
  description: 'An investigative journalism podcast hosted by Brian Reed about John B. McLemore, a horologist from Woodstock, Alabama, who initially contacts the podcast to investigate an alleged murder, created by the producers of Serial and This American Life.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a4c92f9083d8a035e2aa1d50e',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/S-Town',
  id: '1KPTM79Wn9vkWX0UoMYyrd'
};

subjectFallbacks[normalizeKey('The Hilarious World of Depression', 'Podcasts')] = {
  description: 'A comedy interview podcast hosted by John Moe, featuring conversations with comedians and entertainers about their experiences with major depressive disorder, distributed by American Public Media from November 2016 to June 2020.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a0b8fcef03c35bb4e6c2e6d7e',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Hilarious_World_of_Depression',
  id: '0nVNURZtqEoycVvrsIWAM5'
};

subjectFallbacks[normalizeKey('The Jordan Harbinger Show', 'Podcasts')] = {
  description: 'A podcast hosted by Jordan Harbinger featuring in-depth conversations with people at the top of their game where he unpacks guests\' wisdom into practical nuggets, interviewing scientists, entertainers, athletes, artists, leaders, and spies.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a2e9a4b8e84f8b5e5f6d8e0c8',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/The_Jordan_Harbinger_Show',
  id: '5RVoEOIACQbBDZnGBJ7Ec2'
};

subjectFallbacks[normalizeKey('The Moth', 'Podcasts')] = {
  description: 'A nonprofit organization that builds empathy through live storytelling shows, presenting thousands of true stories told live and without notes to audiences worldwide since 1997, available through The Moth Radio Hour and podcast.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a61dbe0b0b7ae8e5e5c7f8b8c',
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
  image: 'https://i.scdn.co/image/ab6765630000ba8a8c5b8e6d6e8f8e8e8f8e8e8e',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/U_Talkin%27_U2_To_Me%3F',
  id: '6NDRHxCmNlSjMoUAFzRkwE'
};

subjectFallbacks[normalizeKey('Comedy Death-Ray', 'Podcasts')] = {
  description: 'An improvisational comedy podcast hosted by Scott Aukerman, which began on May 1, 2009 as Comedy Death-Ray (later renamed Comedy Bang! Bang!), featuring celebrity interviews and comedians performing character-based comedy with largely improvised conversations.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a9e8c8e8e8e8e8e8e8e8e8e8e',
  sourceName: 'Wikipedia',
  sourceUrl: 'https://en.wikipedia.org/wiki/Comedy_Bang!_Bang!_(podcast)',
  id: '1tnKU0o0aXq2iGHdMy44jm'
};

export const normalizeSubjectKey = normalizeKey;
