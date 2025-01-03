import { useRef, useState } from "react";

export default function useGenerateImage() {
  const [imageUrl, setImageUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateInput = (input: string | undefined) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!input) {
      setError("El campo no puede estar vacío.");
      return false;
    } else if (!regex.test(input)) {
      setError("Solo se permiten letras, números y espacios.");
      return false;
    }
    setError("");
    return true;
  };

  const handleGenerateImage = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!validateInput(prompt)) return;
    setLoading(true);
    promptRef.current = prompt;
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

  return {
    imageUrl,
    prompt,
    setPrompt,
    promptRef,
    loading,
    handleGenerateImage,
    error,
  };
}
