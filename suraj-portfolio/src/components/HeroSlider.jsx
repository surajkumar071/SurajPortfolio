import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Hi, I'm Suraj",
    subtitle: "Data Science and Agentic AI Developer",
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
    }, 4500);

    return () => clearTimeout(timeoutRef.current);
  }, [index, isPaused]);

  const goTo = (slideIndex) => setIndex(slideIndex % slides.length);

  const textVariants = {
    initial: { x: -40, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.9 } },
    exit: { x: -20, opacity: 0, transition: { duration: 0.6 } },
  };

  const imageVariants = {
    initial: { x: 60, opacity: 0, scale: 1.02 },
    animate: { x: 0, opacity: 1, scale: 1, transition: { duration: 1.1 } },
    exit: { x: 30, opacity: 0, scale: 1.03, transition: { duration: 0.8 } },
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
      <div className="absolute -right-40 top-12 h-96 w-96 rounded-full bg-gradient-to-r from-red-800/30 to-transparent blur-3xl animate-[float_12s_linear_infinite]" />
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
                <h2 className={`fancy-heading text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl`}>
                  {slides[index].title}
                </h2>

                <p className={`max-w-lg text-lg sm:text-xl ${isDark ? "text-red-100/85" : "text-slate-700"}`}>
                  {slides[index].subtitle}
                </p>

                <div className="mt-6 flex gap-4">
                  <a href={slides[index].ctaPrimary.href} className="btn-primary">
                    {slides[index].ctaPrimary.text}
                    <FaArrowRight />
                  </a>

                  <a href={slides[index].ctaSecondary.href} className="btn-secondary">
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
            <div className="w-full px-1 sm:px-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slides[index].id}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`hero-image-card relative overflow-hidden rounded-2xl transition-all duration-700 ${
                    isDark
                      ? "bg-gradient-to-br from-red-900/10 to-transparent"
                      : "bg-white/70 shadow-[0_24px_70px_rgba(127,29,29,0.10)] backdrop-blur-xl"
                  }`}
                >
                  <div
                    className={`absolute inset-0 ${isDark ? "bg-black/20" : "bg-gradient-to-t from-white/25 via-white/5 to-transparent"}`}
                    aria-hidden="true"
                  />

                  <div className="relative premium-image-wrap w-full overflow-hidden rounded-2xl">
                    <div className="relative w-full aspect-square sm:h-80 md:h-96 lg:h-[520px] overflow-hidden rounded-2xl">
                      <motion.img
                        src={slides[index].img}
                        alt={slides[index].title}
                        loading="eager"
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(.2,.9,.3,1)]"
                        initial={{ scale: 1.08, y: 10, rotate: -1.5 }}
                        animate={{ scale: 1, y: 0, rotate: 0 }}
                        exit={{ scale: 1.04, y: 6, rotate: 1 }}
                        transition={{ duration: 1.1, ease: [0.2, 0.9, 0.3, 1] }}
                      />
                    </div>

                    <div className="image-vignette" aria-hidden="true" />
                    <div className="image-border-glow" aria-hidden="true" />
                    <div className="premium-frame" aria-hidden="true" />
                    <div className="image-accent bg-red-700/20" aria-hidden="true" />
                  </div>
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
