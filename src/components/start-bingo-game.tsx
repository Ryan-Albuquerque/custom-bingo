"use client";

import Image from "next/image";
import { useState } from "react";

export default function StartBingoGame({
  initialWords,
  image,
}: {
  initialWords: string[];
  image?: string;
}) {
  const [remainingWords, setRemainingWords] = useState([...initialWords]);
  const [drawnWords, setDrawnWords] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  // Shuffle function
  const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // Draw a word
  const drawWord = () => {
    if (remainingWords.length === 0) return;

    const word = remainingWords.shift(); // Remove the first word
    if (word) {
      setDrawnWords([...drawnWords, word]); // Add to drawn words
    }
    setRemainingWords([...remainingWords]); // Update remaining words

    if (remainingWords.length === 0) {
      setIsFinished(true); // Mark as finished when no words are left
    }
  };

  // Restart the game
  const restartGame = () => {
    const shuffledWords = [...initialWords];
    shuffle(shuffledWords);
    setRemainingWords(shuffledWords);
    setDrawnWords([]);
    setIsFinished(false);
  };

  return (
    <div className="h-screen w-full bg-black">
      <div className="absolute w-full h-screen">
        {image ? (
          <Image
            src={image}
            width={1024}
            height={680}
            alt=""
            className="h-screen w-full opacity-30 object-cover object-right-bottom  "
          ></Image>
        ) : (
          <Image
            src={"/bingo.png"}
            width={1024}
            height={680}
            alt=""
            className="h-screen w-full opacity-30 object-cover object-right-bottom  "
          ></Image>
        )}
      </div>
      <div className="relative">
        <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-7">
          {drawnWords.length > 0 && (
            <div>
              <h2 className="text-white font-bold text-lg text-center">
                Última palavra:{" "}
              </h2>
              <div className="md:px-28 md:py-14 px-10 py-5 border rounded-lg bg-blue-500 text-white text-[70px] font-bold text-center mt-4 mx-4">
                {drawnWords[drawnWords.length - 1]}
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <div className="flex gap-4">
              <button
                onClick={drawWord}
                disabled={isFinished}
                className={`px-4 py-2 text-lg font-semibold rounded-lg ${
                  isFinished
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                {isFinished ? "Todas as palavras foram sorteadas!" : "Sortear"}
              </button>

              <button
                onClick={restartGame}
                className="px-4 py-2 text-lg font-semibold rounded-lg bg-yellow-600 text-white hover:bg-yellow-700"
              >
                Restart
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-lg mb-4 text-white font-bold">
              Palavras já sorteadas ({drawnWords.length}):
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 overflow-scroll max-h-28">
              {drawnWords.map((word, index) => (
                <div
                  key={index}
                  className="px-2 py-1 border rounded-lg bg-green-500 text-white font-medium text-center"
                >
                  {word}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
