"use client"

import {Fragment, useContext} from 'react'
import {Disclosure, Menu, MenuItems, MenuItem, Transition, MenuButton} from '@headlessui/react'
import {ShoppingCartIcon, UserIcon} from '@heroicons/react/24/outline'
import {PhoenixContext} from "@/context/phoenix-context";

const Header = () => {
    const {cartList, cookies} = useContext(PhoenixContext);

    return (
        <Disclosure as="nav" className="nav">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="flex flex-1 items-stretch justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <a className="cursor-pointer text-gray-600 text-3xl lg:text-4xl" href="/">
                                Phoenix Shop
                            </a>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <a
                            type="button" href="/cart"
                            className="relative rounded-full p-1 text-gray-900 hover:text-gray-700 focus:outline-none ring-2 ring-gray-800 ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5"/>
                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true"/>
                            {cartList.length > 0 && <span id="cart-count">{cartList.length}</span>}
                        </a>

                        <Menu as="div" className="relative ml-5">
                            <div>
                                <MenuButton
                                    className="relative rounded-full p-1 text-gray-900 hover:text-gray-700 focus:outline-none ring-2 ring-gray-800 ring-offset-gray-800">
                                    <span className="absolute -inset-1.5"/>
                                    <UserIcon className="h-6 w-6" aria-hidden="true"/>
                                </MenuButton>
                            </div>
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
                                    className="w-52 mt-2 origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                                >
                                    {
                                        cookies.access_token ?
                                            <>
                                                <MenuItem>
                                                    <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                                                        Meu perfil
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200">
                                                        Sair
                                                    </a>
                                                </MenuItem>
                                            </>
                                            :
                                            <>
                                                <MenuItem>
                                                    <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200" href="/login">
                                                        Entrar
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-200" href="/register">
                                                        Cadastrar
                                                    </a>
                                                </MenuItem>
                                            </>
                                    }
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}

export default Header;