import { NextResponse } from 'next/server';
import { getSearchableReviews } from '@/app/lib/reviews';

export async function GET(request) {
  const query = request.nextUrl.searchParams.get('query');
  const reviews = await getSearchableReviews(query);
  return NextResponse.json(reviews);
}