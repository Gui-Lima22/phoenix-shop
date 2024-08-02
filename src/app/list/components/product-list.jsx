"use client"

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/loader";
import productService from "@/service/product-service";
import {useQuery} from "@tanstack/react-query";

const ProductsList = ({sort, filters}) => {
    const {data, isLoading} = useQuery({
        queryFn: () => productService.list({filters, sort}).then(({data}) => data),
        queryKey: ["list", {filters, sort}]
    });

    return (
        <>
            {isLoading && <Loader/>}

            {
                data &&
                <div className="container justify-center">
                    {
                        data.map(item =>
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
                data && !data.length &&
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