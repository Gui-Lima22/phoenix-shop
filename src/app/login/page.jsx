"use client"

import React, {useContext} from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {PhoenixContext} from "@/context/phoenix-context";
import userService from "@/service/user-service";
import LoginBackground from "../../../public/background/login-background.jpg";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {
    const {setCookie} = useContext(PhoenixContext);
    const router = useRouter();

    const loginSubmit = (formData) => {
        const model = { login: formData.get("login"), password: formData.get("password") }

        userService.login(model)
            .then(({data}) => {
                setCookie("access_token", data);
                router.push('/list')
            })
            .catch(() => toast.error("Não foi possível fazer o Login."));
    }

    return (
        <>
            <ToastContainer />

            <div className="flex background">
                <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                    <Image
                        src={LoginBackground}
                        alt=""
                        className="object-cover w-full h-full"
                        quality={100}
                        priority
                    />
                </div>

                <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <div className="max-w-md w-full p-6 lg:p-0 bg-gray-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                        <div className="lg:p-8 space-y-4">
                            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
                                Digite seu login e senha</h1>
                            <hr className="spacer"/>

                            <form action={loginSubmit} className="text-gray-600 space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Login</label>
                                    <input type="text" id="login" name="login" className="mt-1 p-2 w-full border border-gray-500
                                    rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                                    focus:ring-gray-300 transition-colors duration-300"/>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password"
                                               className="block text-sm font-medium text-gray-700">Senha</label>
                                        <div className="text-sm">
                                            <button className="font-semibold text-indigo-600 hover:text-indigo-500">
                                                Esqueceu a senha?
                                            </button>
                                        </div>
                                    </div>
                                    <input type="password" id="password" name="password" className="mt-1 p-2
                                    w-full border border-gray-500 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2
                                    focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                </div>

                                <div>
                                    <button type="submit" className="flex w-full justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4
                                    focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center
                                    dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                        Entrar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;