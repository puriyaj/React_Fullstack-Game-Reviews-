//import Link from "next/link";
import './globals.css';
import Navbar from "./components/navbar";
import {exo_2, orbitron } from "./fonts";


export const metadata = {
  title:{default:'indie gamer',
template:'%s | Indie Gamer'
},
  description:'best games',
 
 };

export default function RootLayout({children}) {
  return (
    <html lang="en" className={`${exo_2.variable} ${orbitron.variable}`}>
      <body className="bg-gray-400 flex flex-col   min-h-screen "> 
      <header>
<Navbar />
      </header>
      
     
      
     <main className="grow">
      {children }
     </main>


     <footer className="border-t py-3 text-center text-xs font-sans bg-blue-950">
      Game data and images courtesy of 
      <a href="https://rawg.io" target="_blank" className="text-orange-800 hover:underline"> RAWG</a>
     </footer>
      </body>
    </html>
  )
}