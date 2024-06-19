"use client"

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/loader";
import productService from "@/service/product-service";

const ProductsList = ({sort, filters}) => {
    const [products, setProducts] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        productService.list({filters, sort}).then(({data}) => {
            setProducts(data);
            setIsLoading(false);
        });
    }, [filters, sort]);

    return (
        <>
            {isLoading && <Loader/>}

            {
                products &&
                <div className="container justify-center">
                    {
                        products.map(item =>
                            <React.Fragment key={item.id}>
                                <Link className="card-list cursor-pointer shadow" href={"/product?id=" + item.id}>
                                    <Image
                                        src={"/teams/" + item.team + "/1.jpg"} alt=""
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        className="h-full w-full object-cover object-center"
                                    />

                                    <div className="card-content">
                                        <h3>{item.team}</h3>
                                        <hr className="spacer"/>
                                        <p>R${item.price}</p>
                                    </div>
                                </Link>
                            </React.Fragment>
                        )
                    }
                </div>
            }

            {
                products && !products.length &&
                <>
                    <div role="alert"
                         className="relative block w-full px-4 py-4 text-base text-gray-700 bg-white rounded-lg font-regular mt-4 shadow">
                        <div className="mr-12">Nenhum produto encontrado.</div>
                    </div>
                </>
            }
        </>
    );
}

export default ProductsList;