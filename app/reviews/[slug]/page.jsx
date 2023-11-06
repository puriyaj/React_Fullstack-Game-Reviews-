import Heading from "../../components/Heading"
import { Review } from "@/app/lib/reviews";
import Image from "next/image";

import { data } from "autoprefixer";
import { getSlugs } from "@/app/lib/reviews";
import ShareLinkButton from "@/app/components/ShareLinkButton";
import { notFound } from "next/navigation";

//export const dynamic='force-dynamic'
//dynamic Metadata

export async function generateStaticParams() {
  const slugs = await getSlugs();
  // console.log('[ReviewPage] generateStaticParams:', slugs);
  return slugs.map((slug) => ({ slug }));
}
export async function generateMetadata({params:{slug}}) {
  const Revie = await Review(slug);
  if(!Revie){
    notFound();
  }
  return {
    title:Revie.title,
  };
}

export default async function reviewsPage({params:{slug}}){
 const Reviews = await Review(slug);
 if(!Reviews){
  notFound();
}
  return (
    <><div className="pt-10 ">
       <Heading>{Reviews.title}</Heading>
     <p className="pt-2">{Reviews.subtitle}</p>
     <div className="flex gap-4 items-baseline">
     <p className="italic pb-2">{Reviews.date}</p>
     <ShareLinkButton />      
     </div>

     
     <Image  src={Reviews.image} alt=" " 
     width="640" height="360" className="mb-2 rounded"
     />
    <article dangerouslySetInnerHTML={{ __html: Reviews.body}} 
    className="prose max-w-screen-sm"/>
    </div>
    
    
    </>
    
  )
}