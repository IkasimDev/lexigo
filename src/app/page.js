import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <p>Unidade linguística com significado próprio e existência independente, que pode ser escrita ou falada: expressou-se por meio de palavras; o texto deve conter somente 350 palavras.</p>
          {/* Coluna das Palavras */}

          <div id="G-Palavras" className="text-base grid grid-rows-[repeat(auto-fill,1rem)] gap-[0.0625em] m-[revert-layer] p-0 w-full h-full">
            <div id="G-Palavra-1" className="grid grid-cols-[repeat(5,1em)] gap-[0.0625em] text-[1em] h-[1em] m-0">
              <div id="G-Palavra-1-Letra-1" lid="0" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-1-Letra-1" lid="1" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-1-Letra-1" lid="2" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-1-Letra-1" lid="3" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-1-Letra-1" lid="4" className="bg-transparent border border-white border-[0.125em]" />
            </div>
            <div id="G-Palavra-2" className="grid grid-cols-[repeat(5,1em)] gap-[0.0625em] text-[1em] h-[1em] m-0">
              <div id="G-Palavra-2-Letra-1" lid="0" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-2-Letra-2" lid="1" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-2-Letra-3" lid="2" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-2-Letra-4" lid="3" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-2-Letra-5" lid="4" className="bg-transparent border border-white border-[0.125em]" />
            </div>
            <div id="G-Palavra-3" className="grid grid-cols-[repeat(5,1em)] gap-[0.0625em] text-[1em] h-[1em] m-0">
              <div id="G-Palavra-3-Letra-1" lid="0" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-3-Letra-2" lid="1" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-3-Letra-3" lid="2" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-3-Letra-4" lid="3" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-3-Letra-5" lid="4" className="bg-transparent border border-white border-[0.125em]" />
            </div>
            <div id="G-Palavra-4" className="grid grid-cols-[repeat(5,1em)] gap-[0.0625em] text-[1em] h-[1em] m-0">
              <div id="G-Palavra-4-Letra-1" lid="0" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-4-Letra-2" lid="1" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-4-Letra-3" lid="2" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-4-Letra-4" lid="3" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-4-Letra-5" lid="4" className="bg-transparent border border-white border-[0.125em]" />
            </div>
            <div id="G-Palavra-5" className="grid grid-cols-[repeat(5,1em)] gap-[0.0625em] text-[1em] h-[1em] m-0">
              <div id="G-Palavra-5-Letra-1" lid="0" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-5-Letra-2" lid="1" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-5-Letra-3" lid="2" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-5-Letra-4" lid="3" className="bg-transparent border border-white border-[0.125em]" />
              <div id="G-Palavra-5-Letra-5" lid="4" className="bg-transparent border border-white border-[0.125em]" />
            </div>
          </div>



        </div>
      </main>
    </div>
  );
}
