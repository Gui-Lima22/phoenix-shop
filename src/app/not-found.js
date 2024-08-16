import React from 'react';
import Link from "next/link";

const NotFound = () => {
    return (
        <>
            <hr className="spacer"/>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-gray-600">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Página não encontrada.</h1>
                    <div className="mt-5 flex items-center justify-center gap-x-6">
                        <Link href="/list"
                            className="rounded-md bg-gray-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                        >
                            Voltar a lista
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
};

export default NotFound;