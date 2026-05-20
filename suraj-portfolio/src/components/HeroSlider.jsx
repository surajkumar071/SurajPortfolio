import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Hi, I'm Suraj Kumar",
    subtitle: "Full Stack & Agentic AI Developer",
    img: "/profile.jpg",
    ctaPrimary: { text: "View Projects", href: "#projects" },
    ctaSecondary: { text: "Contact Me", href: "#contact" },
  },
  {
    id: 2,
    title: "I Build Modern AI Applications",
    subtitle: "Creative Developer & UI Designer",
    img: "/profile2.jpg",
    ctaPrimary: { text: "See Work", href: "#projects" },
    ctaSecondary: { text: "Hire Me", href: "#contact" },
  },
  {
    id: 3,
    title: "Transforming Ideas Into Digital Experiences",
    subtitle: "React • AI • Full Stack",
    img: "/profile3.jpg",
    ctaPrimary: { text: "Explore", href: "#projects" },
    ctaSecondary: { text: "Get In Touch", href: "#contact" },
  },
];

export default function HeroSlider({ theme }) {
  const isDark = theme === "dark";
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    timeoutRef.current = setTimeout(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused]);

  const goTo = (slideIndex) => setIndex(slideIndex % slides.length);

  const textVariants = {
    initial: { x: -40, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.7 } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    initial: { x: 60, opacity: 0, scale: 1.02 },
    animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { x: 30, opacity: 0, scale: 1.03, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={`absolute inset-0 -z-20 transition-all duration-700 ${isDark ? "bg-black" : "bg-[#f7f1f1]"}`}
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 top-12 h-96 w-96 rounded-full bg-gradient-to-r from-red-800/30 to-transparent blur-3xl animate-[float_8s_linear_infinite]" />
        <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-gradient-to-r from-red-600/20 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div className="z-10">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slides[index].id}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="max-w-xl space-y-6"
              >
                <h2
                  className={`bg-gradient-to-r text-4xl font-extrabold leading-tight bg-clip-text sm:text-5xl lg:text-6xl ${
                    isDark
                      ? "from-red-400 to-red-200 text-transparent drop-shadow-lg"
                      : "from-red-600 to-red-400 text-transparent drop-shadow-lg"
                  }`}
                >
                  {slides[index].title}
                </h2>

                <p className={`max-w-lg text-lg sm:text-xl ${isDark ? "text-red-100/85" : "text-slate-700"}`}>
                  {slides[index].subtitle}
                </p>

                <div className="mt-6 flex gap-4">
                  <a
                    href={slides[index].ctaPrimary.href}
                    className={`inline-flex items-center gap-2 rounded-full px-6 py-3 font-bold text-white transition-all duration-700 hover:scale-105 ${
                      isDark
                        ? "bg-gradient-to-r from-red-600 to-red-500 shadow-glow"
                        : "bg-gradient-to-r from-red-600 to-red-500 shadow-[0_14px_30px_rgba(220,38,38,0.2)]"
                    }`}
                  >
                    {slides[index].ctaPrimary.text}
                    <FaArrowRight />
                  </a>

                  <a
                    href={slides[index].ctaSecondary.href}
                    className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 font-semibold transition-all duration-700 ${
                      isDark
                        ? "border-red-600/30 bg-black/40 text-red-100 hover:bg-black/30"
                        : "border-red-600/25 bg-white/70 text-slate-800 hover:border-red-600/40 hover:bg-white hover:shadow-[0_12px_28px_rgba(127,29,29,0.10)]"
                    }`}
                  >
                    {slides[index].ctaSecondary.text}
                  </a>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {slides.map((slide, slideIndex) => (
                      <button
                        key={slide.id}
                        type="button"
                        onClick={() => goTo(slideIndex)}
                        aria-label={`Go to slide ${slideIndex + 1}`}
                        className={`h-3 w-3 rounded-full transition-all duration-500 ${
                          index === slideIndex
                            ? isDark
                              ? "scale-110 bg-red-400"
                              : "scale-110 bg-red-600"
                            : isDark
                              ? "bg-red-900/30"
                              : "bg-red-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slides[index].id}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`relative overflow-hidden rounded-2xl border shadow-2xl transition-all duration-700 ${
                    isDark
                      ? "border-red-800/10 bg-gradient-to-br from-red-900/10 to-transparent"
                      : "border-red-200/50 bg-white/70 shadow-[0_24px_70px_rgba(127,29,29,0.10)] backdrop-blur-xl"
                  }`}
                >
                  <div
                    className={`absolute inset-0 ${isDark ? "bg-black/20" : "bg-gradient-to-t from-white/25 via-white/5 to-transparent"}`}
                    aria-hidden="true"
                  />

                  <motion.img
                    src={slides[index].img}
                    alt={slides[index].title}
                    loading="eager"
                    className="block h-72 w-full object-cover transition-transform duration-700 hover:scale-105 sm:h-80 md:h-96 lg:h-[520px]"
                    initial={{ scale: 1.03 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 1.02 }}
                    transition={{ duration: 1 }}
                  />

                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-red-700/20 blur-3xl mix-blend-screen" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-12px) } }`}</style>
    </section>
  );
}
