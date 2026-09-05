import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function InteractiveCat3D() {
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [petting, setPetting] = useState(false);
  const [hearts, setHearts] = useState([]);
  const [scrollMood, setScrollMood] = useState(0);
  const [lilyFound, setLilyFound] = useState(false);
  const [petCount, setPetCount] = useState(0);
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    const onPointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setLook({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setScrollMood(window.scrollY / max);
    };

    const onLilyBloomed = () => {
      setLilyFound(true);
      setPetting(true);
      window.setTimeout(() => setPetting(false), 1100);
      window.setTimeout(() => setLilyFound(false), 4200);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lily-bloomed", onLilyBloomed);
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("lily-bloomed", onLilyBloomed);
    };
  }, []);

  const message = useMemo(() => {
    if (secret) return "8 carinhos! segredo desbloqueado 💙";
    if (lilyFound) return "olha... um lírio pra você 🤍";
    if (petting) return "prrrr... 💙";
    if (scrollMood > 0.78) return "eu sabia que vocês iam chegar até aqui 🐾";
    if (scrollMood > 0.4) return "continua... tem amor lá embaixo 😼";
    return "pspsps... passa o mouse em mim";
  }, [petting, scrollMood, lilyFound]);

  function petCat() {
    setPetting(true);
    setPetCount((count) => {
      const next = count + 1;
      if (next === 8) {
        setSecret(true);
        window.setTimeout(() => setSecret(false), 6500);
      }
      return next > 8 ? 1 : next;
    });
    const burst = Array.from({ length: 6 }, (_, index) => ({
      id: `${Date.now()}-${index}`,
      x: (index - 2.5) * 15,
      delay: index * 0.04,
    }));
    setHearts((current) => [...current, ...burst]);
    window.setTimeout(() => setPetting(false), 900);
    window.setTimeout(() => {
      setHearts((current) => current.filter((heart) => !burst.some((item) => item.id === heart.id)));
    }, 1600);
  }

  const headRotateY = look.x * 16;
  const headRotateX = -look.y * 11;
  const eyeX = look.x * 3.2;
  const eyeY = look.y * 2.4;
  const bob = Math.sin(scrollMood * Math.PI * 5) * 5;

  return (
    <div className="cat3d-wrap" style={{ "--cat-scroll-bob": `${bob}px` }}>
      <motion.div
        className="cat3d-bubble"
        animate={{ opacity: petting ? 1 : 0.92, y: petting ? -4 : 0 }}
      >
        {message}
        {!secret && petCount > 0 && <span className="ml-1 opacity-60">({petCount}/8)</span>}
      </motion.div>

      <button
        type="button"
        className="cat3d-stage"
        onClick={petCat}
        aria-label="Fazer carinho no gatinho"
        title="Faz carinho em mim"
      >
        <span className="cat3d-shadow" />
        <span className="cat3d-tail" />
        <span className="cat3d-body">
          <span className="cat3d-chest" />
          <span className="cat3d-paw cat3d-paw-left" />
          <span className="cat3d-paw cat3d-paw-right" />
        </span>

        <motion.span
          className="cat3d-head"
          animate={{
            rotateY: headRotateY,
            rotateX: headRotateX,
            y: petting ? -7 : 0,
            scale: petting ? 1.035 : 1,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 16, mass: 0.7 }}
        >
          <span className="cat3d-ear cat3d-ear-left"><i /></span>
          <span className="cat3d-ear cat3d-ear-right"><i /></span>
          <span className="cat3d-face-light" />
          <span className="cat3d-eye cat3d-eye-left">
            <i style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }} />
          </span>
          <span className="cat3d-eye cat3d-eye-right">
            <i style={{ transform: `translate(${eyeX}px, ${eyeY}px)` }} />
          </span>
          <span className="cat3d-nose" />
          <span className="cat3d-mouth cat3d-mouth-left" />
          <span className="cat3d-mouth cat3d-mouth-right" />
          <span className="cat3d-whisker cat3d-whisker-a" />
          <span className="cat3d-whisker cat3d-whisker-b" />
          <span className="cat3d-whisker cat3d-whisker-c" />
          <span className="cat3d-whisker cat3d-whisker-d" />
        </motion.span>

        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.span
              key={heart.id}
              className="cat3d-heart"
              initial={{ opacity: 0, x: 0, y: 5, scale: 0.5 }}
              animate={{ opacity: [0, 1, 1, 0], x: heart.x, y: -105, scale: [0.5, 1.1, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.25, delay: heart.delay, ease: "easeOut" }}
            >
              ♥
            </motion.span>
          ))}
        </AnimatePresence>
      </button>
      <AnimatePresence>
        {secret && (
          <motion.div initial={{opacity:0,scale:.9,y:10}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0}} className="cat3d-secret">
            <strong>Você achou o segredo do 8 ✨</strong>
            <span>Se eu pudesse escolher você 8 vezes, escolheria você nas 8.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
