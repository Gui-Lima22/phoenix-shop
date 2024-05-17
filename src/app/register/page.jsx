import React from 'react';
import Image from "next/image";
import RegisterBackground from "../../../public/background/register-background.jpg";

const Register = () => {
    return (
        <div className="flex background">
            <div className="hidden lg:flex items-center justify-center flex-1 bg-white text-black">
                <Image
                    src={RegisterBackground}
                    alt=""
                    className="object-cover w-full h-full"
                    quality={100}
                    priority
                />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                <div className="max-w-md w-full p-6 lg:p-0 bg-gray-100 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                    <div className="lg:p-6 space-y-4">
                        <h1 className="text-3xl font-semibold mb-6 text-black text-center">Cadastre a sua conta</h1>
                        <hr className="spacer"/>
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
                                <input type="text" id="name" name="name" className="mt-1 p-2 w-full border border-gray-500
                                rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email" className="mt-1 p-2 w-full border border-gray-500
                                rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2
                                focus:ring-gray-300 transition-colors duration-300"/>
                            </div>
                            <div className="lg:grid lg:grid-cols-2 lg:gap-x-4 space-y-4 lg:space-y-0">
                                <div>
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-700">Senha</label>
                                    <input type="password" id="password" name="password" className="mt-1 p-2
                                    w-full border border-gray-500 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2
                                    focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                </div>
                                <div>
                                    <label htmlFor="password"
                                           className="block text-sm font-medium text-gray-700">Confirmar senha</label>
                                    <input type="password" id="password" name="password" className="mt-1 p-2
                                    w-full border border-gray-500 rounded-md focus:border-gray-200 focus:outline-none focus:ring-2
                                    focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"/>
                                </div>
                            </div>

                            <div>
                                <button className="flex w-full justify-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-4
                                focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center
                                dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                    Cadastrar
                                </button>
                            </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;