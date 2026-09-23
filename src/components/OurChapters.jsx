import { BookHeart } from "lucide-react";
const chapters=[
 ["01","Antes do sim","Um site, algumas indiretas nada discretas e um monte de coisa que eu ainda não podia chamar de nossa."],
 ["02","22 • 08 • 2026","O dia em que a história ganhou uma data oficial."],
 ["03","Nosso primeiro mês","Fotos, pequenas memórias, carinho e a confirmação de que eu queria continuar escrevendo isso."],
 ["04","Sendo escrito agora...","Esse capítulo muda toda vez que a gente vive alguma coisa nova."]
];
export default function OurChapters(){return <section className="px-6 py-24"><div className="mx-auto max-w-5xl"><div className="text-center"><BookHeart className="mx-auto text-blue-700"/><p className="mt-4 text-xs font-bold uppercase tracking-[.3em] text-blue-600">capítulos de nós</p><h2 className="mt-3 text-4xl font-black text-slate-900">Uma história que ainda está sendo escrita.</h2></div><div className="mt-12 space-y-4">{chapters.map(([n,t,d])=><div key={n} className="grid gap-3 rounded-3xl border border-blue-100 bg-white p-6 sm:grid-cols-[80px_1fr]"><span className="text-3xl font-black text-blue-200">{n}</span><div><h3 className="text-xl font-bold text-slate-800">{t}</h3><p className="mt-2 leading-7 text-slate-500">{d}</p></div></div>)}</div></div></section>}
