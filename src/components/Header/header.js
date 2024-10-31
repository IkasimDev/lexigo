"use client";
import { useEffect, useState } from "react";
import HelperModal from "../Modal/helper";
import Cookies from "js-cookie";

function storeVisibleHelper(state) {
    Cookies.set("helperAlreadySeen", state, { expires: 1 }); // Armazena o estado no cookie
}

function loadVisibleHelper() {
    const savedState = Cookies.get("helperAlreadySeen");
    // Retorna um booleano: true se já foi visto, caso contrário false
    return savedState === 'true';
}

export default function Header() {
    const [helperVisible, setHelperVisible] = useState(false); // Inicialmente oculto

    useEffect(() => {
        const savedState = loadVisibleHelper(); // Carrega o estado do cookie
        setHelperVisible(!savedState); // Exibe o modal se ainda não foi visto
    }, []);

    useEffect(() => {
        // Armazena o estado no cookie ao fechar o modal
        storeVisibleHelper(!helperVisible);
    }, [helperVisible]);

    const controlHelper = (state) => {
        setHelperVisible(state);
    }

    return (
        <>
            <header className="w-full h-auto flex flex-col md:flex-row items-center justify-between p-4">
                <div className="w-full justify-between flex items-center">
                    <div
                        id="helperB"
                        className="border-4 border-[#6954a5] p-1 border-solid rounded-md cursor-pointer"
                        onClick={() => { setHelperVisible(true); }}
                    >
                        ❓
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white flex">
                        LEXI<p className="text-[#a484ff] font-bold">GO</p>
                    </h1>
                    <div>
                        <div
                            id="settingsB"
                            className="border-4 border-[#6954a5] p-1 border-solid rounded-md cursor-pointer"
                        >
                            ⚙️
                        </div>
                    </div>
                </div>
            </header>
            {helperVisible && <HelperModal setController={controlHelper} />}
        </>
    );
}
