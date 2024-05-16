"use client"

import Image from "next/image";
import "./page.css"

export default function Home() {
  return (
    <main className="flex">
      <div className="bg-image">
          <Image
            fill
            className="background"
            src="/background.jpg"
            alt="Vercel Logo"
            quality={100}
            priority
          />
          
          <div className="mask">
              <div className="title-div">
                  <h1 className="title text">Sport Collection</h1>
                  <a className="home-btn inline-flex float-end text-gray-800 px-4 py-2 uppercase text-base rounded-none" href="/list">Produtos</a>
              </div>
          </div>
      </div>
    </main>
  );
}
