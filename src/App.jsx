import { lazy, Suspense, useState } from "react";
import TwoMonthsSurprise from "./components/TwoMonthsSurprise";

// O site completo so e carregado depois da surpresa.
const SiteContent = lazy(() => import("./SiteContent"));
export default function App() {
  const [anniversaryEntered, setAnniversaryEntered] = useState(false);
  return <>
    {!anniversaryEntered && <TwoMonthsSurprise onEnter={() => setAnniversaryEntered(true)} />}
    {anniversaryEntered && <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#09152e] text-amber-100">Preparando nosso cantinho... ♡</div>}><SiteContent /></Suspense>}
  </>;
}
