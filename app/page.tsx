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
      <header className="flex justify-between items-center">
        <Image alt="logo" src="/logo.webp" width="100" height="100" />
        {imageUrl && !loading ? (
          <a href={imageUrl} download="imagen-generada.jpg">
            <button className="bg-[#577da0] p-4 hover:bg-[#446485] rounded-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-download"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
                <path d="M7 11l5 5l5 -5" />
                <path d="M12 4l0 12" />
              </svg>
            </button>
          </a>
        ) : (
          ""
        )}
      </header>

      <div className="flex items-center flex-col justify-center">
        {loading ? (
          <div
            className={`w-[412px] sm:w-[620px] md:w-[768px] lg:w-[1080px] h-[412px] sm:h-[620px] md:h-[768px] lg:h-[1080px] bg-[#a7bdd2] animate-pulse rounded shadow-lg mt-8`}
          />
        ) : imageUrl ? (
          <div>
            <img
              id="img"
              src={imageUrl}
              alt="Imagen Generada"
              className="w-[412px] sm:w-[620px] md:w-[768px] lg:w-[1080px] rounded shadow-lg"
            />
          </div>
        ) : (
          <div className="w-[412px] sm:w-[620px] md:w-[768px] lg:w-[1080px] flex items-center justify-center bg-[#293747] rounded m-8">
            <p className="text-center p-8">
              ¡Bienvenido a SparkArt!
              <br />
              Describe tu idea, y nuestro sistema la convertirá en una imagen
              usando inteligencia artificial.
            </p>
          </div>
        )}
      </div>

      <form className="flex items-center justify-center rounded-full mb-4 w-full">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu idea"
          className={`text-black pl-[10%] sm:pl-[8%] md:pl-[6%] py-5 w-full rounded-l-full ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        />
        <button
          onClick={handleGenerateImage}
          className={`bg-[#577da0] px-4 py-2 rounded hover:bg-[#446485] rounded-r-full  ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        >
          {loading ? "Generando..." : "Crear Imagen"}
        </button>
      </form>

      <footer className="flex items-center justify-center text-sm">
        Este sitio hace uso de
        <strong className="text-[#7899b8] pl-1">Inteligencia Artificial</strong>
        .
      </footer>
    </>
  );
}
