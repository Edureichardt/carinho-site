import { useEffect, useMemo, useState } from "react";
import { LockKeyhole, Sparkles, Star } from "lucide-react";
import { unlockSecret } from "../secretSystem";

const secrets = [
  "Só passando pra deixar registrado: eu ainda fico feliz quando lembro que posso te chamar de minha namorada. 🤍",
  "Segredo do dia: até os dias comuns ficaram mais bonitos depois que ganharam você no meio deles.",
  "Se você achou isso sozinha, ganhou um beijo. O resgate é presencial. Sem prazo de validade. 😼",
  "Eu gosto das nossas fotos. Mas gosto mais ainda de saber que ainda existem muitas que a gente nem tirou.",
  "Às vezes eu atualizo esse site. Às vezes é você que atualiza meu dia só aparecendo nele. 💙",
  "Você chegou até um segredo que eu não te contei. Então fica aqui: eu adoro quando você volta nesse site.",
  "Tem uma versão minha de antes de 22/08 e uma depois. Eu gosto muito mais da segunda.",
  "Parabéns, exploradora. Você encontrou mais um pedacinho meu escondido por aqui. 🍂",
  "Hoje o site tinha uma missão simples: te lembrar que tem alguém pensando em você.",
  "Não importa quantas vezes você entre. Eu ainda quero que tenha alguma coisinha aqui esperando por você.",
  "Nota secreta: seu sorriso continua sendo uma das minhas notificações favoritas — mesmo sem celular nenhum envolvido.",
  "Se hoje foi um dia difícil, fica aqui por alguns segundos. Esse cantinho também é seu. 🤍",
];

function dayNumber() {
  const start = new Date(2026, 7, 22);
  const today = new Date();
  return Math.max(0, Math.floor((new Date(today.getFullYear(), today.getMonth(), today.getDate()) - start) / 86400000));
}

export default function DailySecret() {
  const index = useMemo(() => dayNumber() % secrets.length, []);
  const [open, setOpen] = useState(false);
  const [discovered, setDiscovered] = useState(0);
  const todayKey = new Date().toISOString().slice(0, 10);
  const isDay22 = new Date().getDate() === 22;

  useEffect(() => {
    try {
      const days = JSON.parse(localStorage.getItem("mi-secret-days") || "[]");
      setDiscovered(days.length);
    } catch { setDiscovered(0); }
  }, []);

  function reveal() {
    setOpen(true);
    if (isDay22) unlockSecret("day-22");
    try {
      const days = JSON.parse(localStorage.getItem("mi-secret-days") || "[]");
      if (!days.includes(todayKey)) {
        const next = [...days, todayKey];
        localStorage.setItem("mi-secret-days", JSON.stringify(next));
        setDiscovered(next.length);
        if (next.length >= 8) unlockSecret("daily-8");
      }
    } catch { /* localStorage pode estar indisponível */ }
  }

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_25px_80px_rgba(30,64,175,.08)] sm:p-10">
          <div className="flex flex-col items-center text-center">
            <button
              type="button"
              onClick={reveal}
              className={`group flex h-20 w-20 items-center justify-center rounded-full transition duration-500 ${open ? "rotate-12 bg-blue-700 text-white" : "bg-blue-50 text-blue-700 hover:scale-105 hover:bg-blue-100"}`}
              aria-label="Abrir segredo de hoje"
            >
              {open ? <Star size={30} fill="currentColor" /> : <LockKeyhole size={29} />}
            </button>
            <span className="mt-5 text-xs font-bold uppercase tracking-[.3em] text-blue-500">um segredo por dia</span>
            <h2 className="mt-3 text-2xl font-bold text-slate-800 sm:text-4xl">Tem alguma coisa escondida aqui hoje.</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              Se você voltar amanhã, talvez encontre outra coisa. Eu não prometi que esse site ia ficar parado. 😼
            </p>

            <div className={`grid transition-all duration-700 ${open ? "mt-8 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
                <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-amber-50/50 p-6 sm:p-8">
                  <Sparkles className="mx-auto mb-4 text-amber-500" size={22} />
                  <p className="text-base font-medium leading-8 text-slate-700 sm:text-lg">“{secrets[index]}”</p>
                  {isDay22 && (
                    <div className="mt-6 rounded-2xl bg-[#071a35] px-5 py-4 text-sm leading-6 text-blue-100">
                      ✨ Hoje é dia 22. Então existe um segredo extra: mais um mês começou no nosso calendário. Feliz nosso dia, Mi. 🤍
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-7 flex items-center gap-2 text-xs text-slate-400">
              <span className="flex gap-1">{Array.from({ length: 8 }).map((_, i) => <i key={i} className={`h-1.5 w-1.5 rounded-full ${i < Math.min(discovered, 8) ? "bg-blue-500" : "bg-slate-200"}`} />)}</span>
              {discovered < 8 ? `${discovered}/8 dias secretos encontrados` : "você desbloqueou 8 dias secretos 🤍"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
