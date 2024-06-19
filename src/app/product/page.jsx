"use client"

import React, {useContext, useEffect, useState} from 'react'
import {useRouter} from "next/navigation";
import {RadioGroup, Select} from '@headlessui/react'
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import {PhoenixContext} from "@/context/phoenix-context";
import productService from "@/service/product-service";
import Loader from "@/components/loader";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Link from "next/link";

class Colors {
    static get black() { return 'Preto'; }
    static get garnet() { return 'Garnet'; }
    static get blue() { return 'Azul'; }
    static get red() { return 'Vermelho'; }
    static get yellow() { return 'Amarelo'; }
    static get white() { return 'Branco'; }
    static get green() { return 'Verde'; }
    static get orange() { return 'Laranja'; }
}

export default function Product({searchParams: id}) {
    const {cartList, setCartStorage} = useContext(PhoenixContext);
    const router = useRouter();

    const [product, setProduct] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState([]);

    useEffect(() => {
        productService.getById(id.id)
            .then(({ data }) => {
                data.color = JSON.parse(data.color).map(color => Colors[color]).join(", ");

                setProduct(data);
                setIsLoading(false);
            });
    }, [id.id]);

    const  classNames = (...classes) => classes.filter(Boolean).join(' ');

    const changeQuantity = (e) => {
        const {value} = e.target;
        setQuantity(parseInt(value));
    }

    const addToCart = (buy = false) => {
        if (!selectedSize.size) {
            toast.warning("Selecione um tamanho.");
            return;
        }

        const newCartList = [...cartList];

        const newItem = {
            id: product.id + "-" + selectedSize.size,
            team: product.team,
            price: product.price,
            storage: product.storage,
            size: selectedSize.size,
            totalCost: product.price * quantity,
            quantity
        };

        const existingItem = newCartList.find(item => item.id === newItem.id && item.size === newItem.size);

        if (existingItem)
            existingItem.quantity += quantity;
        else
            newCartList.push(newItem);

        setCartStorage(newCartList);

        if (buy) router.push("/cart");
    }

    return (
        <>
            <ToastContainer />
            <hr className="spacer"/>
            { isLoading && <Loader /> }

            {
                product &&
                <div>
                    <div className="pt-6">
                        <div className="return-btn lg:ms-10 mb-5">
                            <Link href={"/list"} className="flex text-gray-600" role="button">
                                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/> Voltar
                            </Link>
                        </div>
                        <div
                            className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <Image
                                        src={"/teams/" + product.team + "/3.jpg"}
                                        alt={product.team}
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        priority
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <Image
                                        src={"/teams/" + product.team + "/2.jpg"}
                                        alt={product.team}
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        priority
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            <div
                                className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                                <Image
                                    src={"/teams/" + product.team + "/1.jpg"}
                                    alt={product.team}
                                    width={1000}
                                    height={1000}
                                    quality={100}
                                    priority
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>

                            <div className="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:border-gray-400 px-8">
                                <div className="lg:col-span-2">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.team}</h1>
                                </div>

                                <p className="text-base tracking-tight text-gray-900">Cor: {product.color}</p>
                                <p className="text-3xl tracking-tight text-gray-900 mt-4">R${product.price}</p>

                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {product.size.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.size}
                                                    value={size}
                                                    disabled={!size.in_stock}
                                                    className={({active}) =>
                                                        classNames(
                                                            size.in_stock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                active ? 'ring-2 ring-indigo-500' : '',
                                                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                            )
                                                        }
                                                    >
                                                    {({active, checked}) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.size}</RadioGroup.Label>
                                                            {size.in_stock ?
                                                                (<span
                                                                    className={classNames(
                                                                        active ? 'border' : 'border-2',
                                                                        checked ? 'border-indigo-500' : 'border-transparent',
                                                                        'pointer-events-none absolute -inset-px rounded-md'
                                                                    )}
                                                                    aria-hidden="true"
                                                                />) :
                                                                (
                                                                    <span
                                                                    aria-hidden="true"
                                                                    className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-400"
                                                                    >
                                                                        <svg
                                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-400"
                                                                            viewBox="0 0 100 100"
                                                                            preserveAspectRatio="none"
                                                                            stroke="currentColor"
                                                                        >
                                                                          <line x1={0} y1={100} x2={100} y2={0}
                                                                                vectorEffect="non-scaling-stroke"/>
                                                                        </svg>
                                                                    </span>
                                                                )
                                                            }
                                                        </>
                                                    )}
                                                </RadioGroup.Option>
                                            ))}
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="mt-5">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Quantidade</h3>
                                    </div>

                                    <Select className="rounded shadow text-gray-600 w-1/4" onChange={changeQuantity}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Select>
                                </div>


                                <button
                                    type="button" onClick={addToCart}
                                    className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Adicionar ao carrinho
                                </button>

                                <button
                                    type="button" onClick={() => addToCart(true)}
                                    className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-8 py-3 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>

                        <div
                            className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">

                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Detalhes</h1>

                            <div
                                className="py-10 lg:col-start-1 lg:pb-16 lg:pr-8 lg:pt-6">
                                <div>
                                    <h3 className="sr-only">Description</h3>

                                    <div className="space-y-6">
                                        <p className="text-base text-gray-900"
                                           dangerouslySetInnerHTML={{__html: product.description}}></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
