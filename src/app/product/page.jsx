"use client"

import {useContext, useState} from 'react'
import {RadioGroup} from '@headlessui/react'
import {ChevronLeftIcon, MinusIcon, PlusIcon} from "@heroicons/react/16/solid";
import Image from "next/image";
import {PhoenixContext} from "@/context/phoenix-context";

const product = {
    id: 1,
    name: 'Real Madrid',
    price: '$192',
    images: [
        {
            src: '/teams/real-madrid/2.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: '/teams/real-madrid/3.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: '/teams/real-madrid/1.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    sizes: [
        {name: 'PP', inStock: false},
        {name: 'P', inStock: true},
        {name: 'M', inStock: true},
        {name: 'G', inStock: true},
        {name: 'GG', inStock: true},
        {name: 'XGG', inStock: true},
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

export default function Product() {
    const {cartList, setCartStorage} = useContext(PhoenixContext);

    const [selectedSize, setSelectedSize] = useState(product.sizes[2])
    const [quantity, setQuantity] = useState(1);

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
        <div>
            <hr className="spacer"/>
            <div className="pt-6">
                <div className="return-btn lg:ms-10 mb-5">
                    <a href="/list" className="flex text-gray-600" role="button">
                        <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/> Voltar
                    </a>
                </div>
                <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-6xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <Image
                                src={product.images[0].src}
                                alt={product.images[0].alt}
                                width={1000}
                                height={1000}
                                quality={100}
                                priority
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <Image
                                src={product.images[1].src}
                                alt={product.images[1].alt}
                                width={1000}
                                height={1000}
                                quality={100}
                                priority
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                    </div>
                    <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                        <Image
                            src={product.images[2].src}
                            alt={product.images[2].alt}
                            width={1000}
                            height={1000}
                            quality={100}
                            priority
                            className="h-full w-full object-cover object-center"
                        />
                    </div>

                    <div className="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:border-gray-400 px-8">
                        <div className="lg:col-span-2">
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{product.name}</h1>
                        </div>

                        <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>

                        <div className="mt-10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-gray-900">Tamanho</h3>
                            </div>

                            <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
                                <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
                                <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                    {product.sizes.map((size) => (
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
                                                        (<span
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
                                                          </span>)
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
                                <p className="text-base text-gray-900">{product.description}</p>
                            </div>
                        </div>

                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                            <div className="mt-4">
                                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                    {product.highlights.map((highlight) => (
                                        <li key={highlight} className="text-gray-400">
                                            <span className="text-gray-600">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
