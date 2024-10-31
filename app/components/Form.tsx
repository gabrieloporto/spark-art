import { AppForm } from "../lib/types";
import { CreateImageIcon, ErrorIcon } from "./Icons";

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
                className="icon icon-tabler icons-tabler-outline icon-tabler-loader rotate"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 6l0 -3" />
                <path d="M16.25 7.75l2.15 -2.15" />
                <path d="M18 12l3 0" />
                <path d="M16.25 16.25l2.15 2.15" />
                <path d="M12 18l0 3" />
                <path d="M7.75 16.25l-2.15 2.15" />
                <path d="M6 12l-3 0" />
                <path d="M7.75 7.75l-2.15 -2.15" />
              </svg>
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
