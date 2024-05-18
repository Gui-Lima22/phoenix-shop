"use client"

import {useContext, useState} from "react";
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/24/outline";
import {PhoenixContext} from "@/context/phoenix-context";
import ProductsList from "./components/product-list";
import ProductsFilter from "@/app/list/components/product-filter";
import "./list.css"

const List = () => {
    const {priority, setPriority} = useContext(PhoenixContext);
    const [isOpen, setOpen] = useState(false);

    return (
        <>
            <hr className="spacer mb-4"/>
            <main
                className="mx-auto max-w-2xl px-4 pb-16 pt-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
                <div className="flex w-full justify-end items-center gap-2 mb-2">
                    <Menu>
                        <MenuButton className="flex gap-1 text-gray-600 float-end">
                            Organizar por
                            <ChevronDownIcon className="h-6 w-6" aria-hidden="true"/>
                        </MenuButton>
                        <Transition
                            enter="transition ease-out duration-75"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <MenuItems
                                anchor="bottom end"
                                className="w-52 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                            >
                                <MenuItem>
                                    <button type="button" onClick={() => setPriority("Relevance")}
                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                                    >
                                        Relevância
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button type="button" onClick={() => setPriority("Name")}
                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                                    >
                                        Nome
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button type="button" onClick={() => setPriority("LowPrice")}
                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                                    >
                                        Menor preço
                                    </button>
                                </MenuItem>
                                <MenuItem>
                                    <button type="button" onClick={() => setPriority("BiggestPrice")}
                                            className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200"
                                    >
                                        Maior preço
                                    </button>
                                </MenuItem>
                            </MenuItems>
                        </Transition>
                    </Menu>

                    <button
                        type="button" onClick={() => setOpen(!isOpen)}
                        className="relative rounded-full p-1 text-gray-900 hover:text-gray-600 focus:outline-none"
                    >
                        <FunnelIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>

                <ProductsList/>
                <ProductsFilter isOpen={isOpen} setOpen={() => setOpen(!isOpen)}/>

            </main>
        </>

    );
}

export default List;