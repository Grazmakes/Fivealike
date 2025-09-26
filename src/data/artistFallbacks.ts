export interface ArtistFallback {
  name: string;
  biography: string;
  image?: string;
  formed?: string;
  genres?: string[];
  members?: string[];
  sourceUrl?: string;
}

export const artistFallbacks: Record<string, ArtistFallback> = {
  'Radiohead': {
    name: 'Radiohead',
    biography: 'Radiohead are an English rock band formed in Abingdon in 1985, known for their experimental approach and influential albums.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music116/v4/07/60/ba/0760ba0f-148c-b18f-d0ff-169ee96f3af5/634904078164.png/600x600bb.jpg',
    formed: '1985',
    genres: ['Alternative Rock', 'Art Rock', 'Experimental Rock'],
    members: ['Thom Yorke', 'Jonny Greenwood', 'Colin Greenwood', 'Ed O\'Brien', 'Philip Selway'],
    sourceUrl: 'https://music.apple.com/us/artist/radiohead/657515'
  },
  'Muse': {
    name: 'Muse',
    biography: 'Muse are an English rock band formed in Teignmouth in 1994, blending progressive rock, electronica, and symphonic influences.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/da/bf/32/dabf32e7-cb21-e58b-d8b9-4a4ad4a1ad1d/00602547875082.rgb.jpg/600x600bb.jpg',
    formed: '1994',
    genres: ['Alternative Rock', 'Progressive Rock', 'Space Rock'],
    members: ['Matt Bellamy', 'Chris Wolstenholme', 'Dominic Howard'],
    sourceUrl: 'https://music.apple.com/us/artist/muse/3996865'
  },
  'Coldplay': {
    name: 'Coldplay',
    biography: 'Coldplay are a British rock band formed in London in 1997, celebrated for soaring melodies and atmospheric production.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/e9/e9/bf/e9e9bfea-9de9-8b6d-a017-0b9d7dc4b896/14UMGIM45850.rgb.jpg/600x600bb.jpg',
    formed: '1997',
    genres: ['Alternative Rock', 'Pop Rock'],
    members: ['Chris Martin', 'Jonny Buckland', 'Guy Berryman', 'Will Champion'],
    sourceUrl: 'https://music.apple.com/us/artist/coldplay/471744'
  },
  'Oasis': {
    name: 'Oasis',
    biography: 'Oasis were an English rock band formed in Manchester in 1991, central to the Britpop movement with swaggering guitar anthems.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/2e/de/bf/2edebf1a-7d3e-c88d-01c6-7fb19d0a32dc/886445635362.jpg/600x600bb.jpg',
    formed: '1991',
    genres: ['Britpop', 'Rock', 'Alternative Rock'],
    members: ['Liam Gallagher', 'Noel Gallagher', 'Paul Arthurs', 'Paul McGuigan', 'Tony McCarroll'],
    sourceUrl: 'https://music.apple.com/us/artist/oasis/657544'
  },
  'Blur': {
    name: 'Blur',
    biography: 'Blur are an English rock band formed in London in 1988, known for witty Britpop songwriting and stylistic experimentation.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/cc/8f/93/cc8f93e8-c4f0-05fe-9bb0-1a98cf23c738/19UMGIM95395.rgb.jpg/600x600bb.jpg',
    formed: '1988',
    genres: ['Britpop', 'Alternative Rock', 'Art Rock'],
    members: ['Damon Albarn', 'Graham Coxon', 'Alex James', 'Dave Rowntree'],
    sourceUrl: 'https://music.apple.com/us/artist/blur/42098'
  },
  'Conan Gray': {
    name: 'Conan Gray',
    biography: 'Conan Lee Gray is an American singer-songwriter known for emotive bedroom-pop anthems and nostalgic storytelling.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Conan_Gray_2022.jpg/440px-Conan_Gray_2022.jpg',
    formed: '2018',
    genres: ['Pop', 'Indie Pop', 'Bedroom Pop'],
    members: ['Conan Gray'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Conan_Gray'
  },
  'Taylor Swift': {
    name: 'Taylor Swift',
    biography: 'Taylor Swift is an American singer-songwriter celebrated for her narrative songwriting and genre-spanning reinventions.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/32/b5/6b/32b56b49-0075-7128-e6ec-7c3c4c697242/00843930000821.rgb.jpg/600x600bb.jpg',
    formed: '2006',
    genres: ['Pop', 'Country', 'Indie Folk'],
    members: ['Taylor Swift'],
    sourceUrl: 'https://music.apple.com/us/artist/taylor-swift/159260351'
  },
  'The Kinks': {
    name: 'The Kinks',
    biography: 'The Kinks were an English rock band formed in Muswell Hill, north London, in 1963 by brothers Ray and Dave Davies.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/84/8c/5f/848c5f84-5e1d-d2c5-c8ed-b3e0b27d6c6b/886445635164.jpg/600x600bb.jpg',
    formed: '1963',
    genres: ['Rock', 'Pop Rock', 'British Invasion'],
    members: ['Ray Davies', 'Dave Davies', 'Mick Avory', 'Pete Quaife'],
    sourceUrl: 'https://music.apple.com/us/artist/the-kinks/177781'
  },
  'The Who': {
    name: 'The Who',
    biography: 'The Who are an English rock band formed in London in 1964, known for their energetic live performances and rock opera concepts.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d5/1e/f8/d51ef8f5-b4c0-5f4e-3c5a-3b8c8b8c8c8c/888072030927.jpg/600x600bb.jpg',
    formed: '1964',
    genres: ['Rock', 'Hard Rock', 'Art Rock'],
    members: ['Roger Daltrey', 'Pete Townshend', 'John Entwistle', 'Keith Moon'],
    sourceUrl: 'https://music.apple.com/us/artist/the-who/487134'
  }
};
