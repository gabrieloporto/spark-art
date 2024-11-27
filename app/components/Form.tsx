import { AppForm } from "../lib/types";
import { CreateImageIcon, ErrorIcon, GenerateIcon } from "./Icons";

export default function Form({
  prompt,
  handleGenerateImage,
  loading,
  onChangePrompt,
  error,
}: AppForm) {
  return (
    <div className="flex flex-col items-center justify-center">
      <form className="flex items-center justify-center rounded-full w-full mb-8">
        <input
          type="text"
          value={prompt}
          onChange={onChangePrompt}
          placeholder="Escribe tu idea"
          className={`text-[#1e2833] pl-6 py-2 w-full rounded-l-full ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        />
        <button
          onClick={(e) => handleGenerateImage(e)}
          className={`flex items-center justify-center gap-2 bg-[#577da0] px-4 py-2 rounded hover:bg-[#446485] rounded-r-full transition-all duration-150 ease-in-out ${
            loading && "opacity-50"
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              Generando...
              <GenerateIcon />
            </>
          ) : (
            <>
              Crear
              <CreateImageIcon />
            </>
          )}
        </button>
      </form>
      {error && (
        <p className="text-red-500 text-xs flex items-center justify-center gap-2">
          {error}
          <ErrorIcon />
        </p>
      )}
    </div>
  );
}
