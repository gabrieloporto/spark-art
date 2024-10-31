"use client";

import downloadImage from "./logic/download-image";
import useGenerateImage from "./hooks/useGenerateImage";
import Header from "./components/Header";
import Skeleton from "./components/Skeleton";
import GeneratedImage from "./components/GeneratedImage";
import Welcome from "./components/Welcome";
import Form from "./components/Form";

export default function Home() {
  const {
    imageUrl,
    prompt,
    setPrompt,
    loading,
    promptRef,
    handleGenerateImage,
  } = useGenerateImage();

  return (
    <>
      <Header
        imageUrl={imageUrl}
        loading={loading}
        onDownloadImage={() => downloadImage({ imageUrl, promptRef })}
      />

      {loading ? (
        <Skeleton />
      ) : imageUrl ? (
        <GeneratedImage imageUrl={imageUrl} />
      ) : (
        <Welcome />
      )}

      <Form
        handleGenerateImage={handleGenerateImage}
        loading={loading}
        prompt={prompt}
        onChangePrompt={(e) => setPrompt(e.target.value)}
      />
    </>
  );
}
