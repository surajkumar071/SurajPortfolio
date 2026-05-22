import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGraduationCap, FaSchool, FaCalendarAlt } from "react-icons/fa";

// Reusable TimelineCard component
const TimelineCard = ({ item, side, isDark }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={`relative w-full ${side === "left" ? "lg:pr-8" : "lg:pl-8"}`}
    >
      <div
        className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 sm:p-7 lg:p-8 ${
            isDark
            ? "border border-transparent bg-gradient-to-br from-black/60 via-red-900/10 to-black/30 shadow-[0_30px_80px_rgba(0,0,0,0.6)] backdrop-blur-3xl hover:shadow-[0_30px_90px_rgba(220,38,38,0.24)]"
            : "border border-gray-100 bg-white/80 shadow-2xl backdrop-blur-sm hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(15,23,42,0.08)]"
        }`}
      >
        
        {/* Decorative overlays (adjust for theme) */}
        <div
          className={`pointer-events-none absolute inset-0 transition duration-500 ${
            isDark ? "bg-gradient-to-br from-red-500/8 via-transparent to-black/20 opacity-80" : "bg-gradient-to-br from-red-600/6 via-transparent to-white/20 opacity-60"
          }`}
        />
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full blur-3xl transition duration-500 ${
            isDark ? "bg-red-500/10 group-hover:bg-red-500/20" : "bg-red-600/6 group-hover:bg-red-600/12"
          }`}
        />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-5 card">
          <div
            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ring-1 transition duration-500 ${
              isDark
                ? "border border-red-500/20 bg-gradient-to-br from-red-700/60 via-red-600/35 to-red-500/10 text-white shadow-[0_10px_30px_rgba(220,38,38,0.18)] group-hover:scale-105 group-hover:shadow-[0_14px_36px_rgba(220,38,38,0.28)] ring-white/10"
                : "border border-red-200/40 bg-white text-red-700 shadow-sm group-hover:scale-102"
            }`}
          >
            <FaGraduationCap size={24} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
              <div>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] shadow-sm ${
                    isDark
                      ? "border border-red-600/20 bg-black/20 text-red-200 ring-1 ring-red-600/10"
                      : "border border-red-100/20 bg-red-50 text-red-700 ring-1 ring-red-600/6"
                  }`}
                >
                  <FaCalendarAlt /> {item.period}
                </span>
                <h4
                  className={`mt-4 text-2xl font-black tracking-tight transition duration-500 ${
                    isDark ? "text-white group-hover:text-red-100" : "text-slate-900 group-hover:text-red-600"
                  }`}
                >
                  {item.title}
                </h4>
              </div>

              <div
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${
                  isDark ? "border border-white/10 bg-black/25 text-red-200/90" : "border border-gray-100 bg-white/90 text-red-700"
                }`}
              >
                Academic Step
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${isDark ? "text-red-300/90" : "text-red-700"}`}>
                {item.institution}
              </p>
              {item.description && (
                <blockquote className={`max-w-xl text-sm leading-7 ${isDark ? "text-gray-300/85 italic border-l-2 border-red-600/20 pl-4" : "text-slate-700 italic border-l-2 border-red-600/10 pl-4"}`}>
                  {item.description}
                </blockquote>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={item.website}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-500 sm:w-auto transform-gpu ${
                  isDark
                    ? "border border-red-500/10 bg-gradient-to-r from-red-600/90 to-red-500/80 text-white hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(220,38,38,0.28)] backdrop-blur-sm ring-1 ring-red-600/20"
                    : "border border-red-200/20 bg-gradient-to-r from-red-600 to-red-500 text-white hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(220,38,38,0.14)] backdrop-blur-sm ring-1 ring-red-600/10"
                }`}
              >
                <FaSchool /> View School/College
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main EducationTimeline component
export default function EducationTimeline({ theme }) {
  const ref = useRef(null);
  const isDark = theme === "dark";
  // useScroll to animate the progress line
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.02, 1]);

  // Education data array (rendered with map)
  const education = [
    {
      period: "2011-2021",
      title: "01- Matric",
      institution: "Khrist Raja Senior Secondary School, Bettiah, Bihar",
      website: "https://krschoolbth.com/",
      description: "Reflections on schooling life: \"Curiosity lights the path in primary school\" and \"Discipline and discovery shape secondary school\".",
    },
    {
      period: "2021 – 2023",
      title: "Intermediate",
      institution: "SNS College, Motihari, Bihar",
      website: "https://www.snscollege.ac.in/",
      description: "Higher secondary studies preparing for specialised university coursework.",
    },
    {
      period: "2023 – 2024",
      title: "ADCA (Advance Diploma in Computer Application) & KYP",
      institution: "Professional Certification",
      website: "#",
      description: "Practical diploma covering software, office automation and applied computing.",
    },
    {
      period: "2024 – Present",
      title: "Bachelor of Computer Application",
      institution: "Vivekananda Global University",
      website: "https://www.vgu.ac.in/",
      description: "Undergraduate degree in computer applications with advanced coursework.",
    },
  ];

  return (
    <section
      id="education"
      ref={ref}
      className={`px-4 py-20 transition-all duration-500 sm:px-6 ${isDark ? "bg-[#020202]" : "bg-[#f8f8f8]"}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          {/* badge removed per request */}
          <h2 className={`mb-3 text-4xl font-black sm:text-5xl fancy-heading ${isDark ? "text-white" : "text-slate-950"}`}>Education Journey</h2>
          <p className={`text-lg ${isDark ? "text-red-300" : "text-red-700"}`}>My academic and professional learning timeline</p>
        </div>

        <div className="relative">
          {/* Soft ambient glow */}
          <div className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 h-72 w-72 rounded-full bg-red-600/10 blur-3xl" />

          {/* Vertical animated line (center) */}
          <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 transform md:block">
            <div className="relative h-full w-1 rounded-full bg-gradient-to-b from-red-900/20 via-red-800/30 to-transparent">
              <motion.div
                style={{ scaleY }}
                className="origin-top absolute inset-0 left-0 w-full rounded-full bg-gradient-to-b from-red-600 to-red-400/60 shadow-[0_0_40px_rgba(220,38,38,0.12)]"
              />
            </div>
          </div>

          {/* Timeline items */}
          <div className="relative z-10 grid grid-cols-1 gap-10 lg:gap-12">
            {education.map((item, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className="relative lg:flex lg:items-center lg:justify-between">
                  {/* Left card area */}
                    <div className={`flex w-full ${isLeft ? "lg:order-1 lg:justify-end" : "lg:order-2 lg:justify-start"} lg:w-1/2`}>
                    <TimelineCard item={item} side={isLeft ? "left" : "right"} isDark={isDark} />
                  </div>

                  {/* Center dot for timeline (visible on lg) and mobile stacked marker */}
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 md:static md:mx-auto md:flex md:items-center md:justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-600 via-red-500 to-red-400 shadow-[0_0_28px_rgba(220,38,38,0.35)] ring-4 ring-black/50"
                    >
                      <span className="text-white text-sm">{idx + 1}</span>
                    </motion.div>
                  </div>

                  {/* Right card area */}
                  <div className={`lg:w-1/2 ${isLeft ? "lg:order-3" : "lg:order-1"} mt-6 lg:mt-0`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
