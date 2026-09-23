import { Headphones, Music2 } from "lucide-react";
const songs=[
 ["Aham","Nicolas Germano","A que abre esse cantinho e já virou parte dele."],
 ["The First Time","Damiano David","Tem intensidade de começo, descoberta e aquela sensação de viver algo pela primeira vez."],
 ["Those Eyes","New West","Porque são as pequenas coisas que acabam ficando gigantes."],
 ["Until I Found You","Stephen Sanchez","Parece música de uma memória bonita que ainda está acontecendo."]
];
export default function OurSoundtrack(){return <section className="px-6 py-24"><div className="mx-auto max-w-5xl"><div className="text-center"><Headphones className="mx-auto text-blue-700"/><p className="mt-4 text-xs font-bold uppercase tracking-[.3em] text-blue-600">nossa trilha sonora</p><h2 className="mt-3 text-4xl font-black text-slate-900">Músicas que ganharam um significado.</h2></div><div className="mt-10 grid gap-4 sm:grid-cols-2">{songs.map(([name,artist,why],i)=><div key={name} className="rounded-3xl border border-blue-100 bg-white p-6"><div className="flex items-start gap-4"><span className="rounded-2xl bg-blue-50 p-3 text-blue-700"><Music2/></span><div><span className="text-xs font-bold text-blue-400">0{i+1}</span><h3 className="text-xl font-bold text-slate-800">{name}</h3><p className="text-sm text-slate-500">{artist}</p></div></div><p className="mt-5 text-sm leading-7 text-slate-600">{why}</p></div>)}</div></div></section>}
