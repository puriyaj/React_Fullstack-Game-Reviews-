'use client';
import { LinkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function ShareLinkButton(){
  const [clicked,update] = useState(false);
  const handleClick =()=>  {
    //copy link
    navigator.clipboard.writeText(window.location.href);
    update(true);
    setTimeout(()=> update(false),1500);
  }
  return(
    <button className="bg-violet-300 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded flex gap-3 items-center" onClick={handleClick}>
      <LinkIcon className="h-4 w-4 flex-row gap-3"/>
      {clicked?'linked copied':'Share link'}
    </button>
  );
};