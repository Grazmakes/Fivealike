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
    const listId = searchParams.get('listId');
    const nearCompletion = searchParams.get('nearCompletion') === 'true';

    const service = SupabaseGoldHighFiveService.getInstance();

    if (nearCompletion) {
      // Get lists near completion (4/5 items completed)
      const nearCompletionLists = await service.getListsNearCompletion(user.id);
      return NextResponse.json({ success: true, data: nearCompletionLists });
    }

    if (listId) {
      // Get completion status for a specific list
      const completionStatus = await service.getListCompletionStatus(user.id, parseInt(listId));
      return NextResponse.json({ success: true, data: completionStatus });
    }

    // Get all completion statuses for the user
    const completionStatuses = await service.getUserCompletionStatuses(user.id);
    return NextResponse.json({ success: true, data: completionStatuses });
  } catch (error) {
    console.error('Error fetching completion status:', error);
    return NextResponse.json(
      { error: 'Failed to fetch completion status' },
      { status: 500 }
    );
  }
}