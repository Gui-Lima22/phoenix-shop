"use client"

import {useContext, useEffect, useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import {ChevronDownIcon, FunnelIcon} from "@heroicons/react/24/outline";
import {FilterContext} from "@/context/filter-context";
import ProductsList from "./components/product-list";
import ProductsFilter from "@/app/list/components/product-filter";
import "./list.css"

const List = () => {
    const client = new QueryClient();

    const {priority, setPriority} = useContext(FilterContext);
    const [isOpen, setOpen] = useState(false);

    useEffect(() => console.log(priority), [priority]);

    return (
        <QueryClientProvider client={client}>
            <main className="main">
                <hr className="spacer mb-4"/>
                <div className="flex w-full justify-end items-center gap-2 mb-2">
                    <Menu>
                        <MenuButton className="flex gap-1 text-gray-800 float-end">
                            Organizar por
                            <ChevronDownIcon className="h-6 w-6" aria-hidden="true"/>
                        </MenuButton>
                        <MenuItems
                            className="right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            anchor="bottom start">
                            <MenuItem>
                                <button type="button" onClick={() => setPriority("Relevance")}
                                        className="block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                >
                                    Relevância
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" onClick={() => setPriority("Name")}
                                        className="block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                >
                                    Nome
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" onClick={() => setPriority("LowPrice")}
                                        className="block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                >
                                    Menor preço
                                </button>
                            </MenuItem>
                            <MenuItem>
                                <button type="button" onClick={() => setPriority("BiggestPrice")}
                                        className="block px-4 py-2 text-sm text-gray-700 w-full text-start"
                                >
                                    Maior preço
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>

                    <button
                        type="button" onClick={() => setOpen(!isOpen)}
                        className="relative rounded-full p-1 text-gray-900 hover:text-gray-700 focus:outline-none"
                    >
                        <FunnelIcon className="h-6 w-6" aria-hidden="true"/>
                    </button>
                </div>

                <ProductsList />
                <ProductsFilter isOpen={isOpen} setOpen={() => setOpen(!isOpen)}/>

            </main>
        </QueryClientProvider>
    );
}

export default List;