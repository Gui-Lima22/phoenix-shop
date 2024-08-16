import React, {useContext} from 'react';
import Image from "next/image";
import {Select} from "@headlessui/react";
import {TrashIcon} from "@heroicons/react/16/solid";
import {PhoenixContext} from "@/context/phoenix-context";
import Link from "next/link";

const CartList = () => {
    const {cartList, setCartStorage} = useContext(PhoenixContext);

    const changeQuantity = ({ target: { value } }, id) => {
        const newQuantity = Number(value);

        if (isNaN(newQuantity) || newQuantity < 0) return;

        const newCartList = cartList.map(item =>
            item.id === id ? { ...item, quantity: newQuantity, totalCost: item.price * newQuantity } : item
        );

        setCartStorage(newCartList);
    }

    const removeItem = (id) => {
        const newCartList = cartList.filter(item => item.id !== id);
        setCartStorage(newCartList);
    }

    return (
        <div className="w-full md:mt-0 xl:p-0 lg:col-span-2 space-y-4">
            {
                cartList.map(item => {
                    return (
                        <div key={item.id + "-" + item.size}
                             className="sm:grid sm:grid-cols-3 bg-gray-100 rounded-lg shadow w-full p-6">
                            <Link href={"/product?id=" + item.id.split("-")[0]}
                               className="sm:place-self-center">
                                <Image
                                    src={"/teams/" + item.team + "/1.jpg"}
                                    alt={item.team}
                                    width={1000}
                                    height={1000}
                                    quality={100}
                                    priority
                                    className="h-full w-full object-cover object-center rounded-lg shadow sm:w-40"
                                />
                            </Link>
                            <div className="pl-0 sm:pl-2">
                                <h1 className="font-medium text-2xl">{item.team}</h1>
                                <p>{item.size}</p>
                            </div>
                            <div className="flex mt-4 sm:mt-0 sm:justify-end gap-5 pl-0 sm:pl-2">
                                <Select className="rounded shadow h-fit text-gray-600 w-1/4" value={item.quantity}
                                        onChange={(e) => changeQuantity(e, item.id)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Select>

                                <p>R$ {item.price}</p>
                                <button title="Remover do carrinho" className="h-fit float-end"
                                        onClick={() => removeItem(item.id)}>
                                    <TrashIcon className="h-6 w-6" aria-hidden="true"/>
                                </button>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default CartList;