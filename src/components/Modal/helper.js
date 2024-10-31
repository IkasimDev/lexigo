export default function HelperModal({ setController }) {
    return (
        <div className="absolute inset-0 z-[1000] text-white font-light font-mitr">
            <div className="w-full box-border h-full bg-[rgba(70,70,70,0.5)] flex flex-col justify-center items-center p-[6vh_2em_2em]">
                <div className="max-w-[720px] p-12 w-full bg-[#1E1E2E] box-border rounded-lg overflow-auto z-[19000] pointer-events-auto leading-[1.5em]">
                    <div className="text-right cursor-pointer" onClick={() => { setController(false); }}>❌</div>
                    <p className="helperTxt">Descubra a palavra certa em 6 tentativas com base no significado dela. Depois de cada tentativa, as peças mostram o quão perto você está da solução.</p>

                    {/* Exemplo de letra correta na posição correta */}
                    <div className="grid grid-cols-[repeat(5,3.5rem)] gap-1 text-[1.5rem] h-[3.5rem] m-0">
                        <div className="bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center wordRight">
                            C
                        </div>
                        {"LUBE".split("").map((key, index) => (
                            <div
                                key={`G-Palavra-Tutorial-LUBE-${index}`}
                                className="bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center wordWrong"
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                    <p className="helperTxt">A letra &quot;C&quot; faz parte da palavra e está na posição correta.</p>

                    {/* Exemplo de letra correta em posição errada */}
                    <div className="grid grid-cols-[repeat(5,3.5rem)] gap-1 text-[1.5rem] h-[3.5rem] m-0">
                        <div className="bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center wordWarn">
                            V
                        </div>
                        {"ASCO".split("").map((key, index) => (
                            <div
                                key={`G-Palavra-Tutorial-ASCO-${index}`}
                                className="bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center wordWrong"
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                    <p className="helperTxt">A letra &quot;V&quot; faz parte da palavra mas em outra posição.</p>

                    {/* Exemplo de letra incorreta */}
                    <div className="grid grid-cols-[repeat(5,3.5rem)] gap-1 text-[1.5rem] h-[3.5rem] m-0">
                        <div className="bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center wordWrong">
                            M
                        </div>
                        {"ISTO".split("").map((key, index) => (
                            <div
                                key={`G-Palavra-Tutorial-ISTO-${index}`}
                                className="bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center wordRight"
                            >
                                {key}
                            </div>
                        ))}
                    </div>
                    <p className="helperTxt">A letra &quot;M&quot; não faz parte da palavra.</p>

                    <p className="helperTxt">Os acentos não são considerados nas dicas.</p>
                    <p className="helperTxt">As palavras podem possuir letras repetidas.</p>
                    <p className="helperTxt">Uma palavra nova aparece a cada dia.</p>
                </div>
            </div>
        </div>
    );
}
