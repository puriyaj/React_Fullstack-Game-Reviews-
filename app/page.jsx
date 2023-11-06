import Heading from './components/Heading';
import Link from 'next/link';
import { getReview } from './lib/reviews';
import Image from 'next/image';
import Videos from './components/video';

//export const dynamic='force-dynamic'
//export const revalidate = 30; //sec
export default async function HomePage(){
  const newRevss = await getReview(3);
  
  
  return (
    <>
    <Videos />

    <div className="">
      <div className="text-center  text-3xl p-5">
        <Heading >Game Reviews</Heading>
    <p className="pb-3">
      only the best  games, reviewed for you.
    </p> 
      </div>
       
       <ul className="flex flex-row gap-3 justify-around items-center p-5" >
        {newRevss.map((newRevs,index)=>( <li key={newRevs.slug} className="bg-gray-800 border  rounded-lg shadow w-24 min-w-max hover:shadow-xl sm:w-full  ">
          <Link className=" " href={`/reviews/${newRevs.title}`}>
          <Image  src={newRevs.image} alt="game photo "  priority={index===0}
     width="500" height="300" className="rounded-t sm:rounded-l sm:rounded-r-none  "
     />
     <div className="px-2 text-center sm:text-left text-white p-2">
     <h2 className="font-orbitron font-semibold" >{newRevs.title}</h2>
     <p className="hidden pt-2 sm:block ">
      {newRevs.subtitle}
     </p>  
     </div>
    
     </Link>
     </li>          )
       
        )}
       </ul>

    </div>
    
    </>
    
  )
}