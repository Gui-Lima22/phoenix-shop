"use client"

import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";
import {usePathname} from "next/navigation";
import Header from "@/components/header";
import ManagementNav from "@/components/managementNav";

export const PhoenixContext = createContext(undefined);

const client = new QueryClient();

axios.defaults.withCredentials = true

export const PhoenixProvider = ({children}) => {
    const pathname = usePathname();
    const [cartList, setCartList] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('cart-list'));
        if (list) {
            setCartList(list);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', pathname.includes("management"))
    }, [pathname]);

    const setCartStorage = (newValue) => {
        const sort = newValue.sort((a,b) => a.id - b.id);

        localStorage.setItem('cart-list', JSON.stringify(sort));
        setCartList(sort);
    }

    return (
        <PhoenixContext.Provider value={{cartList, setCartStorage, cookies, setCookie, removeCookie}}>
            <QueryClientProvider client={client}>
                {pathname.includes("management") ? <ManagementNav /> : <Header/>}
                {children}
            </QueryClientProvider>
        </PhoenixContext.Provider>
    );
}