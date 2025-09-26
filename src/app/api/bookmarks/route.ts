import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SupabaseGoldHighFiveService } from '@/services/supabaseGoldHighFiveService';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    // Get the user from the session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const listId = searchParams.get('listId');

    const service = SupabaseGoldHighFiveService.getInstance();

    let bookmarks;
    if (listId) {
      bookmarks = await service.getListBookmarks(user.id, parseInt(listId));
    } else if (query || category) {
      bookmarks = await service.searchBookmarks(user.id, query || '', category || undefined);
    } else {
      bookmarks = await service.getUserBookmarks(user.id);
    }

    return NextResponse.json({ success: true, data: bookmarks });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookmarks' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the user from the session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      listId,
      itemIndex,
      itemName,
      listTitle,
      listAuthor,
      listCategory,
      notes
    } = body;

    if (!listId || itemIndex === undefined || !itemName || !listTitle || !listAuthor || !listCategory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const service = SupabaseGoldHighFiveService.getInstance();
    const bookmark = await service.addBookmark(
      user.id,
      listId,
      itemIndex,
      itemName,
      listTitle,
      listAuthor,
      listCategory,
      notes
    );

    return NextResponse.json({ success: true, data: bookmark });
  } catch (error) {
    console.error('Error creating bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to create bookmark' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the user from the session
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const listId = searchParams.get('listId');
    const itemIndex = searchParams.get('itemIndex');

    if (!listId || itemIndex === null) {
      return NextResponse.json(
        { error: 'Missing listId or itemIndex' },
        { status: 400 }
      );
    }

    const service = SupabaseGoldHighFiveService.getInstance();
    await service.removeBookmark(user.id, parseInt(listId), parseInt(itemIndex));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to remove bookmark' },
      { status: 500 }
    );
  }
}