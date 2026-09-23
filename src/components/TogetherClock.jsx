import { useEffect, useMemo, useState } from "react";
import { Heart, Infinity as InfinityIcon, Sparkles } from "lucide-react";

const START = new Date(2026, 7, 22, 0, 0, 0);

function getTimeTogether() {
  const now = new Date();
  const diff = Math.max(0, now.getTime() - START.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

function calendarTogether() {
  const now = new Date();
  let months = (now.getFullYear() - 2026) * 12 + (now.getMonth() - 7);
  let anchor = new Date(2026, 7 + months, 22);
  if (anchor > now) {
    months -= 1;
    anchor = new Date(2026, 7 + months, 22);
  }
  const days = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - anchor) / 86400000);
  return { months: Math.max(0, months), days: Math.max(0, days) };
}

export default function TogetherClock() {
  const [time, setTime] = useState(getTimeTogether());
  const calendar = useMemo(calendarTogether, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTimeTogether()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    [time.days, "dias"], [time.hours, "horas"], [time.minutes, "min"], [time.seconds, "seg"],
  ];

  return (
    <section id="nosso-tempo" className="relative overflow-hidden bg-[#071a35] px-6 py-24 text-white">
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mb-4 flex items-center justify-center gap-2 text-sm font-semibold uppercase tracking-[.28em] text-blue-200">
          <Heart size={15} fill="currentColor" /> desde 22 • 08 • 2026
        </div>
        <h2 className="text-3xl font-bold sm:text-5xl">O tempo que já é nosso</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100/75 sm:text-base">
          O relógio continua andando. E eu continuo escolhendo você em cada pedacinho dele.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          {units.map(([value, label]) => (
            <div key={label} className="rounded-3xl border border-white/10 bg-white/[.06] p-5 backdrop-blur-md">
              <strong className="block font-mono text-3xl tabular-nums text-white sm:text-4xl">{String(value).padStart(2, "0")}</strong>
              <span className="mt-2 block text-xs uppercase tracking-[.22em] text-blue-200/70">{label}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-xl items-center justify-center gap-3 rounded-2xl border border-blue-300/15 bg-blue-300/[.05] px-5 py-4 text-sm text-blue-100">
          <Sparkles size={17} />
          <span><b>{calendar.months} {calendar.months === 1 ? "mês" : "meses"}</b>{calendar.days ? ` e ${calendar.days} ${calendar.days === 1 ? "dia" : "dias"}` : ""} de namoro — e contando.</span>
          <InfinityIcon size={17} />
        </div>
      </div>
    </section>
  );
}
