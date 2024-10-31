"use client"
import Footer from "@/components/Footer/footer";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

async function getTodayWord() {
  try {
    const response = await fetch("/api/getTodayWord");
    if (!response.ok) {
      throw new Error("Failed to fetch the word");
    }
    const data = await response.json();
    return [{ word: data.word, text: data.text }];
  } catch (error) {
    console.error(error);
    return [{ word: "Error", text: "Could not fetch the word" }];
  }
}

// Função para salvar o estado completo do jogo no cookie
function storeGameStateInCookie(guesses, colors, currentGuessIndex, currentLetterIndex, guessedRight, keyboardColors) {
  const gameState = {
    guesses,
    colors,
    currentGuessIndex,
    currentLetterIndex,
    guessedRight,
    keyboardColors
  };
  Cookies.set("gameState", JSON.stringify(gameState), { expires: 1 });
}

// Função para carregar o estado completo do jogo do cookie
function loadGameStateFromCookie() {
  const savedState = Cookies.get("gameState");
  return savedState
    ? JSON.parse(savedState)
    : {
      guesses: Array(6).fill(""),
      colors: Array(6).fill(Array(5).fill("bg-gray-700")),
      currentGuessIndex: 0,
      currentLetterIndex: 0,
      guessedRight: false,
      keyboardColors: {},
    };
}

