import { DownloadSparkImage } from "../lib/types";

export default async function downloadImage({
  imageUrl,
  promptRef,
}: DownloadSparkImage) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `SparkArt - ${promptRef.current}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
}
