import Image from "next/image";
import { DownloadIcon } from "./Icons";
import { AppHeader } from "../lib/types";

export default function Header({
  imageUrl,
  loading,
  onDownloadImage,
}: AppHeader) {
  return (
    <header className="flex justify-between items-center mt-8">
      <Image alt="logo" src="/logo.webp" width={80} height={80} />
      {imageUrl && !loading ? (
        <button
          onClick={onDownloadImage}
          className="bg-[#577da0] p-3 hover:bg-[#446485] rounded-sm transition-all duration-150 ease-in-out"
        >
          <DownloadIcon />
        </button>
      ) : null}
    </header>
  );
}
