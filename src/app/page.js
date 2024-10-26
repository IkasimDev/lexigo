"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

async function getTodayWord() {
  // TODO: Lógica para fazer a requisição da API para pegar a palavra e o significado dela
  // Essa função retornará um array
  // [{ word: "palavra", text: "significado" }]
  // Boa sorte Ark
  // Algumas coisas a levar em consideração:
  // uma página aqui no nextjs é definida como client side colocando na primeira linha o "use client" como você pode ver na primeira linha
  // Provavelmente essa função deverá ser efetuada em outra página sem o uso do use client, mas se der para fazer nessa perfeito
}

export default function Home() {

  const [ans, setAns] = useState("amora"); // Resposta
  const [guesses, setGuesses] = useState(Array(6).fill("")); // Palavras tentadas em um array
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0); // Letra atual, ná pratica isso aqui só serve para termos uma referência visual de em que quadrado estamos no front end
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0); // Tentativa atual
  const [animate, setAnimate] = useState(false); // animação dos quadrado
  const [colors, setColors] = useState(Array(6).fill(Array(5).fill("bg-gray-700"))); // Novo estado para cores

  const [guessedRight, setGuessedRight] = useState(false);

  // useEffect com um addEventListener que vai escutar por teclas sendo pressionadas no teclado
  useEffect(() => {
    const handleKeyDown = (e) => { // Função que pegará a tecla e realizará a ação pretendida
      const word = e.key.toLowerCase(); // Colocamos a palavra em minúsculo para evitar diferenciação com teclas sendo digitadas em maiúsculas

      if (/^[a-z]$/.test(word)) { // Usamos um regex para verificar se a palavra está usando letras do alfabeto (para evitar, número e outras coisas)
        addLetter(word.toUpperCase()); // Enfim chamamos a função que adicionará a letra a palavra
      } else if (e.key === "Backspace") { // Se por acaso a tecla for a de apagar, então chama a função de deletar letra
        removeLetter()
      } else if (e.key === "Enter") { // Se por acaso a tecla for enter, então dá submit na tentativa
        submitGuess();
      }
    }

    window.addEventListener("keydown", handleKeyDown); // eventlistener atrelado a página que chama a função se detectar algo

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // removemos o listener depois de alguma detecção para evitar alguns bugs
    }
  }, [guesses, currentGuessIndex, currentLetterIndex]) // Depêndencias do useEffect


  // Função que adiciona a letra à palavra
  const addLetter = (letter) => { // Ela recebe um argumento letter, que é uma string, que obviamente é a letra
    if (guesses[currentGuessIndex].length < 5) { // verifica se a palavra tem menos de 5 letras, se tiver então pode adicionar letras
      const updatedGuesses = [...guesses]; // Spread Operator para retornar uma duplicata do array de palavras tentadas
      updatedGuesses[currentGuessIndex] += letter; // Realizo a adição da letra à palavra do array, utilizando a tentativa atuação com index do array

      // Acionar animação
      setAnimate(true);

      setGuesses(updatedGuesses); // Seto o array modificado para o UseState
      setCurrentLetterIndex(currentLetterIndex + 1) // Acrescento 1 no index da letra atual

    }
  }

  // Função para remover letra da palavra
  const removeLetter = () => {
    const updatedGuesses = [...guesses]; // Mesmo esquema, retorna uma duplicata do array
    updatedGuesses[currentGuessIndex] = updatedGuesses[currentGuessIndex].slice(0, -1); // Realiza a modificação removendo a ultima letra na extrema ponta direita (-1)
    setGuesses(updatedGuesses) // Seto o array modificado para o UseState
    setCurrentLetterIndex(currentLetterIndex > 0 ? currentLetterIndex - 1 : 0); // Volta para a letra anterior
  }

  // Função para fazer o submit da tentativa
  const submitGuess = () => {
    // Faço a verificação para ver se essa tentativa esta dentro do limite de 5 tentativos e verifico também se a palavra da tentativa tem 5 letras, para evitar de enviar palavras com menos letras
    if (currentGuessIndex < 5 && guesses[currentGuessIndex].length == 5) {
      checkGuess(guesses[currentGuessIndex])
      if(guesses[currentGuessIndex].toLowerCase() === ans) {
        console.log("Resposta Certa")
        setGuessedRight(true);
      } else {
        setCurrentGuessIndex(currentGuessIndex + 1); // Realizo a incrementação da tentativa, em suma passando para a próxima coluna.
        setCurrentLetterIndex(0); // Reinicia o índice da letra para a nova tentativa
      }
    }
    // TODO: Adicionar lógica para verificar se a palavra é de acordo com a resposta
    // Lembrando que o guesses[currentGuessIndex] vai retornar a palavra em letra maiúscula e.g: AMORA, terá que deixar minúscula utilizando o toLowerCase() para fazer a verificação guesses[currentGuessIndex] == ans 
  }

  // Função para checar a resposta
  const checkGuess = (guess) => {
    const answerArray = ans.split(""); // Dividimos a resposta em letras em um array
    const guessArray = guess.toLowerCase().split(""); // Fazemos o mesmo para a palavra da tentativa atual
    const newColors = Array(5).fill("wordWrong"); // Criamos um array com as cores
  
    const tempAns = [...answerArray]; // Criamos uma duplicata do array resposta 
    
    // Primeiro loop para marcar as letras na posição correta
    guessArray.forEach((letter, index) => {
      if (letter === answerArray[index]) { // Se a letra estiver na mesma posição que na resposta
        newColors[index] = "wordRight"; // Definimos então a cor para a letra certa e colocamos no array de cores
        tempAns[index] = null; // Como a letra já foi vista removemos ela do array com
      }
    });
  
    // Segundo loop para letras corretas na posição errada
    guessArray.forEach((letter, index) => {
      if (newColors[index] !== "wordRight" && tempAns.includes(letter)) { // Aqui existe uam verificação para ver se o index da cor é diferente de verde e então veiricamos se a letra se inclui no array temporario da resposta.
        newColors[index] = "wordWarn"; // Colocamos então a cor laranja para essa letra
        tempAns[tempAns.indexOf(letter)] = null; // Como a letra já foi vista removemos ela do array com
      }
    });
  
    // Atualiza as cores no estado
    const updatedColors = [...colors]; // Setamos o array modificado
    updatedColors[currentGuessIndex] = newColors; // Adicionamos as cores aos respectivos indexes
    setColors(updatedColors); // Finalmente atualizamos o state com o array finalizado.
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center p-8 pb-20 gap-8 font-[family-name:var(--font-geist-sans)] text-white">

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">

        {/* Significado */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
          <h1 className="text-lg font-bold">Significado:</h1>
          <p className="text-base">
            Unidade linguística com significado próprio e existência independente, que pode ser escrita ou falada.
          </p>
        </div>

        {/* Coluna das Palavras */}
        <div id="G-Palavras" className="text-2xl grid grid-rows-[repeat(6,4.5rem)] gap-2 m-0 p-0 w-full h-full justify-center">
          {guesses.map((guess, rowIndex) => (
            <div key={rowIndex} id={`G-Palavra-${rowIndex + 1}`} className="grid grid-cols-[repeat(5,4.5rem)] gap-1 text-[1.5rem] h-[4.5rem] m-0">
              {Array.from({ length: 5 }, (_, colIndex) => (
                <div
                  key={colIndex}
                  id={`G-Palavra-${rowIndex + 1}-Letra-${colIndex + 1}`}
                  className={`bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center ${colors[rowIndex][colIndex]} ${animate && rowIndex === currentGuessIndex && colIndex === currentLetterIndex ? 'animate-type' : ''} ${rowIndex === currentGuessIndex && colIndex === currentLetterIndex ? 'border-b-4 border-b-white' : ''} ${rowIndex !== currentGuessIndex ? 'columnDisabled' : ''}`}
                  onAnimationEnd={() => setAnimate(false)}
                // onClick={() => {
                //     setCurrentLetterIndex(colIndex)
                // }}
                >
                  {guess[colIndex] || ""}
                  {/* {console.log(`RowIndex: ${rowIndex} - ColIndex: ${colIndex} - currentGuessI: ${currentGuessIndex} - CurrentLetterI: ${currentLetterIndex}`)} */}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Teclado */}
        <div className="row-start-3 grid grid-rows-3 gap-2">
          <div className="flex gap-2 justify-center">
            {"QWERTYUIOP".split("").map((key) => (
              <button key={key} onClick={() => addLetter(key)} className="w-14 h-14 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600">
                {key}
              </button>
            ))}
          </div>
          <div className="flex gap-2 justify-center">
            {"ASDFGHJKL".split("").map((key) => (
              <button key={key} onClick={() => addLetter(key)} className="w-14 h-14 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600">
                {key}
              </button>
            ))}
            <button className="w-20 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600" onClick={removeLetter}>
              Apagar
            </button>
          </div>
          <div className="flex gap-2 justify-center">
            {"ZXCVBNM".split("").map((key) => (
              <button key={key} onClick={() => addLetter(key)} className="w-14 h-14 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600">
                {key}
              </button>
            ))}
            <button className="w-20 bg-gray-700 text-white rounded shadow-md hover:bg-gray-600" onClick={submitGuess}>
              Enter
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="row-start-3 text-sm text-gray-400">
        <p>Desenvolvido com muita raiva 😡 por @misakiix e @arkhalliz</p>
      </footer>
    </div>
  );
}
