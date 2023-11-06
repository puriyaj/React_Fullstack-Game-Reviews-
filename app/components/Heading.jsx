//import { Orbitron } from 'next/font/google'
import React from 'react'
//import { orbitron } from '../fonts'

const Heading = ({children}) => {
  return (
    <div><h1 className="font-bold font-orbitron pd-3 text-5xl ">{children}</h1></div>
  )
}

export default Heading