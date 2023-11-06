import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";


 
export default function PageBar({href,page,Reviews}) {

  return (
<div className="flex gap-2 pb-3">
<Styled enabled={page>1} href={`${href}?page=${page- 1}`}><ChevronLeftIcon className="h-5 w-5"/>
<span className="sr-only">Previous Page</span></Styled>
<span>Page {page} of {Reviews}</span>
<Styled enabled={page<Reviews} href={`${href}?page=${page+1}`}><ChevronRightIcon className="h-5 w-5"/>
<span className="sr-only">Next Page</span>
</Styled>
</div>
  )
};
 function Styled({children,enabled,href}){
  if(!enabled) {
    return (
      <span className="border cursor-not-allowed rounded text-slate-300 text-sm">{children}</span>
    )
  }

  return(<Link className="bg-gray-300 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded flex gap-3 items-center" href={href}>{children}</Link>
    
  )

  
    
  
}
