import React from 'react';
import {useRouter} from "next/navigation";
import {ChevronLeftIcon} from "@heroicons/react/16/solid";

const PreviousBtn = () => {
    const router = useRouter();

    return (
        <div className="return-btn lg:ms-10 my-5">
            <button onClick={() => router.back()} className="flex text-gray-600" role="button">
                <ChevronLeftIcon className="h-6 w-6" aria-hidden="true"/> Voltar
            </button>
        </div>
    );
};

export default PreviousBtn;