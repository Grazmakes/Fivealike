export interface ArtistFallback {
  name?: string;
  biography?: string;
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
  },
  'Lana Del Rey': {
    name: 'Lana Del Rey',
    biography: 'Lana Del Rey is an American singer-songwriter known for her cinematic quality, exploration of tragic romance and melancholia, and references to pop culture and 1950s–1960s Americana.',
    image: 'https://i.scdn.co/image/ab6761610000e5ebb99cacf8acd537820676726',
    formed: '2011',
    genres: ['Indie Pop', 'Dream Pop', 'Alternative'],
    members: ['Lana Del Rey'],
    sourceUrl: 'https://music.apple.com/us/artist/lana-del-rey/464296584',
    id: '00FQb4jTyendYWaN8pK0wa'
  },
  'The Get Up Kids': {
    name: 'The Get Up Kids',
    biography: 'The Get Up Kids are an American rock band from Kansas City. Formed in 1995, the band was a major influence on the mid-1990s emo scene and helped define the sound of the genre.',
    formed: '1995',
    genres: ['Emo', 'Indie Rock', 'Alternative Rock'],
    members: ['Matt Pryor', 'Jim Suptic', 'Rob Pope', 'Ryan Pope'],
    sourceUrl: 'https://music.apple.com/us/artist/the-get-up-kids/78722635',
    id: '54Bjxn26WsjfslQbNVtSCm'
  },
  'Piebald': {
    name: 'Piebald',
    biography: 'Piebald was an American rock band from Boston, Massachusetts. Formed in 1994, they were known for their energetic indie rock sound and thoughtful lyrics.',
    formed: '1994',
    genres: ['Indie Rock', 'Emo', 'Alternative Rock'],
    members: ['Travis Shettel', 'Aaron Stuart', 'Andrew Bonner', 'Luke Garro'],
    sourceUrl: 'https://music.apple.com/us/artist/piebald/5371911',
    id: '4rOGGTXaYygtFIHsPgLKJv'
  },
  'The Promise Ring': {
    name: 'The Promise Ring',
    biography: 'The Promise Ring is an American rock band from Milwaukee, Wisconsin, formed in 1995. They are considered one of the pioneering bands of the emo and indie rock movements.',
    formed: '1995',
    genres: ['Emo', 'Indie Rock', 'Power Pop'],
    members: ['Davey von Bohlen', 'Jason Gnewikow', 'Scott Schoenbeck', 'Dan Didier'],
    sourceUrl: 'https://music.apple.com/us/artist/the-promise-ring/15426791',
    id: '5li5GfWFVl73vu7r2bGitu'
  },
  'Jets to Brazil': {
    name: 'Jets to Brazil',
    biography: 'Jets to Brazil was an American indie rock band formed in 1997 by Blake Schwarzenbach, previously of Jawbreaker. They combined emotional lyrics with melodic punk and indie rock.',
    formed: '1997',
    genres: ['Indie Rock', 'Emo', 'Post-Hardcore'],
    members: ['Blake Schwarzenbach', 'Jeremy Chatelain', 'Chris Daly'],
    sourceUrl: 'https://music.apple.com/us/artist/jets-to-brazil/2717181',
    id: '03xcT10aipgYbYqusG7GWY'
  },
  'Texas Is the Reason': {
    name: 'Texas Is the Reason',
    biography: 'Texas Is the Reason was an American post-hardcore band founded by former Shelter guitarist Norman Brannon. Active from 1994-1997, they were highly influential in the emo and post-hardcore scenes.',
    formed: '1994',
    genres: ['Post-Hardcore', 'Emo', 'Indie Rock'],
    members: ['Garrett Klahn', 'Norman Brannon', 'Scott Winegard', 'Chris Daly'],
    sourceUrl: 'https://music.apple.com/us/artist/texas-is-the-reason/84282103',
    id: '7rXo5QTwwFBYZ5Z3veUVg8'
  },
  'Portishead': {
    name: 'Portishead',
    biography: 'Portishead is an English band formed in 1991 in Bristol. Pioneers of trip hop, they are known for their dark, cinematic sound combining hip-hop beats with atmospheric production.',
    formed: '1991',
    genres: ['Trip Hop', 'Electronic', 'Alternative'],
    members: ['Beth Gibbons', 'Geoff Barrow', 'Adrian Utley'],
    sourceUrl: 'https://music.apple.com/us/artist/portishead/712435',
    id: '6liAMWkVf5LH7YR9yfFy1Y'
  },
  'Massive Attack': {
    name: 'Massive Attack',
    biography: 'Massive Attack are an English trip hop collective formed in 1988 in Bristol, consisting of Robert "3D" Del Naja and Grant "Daddy G" Marshall. Pioneers of the trip hop genre.',
    formed: '1988',
    genres: ['Trip Hop', 'Electronic', 'Alternative'],
    members: ['Robert Del Naja', 'Grant Marshall'],
    sourceUrl: 'https://music.apple.com/us/artist/massive-attack/712433',
    id: '6FXMGgJwohJLUSr5nVlf9X'
  },
  'Thom Yorke': {
    name: 'Thom Yorke',
    biography: 'Thom Yorke is an English musician and the main vocalist and songwriter of Radiohead. Known for his experimental solo work exploring electronic music and art rock.',
    formed: '2006',
    genres: ['Electronic', 'Art Rock', 'Experimental'],
    members: ['Thom Yorke'],
    sourceUrl: 'https://music.apple.com/us/artist/thom-yorke/152285',
    id: '4CvTDPKA6W06DRfBnZKrau'
  },
  'Sigur Rós': {
    name: 'Sigur Rós',
    biography: 'Sigur Rós is an Icelandic post-rock band formed in 1994. Known for their ethereal sound, falsetto vocals, and use of bowed guitar, creating atmospheric and cinematic music.',
    formed: '1994',
    genres: ['Post-Rock', 'Ambient', 'Art Rock'],
    members: ['Jón Þór Birgisson', 'Georg Hólm', 'Kjartan Sveinsson'],
    sourceUrl: 'https://music.apple.com/us/artist/sigur-rós/3410835',
    id: '6UUrUCIZtQeOf8tC0WuzRy'
  },
  'Aphex Twin': {
    name: 'Aphex Twin',
    biography: 'Aphex Twin is the alias of Richard D. James, a British musician known for his influential and idiosyncratic work in electronic music, particularly IDM and ambient techno.',
    formed: '1985',
    genres: ['Electronic', 'IDM', 'Ambient'],
    members: ['Richard D. James'],
    sourceUrl: 'https://music.apple.com/us/artist/aphex-twin/5524',
    id: '6kBDZFXuLrZgHnvmPu9NsG'
  },
  'J. Cole': {
    name: 'J. Cole',
    biography: 'J. Cole is an American rapper, singer, and record producer. Known for his thoughtful, introspective lyrics and storytelling ability, he\'s one of hip-hop\'s most respected artists.',
    formed: '2007',
    genres: ['Hip-Hop', 'Rap', 'Conscious Rap'],
    members: ['J. Cole'],
    sourceUrl: 'https://music.apple.com/us/artist/j-cole/154991896',
    id: '6l3HvQ5sa6mXTsMTB19rO5'
  },
  'Joey Bada$$': {
    name: 'Joey Bada$$',
    biography: 'Joey Bada$$ is an American rapper and actor. A founding member of Pro Era, he\'s known for his conscious lyrics and 1990s boom bap-inspired production style.',
    formed: '2010',
    genres: ['Hip-Hop', 'Rap', 'Boom Bap'],
    members: ['Joey Bada$$'],
    sourceUrl: 'https://music.apple.com/us/artist/joey-bada/542648826',
    id: '2P5sC9cVZDToPxyomzF1UH'
  },
  'Danny Brown': {
    name: 'Danny Brown',
    biography: 'Danny Brown is an American rapper known for his unique vocal style, experimental production choices, and honest exploration of drug use and depression.',
    formed: '2007',
    genres: ['Hip-Hop', 'Experimental Hip-Hop', 'Alternative Rap'],
    members: ['Danny Brown'],
    sourceUrl: 'https://music.apple.com/us/artist/danny-brown/255933609',
    id: '7aA592KWirLsnfb5ulGWvU'
  },
  'Earl Sweatshirt': {
    name: 'Earl Sweatshirt',
    biography: 'Earl Sweatshirt is an American rapper and record producer. A former member of Odd Future, he\'s known for his introspective lyrics and experimental production.',
    formed: '2008',
    genres: ['Hip-Hop', 'Alternative Rap', 'Experimental'],
    members: ['Earl Sweatshirt'],
    sourceUrl: 'https://music.apple.com/us/artist/earl-sweatshirt/315221706',
    id: '3A5tHz1SfngyOZM2gItYKu'
  },
  'Vince Staples': {
    name: 'Vince Staples',
    biography: 'Vince Staples is an American rapper and singer. Known for his deadpan delivery, dark production, and socially conscious lyrics about life in Long Beach, California.',
    formed: '2011',
    genres: ['Hip-Hop', 'Rap', 'West Coast Hip-Hop'],
    members: ['Vince Staples'],
    sourceUrl: 'https://music.apple.com/us/artist/vince-staples/452135075',
    id: '68kEuyFKyqrdQQLLsmiatm'
  },
  'Sleep': {
    name: 'Sleep',
    biography: 'Sleep is an American doom metal band from San Jose, California. Known for their incredibly heavy, slow riffs and cannabis-themed lyrics.',
    formed: '1990',
    genres: ['Doom Metal', 'Stoner Metal', 'Sludge Metal'],
    members: ['Matt Pike', 'Al Cisneros', 'Jason Roeder'],
    sourceUrl: 'https://music.apple.com/us/artist/sleep/76601459',
    id: '4Mt6w4tDGcbFLw8duV5ZDJ'
  },
  'Pentagram': {
    name: 'Pentagram',
    biography: 'Pentagram is an American heavy metal band from Virginia, pioneers of doom metal formed in the early 1970s.',
    formed: '1971',
    genres: ['Doom Metal', 'Heavy Metal', 'Hard Rock'],
    members: ['Bobby Liebling', 'Victor Griffin', 'Greg Turley', 'Pete Campbell'],
    sourceUrl: 'https://music.apple.com/us/artist/pentagram/3375988',
    id: '5FfcfY6Y69jCAdIzHfMCqt'
  },
  'Ne Obliviscaris': {
    name: 'Ne Obliviscaris',
    biography: 'Ne Obliviscaris is an Australian progressive metal band from Melbourne. Known for combining extreme metal with progressive and classical elements.',
    formed: '2003',
    genres: ['Progressive Metal', 'Extreme Progressive Metal', 'Melodic Death Metal'],
    members: ['Xenoyr', 'Tim Charles', 'Benjamin Baret', 'Martino Garattoni', 'Dan Presland'],
    sourceUrl: 'https://music.apple.com/us/artist/ne-obliviscaris/318998634',
    id: '1aBEsbVxXmpLKVMO4bWPvH'
  },
  'Mr. Bungle': {
    name: 'Mr. Bungle',
    biography: 'Mr. Bungle is an American experimental rock band from California. Known for their genre-blending music incorporating metal, funk, jazz, and avant-garde.',
    formed: '1985',
    genres: ['Experimental Rock', 'Alternative Metal', 'Avant-Garde Metal'],
    members: ['Mike Patton', 'Trey Spruance', 'Trevor Dunn'],
    sourceUrl: 'https://music.apple.com/us/artist/mr-bungle/574726',
    id: '6kOanyE6YECzCHDwYk6HQo'
  },
  'Loathe': {
    name: 'Loathe',
    biography: 'Loathe is a British heavy metal band from Liverpool. Known for their atmospheric blend of metalcore, shoegaze, and progressive elements.',
    formed: '2014',
    genres: ['Metalcore', 'Progressive Metalcore', 'Alternative Metal'],
    members: ['Kadeem France', 'Erik Bickerstaffe', 'Connor Sweeney', 'Sean Radcliffe', 'Feisal El-Khazragi'],
    sourceUrl: 'https://music.apple.com/us/artist/loathe/959976815',
    id: '5G9wwzzGf0WSYy6VhaVjXG'
  },
  'Far': {
    name: 'Far',
    biography: 'Far is an American rock band from Sacramento, California. Known for their alternative metal sound with experimental and post-hardcore elements.',
    formed: '1991',
    genres: ['Alternative Metal', 'Post-Hardcore', 'Experimental Rock'],
    members: ['Jonah Matranga', 'Shaun Lopez', 'John Gutenberger', 'Chris Robyn'],
    sourceUrl: 'https://music.apple.com/us/artist/far/2723131',
    id: '08qMEcfHdOY3LAjZBkJQJI'
  },
  'Hum': {
    name: 'Hum',
    biography: 'Hum is an American alternative rock band from Champaign, Illinois. Known for their heavy, space rock sound and loud, droning guitars.',
    formed: '1989',
    genres: ['Alternative Rock', 'Space Rock', 'Shoegaze'],
    members: ['Matt Talbott', 'Tim Lash', 'Jeff Dimpsey', 'Bryan St. Pere'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/28/07/95/280795c7-2f6f-e1aa-7f64-24d617d6a49a/886445635768.jpg/600x600bb.jpg',
    sourceUrl: 'https://music.apple.com/us/artist/hum/150387',
    id: '22dGSRAi8vbIwnDPrXGIoC'
  },
  'The Ocean': {
    name: 'The Ocean',
    biography: 'The Ocean (also known as The Ocean Collective) is a German progressive metal band from Berlin. Known for their conceptual albums and heavy, atmospheric sound.',
    formed: '2000',
    genres: ['Progressive Metal', 'Post-Metal', 'Sludge Metal'],
    members: ['Robin Staps', 'Mattias Hägerstrand', 'Paul Seidel', 'Peter Voigtmann', 'David Ramis Åhfeldt'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/e1/3e/c0/e13ec0a8-e01b-6c90-7dcf-5bb50e5f3f34/884388501720.jpg/600x600bb.jpg',
    sourceUrl: 'https://music.apple.com/us/artist/the-ocean/156488385',
    id: '0Of52OWKkg7JJd7BouvAHy'
  },
  'Exodus': {
    name: 'Exodus',
    biography: 'Exodus is an American thrash metal band from the San Francisco Bay Area. One of the pioneering bands of the thrash metal movement.',
    formed: '1979',
    genres: ['Thrash Metal', 'Heavy Metal'],
    members: ['Gary Holt', 'Tom Hunting', 'Jack Gibson', 'Lee Altus', 'Steve "Zetro" Souza'],
    sourceUrl: 'https://music.apple.com/us/artist/exodus/78365134',
    id: '1R84VlXZIz27t5w1zBm0dH'
  },
  'Overkill': {
    name: 'Overkill',
    biography: 'Overkill is an American thrash metal band from New Jersey. One of the longest-running thrash metal bands, known for their speed and aggression.',
    formed: '1980',
    genres: ['Thrash Metal', 'Speed Metal'],
    members: ['Bobby "Blitz" Ellsworth', 'D.D. Verni', 'Dave Linsk', 'Derek Tailer', 'Jason Bittner'],
    sourceUrl: 'https://music.apple.com/us/artist/overkill/78602516',
    id: '6FGmETJ96xDL0OYfat7qGG'
  },
  'Dark Angel': {
    name: 'Dark Angel',
    biography: 'Dark Angel is an American thrash metal band from Los Angeles. Known for their fast, complex, and technical thrash metal style.',
    formed: '1981',
    genres: ['Thrash Metal', 'Speed Metal'],
    members: ['Ron Rinehart', 'Eric Meyer', 'Jim Durkin', 'Mike Gonzalez', 'Gene Hoglan'],
    sourceUrl: 'https://music.apple.com/us/artist/dark-angel/77982616',
    id: '3okbJPaULffLrISadcGfaH'
  },
  'Machine Head': {
    name: 'Machine Head',
    biography: 'Machine Head is an American heavy metal band from Oakland, California. Known for their groove metal sound and powerful live performances.',
    formed: '1991',
    genres: ['Heavy Metal', 'Groove Metal', 'Thrash Metal'],
    members: ['Robb Flynn', 'Jared MacEachern', 'Wacław "Vogg" Kiełtyka', 'Matt Alston'],
    sourceUrl: 'https://music.apple.com/us/artist/machine-head/472065',
    id: '0uD37qM98wbXzbQxgD0HzA'
  },
  'Enslaved': {
    name: 'Enslaved',
    biography: 'Enslaved is a Norwegian extreme metal band from Bergen. Known for pioneering viking metal and progressive black metal.',
    formed: '1991',
    genres: ['Progressive Black Metal', 'Viking Metal', 'Extreme Metal'],
    members: ['Grutle Kjellson', 'Ivar Bjørnson', 'Arve Isdal', 'Håkon Vinje', 'Iver Sandøy'],
    sourceUrl: 'https://music.apple.com/us/artist/enslaved/3339386',
    id: '1VhGU1PbC4XNWvHEztLaVM'
  },
  'Quicksand': {
    name: 'Quicksand',
    biography: 'Quicksand is an American post-hardcore band from New York City. Known for their influential sound combining hardcore punk with alternative rock.',
    formed: '1990',
    genres: ['Post-Hardcore', 'Alternative Metal', 'Hardcore Punk'],
    members: ['Walter Schreifels', 'Sergio Vega', 'Alan Cage', 'Aaron Stauffer'],
    image: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/75/aa/8d/75aa8db2-7b3d-b9b2-c876-14fa7e7e6de5/603497829347.jpg/600x600bb.jpg',
    sourceUrl: 'https://music.apple.com/us/artist/quicksand/3498182',
    id: '1NPQ2F0w5ALaguVRT7yYEU'
  },
  'Rishloo': {
    name: 'Rishloo',
    biography: 'Rishloo is an American progressive rock band from Seattle. Known for their complex song structures and atmospheric sound.',
    formed: '2002',
    genres: ['Progressive Rock', 'Progressive Metal', 'Art Rock'],
    members: ['Andrew Stroud', 'Dave Gillis', 'Zack Olive', 'Jesse Brock'],
    sourceUrl: 'https://music.apple.com/us/artist/rishloo/72823761',
    id: '0CkmkTlKC8xTahIEJpYHRr'
  },
  'A Perfect Circle': { id: '4DFhHyjvGYa9wxdHUjtDkc' },
  'Accept': { id: '3JDIAtVrJdQ7GFOX26LYpv' },
  'Anthrax': { id: '3JysSUOyfVs1UQ0UaESheP' },
  'Baroness': { id: '3KdXhEwbqFHfNfSk7L9E87' },
  'Candlemass': { id: '7zDtfSB0AOZWhpuAHZIOw5' },
  'Deftones': { id: '6Ghvu1VvMGScGpOUJBAHNH' },
  'Devin Townsend': { id: '6uejjWIOshliv2Ho0OJAQN' },
  'Dio': { id: '4CYeVo5iZbtYGBN4Isc3n6' },
  'Edge of Sanity': { id: '1Mcy1ngqEXUXXEQEpUDGix' },
  'Electric Wizard': { id: '4htjQW3lgIwL6fEJlTOez4' },
  'Faith No More': { id: '6GbCJZrI318Ybm8mY36Of5' },
  'Gojira': { id: '0GDGKpJFhVpcjIGF8N6Ewt' },
  'High on Fire': { id: '1eiIIImNeUj3vpaocWqoOf' },
  'Judas Priest': { id: '2tRsMl4eGxwoNabM08Dm4I' },
  'Karnivool': { id: '6rX8AFY10dsJkJsv23Z9Um' },
  'Katatonia': { id: '2CWWgbxApjbyByxBBCvGTm' },
  'Kreator': { id: '3BM0EaYmkKWuPmmHFUTQHv' },
  'Kvelertak': { id: '0VE0GTaTSeeGSzrQpLmeb9' },
  'Lamb of God': { id: '3JFsVIxOn7STeilPICkkB2' },
  'Mastodon': { id: '1Dvfqq39HxvCJ3GvfeIFuT' },
  'Megadeth': { id: '1Yox196W7bzVNZI7RBaPnf' },
  'Meshuggah': { id: '3ggwAqZD3lyT2sbovlmfQY' },
  'Mudvayne': { id: '2Pfv2w8a20xzC7Dr7QXRqM' },
  'Neurosis': { id: '1KHydwFySZY3YcWyo2q2dF' },
  'Pantera': { id: '14pVkFUHDL207LzLHtSA18' },
  'Placebo': { id: '6RZUqkomCmb8zCRqc9eznB' },
  'Porcupine Tree': { id: '5NXHXK6hOCotCF8lvGM1I0' },
  'Rage Against the Machine': { id: '2d0hyoQ5ynDBnkvAbJKORj' },
  'Running Wild': { id: '7954VFaZClkL503srfV5PE' },
  'Saint Vitus': { id: '64yj4wx5kNH3NTUW0ghyxn' },
  'Saxon': { id: '71vVmHeNgCVSa5SVmfvscU' },
  'Sepultura': { id: '6JW8wliOEwaDZ231ZY7cf4' },
  'Soen': { id: '38uWD5h115pdz278q4rwZW' },
  'Testament': { id: '28hJdGN1Awf7u3ifk2lVkg' },
  'The Sword': { id: '0q32a3GRCjDxS4EIrC7YVY' }
};
