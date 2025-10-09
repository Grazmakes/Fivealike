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

// Add popular podcasts
subjectFallbacks[normalizeKey('Lex Fridman Podcast', 'Podcasts')] = {
  description: 'Conversations about the nature of intelligence, consciousness, love, and power. Lex Fridman is a scientist and AI researcher at MIT.',
  image: 'https://i.scdn.co/image/ab6765630000ba8aaf81dbc5688c67c63a1cdca5',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/2MAi0BvDc6GTFvKFPXnkCL',
  id: '2MAi0BvDc6GTFvKFPXnkCL'
};

subjectFallbacks[normalizeKey('The Tim Ferriss Show', 'Podcasts')] = {
  description: 'Tim Ferriss deconstructs world-class performers from eclectic areas to extract the tactics, tools, and routines you can use.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a20d84595a00631e41d24f4ab',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/5qSUyCrk9KR69lEiXbjwXM',
  id: '5qSUyCrk9KR69lEiXbjwXM'
};

subjectFallbacks[normalizeKey('Huberman Lab', 'Podcasts')] = {
  description: 'Neuroscience and science-based tools for everyday life. Hosted by Dr. Andrew Huberman, a neuroscientist and professor at Stanford University.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a2dcb895475520a152d56dd1d',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/79CkJF3UJTHFV8Dse3Oy0P',
  id: '79CkJF3UJTHFV8Dse3Oy0P'
};

subjectFallbacks[normalizeKey('Conan Needs a Friend', 'Podcasts')] = {
  description: 'After 25 years at the Late Night desk, Conan realized that the only people at his holiday party are the men and women who work for him. So he started a podcast to do what he does best: have long, in-depth conversations.',
  image: 'https://i.scdn.co/image/ab6765630000ba8ad2b78a2a674fa0c801f6c0a9',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/5TXKxbKFmBKSDEPKH5oSHU',
  id: '5TXKxbKFmBKSDEPKH5oSHU'
};

subjectFallbacks[normalizeKey('SmartLess', 'Podcasts')] = {
  description: 'A podcast that connects and unites people from all walks of life to learn about shared experiences through thoughtful dialogue and organic hilarity. Hosted by Jason Bateman, Sean Hayes, and Will Arnett.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a7a24e50979b1f553d7a48dd3',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/5HRqAJ1BfdYEFJy4B9H5p4',
  id: '5HRqAJ1BfdYEFJy4B9H5p4'
};

subjectFallbacks[normalizeKey('Call Her Daddy', 'Podcasts')] = {
  description: 'A female-hosted podcast covering relationships, sex, health, and pop culture. Hosted by Alex Cooper.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a94c384f98d250e9ba87fbe73',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/1iQV5VBiNDVvhPK01gpobR',
  id: '1iQV5VBiNDVvhPK01gpobR'
};

subjectFallbacks[normalizeKey('My Favorite Murder', 'Podcasts')] = {
  description: 'Karen Kilgariff and Georgia Hardstark tell each other their favorite true crime murder stories. Stay sexy and don\'t get murdered!',
  image: 'https://i.scdn.co/image/ab6765630000ba8a8dbe3e41bfe53c08e8a06b56',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/0U9S5J2ltMaKdxIfLuEjzE',
  id: '0U9S5J2ltMaKdxIfLuEjzE'
};

subjectFallbacks[normalizeKey('Crime Junkie', 'Podcasts')] = {
  description: 'If you can never get enough true crime... Congratulations, you\'ve found your people. Hosted by Ashley Flowers.',
  image: 'https://i.scdn.co/image/ab6765630000ba8af0e6e41e6becea740870fe80',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/4WvCVSH4X3IveQBZX7wtHu',
  id: '4WvCVSH4X3IveQBZX7wtHu'
};

subjectFallbacks[normalizeKey('Serial', 'Podcasts')] = {
  description: 'Serial is a podcast from the creators of This American Life, hosted by Sarah Koenig. Serial unfolds one story—a true story—over the course of a whole season.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a19cfdf5e99f0629c63f3aa3e',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/52U3kWGcxRy97TsZ8mP49T',
  id: '52U3kWGcxRy97TsZ8mP49T'
};

subjectFallbacks[normalizeKey('Radiolab', 'Podcasts')] = {
  description: 'Radiolab is on a curiosity bender. We ask deep questions and use investigative journalism to get the answers. A two-time Peabody Award winner.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a4d4ddb5766eb3caa2ca86c84',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/2hmkzUtix0qTqvtpPcMzEL',
  id: '2hmkzUtix0qTqvtpPcMzEL'
};

subjectFallbacks[normalizeKey('WTF with Marc Maron', 'Podcasts')] = {
  description: 'Comedian and actor Marc Maron conducts in-depth interviews with comedians, actors, directors, writers, authors, musicians and folks from all walks of life.',
  image: 'https://i.scdn.co/image/ab6765630000ba8a1bc18767aed2c61822fe85c1',
  sourceName: 'Spotify',
  sourceUrl: 'https://open.spotify.com/show/4Nd4RDCFqRqBFGw0tXqCXI',
  id: '4Nd4RDCFqRqBFGw0tXqCXI'
};

export const normalizeSubjectKey = normalizeKey;
