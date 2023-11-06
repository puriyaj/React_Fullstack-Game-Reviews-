import Link from "next/link";
import Heading from "../components/Heading";
import  { getReview } from "../lib/reviews";
import Image from "next/image";
import PageBar from "../components/Pages";
import SearchBox from "../components/searcgBox";
//export const revalidate = 30; //sec


export default async function ReviewsPage({searchParams}){
  const page = parsePageParam(searchParams.page) ;
  const Reviews = await getReview(6,page);
 

  return (
    <>
    <div className="pt-11">
       <Heading>Reviews</Heading>
     <div className="flex justify-between pb-3">
      <PageBar href="/reviews" page= {page} Reviews={Reviews[0].pageCount}/>
      <SearchBox  />
     </div>
     
    <p>
      Here we´ll list all reviews.
    </p> 
    <nav>
      <ul className="flex flex-row flex-wrap gap-3">
        {Reviews.map((review,index)=>(
           <li key={review.slug} className="bg-while border shadow w-80 hover:shadow-xl">
          <Link href={`/reviews/${review.slug}`}>{review.title}
          <Image src={review.image} alt=" "  priority={index === 0}
     width="320" height="180" className=" rounded-t"
     />
     <h2 className="py-1 text-center">{review.title}</h2>
     </Link>
        </li>
        ))}
      </ul>
    </nav>
    </div>
    
    </>
    
  )
}
function parsePageParam(paramValue){
  if(paramValue){
    const page = parseInt(paramValue);
   if(isFinite(page) && page > 0){
    return page;
  }}
  return 1;
}