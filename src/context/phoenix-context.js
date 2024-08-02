"use client"

import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import axios from "axios";

export const PhoenixContext = createContext(undefined);

const client = new QueryClient();

axios.defaults.withCredentials = true

export const FilterProvider = ({children}) => {
    const [cartList, setCartList] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies();

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('cart-list'));
        if (list) {
            setCartList(list);
        }
    }, []);

    const setCartStorage = (newValue) => {
        const sort = newValue.sort((a,b) => a.id - b.id);

        localStorage.setItem('cart-list', JSON.stringify(sort));
        setCartList(sort);
    }

    return (
        <PhoenixContext.Provider value={{cartList, setCartStorage, cookies, setCookie, removeCookie}}>
            <QueryClientProvider client={client}>
                {children}
            </QueryClientProvider>
        </PhoenixContext.Provider>
    );
}