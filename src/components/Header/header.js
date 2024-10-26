export default function Header() {
    return (
        <header className="w-full h-auto flex items-center justify-between p-4">
            <div>
                <div id="helperB" className="border-4 border-[#758aab] p-1 border-solid rounded-md cursor-pointer bg-gray-800">❓</div>
            </div>
            <div id="lexigoT">
                <h1 className="text-4xl font-bold">LEXIGO</h1>
            </div>
            <div>
                <div id="settingsB" className="border-4 border-[#758aab] p-1 border-solid rounded-md cursor-pointer bg-gray-800">⚙️</div>
            </div>
        </header>
    );
}