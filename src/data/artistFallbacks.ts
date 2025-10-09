export interface ArtistFallback {
  name: string;
  biography: string;
  image?: string;
  formed?: string;
  genres?: string[];
  members?: string[];
  sourceUrl?: string;
  id?: string; // Spotify artist ID
}

export const artistFallbacks: Record<string, ArtistFallback> = {
  'Radiohead': {
    name: 'Radiohead',
    biography: 'Radiohead are an English rock band formed in Abingdon in 1985, known for their experimental approach and influential albums.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Radiohead_2018_composite.jpg/330px-Radiohead_2018_composite.jpg',
    formed: '1985',
    genres: ['Alternative Rock', 'Art Rock', 'Experimental Rock'],
    members: ['Thom Yorke', 'Jonny Greenwood', 'Colin Greenwood', 'Ed O\'Brien', 'Philip Selway'],
    sourceUrl: 'https://music.apple.com/us/artist/radiohead/657515',
    id: '4Z8W4fKeB5YxbusRsdQVPb'
  },
  'Muse': {
    name: 'Muse',
    biography: 'Muse are an English rock band formed in Teignmouth in 1994, blending progressive rock, electronica, and symphonic influences.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/MuseHammsmith100522_%2847_of_76%29_%2852089636284%29.jpg/330px-MuseHammsmith100522_%2847_of_76%29_%2852089636284%29.jpg',
    formed: '1994',
    genres: ['Alternative Rock', 'Progressive Rock', 'Space Rock'],
    members: ['Matt Bellamy', 'Chris Wolstenholme', 'Dominic Howard'],
    sourceUrl: 'https://music.apple.com/us/artist/muse/3996865',
    id: '12Chz98pHFMPJEknJQMWvI'
  },
  'Coldplay': {
    name: 'Coldplay',
    biography: 'Coldplay are a British rock band formed in London in 1997, celebrated for soaring melodies and atmospheric production.',
    formed: '1997',
    genres: ['Alternative Rock', 'Pop Rock'],
    members: ['Chris Martin', 'Jonny Buckland', 'Guy Berryman', 'Will Champion'],
    sourceUrl: 'https://music.apple.com/us/artist/coldplay/471744',
    id: '4gzpq5DPGxSnKTe4SA8HAU'
  },
  'Oasis': {
    name: 'Oasis',
    biography: 'Oasis were an English rock band formed in Manchester in 1991, central to the Britpop movement with swaggering guitar anthems.',
    formed: '1991',
    genres: ['Britpop', 'Rock', 'Alternative Rock'],
    members: ['Liam Gallagher', 'Noel Gallagher', 'Paul Arthurs', 'Paul McGuigan', 'Tony McCarroll'],
    sourceUrl: 'https://music.apple.com/us/artist/oasis/657544',
    id: '2DaxqgrOhkeH0fpeiQq2f4'
  },
  'Blur': {
    name: 'Blur',
    biography: 'Blur are an English rock band formed in London in 1988, known for witty Britpop songwriting and stylistic experimentation.',
    formed: '1988',
    genres: ['Britpop', 'Alternative Rock', 'Art Rock'],
    members: ['Damon Albarn', 'Graham Coxon', 'Alex James', 'Dave Rowntree'],
    sourceUrl: 'https://music.apple.com/us/artist/blur/42098',
    id: '7MhMgCo0Bl0Kukl93PZbYS'
  },
  'Conan Gray': {
    name: 'Conan Gray',
    biography: 'Conan Lee Gray is an American singer-songwriter known for emotive bedroom-pop anthems and nostalgic storytelling.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Conan_Gray_2022.jpg/440px-Conan_Gray_2022.jpg',
    formed: '2018',
    genres: ['Pop', 'Indie Pop', 'Bedroom Pop'],
    members: ['Conan Gray'],
    sourceUrl: 'https://en.wikipedia.org/wiki/Conan_Gray',
    id: '4TXdHyuAOl3rAOFmZ6MeKz'
  },
  'Taylor Swift': {
    name: 'Taylor Swift',
    biography: 'Taylor Swift is an American singer-songwriter celebrated for her narrative songwriting and genre-spanning reinventions.',
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/32/b5/6b/32b56b49-0075-7128-e6ec-7c3c4c697242/00843930000821.rgb.jpg/600x600bb.jpg',
    formed: '2006',
    genres: ['Pop', 'Country', 'Indie Folk'],
    members: ['Taylor Swift'],
    sourceUrl: 'https://music.apple.com/us/artist/taylor-swift/159260351',
    id: '06HL4z0CvFAxyc27GXpf02'
  },
  'The Kinks': {
    name: 'The Kinks',
    biography: 'The Kinks were an English rock band formed in Muswell Hill, north London, in 1963 by brothers Ray and Dave Davies.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Helmfrid-sofa4_Touched.JPG/250px-Helmfrid-sofa4_Touched.JPG',
    formed: '1963',
    genres: ['Rock', 'Pop Rock', 'British Invasion'],
    members: ['Ray Davies', 'Dave Davies', 'Mick Avory', 'Pete Quaife'],
    sourceUrl: 'https://music.apple.com/us/artist/the-kinks/177781',
    id: '1SQRv42e4PjEYfPhS0Tk9E'
  },
  'The Who': {
    name: 'The Who',
    biography: 'The Who are an English rock band formed in London in 1964, known for their energetic live performances and rock opera concepts.',
    formed: '1964',
    genres: ['Rock', 'Hard Rock', 'Art Rock'],
    members: ['Roger Daltrey', 'Pete Townshend', 'John Entwistle', 'Keith Moon'],
    sourceUrl: 'https://music.apple.com/us/artist/the-who/487134',
    id: '67ea9eGLXYMsO2eYQRui3w'
  },
  'The Beach Boys': {
    name: 'The Beach Boys',
    biography: 'The Beach Boys are an American rock band formed in Hawthorne, California, in 1961. Known for their vocal harmonies and surf rock sound.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Beach_Boys_1967_%28cropped%29.jpg/330px-Beach_Boys_1967_%28cropped%29.jpg',
    formed: '1961',
    genres: ['Rock', 'Pop Rock', 'Surf Rock'],
    members: ['Brian Wilson', 'Mike Love', 'Al Jardine', 'Bruce Johnston', 'David Marks'],
    sourceUrl: 'https://music.apple.com/us/artist/the-beach-boys/140132',
    id: '3oDbviiivRWhXwIE8hxkVV'
  },
  'The Byrds': {
    name: 'The Byrds',
    biography: 'The Byrds were an American rock band formed in Los Angeles, California, in 1964. Known for pioneering folk rock and psychedelic rock.',
    image: 'https://upload.wikimedia.org/wikipedia/en/c/c4/The_Byrds_in_1965.jpg',
    formed: '1964',
    genres: ['Rock', 'Folk Rock', 'Psychedelic Rock'],
    members: ['Roger McGuinn', 'Gene Clark', 'David Crosby', 'Chris Hillman', 'Michael Clarke'],
    sourceUrl: 'https://music.apple.com/us/artist/the-byrds/100890',
    id: '1PCZpxHJz7WAMF8EEq8bfc'
  },
  'The Zombies': {
    name: 'The Zombies',
    biography: 'The Zombies are an English rock band formed in St Albans in 1962. Led by keyboardist/vocalist Rod Argent and lead vocalist Colin Blunstone, they had their first British and American hit in 1964 with "She\'s Not There".',
    formed: '1962',
    genres: ['Rock', 'Psychedelic Rock', 'British Invasion'],
    members: ['Rod Argent', 'Colin Blunstone', 'Paul Atkinson', 'Chris White', 'Hugh Grundy'],
    sourceUrl: 'https://music.apple.com/us/artist/the-zombies/486517',
    id: '2jgPkn6LuUazBoBk6vvjh5'
  },
  'The Hollies': {
    name: 'The Hollies',
    biography: 'The Hollies are an English pop/rock band formed in Manchester in 1962. Known for their distinctive three-part vocal harmony style, they had numerous hits in the 1960s and 1970s.',
    formed: '1962',
    genres: ['Rock', 'Pop Rock', 'British Invasion'],
    members: ['Allan Clarke', 'Graham Nash', 'Tony Hicks', 'Eric Haydock', 'Bobby Elliott'],
    sourceUrl: 'https://music.apple.com/us/artist/the-hollies/156488',
    id: '6waa8mKu91GjzD4NlONlNJ'
  },
  'Phoebe Bridgers': {
    name: 'Phoebe Bridgers',
    biography: 'Phoebe Bridgers is an American singer-songwriter from Los Angeles. She made her solo debut with Stranger in the Alps (2017), followed by Punisher (2020), which earned widespread critical acclaim and four Grammy Award nominations.',
    image: 'https://i.scdn.co/image/ab6761610000e5eb88dfee0c7adf1f75be3b217b',
    formed: '2017',
    genres: ['Indie Rock', 'Indie Folk', 'Singer-Songwriter'],
    members: ['Phoebe Bridgers'],
    sourceUrl: 'https://music.apple.com/us/artist/phoebe-bridgers/1168416245',
    id: '1r1uxoy19fzMxunt3ONAkG'
  },
  'Clairo': {
    name: 'Clairo',
    biography: 'Claire Elizabeth Cottrill, known professionally as Clairo, is an American singer-songwriter. Born in Atlanta and raised in Massachusetts, she rose to prominence with her lo-fi single "Pretty Girl".',
    image: 'https://i.scdn.co/image/ab6761610000e5eb0c9e9878430a1c6c6cf6c5cb',
    formed: '2017',
    genres: ['Indie Pop', 'Bedroom Pop', 'Alternative'],
    members: ['Clairo'],
    sourceUrl: 'https://music.apple.com/us/artist/clairo/1239571943',
    id: '3l0CmX0FvP2TTD5kQFJ9Ka'
  },
  'Mitski': {
    name: 'Mitski',
    biography: 'Mitski Miyawaki, known mononymously as Mitski, is a Japanese-American singer-songwriter. Known for her emotionally intense indie rock and art pop, she has released critically acclaimed albums including "Puberty 2" and "Be the Cowboy".',
    image: 'https://i.scdn.co/image/ab6761610000e5eb40b5c07ab77b6b1a9075fdc0',
    formed: '2012',
    genres: ['Indie Rock', 'Art Pop', 'Alternative'],
    members: ['Mitski'],
    sourceUrl: 'https://music.apple.com/us/artist/mitski/757990028',
    id: '2uYWxilOVlUdk4oV9DvwqK'
  },
  'Lorde': {
    name: 'Lorde',
    biography: 'Ella Marija Lani Yelich-O\'Connor, known professionally as Lorde, is a New Zealand singer-songwriter. She gained international fame with her debut single "Royals" and album "Pure Heroine" at age 16.',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb99cacf8acd537820676726',
    formed: '2013',
    genres: ['Indie Pop', 'Art Pop', 'Electropop'],
    members: ['Lorde'],
    sourceUrl: 'https://music.apple.com/us/artist/lorde/456610732',
    id: '163tK9Wjr9P9DmM0AVK7lm'
  }
};
