"use client"

import {createContext, useEffect, useState} from "react";
import {useCookies} from "react-cookie";

export const PhoenixContext = createContext(undefined)

export const FilterProvider = ({children}) => {
    const [priority, setPriority] = useState("Relevance");
    const [cartList, setCartList] = useState([]);
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem('cart-list'));
        if (list) {
            setCartList(list);
        }
    }, []);

    const setCartStorage = (newValue) => {
        localStorage.setItem('cart-list', JSON.stringify(newValue));
        setCartList(newValue);
    }

    return (
        <PhoenixContext.Provider value={{priority, setPriority, cartList, setCartStorage, cookies}}>
            {children}
        </PhoenixContext.Provider>
    );
}