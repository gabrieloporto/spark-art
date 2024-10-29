"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setImageUrl(data.imageUrl);
      setPrompt("");
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header>Logo</header>

      <div className="flex items-center flex-col justify-center bg-gray-100">
        {imageUrl && (
          <div className="mt-8">
            <Image
              src={imageUrl}
              alt="Imagen Generada"
              className="rounded shadow-lg"
              width="848"
              height="848"
            />
          </div>
        )}
        <form className="flex items-center justify-center border border-gray-300 rounded-full mb-4 w-full">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Escribe un prompt"
            className={`pl-[10%] sm:pl-[8%] md:pl-[6%] py-5 w-full rounded-l-full ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          />
          <button
            onClick={handleGenerateImage}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 rounded-r-full  ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? "Generando..." : "Crear Imagen"}
          </button>
        </form>
      </div>

      <footer className="flex items-center justify-center">
        Este sitio hace uso de
        <strong className="text-purple-600 pl-1">
          Inteligencia Artificial
        </strong>
        .
      </footer>
    </>
  );
}