export default function Home() {

  const savedState = loadGameStateFromCookie();
  const [ans, setAns] = useState(null);
  const [sig, setSig] = useState(null);
  const [guesses, setGuesses] = useState(savedState.guesses);
  const [colors, setColors] = useState(savedState.colors);
  const [keyboardColors, setKeyboardColors] = useState(savedState.keyboardColors); // Estado para cores do teclado
  const [currentGuessIndex, setCurrentGuessIndex] = useState(savedState.currentGuessIndex);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(savedState.currentLetterIndex);
  const [guessedRight, setGuessedRight] = useState(savedState.guessedRight);
  const [animate, setAnimate] = useState(false);


  // Salva o estado do jogo sempre que o estado for atualizado
  useEffect(() => {
    storeGameStateInCookie(guesses, colors, currentGuessIndex, currentLetterIndex, guessedRight, keyboardColors);
  }, [guesses, colors, currentGuessIndex, currentLetterIndex, guessedRight, keyboardColors]);

  useEffect(() => {
    const getData = async () => {
      const bruteData = await getTodayWord();
      if (bruteData[0].word && bruteData[0].text) {
        setAns(bruteData[0].word);
        setSig(bruteData[0].text);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const word = e.key.toLowerCase();
      if (guessedRight) return;

      if (/^[a-z]$/.test(word)) {
        addLetter(word.toUpperCase());
      } else if (e.key === "Backspace") {
        removeLetter();
      } else if (e.key === "Enter") {
        submitGuess();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guesses, currentGuessIndex, currentLetterIndex, guessedRight]);

  // Adiciona uma letra
  const addLetter = (letter) => {
    if (guesses[currentGuessIndex].length < 5 && !guessedRight) {
      const updatedGuesses = [...guesses];
      updatedGuesses[currentGuessIndex] += letter;
      setAnimate(true);
      setGuesses(updatedGuesses);
      setCurrentLetterIndex(currentLetterIndex + 1);
    }
  };

  // Remove a última letra
  const removeLetter = () => {
    if (guessedRight) return;
    const updatedGuesses = [...guesses];
    updatedGuesses[currentGuessIndex] = updatedGuesses[currentGuessIndex].slice(0, -1);
    setGuesses(updatedGuesses);
    setCurrentLetterIndex(currentLetterIndex > 0 ? currentLetterIndex - 1 : 0);
  };

  // Envia a tentativa
  const submitGuess = () => {
    if (currentGuessIndex < 6 && guesses[currentGuessIndex].length === 5 && !guessedRight) {
      checkGuess(guesses[currentGuessIndex]);
      if (guesses[currentGuessIndex].toLowerCase() === ans) {
        setGuessedRight(true);
      } else {
        setCurrentGuessIndex(currentGuessIndex + 1);
        setCurrentLetterIndex(0);
      }
    }
  };

  // Checa a resposta
  const checkGuess = (guess) => {
    const answerArray = ans.split("");
    const guessArray = guess.toLowerCase().split("");
    const newColors = Array(5).fill("wordWrong");
    const tempAns = [...answerArray];
    const updatedKeyboardColors = { ...keyboardColors };

    guessArray.forEach((letter, index) => {
      if (letter === answerArray[index]) {
        newColors[index] = "wordRight";
        tempAns[index] = null;
        updatedKeyboardColors[letter] = "bg-green-500"; // Letra correta na posição certa
      }
    });

    guessArray.forEach((letter, index) => {
      if (newColors[index] !== "wordRight" && tempAns.includes(letter)) {
        newColors[index] = "wordWarn";
        tempAns[tempAns.indexOf(letter)] = null;
        updatedKeyboardColors[letter] = updatedKeyboardColors[letter] !== "bg-green-500" ? "bg-yellow-500" : updatedKeyboardColors[letter];
      } else if (!tempAns.includes(letter) && newColors[index] !== "wordRight" && !updatedKeyboardColors[letter]) {
        updatedKeyboardColors[letter] = "bg-gray-500"; // Letra incorreta
      }
    });

    const updatedColors = [...colors];
    updatedColors[currentGuessIndex] = newColors;
    setColors(updatedColors);
    setKeyboardColors(updatedKeyboardColors);
  };

  if (ans == null && sig == null) {
    return <></>;
  }


  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center p-4 gap-8 font-[family-name:var(--font-geist-sans)] text-[#D3D3D3]">

      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">

        {/* Significado */}
        <div className="bg-[#2E2E3E] p-4 rounded-lg shadow-lg text-center w-full text-white">
          <h1 className="text-lg font-bold">Significado:</h1>
          <p className="text-base">
            {sig}
          </p>
        </div>

        {/* Coluna das Palavras */}
        <div id="G-Palavras" className="text-2xl grid grid-rows-[repeat(6,3.5rem)] gap-2 m-0 p-0 w-full h-full justify-center">
          {guesses.map((guess, rowIndex) => (
            <div key={rowIndex} id={`G-Palavra-${rowIndex + 1}`} className="grid grid-cols-[repeat(5,3.5rem)] gap-1 text-[1.5rem] h-[3.5rem] m-0">
              {Array.from({ length: 5 }, (_, colIndex) => (
                <div
                  key={colIndex}
                  id={`G-Palavra-${rowIndex + 1}-Letra-${colIndex + 1}`}
                  className={`bg-transparent border border-columnColor border-[0.4rem] rounded flex items-center justify-center text-white font-bold ${colors[rowIndex][colIndex]} ${animate && rowIndex === currentGuessIndex && colIndex === currentLetterIndex ? 'animate-type' : ''} ${rowIndex === currentGuessIndex && colIndex === currentLetterIndex ? 'border-b-4 border-b-white' : ''} ${rowIndex !== currentGuessIndex ? 'columnDisabled' : ''}`}
                  onAnimationEnd={() => setAnimate(false)}
                >
                  {guess[colIndex] || ""}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Teclado */}
        <div className="row-start-3 grid grid-rows-3 gap-2 w-full max-w-2xl">
          <div className="flex gap-1 justify-center flex-wrap">
            {"QWERTYUIOP".split("").map((key) => (
              <button
                key={key}
                onClick={() => addLetter(key)}
                className={`w-10 h-10 sm:w-14 sm:h-14 font-bold rounded shadow-md ${keyboardColors[key.toLowerCase()] || "bg-[#2E2E3E]"} text-white hover:bg-gray-600`}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="flex gap-1 justify-center flex-wrap">
            {"ASDFGHJKL".split("").map((key) => (
              <button
                key={key}
                onClick={() => addLetter(key)}
                className={`w-10 h-10 sm:w-14 sm:h-14 font-bold rounded shadow-md ${keyboardColors[key.toLowerCase()] || "bg-[#2E2E3E]"} text-white hover:bg-gray-600`}
              >
                {key}
              </button>
            ))}
          </div>
          <div className="flex gap-1 justify-center flex-wrap">
            <button className="w-16 sm:w-20 h-10 sm:h-14 bg-[#2E2E3E] text-white font-bold rounded shadow-md hover:bg-gray-600" onClick={removeLetter}>
              Apagar
            </button>
            {"ZXCVBNM".split("").map((key) => (
              <button
                key={key}
                onClick={() => addLetter(key)}
                className={`w-10 h-10 sm:w-14 sm:h-14 font-bold rounded shadow-md ${keyboardColors[key.toLowerCase()] || "bg-[#2E2E3E]"} text-white hover:bg-gray-600`}
              >
                {key}
              </button>
            ))}
            <button className="w-16 sm:w-20 h-10 sm:h-14 bg-[#2E2E3E] text-white font-bold rounded shadow-md hover:bg-gray-600" onClick={submitGuess}>
              Enter
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>

  );
}
