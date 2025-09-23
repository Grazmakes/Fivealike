import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || '20');

    if (!query) {
      return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const googleBooksApiKey = process.env.GOOGLE_BOOKS_API_KEY;

    if (googleBooksApiKey && googleBooksApiKey !== 'your_google_books_api_key_here') {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${googleBooksApiKey}&maxResults=${limit}`, {
          headers: {
            'User-Agent': 'Five Alike App/1.0'
          }
        });

        if (response.ok) {
          const data = await response.json();
          const books = (data.items || []).map((book: any) => ({
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors || [],
            description: book.volumeInfo.description,
            thumbnail: book.volumeInfo.imageLinks?.thumbnail?.replace('http:', 'https:'),
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount,
            categories: book.volumeInfo.categories,
            language: book.volumeInfo.language,
            infoLink: book.volumeInfo.infoLink
          }));

          return NextResponse.json(books);
        }
      } catch (error) {
        console.error('Google Books API error:', error);
      }
    }

    // Fallback mock data
    const mockBooks = [
      {
        id: "1",
        title: "The Great Gatsby",
        authors: ["F. Scott Fitzgerald"],
        description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on prosperous Long Island and in New York City during the summer of 1922.",
        thumbnail: "https://books.google.com/books/content?id=iXn5CwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        publishedDate: "1925-04-10",
        pageCount: 180,
        categories: ["Fiction"],
        language: "en"
      },
      {
        id: "2",
        title: "To Kill a Mockingbird",
        authors: ["Harper Lee"],
        description: "A novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.",
        thumbnail: "https://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
        publishedDate: "1960-07-11",
        pageCount: 324,
        categories: ["Fiction"],
        language: "en"
      }
    ];

    const filteredBooks = query
      ? mockBooks.filter(book =>
          book.title.toLowerCase().includes(query.toLowerCase()) ||
          book.authors.some(author => author.toLowerCase().includes(query.toLowerCase())) ||
          (book.description && book.description.toLowerCase().includes(query.toLowerCase()))
        )
      : mockBooks;

    return NextResponse.json(filteredBooks.slice(0, limit));
  } catch (error) {
    console.error('Books search error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
