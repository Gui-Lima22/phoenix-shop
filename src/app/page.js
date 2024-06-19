"use client"

import Image from "next/image";
import "./page.css"
import Background from "../../public/background/background.jpg";
import Link from "next/link";

export default function Home() {
    return (
        <main className="home flex">
            <div className="bg-image">
                <Image
                    className="background h-full w-full object-cover object-center"
                    src={Background}
                    alt=""
                    quality={100}
                    priority
                />

                <div className="mask">
                    <div className="title-div">
                        <h1 className="title text">Sport Collection</h1>
                        <Link className="home-btn inline-flex float-end text-gray-800 px-4 py-2 uppercase text-base rounded-none"
                           href={"/list"}>
                            Produtos
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
