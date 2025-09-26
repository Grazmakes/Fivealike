import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { SupabaseGoldHighFiveService } from '@/services/supabaseGoldHighFiveService';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  try {
    // Get the user from the session (optional for public endpoints)
    const { data: { user } } = await supabase.auth.getUser();

    const searchParams = request.nextUrl.searchParams;
    const listId = searchParams.get('listId');
    const authorName = searchParams.get('author');
    const userId = searchParams.get('userId');
    const stats = searchParams.get('stats') === 'true';

    const service = SupabaseGoldHighFiveService.getInstance();

    if (stats && listId) {
      // Get list statistics
      const listStats = await service.getListGoldHighFiveStats(parseInt(listId));
      return NextResponse.json({ success: true, data: listStats });
    }

    if (listId) {
      // Get Gold High Fives for a specific list
      const goldHighFives = await service.getListGoldHighFives(parseInt(listId));
      return NextResponse.json({ success: true, data: goldHighFives });
    }

    if (authorName) {
      // Get Gold High Fives received by an author
      const goldHighFives = await service.getAuthorGoldHighFives(authorName);
      return NextResponse.json({ success: true, data: goldHighFives });
    }

    if (userId && user && (user.id === userId || user.user_metadata?.role === 'admin')) {
      // Get Gold High Fives given by a user (only accessible by the user themselves or admins)
      const goldHighFives = await service.getUserGoldHighFives(userId);
      return NextResponse.json({ success: true, data: goldHighFives });
    }

    if (user) {
      // Get Gold High Fives given by the current user
      const goldHighFives = await service.getUserGoldHighFives(user.id);
      return NextResponse.json({ success: true, data: goldHighFives });
    }

    return NextResponse.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error fetching Gold High Fives:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Gold High Fives' },
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
    const { listId, listTitle, listAuthor } = body;

    if (!listId || !listTitle || !listAuthor) {
      return NextResponse.json(
        { error: 'Missing required fields: listId, listTitle, listAuthor' },
        { status: 400 }
      );
    }

    const service = SupabaseGoldHighFiveService.getInstance();

    // Check if user is eligible (has completed all 5 items with positive ratings)
    const completionStatus = await service.getListCompletionStatus(user.id, listId);

    if (!completionStatus?.is_eligible_for_gold_high_five) {
      return NextResponse.json(
        { error: 'Not eligible for Gold High Five. Complete all 5 items with positive ratings first.' },
        { status: 400 }
      );
    }

    // Check if Gold High Five already exists
    const existingGoldHighFives = await service.getUserGoldHighFives(user.id);
    const hasExisting = existingGoldHighFives.some(ghf => ghf.list_id === listId);

    if (hasExisting) {
      return NextResponse.json(
        { error: 'Gold High Five already exists for this list' },
        { status: 409 }
      );
    }

    const goldHighFive = await service.createGoldHighFive(user.id, listId, listTitle, listAuthor);

    return NextResponse.json({ success: true, data: goldHighFive });
  } catch (error) {
    console.error('Error creating Gold High Five:', error);
    return NextResponse.json(
      { error: 'Failed to create Gold High Five' },
      { status: 500 }
    );
  }
}