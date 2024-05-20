"use client"

import React, {useContext} from 'react';
import {PhoenixContext} from "@/context/phoenix-context";

const Cart = () => {
    const {cartList, setCartStorage} = useContext(PhoenixContext);

    return (
        <div className="text-gray-600">
            <hr className="spacer"/>
            <div
                className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-2 lg:gap-x-8 px-8">
                <div className="w-full p-6 lg:p-0 bg-gray-100 rounded-lg shadow md:mt-0 xl:p-0">
                    <div className="lg:p-8 space-y-4">

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;