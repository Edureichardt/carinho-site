import Button from "./Button";
import SeasonDecor from "./SeasonDecor";

export default function Hero() {
  function scrollNext() {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#dbeafe] via-[#f7fbff] to-[#fff7ed]" />
      <div className="absolute -left-32 -top-36 h-[430px] w-[430px] rounded-full bg-blue-400/20 blur-3xl" />
      <div className="absolute -bottom-40 -right-36 h-[520px] w-[520px] rounded-full bg-amber-400/15 blur-3xl" />
      <SeasonDecor />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-700 sm:text-sm">
          uma nova fase da nossa história
        </p>

        <div className="mt-7 text-5xl sm:text-6xl">🤍🍂</div>

        <h1 className="mt-5 text-5xl font-bold leading-tight text-slate-900 sm:text-7xl lg:text-8xl">
          Oi, minha namorada.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-slate-600 sm:text-xl">
          O site mudou porque a nossa história também mudou. E agora eu queria guardar aqui um pedacinho dessa fase nova que começou com você dizendo sim.
        </p>

        <p className="mt-5 text-sm font-medium uppercase tracking-[0.24em] text-amber-700/80">
          azul • outono • lírios • nós dois
        </p>

        <div className="mt-12">
          <Button onClick={scrollNext} />
        </div>
      </div>
    </section>
  );
}
