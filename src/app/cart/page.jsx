"use client"

import React, {useContext} from 'react';
import {PhoenixContext} from "@/context/phoenix-context";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import CartList from "@/app/cart/components/cart-list";
import Link from "next/link";

const Cart = () => {
    const {cartList} = useContext(PhoenixContext);

    const getTotal = () => cartList.reduce((sum, item) => sum + item.totalCost, 0);

    return (
        <div className="text-gray-600">
            <hr className="spacer"/>
            <div className="return-btn lg:ms-10 my-5">
                <Link href={"/list"} className="flex text-gray-600" role="button">
                    <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/> Voltar
                </Link>
            </div>
            <div
                className="mx-auto my-6 max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-x-6 px-8 space-y-4 lg:space-y-0">

                <CartList />

                <div className="w-full bg-gray-100 rounded-lg shadow md:mt-0 xl:p-0 h-fit lg:p-8 space-y-4">
                    <div className="p-8 space-y-4 h-full">

                        <p>Produtos: R${getTotal()}</p>
                        <p>Frete: R$15,00</p>
                        <hr className="spacer"/>
                        <strong>Total: {cartList.length && "R$" + (getTotal() + 15)}</strong>

                        <button
                            type="button"
                            className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Comprar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;