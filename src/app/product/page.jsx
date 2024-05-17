"use client"

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import "./product.css";

const Product = ({searchParams: {id}}) => {
    const [principal, setPrincipal] = useState("1");

    return (
        <main className="main">
            <hr className="spacer mb-4"/>

            <div className="product-img flex flex-wrap justify-center gap-2">

                <div id="img-minis" className="flex justify-center flex-col gap-1.5">
                    <Image
                        src={"/teams/real-madrid/1.jpg"}
                        alt=""
                        width={130}
                        height={130}
                        quality={100}
                        onMouseOver={() => setPrincipal("1")}
                        className={principal === "1" ? "img-active" : ""}
                    />
                    <Image
                        src={"/teams/real-madrid/2.jpg"}
                        alt=""
                        width={130}
                        height={130}
                        quality={100}
                        onMouseOver={() => setPrincipal("2")}
                        className={principal === "2" ? "img-active" : ""}
                    />
                    <Image
                        src={"/teams/real-madrid/3.jpg"}
                        alt=""
                        width={130}
                        height={133}
                        quality={100}
                        onMouseOver={() => setPrincipal("3")}
                        className={principal === "3" ? "img-active" : ""}
                    />
                </div>

                <Image
                    src={"/teams/real-madrid/" + principal + ".jpg"}
                    alt=""
                    width={400}
                    height={400}
                    quality={100}
                />
            </div>
        </main>
    );
};

export default Product;