import { SparkIcon } from "./Icons";

export default function Welcome() {
  return (
    <div className="flex items-center justify-center w-full h-80 bg-[#293747]">
      <p className="text-center text-xl p-4">
        <strong className="text-2xl flex items-center justify-center gap-4">
          <SparkIcon />
          ¡Te doy la Bienvenida! <SparkIcon />
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
  );
}
