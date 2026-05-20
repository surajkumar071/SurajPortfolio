import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp, FaGithub, FaLinkedin, FaRobot, FaTimes } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";

const LINKS = [
  {
    label: "WhatsApp",
    href: "https://wa.me/919006192179",
    icon: FaWhatsapp,
    glow: "from-emerald-500/30 to-green-500/10",
    border: "border-emerald-400/20",
  },
  {
    label: "GitHub",
    href: "https://github.com/surajkumar071",
    icon: FaGithub,
    glow: "from-slate-400/20 to-red-500/10",
    border: "border-white/10",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/surajkumar071",
    icon: FaLinkedin,
    glow: "from-sky-500/25 to-red-500/10",
    border: "border-sky-400/20",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/_surajnirala_",
    icon: FaXTwitter,
    glow: "from-slate-400/20 to-red-500/10",
    border: "border-white/10",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_surajnirala_",
    icon: FaInstagram,
    glow: "from-fuchsia-500/20 to-red-500/10",
    border: "border-fuchsia-400/20",
  },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [typingStage, setTypingStage] = useState(0);
  const widgetRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setTypingStage(0);
      return undefined;
    }

    const timers = [
      setTimeout(() => setTypingStage(1), 420),
      setTimeout(() => setTypingStage(2), 900),
      setTimeout(() => setTypingStage(3), 1280),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !bodyRef.current) return;
    bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [isOpen, typingStage]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleOutsideInteraction = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideInteraction);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideInteraction);
    };
  }, [isOpen]);

  return (
    <div ref={widgetRef} className="fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-4 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-red-500/25 bg-gradient-to-br from-black/95 via-red-950/90 to-black/95 shadow-[0_0_60px_rgba(127,29,29,0.32)] backdrop-blur-2xl sm:w-[26rem]"
          >
            <div className="flex items-center justify-between border-b border-red-500/10 bg-gradient-to-r from-red-950/95 via-black/92 to-black/98 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-red-400/25 bg-gradient-to-br from-red-500/35 via-red-800/70 to-black/80 text-red-50 shadow-[0_0_24px_rgba(220,38,38,0.28)]">
                  <FaRobot size={20} />
                  <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Suraj AI Assistant</p>
                  <p className="text-xs text-red-100/90">Always ready to connect</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chatbot"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-400/15 bg-gradient-to-br from-black/55 via-red-950/45 to-black/80 text-red-100 transition-all duration-500 hover:scale-105 hover:border-red-400/35 hover:bg-gradient-to-br hover:from-red-900/70 hover:via-black/85 hover:to-black hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.32)]"
              >
                <FaTimes />
              </button>
            </div>

            <div
              ref={bodyRef}
              className="max-h-[32rem] overflow-y-auto px-4 py-4 sm:max-h-[34rem]"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-red-500/12 bg-gradient-to-br from-red-950/70 via-black/70 to-black/80 p-4 text-white shadow-inner shadow-black/40 transition-all duration-500 hover:border-red-400/25 hover:from-red-900/75 hover:via-black/82 hover:to-black/88 hover:shadow-[0_0_34px_rgba(0,0,0,0.6)]"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl border border-red-300/10 bg-gradient-to-br from-red-500/80 via-red-700/85 to-black text-white shadow-[0_0_18px_rgba(220,38,38,0.38)]">
                    <FaRobot />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm leading-7 text-white">
                      {typingStage >= 1 ? (
                        <>
                          Hi 👋 I&apos;m Suraj&apos;s AI Assistant
                          <span className="ml-1 inline-flex items-center gap-1 align-middle">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-red-400 [animation-delay:-0.2s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-red-300 [animation-delay:-0.1s]" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-red-200" />
                          </span>
                        </>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-white/90">
                          <span className="h-2 w-2 animate-pulse rounded-full bg-red-400" />
                          Typing a welcome message...
                        </span>
                      )}
                    </p>

                    {typingStage >= 2 && (
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35 }}
                        className="mt-3 text-sm leading-6 text-red-100/95"
                      >
                        Choose a premium contact option below.
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>

              <div className="mt-4 grid gap-3">
                {LINKS.map((link, index) => {
                  const Icon = link.icon;

                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: typingStage >= 3 ? 1 : 0.45, y: typingStage >= 3 ? 0 : 12 }}
                      transition={{ duration: 0.45, delay: index * 0.08 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative overflow-hidden rounded-2xl border ${link.border} bg-gradient-to-r from-black/55 via-red-950/40 to-black/70 px-4 py-4 text-left text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-500 hover:border-red-400/45 hover:from-red-950/75 hover:via-black/82 hover:to-black/88 hover:shadow-[0_0_36px_rgba(220,38,38,0.24)]`}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${link.glow} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60`}
                        aria-hidden="true"
                      />

                      <div className="relative flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-black/75 via-red-950/55 to-black/95 text-xl text-red-100 transition-all duration-500 group-hover:border-red-400/35 group-hover:from-red-900/80 group-hover:via-black/90 group-hover:to-black group-hover:text-white group-hover:shadow-[0_0_18px_rgba(220,38,38,0.24)]">
                          <Icon />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-base font-semibold text-white">{link.label}</p>
                          <p className="text-xs text-red-50/90">Open my {link.label} profile</p>
                        </div>

                        <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-red-300 to-red-500 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-red-400/20 bg-gradient-to-br from-red-700 via-red-800 to-black text-white shadow-[0_0_30px_rgba(220,38,38,0.38)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(220,38,38,0.62)]"
        aria-label="Toggle chatbot"
      >
        <span className="absolute inset-0 animate-pulse rounded-full border border-red-500/20" />
        <span className="absolute -right-1 top-1.5 h-3 w-3 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.9)]" />
        <FaRobot size={24} className="relative z-10" />
      </motion.button>
    </div>
  );
}
