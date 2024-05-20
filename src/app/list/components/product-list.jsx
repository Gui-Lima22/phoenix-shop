import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {formatPrice} from '@/utils/format-price';
import productService from "@/service/product-service";

const ProductsList = () => {
    const [products, setProducts] = useState(undefined);

    useEffect(() => {
        productService.list().then(({data}) => setProducts(data));
    }, []);

    return (
        <React.Fragment>
            <div className="container justify-center">
                {
                    products?.map(item =>
                        <React.Fragment key={item.id}>
                            <a className="card-list cursor-pointer shadow" href={"/product?id=" + item.id}>
                                <Image
                                    src={"/teams/" + item.directory + "/1.jpg"} alt=""
                                    width={256}
                                    height={300}
                                    quality={100}
                                />

                                <div className="card-content">
                                    <h3>{item.team}</h3>
                                    <hr className="spacer"/>
                                    <p>R${item.price}</p>
                                </div>
                            </a>
                        </React.Fragment>
                    )
                }
            </div>
        </React.Fragment>
    );
}

export default ProductsList;