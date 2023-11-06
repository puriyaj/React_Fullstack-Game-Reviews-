import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req){
  const payload= await req.json();
  //return NextResponse.json()
  if(payload.model === 'review'){
    revalidateTag('reviews');
  }
  return new Response(null,{status:204})
}