export interface SubjectFallback {
  description: string;
  image?: string;
  sourceName: string;
  sourceUrl: string;
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
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/the-beatles/136975'
  },
  [normalizeKey('The Rolling Stones', 'Music')]: {
    description: 'The Rolling Stones are an English rock band formed in London in 1962, famous for their gritty, blues-influenced rock sound and legendary live performances.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3c/7f/b9/3c7fb969-9497-fffd-0dee-ead68bbe10b3/25UM1IM23176.rgb.jpg/600x600bb.jpg',
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/the-rolling-stones/4273569'
  },
  [normalizeKey('Radiohead', 'Music')]: {
    description: 'Radiohead are an English rock band formed in Abingdon in 1985, renowned for their experimental approach and influential albums that pushed the boundaries of modern rock.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg',
    sourceName: 'Apple Music',
    sourceUrl: 'https://music.apple.com/us/artist/radiohead/657515'
  },
  [normalizeKey('Taylor Swift', 'Music')]: {
    description: 'Taylor Swift is an American singer-songwriter known for her narrative songwriting and genre-spanning albums, making her one of the most successful artists of her generation.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/32/b5/6b/32b56b49-0075-7128-e6ec-7c3c4c697242/00843930000821.rgb.jpg/600x600bb.jpg',
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
  [normalizeKey('The Lord of the Rings', 'Movies')]: {
    description: 'The Lord of the Rings is an epic fantasy adventure film trilogy based on J.R.R. Tolkien\'s novels, directed by Peter Jackson and produced by New Line Cinema.',
    image: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    sourceName: 'TMDB',
    sourceUrl: 'https://www.themoviedb.org/movie/120'
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
    sourceName: sourceName,
    sourceUrl: artist.sourceUrl || ''
  };
});

export const normalizeSubjectKey = normalizeKey;
