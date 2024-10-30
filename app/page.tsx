"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const promptRef = useRef("");

  const handleGenerateImage = async () => {
    setLoading(true);
    promptRef.current = prompt; // Almacena el prompt actual en la referencia
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

  const downloadImage = async () => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `SparkArt_${promptRef.current}.jpg`; // Usa la referencia como nombre
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      <header className="flex justify-between items-center mt-8">
        <Image alt="logo" src="/logo.webp" width={80} height={80} />
        {imageUrl && !loading ? (
          <button
            onClick={downloadImage}
            className="bg-[#577da0] p-4 hover:bg-[#446485] rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />
              <path d="M7 11l5 5l5 -5" />
              <path d="M12 4l0 12" />
            </svg>
          </button>
        ) : null}
      </header>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="flex items-center flex-col justify-center w-full max-w-md h-80 bg-[#a7bdd2] animate-pulse rounded shadow-lg" />
        </div>
      ) : imageUrl ? (
        <div className="flex items-center justify-center">
          <div className="flex items-center flex-col justify-center w-full max-w-md h-80">
            <img
              src={imageUrl}
              alt="Imagen Generada"
              className="w-full h-full object-cover rounded shadow-lg"
            />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-80 bg-[#293747]">
          <p className="text-center text-xl text-white p-4">
            <strong className="text-2xl flex items-center justify-center gap-4">
              <svg
                width={30}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                fill="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#f0fdfc"
                    d="M210.3 65.5c28.8 7.3 51.4 29.9 58.7 58.7c.7 2.8 4.3 2.8 5 0c7.3-28.8 29.9-51.4 58.7-58.7c2.8-.7 2.8-4.3 0-5c-28.8-7.3-51.4-29.9-58.7-58.7c-.7-2.8-4.3-2.8-5 0c-7.3 28.8-29.9 51.4-58.7 58.7c-2.8.7-2.8 4.3 0 5z"
                  ></path>
                  <path
                    fill="#cdfaf8"
                    d="M6.7 188.3c50.8 12.9 90.8 52.9 103.7 103.7c1.2 4.9 7.5 4.9 8.8 0c12.9-50.8 52.9-90.8 103.7-103.7c4.9-1.2 4.9-7.5 0-8.8C172 166.7 132 126.7 119.2 75.9c-1.2-4.9-7.5-4.9-8.8 0c-12.9 50.8-52.9 90.8-103.7 103.7c-4.9 1.2-4.9 7.5 0 8.7z"
                  ></path>
                  <path
                    fill="#84F2EE"
                    d="M180 350.7c76 19.3 135.9 79.1 155.1 155.1c1.9 7.3 11.3 7.3 13.1 0c19.3-76 79.1-135.9 155.1-155.1c7.3-1.9 7.3-11.3 0-13.1c-76-19.3-135.9-79.1-155.1-155.1c-1.9-7.3-11.3-7.3-13.1 0c-19.3 76-79.1 135.9-155.1 155.1c-7.3 1.8-7.3 11.2 0 13.1z"
                  ></path>
                </g>
              </svg>
              ¡Te doy la Bienvenida!{" "}
              <svg
                width={30}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                preserveAspectRatio="xMidYMid meet"
                fill="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill="#f0fdfc"
                    d="M210.3 65.5c28.8 7.3 51.4 29.9 58.7 58.7c.7 2.8 4.3 2.8 5 0c7.3-28.8 29.9-51.4 58.7-58.7c2.8-.7 2.8-4.3 0-5c-28.8-7.3-51.4-29.9-58.7-58.7c-.7-2.8-4.3-2.8-5 0c-7.3 28.8-29.9 51.4-58.7 58.7c-2.8.7-2.8 4.3 0 5z"
                  ></path>
                  <path
                    fill="#cdfaf8"
                    d="M6.7 188.3c50.8 12.9 90.8 52.9 103.7 103.7c1.2 4.9 7.5 4.9 8.8 0c12.9-50.8 52.9-90.8 103.7-103.7c4.9-1.2 4.9-7.5 0-8.8C172 166.7 132 126.7 119.2 75.9c-1.2-4.9-7.5-4.9-8.8 0c-12.9 50.8-52.9 90.8-103.7 103.7c-4.9 1.2-4.9 7.5 0 8.7z"
                  ></path>
                  <path
                    fill="#84F2EE"
                    d="M180 350.7c76 19.3 135.9 79.1 155.1 155.1c1.9 7.3 11.3 7.3 13.1 0c19.3-76 79.1-135.9 155.1-155.1c7.3-1.9 7.3-11.3 0-13.1c-76-19.3-135.9-79.1-155.1-155.1c-1.9-7.3-11.3-7.3-13.1 0c-19.3 76-79.1 135.9-155.1 155.1c-7.3 1.8-7.3 11.2 0 13.1z"
                  ></path>
                </g>
              </svg>
            </strong>
            <br />
            <br />
            Describe tu idea,
            <br />
            <strong className="text-[#84F2EE]">Spark</strong> se encargara de
            convertirla en una imagen.
            <br />
          </p>
        </div>
      )}

      <form className="flex items-center justify-center rounded-full w-full mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escribe tu idea"
          className={`text-black pl-6 py-2 w-full rounded-l-full ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        />
        <button
          onClick={handleGenerateImage}
          className={`bg-[#577da0] px-4 py-2 rounded hover:bg-[#446485] rounded-r-full ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        >
          {loading ? (
            "Generando..."
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 8h.01" />
                <path d="M12 21h-6a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6" />
                <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.993 3.993" />
                <path d="M14 14l1 -1c.47 -.452 .995 -.675 1.52 -.67" />
                <path d="M19 22.5a4.75 4.75 0 0 1 3.5 -3.5a4.75 4.75 0 0 1 -3.5 -3.5a4.75 4.75 0 0 1 -3.5 3.5a4.75 4.75 0 0 1 3.5 3.5" />
              </svg>
            </>
          )}
        </button>
      </form>
    </>
  );
}
