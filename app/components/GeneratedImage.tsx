import { GeneratedSparkImage } from "../lib/types";

export default function GeneratedImage({ imageUrl }: GeneratedSparkImage) {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center flex-col justify-center w-full max-w-md h-80">
        <img
          src={imageUrl}
          alt="Imagen Generada"
          className="w-full h-full object-cover rounded shadow-lg"
        />
      </div>
    </div>
  );
}
