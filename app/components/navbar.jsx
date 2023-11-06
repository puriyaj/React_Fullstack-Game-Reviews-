import React from 'react'
import Link from 'next/link'
import NavLink from './navLink'
const Navbar = () => {
  return (
    <nav >
    <div className=" flex flex-row w-full justify-between absolute z-10 text-white pt-2 pl-1">
      <div className="font-bold font-orbitron text-2xl">
       <NavLink href="/">Game Reviews</NavLink> 
      </div>
        
      <div className="flex gap-4">
        <div className=" text-bold text-2xl justify-self-end">
       <NavLink href="/reviews">Reviews</NavLink> 
         </div>
         <div className="text-bold text-2xl pr-5">
        <NavLink href="/about" prefetch={false}>About</NavLink> 
      </div>
        
      </div>
     
 </div>
   </nav>
  )
}

export default Navbar