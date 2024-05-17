import React from 'react';
import Image from "next/image";
import {useProducts} from "@/hooks/useProducts";
import {formatPrice} from '@/utils/format-price';

const ProductsList = () => {
    const {data} = useProducts();

    return (
        <React.Fragment>
            <div className="container">
                {
                    data?.map(item =>
                        <React.Fragment key={item.id}>
                            <a className="card-list cursor-pointer" href={"/product?id=" + item.id}>
                                <Image
                                    src={"/teams/" + item.directory + "/1.jpg"} alt=""
                                    width={256}
                                    height={300}
                                    quality={100}
                                />

                                <div className="card-content">
                                    <h3>{item.team}</h3>
                                    <hr className="spacer"/>
                                    <p>{formatPrice(item.price)}</p>
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