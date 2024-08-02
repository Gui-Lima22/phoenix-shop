"use client"

import React, {useEffect, useState} from 'react';
import {toast, ToastContainer} from "react-toastify";
import {useQuery} from "@tanstack/react-query";
import userService from "@/service/user-service";
import Loader from "@/components/loader";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

const MyUser = () => {
    const [user, setUser] = useState({ login: "", email: "", name: "", password: "" });

    const { data, isLoading, error } = useQuery({
        queryFn: () => userService.getUserLogged().then(({ data }) => data),
        queryKey: ["user"]
    });

    useEffect(() => {
        if (data) {
            const { login, email, name } = data;
            setUser(prevState => ({
                ...prevState,
                login,
                email,
                name
            }));
        }
    }, [data]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const submit = () => {
        const { login, email, name, password } = user;

        const model = { id: data.id, login, email, name };
        if (password) model.password = password;

        userService.edit(model)
            .then(() => {
                toast.success("Salvo com sucesso.");
            })
            .catch(() => {
                toast.error("Não foi possível editar.");
            });
    };

    return (
        <>
            <ToastContainer/>
            <hr className="spacer"/>
            <div className="return-btn lg:ms-10 my-5">
                <Link href={"/list"} className="flex text-gray-600" role="button">
                    <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/> Voltar
                </Link>
            </div>
            {isLoading && <Loader/>}

            {
                data &&
                <>
                    <div className="bg-gray-100 rounded-lg px-6 py-24 sm:py-32 lg:px-8 mx-auto max-w-2xl lg:max-w-6xl">

                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meu usuário</h2>
                        </div>
                        <form action={submit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="login"
                                           className="block text-sm font-semibold leading-6 text-gray-900">
                                        Login
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="login"
                                            name="login"
                                            type="text"
                                            required
                                            value={user.login}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block text-sm font-semibold leading-6 text-gray-900">
                                        Senha
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="email"
                                           className="block text-sm font-semibold leading-6 text-gray-900">
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={user.email}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="name"
                                           className="block text-sm font-semibold leading-6 text-gray-900">
                                        Nome
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            value={user.name}
                                            onChange={handleChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button type="submit" className="flex w-full justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4
                                        focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center
                                        dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    Editar
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            }
        </>
    );
};

export default MyUser;