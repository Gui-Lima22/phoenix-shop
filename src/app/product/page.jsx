"use client"

import {useCallback, useContext, useEffect, useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {ChevronLeftIcon, MinusIcon, PlusIcon} from "@heroicons/react/16/solid";
import Image from "next/image";
import {PhoenixContext} from "@/context/phoenix-context";
import productService from "@/service/product-service";

const sizes = [
    {name: 'PP', inStock: false},
    {name: 'P', inStock: true},
    {name: 'M', inStock: true},
    {name: 'G', inStock: true},
    {name: 'GG', inStock: true},
    {name: 'XGG', inStock: true},
]

export default function Product({searchParams: id}) {
    const {cartList, setCartStorage} = useContext(PhoenixContext);
    const [product, setProduct] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(sizes[2]);

    useEffect(() => {
        productService.getById(id.id)
            .then(({ data }) => {
                setProduct(data);
                setIsLoading(false);
            });
    }, []);

    const  classNames = (...classes) => classes.filter(Boolean).join(' ');

    const changeQuantity = (type) => {
        setQuantity((prev) => {
            const newQuantity = type === "minus" ? --prev : ++prev;
            return Math.max(1, Math.min(newQuantity, 5));
        });
    }

    const addToCart = () => {
        const newCartList = [...cartList];

        const newItem = {
            id: product.id,
            size: selectedSize.name,
            quantity
        };

        const existingItem = newCartList.find(item => item.id === newItem.id && item.size === newItem.size);

        if (existingItem)
            existingItem.quantity += quantity;
        else
            newCartList.push(newItem);

        setCartStorage(newCartList);
    }

    return (
        <>
            {
                isLoading &&
                    <div className="background flex items-center justify-center">
                        <div role="status">
                            <svg aria-hidden="true"
                                 className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                 viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                        </div>
                    </div>
            }

            {
                product &&
                <div>
                    <hr className="spacer"/>
                    <div className="pt-6">
                        <div className="return-btn lg:ms-10 mb-5">
                            <a href="/list" className="flex text-gray-600" role="button">
                                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/> Voltar
                            </a>
                        </div>
                        <div
                            className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                            <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <Image
                                        src={"/teams/" + product.directory + "/3.jpg"}
                                        alt={product.directory}
                                        width={1000}
                                        height={1000}
                                        quality={100}
                                        priority
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                    <Image
                                        src={"/teams/" + product.directory + "/2.jpg"}
                                        alt={product.directory}
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
                                    src={"/teams/" + product.directory + "/1.jpg"}
                                    alt={product.directory}
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

                                <p className="text-3xl tracking-tight text-gray-900">R${product.price}</p>

                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
                                    </div>

                                    <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                        <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                        <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                            {sizes.map((size) => (
                                                <RadioGroup.Option
                                                    key={size.name}
                                                    value={size}
                                                    disabled={!size.inStock}
                                                    className={({active}) =>
                                                        classNames(
                                                            size.inStock
                                                                ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                                : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                                active ? 'ring-2 ring-indigo-500' : '',
                                                                'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6'
                                                            )
                                                        }
                                                    >
                                                    {({active, checked}) => (
                                                        <>
                                                            <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                                                            {size.inStock ?
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

                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Quantidade</h3>
                                    </div>

                                    <div className="flex sm:items-center sm:justify-center w-full mt-4 lg">
                                        <button onClick={() => changeQuantity("minus")} type="button"
                                                className="text-gray-600 group py-4 px-6 border border-gray-400 rounded-l-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                            <MinusIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                        <input type="text" readOnly
                                               className="font-semibold text-gray-600 cursor-pointer text-lg py-[13px] px-6 w-full sm:max-w-[118px] outline-0 border-y border-gray-400 bg-white placeholder:text-gray-900 text-center hover:bg-gray-50"
                                               placeholder={quantity.toString()}/>
                                        <button onClick={() => changeQuantity("plus")} type="button"
                                                className="text-gray-600 group py-4 px-6 border border-gray-400 rounded-r-full bg-white transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-300">
                                            <PlusIcon className="h-6 w-6" aria-hidden="true"/>
                                        </button>
                                    </div>
                                </div>


                                <button
                                    type="button" onClick={addToCart}
                                    className="mt-5 flex w-full items-center justify-center rounded-md border border-transparent bg-gray-600 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                                >
                                    Adicionar ao carrinho
                                </button>

                                <button
                                    type="button"
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
