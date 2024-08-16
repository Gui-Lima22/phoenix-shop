import React, {useContext} from 'react';
import {Menu, MenuButton, MenuItem, MenuItems, Transition} from "@headlessui/react";
import {
    Bars3BottomLeftIcon,
    ChartPieIcon,
    CurrencyDollarIcon,
    QueueListIcon,
    UserIcon,
    UsersIcon
} from "@heroicons/react/24/outline";
import {PhoenixContext} from "@/context/phoenix-context";
import {useRouter} from "next/navigation";
import Link from "next/link";

const managementItens = [
    {link: "/management", icon: <ChartPieIcon className="h-6 w-6" aria-hidden="true"/>, text: "Dashboard"},
    {link: "/management", icon: <QueueListIcon className="h-6 w-6" aria-hidden="true"/>, text: "Produtos"},
    {link: "/management", icon: <CurrencyDollarIcon className="h-6 w-6" aria-hidden="true"/>, text: "Relatórios"},
    {link: "/management", icon: <UsersIcon className="h-6 w-6" aria-hidden="true"/>, text: "Usuários"},
]

const ManagementNav = () => {
    const {removeCookie} = useContext(PhoenixContext);
    const router = useRouter();

    const logout = () => {
        removeCookie("access_token");
        router.push("/list");
    }

    return (
        <>
            <nav
                className="fixed top-0 z-50 w-full border-b bg-gray-800 border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <Menu as="div">
                                <div>
                                    <MenuButton
                                        className="relative sm:hidden rounded-full p-1 text-slate-50 hover:text-slate-300 focus:outline-none">
                                        <span className="absolute -inset-1.5"/>
                                        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true"/>
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
                                        className="w-52 mt-2 bg-gray-800 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none z-99"
                                    >
                                        {
                                            managementItens.map(item =>
                                                <MenuItem key={item.text}>
                                                    <Link href={item.link}
                                                          className="group flex w-full items-center text-slate-50 gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700">
                                                        {item.icon} {item.text}
                                                    </Link>
                                                </MenuItem>
                                            )
                                        }
                                    </MenuItems>
                                </Transition>
                            </Menu>
                            <Link className="cursor-pointer text-slate-50 text-3xl lg:text-4xl ms-2" href="/">
                                Phoenix Shop
                            </Link>
                        </div>
                        <Menu as="div">
                            <div>
                                <MenuButton
                                    className="relative rounded-full p-1 text-slate-50 hover:text-slate-300 focus:outline-none ring-2 ring-slate-50 ring-offset-slate-50">
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
                                    className="w-52 mt-2 origin-top-right rounded-xl border border-white/5 bg-gray-800 p-1 text-sm/6 text-gray-600 [--anchor-gap:var(--spacing-1)] focus:outline-none z-99"
                                >
                                    <MenuItem>
                                        <Link href={"/management"}
                                              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700 text-slate-50">
                                            Dashboard
                                        </Link>
                                    </MenuItem>


                                    <MenuItem>
                                        <Link href={"/list"}
                                              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700 text-slate-50">
                                            Lista de produtos
                                        </Link>
                                    </MenuItem>

                                <MenuItem>
                                    <Link href={"/my-user"}
                                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700 text-slate-50">
                                        Meu perfil
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <button onClick={logout} className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700 text-slate-50">
                                        Sair
                                    </button>
                                </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                </div>
            </nav>

            <aside id="logo-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r sm:translate-x-0 bg-gray-800 border-gray-700"
                   aria-label="Sidebar">
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        {
                            managementItens.map(item =>
                                <li key={item.text}>
                                    <Link href={item.link}
                                          className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-700">
                                        {item.icon} {item.text}
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </aside>

        </>
    );
};

export default ManagementNav;