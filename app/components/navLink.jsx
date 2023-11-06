'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavLink({children,href,prefetch}){
  const pathname = usePathname();

  if(pathname === href){
    return <span className="bg-gradient-to-r from-pink-500 to-red-500  rounded-lg">{children}</span>
  }
  return(
    
<Link href={href} prefetch={prefetch}>{children}</Link>

  )
}
