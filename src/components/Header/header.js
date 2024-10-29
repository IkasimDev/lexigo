"use client"
import { useState } from "react";
import HelperModal from "../Modal/helper";

export default function Header() {

    const [helperVisible, setHelperVisible] = useState(true)

    return (
        <>
            <header className="w-full h-auto flex items-center justify-between p-4">
                <div>
                    <div id="helperB" className="border-4 border-[#6954a5] p-1 border-solid rounded-md cursor-pointer" onClick={() => {setHelperVisible(true)}}>❓</div>
                </div>
                <div id="lexigoT">
                    <h1 className="text-4xl font-bold text-white flex">LEXI<p className="text-[#a484ff] font-bold">GO</p></h1>
                </div>
                <div>
                    <div id="settingsB" className="border-4 border-[#6954a5] p-1 border-solid rounded-md cursor-pointer">⚙️</div>
                </div>
            </header>
            {helperVisible ? <HelperModal setController={setHelperVisible} /> : <></>}
        </>
    );
}