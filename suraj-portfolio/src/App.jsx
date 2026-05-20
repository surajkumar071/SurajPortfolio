import { useState, useEffect, useLayoutEffect, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaExternalLinkAlt, FaReact, FaNode, FaPython, FaJava, FaCss3Alt, FaHtml5, FaDatabase, FaDocker, FaGitAlt, FaArrowRight, FaWhatsapp, FaPhoneAlt, FaLaptopCode, FaFileWord, FaFileExcel, FaFilePowerpoint, FaGraduationCap, FaSchool, FaCalendarAlt } from "react-icons/fa";
import { FaXTwitter, FaInstagram } from "react-icons/fa6";
import { SiTypescript, SiTailwindcss, SiMysql, SiMongodb, SiNextdotjs, SiJupyter, SiCanva } from "react-icons/si";
import ThemeToggle from "./components/ThemeToggle.jsx";
import HeroSlider from "./components/HeroSlider.jsx";
import EducationTimeline from "./components/EducationTimeline.jsx";
const ChatBot = lazy(() => import("./components/ChatBot.jsx"));
const ResumePage = lazy(() => import("./components/ResumePage.jsx"));

// ============ ANIMATED BACKGROUND ============
const AnimatedBackground = ({ theme }) => {
  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden transition-all duration-500 ${
        theme === "dark" ? "bg-[#020202]" : "bg-[#fafafa]"
      }`}
    >
      {/* Gradient blobs */}
      <motion.div
        animate={{ x: [0, 100, -100, 0], y: [0, -100, 100, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-red-300/40 to-red-100/20 dark:from-red-900/30 dark:to-red-600/20"
      />
      <motion.div
        animate={{ x: [0, -100, 100, 0], y: [0, 100, -100, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -left-40 w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-red-200/40 to-white/10 dark:from-red-900/20 dark:to-black/20"
      />
      <motion.div
        animate={{ x: [0, 50, -50, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl bg-gradient-to-t from-red-200/30 to-transparent dark:from-red-900/10"
      />

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-5"
        style={{
          backgroundImage:
            theme === "dark"
              ? "linear-gradient(rgba(255,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,.1) 1px, transparent 1px)"
              : "linear-gradient(rgba(127,29,29,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(127,29,29,.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
};

// ============ MOBILE MENU ============
const MobileMenu = ({ isOpen, activeSection, currentPath, theme }) => {
  const isDark = theme === "dark";
  const menuItems = ["Home", "About", "Skills", "Education", "Projects", "Contact", "Resume"];

  const getHref = (item) => {
    if (item === "Resume") {
      return "/resume";
    }

    const sectionHref = `#${item.toLowerCase()}`;
    return currentPath === "/" ? sectionHref : `/${sectionHref}`;
  };

  const isItemActive = (item) => {
    if (item === "Resume") {
      return currentPath === "/resume";
    }

    return currentPath === "/" && activeSection === item.toLowerCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-20 left-0 right-0 z-40 md:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className="mx-4 rounded-2xl border p-4 backdrop-blur-xl transition-all duration-500"
        style={{
          borderColor: isDark ? "rgba(127, 29, 29, 0.5)" : "rgba(254, 202, 202, 0.7)",
          backgroundColor: isDark ? "rgba(0, 0, 0, 0.94)" : "rgba(255, 255, 255, 0.92)",
          color: isDark ? "rgb(255, 255, 255)" : "rgb(15, 23, 42)",
        }}
      >
        <div className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <a
              key={item}
              href={getHref(item)}
              className={`px-4 py-2 rounded-lg transition font-medium ${
                isItemActive(item)
                  ? "bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-600/20"
                  : isDark
                    ? "text-gray-300 hover:text-red-200"
                    : "text-slate-600 hover:text-red-500"
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============ NAVBAR ============
const Navbar = ({ mobileMenuOpen, setMobileMenuOpen, activeSection, currentPath, theme, onThemeToggle }) => {
  const isDark = theme === "dark";
  const menuItems = ["Home", "About", "Skills", "Education", "Projects", "Contact", "Resume"];

  const getHref = (item) => {
    if (item === "Resume") {
      return "/resume";
    }

    const sectionHref = `#${item.toLowerCase()}`;
    return currentPath === "/" ? sectionHref : `/${sectionHref}`;
  };

  const isItemActive = (item) => {
    if (item === "Resume") {
      return currentPath === "/resume";
    }

    return currentPath === "/" && activeSection === item.toLowerCase();
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full">
        <div
          className="absolute inset-0 backdrop-blur-xl transition-all duration-500"
          style={{
            borderBottom: isDark ? "1px solid rgba(127, 29, 29, 0.5)" : "1px solid rgba(254, 202, 202, 0.7)",
            backgroundColor: isDark ? "rgba(0, 0, 0, 0.94)" : "rgba(255, 255, 255, 0.88)",
          }}
        />

        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 transition duration-300"
            aria-label="Suraj Kumar home"
          >
            <img
              src="/site-logo.png"
              alt="Suraj logo"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              className="h-10 w-10 rounded-full object-cover"
            />
            <span className="bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-2xl font-black text-transparent hidden sm:inline">Suraj Kumar</span>
          </motion.a>

          <div className="hidden gap-2 md:flex">
            {menuItems.map((item) => (
              <motion.a
                key={item}
                href={getHref(item)}
                whileHover={{ scale: 1.05 }}
                className={`rounded-full px-4 py-2 font-medium transition ${
                  isItemActive(item)
                    ? isDark
                      ? "border border-red-500/50 bg-red-900/60 text-red-100 shadow-lg shadow-red-900/30"
                      : "border border-red-500/40 bg-red-900/10 text-red-600 shadow-lg shadow-red-900/10"
                    : isDark
                      ? "text-gray-300 hover:bg-red-900/20 hover:text-red-100"
                      : "text-slate-600 hover:bg-red-50 hover:text-red-500"
                }`}
              >
                {item}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle theme={theme} onToggle={onThemeToggle} />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative flex h-10 w-10 items-center justify-center text-red-600 transition hover:text-red-500 md:hidden"
            >
              <motion.div animate={{ rotate: mobileMenuOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
                {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} activeSection={activeSection} currentPath={currentPath} theme={theme} />
    </>
  );
};

// ============ HERO SECTION ============
const HeroSection = ({ theme }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const isDark = theme === "dark";

  return (
    <section id="home" className="min-h-screen px-4 pb-20 pt-32 transition-all duration-500 sm:px-6 flex items-center justify-center">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid gap-8 items-center md:grid-cols-2 md:gap-12">
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-block">
              <div className="rounded-full border border-red-900/30 bg-gradient-to-r from-red-900/20 to-red-900/10 px-4 py-2 backdrop-blur-sm dark:border-red-800/40 dark:from-red-950/60 dark:to-black/70 cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-glow-lg dark:hover:shadow-[0_0_48px_rgba(127,29,29,0.5)] group">
                <span className="text-sm font-medium tracking-wider text-red-400 transition-colors duration-300 group-hover:text-red-200">✨ Welcome to my portfolio</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h1 className="text-5xl font-black leading-tight text-slate-950 transition-all duration-500 sm:text-6xl lg:text-7xl dark:text-white">
                Hi, I&apos;m <span className="bg-gradient-to-r from-red-600 via-red-500 to-red-400 bg-clip-text text-transparent drop-shadow-lg">Suraj Kumar</span>
              </h1>
            </motion.div>

            <motion.div variants={itemVariants} className="h-12 text-xl font-semibold text-slate-700 transition-all duration-500 sm:text-2xl dark:text-gray-300">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                Data Science and Agentic AI Developer
              </motion.div>
            </motion.div>

            <motion.p variants={itemVariants} className="max-w-xl text-lg leading-relaxed text-slate-600 transition-all duration-500 dark:text-gray-400">
              Crafting high-performance web experiences with modern technologies, elegant animations, and AI-powered workflows. I build products that feel sharp, fast, and production-ready.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-4 sm:flex-row">
              <motion.a href="#projects" whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(220, 38, 38, 0.5)" }} whileTap={{ scale: 0.95 }} className="group rounded-full bg-gradient-to-r from-red-600 to-red-500 px-8 py-4 text-center font-bold text-white transition duration-300 hover:shadow-2xl hover:shadow-red-600/50 dark:from-red-700 dark:to-red-600">
                View Projects <FaArrowRight className="inline ml-2 transition group-hover:translate-x-1" />
              </motion.a>
              <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="rounded-full border-2 border-red-600 px-8 py-4 text-center font-bold text-red-600 transition-all duration-500 hover:bg-red-50 dark:border-red-700 dark:text-red-200 dark:hover:bg-red-900/30">
                Hire Me
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 pt-4">
              {[
                { icon: FaGithub, href: "https://github.com/surajkumar071", label: "GitHub" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/surajkumar071", label: "LinkedIn" },
                { icon: FaXTwitter, href: "https://x.com/_surajnirala_", label: "Twitter / X" },
                { icon: FaInstagram, href: "https://www.instagram.com/_surajnirala_", label: "Instagram" },
                { icon: FaEnvelope, href: "mailto:surajnirala9006@gmail.com", label: "Email" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.2, y: -5 }}
                  className="rounded-full border border-red-200/70 bg-white/70 p-3 text-red-500 transition-all duration-500 hover:bg-red-50 dark:border-red-700/50 dark:bg-zinc-900/90 dark:text-red-200 dark:hover:bg-zinc-800"
                  title={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }} className="flex items-center justify-center">
            <div className="group relative">
              <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className={`absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-red-400 blur-3xl transition duration-300 group-hover:opacity-50 ${isDark ? "opacity-30" : "opacity-20"}`} />

              <motion.div whileHover={{ scale: 1.05 }} className="relative h-64 w-64 overflow-hidden rounded-full border-2 border-red-200/70 shadow-2xl shadow-red-200/30 transition-all duration-500 sm:h-80 sm:w-80 dark:border-red-700/50 dark:shadow-red-900/35 group">
                <img src="/profile.jpg" alt="Suraj Kumar" className="h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-105" />

                {/* Vignette overlay for premium depth */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/20 opacity-80 transition-opacity duration-500" />

                {/* Animated shine */}
                <div className="absolute left-[-40%] top-0 h-full w-1/3 transform rotate-12 bg-white/10 blur-3xl opacity-0 group-hover:opacity-70 group-hover:left-[120%] transition-all duration-900 pointer-events-none" />
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute -bottom-4 -right-4 rounded-full border border-red-400/50 bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/50">
                ✓ Available
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// ============ ABOUT SECTION ============
const AboutSection = ({ theme }) => {
  const stats = [
    { label: "Projects Completed", value: "25+" },
    { label: "Happy Clients", value: "15+" },
    { label: "Years Experience", value: "3+" },
    { label: "Technologies", value: "15+" },
  ];

  return (
    <section id="about" className="bg-slate-50 px-4 py-20 transition-all duration-500 sm:px-6 dark:bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-black text-slate-950 transition-all duration-500 md:text-5xl dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Me</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 transition-all duration-500 dark:text-gray-400">
            Passionate about creating innovative solutions through technology
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg leading-relaxed text-slate-700 transition-all duration-500 dark:text-gray-300">
              I'm a full-stack developer with a passion for building beautiful and functional web applications. With expertise in modern technologies and AI integration, I create solutions that not only meet technical requirements but also provide exceptional user experiences.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 transition-all duration-500 dark:text-gray-400">
              My journey in tech started with a curiosity to solve real-world problems. Today, I specialize in scalable architectures, responsive design, and cutting-edge AI solutions.
            </p>
            <div className="pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="inline-block rounded-full border border-red-500/40 bg-red-50 px-6 py-3 font-semibold text-red-600 transition-all duration-500 hover:bg-red-100 dark:border-red-600/50 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
              >
                Get In Touch →
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="rounded-2xl border border-red-200/70 bg-white/75 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/50 hover:shadow-xl hover:shadow-red-500/10 dark:border-red-800/40 dark:bg-zinc-950/80 dark:bg-none dark:shadow-black/30"
              >
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-2">
                  {stat.value}
                </div>
                <p className="font-medium text-slate-600 transition-all duration-500 dark:text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ============ SKILLS SECTION ============
const SkillsSection = ({ theme }) => {
  const skillCategories = [
    {
      category: "Frontend",
      skills: [
        { name: "React", icon: FaReact, color: "from-blue-600 to-blue-400" },
        { name: "HTML", icon: FaHtml5, color: "from-orange-600 to-orange-400" },
        { name: "CSS", icon: SiTailwindcss, color: "from-cyan-600 to-cyan-400" },
        { name: "Next.js", icon: SiNextdotjs, color: "from-gray-600 to-gray-400" },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", icon: FaNode, color: "from-green-600 to-green-400" },
        { name: "Python", icon: FaPython, color: "from-yellow-600 to-yellow-400" },
        { name: "Java", icon: FaJava, color: "from-orange-600 to-orange-400" },
        { name: "Docker", icon: FaDocker, color: "from-blue-600 to-blue-400" },
      ],
    },
    {
      category: "Databases & Tools",
      skills: [
        { name: "MySQL", icon: SiMysql, color: "from-blue-600 to-blue-400" },
        { name: "MongoDB", icon: SiMongodb, color: "from-green-600 to-green-400" },
        { name: "AWS", icon: FaDatabase, color: "from-orange-600 to-orange-400" },
      ],
    },
    {
      category: "Development Tools",
      skills: [
        { name: "Github", icon: FaGithub, color: "from-gray-700 to-gray-900" },
        { name: "Git", icon: FaGitAlt, color: "from-orange-600 to-orange-400" },
        { name: "VS Code", icon: FaLaptopCode, color: "from-blue-600 to-blue-400" },
        { name: "Jupyter Notebook", icon: SiJupyter, color: "from-orange-600 to-orange-400" },
        { name: "Canva", icon: SiCanva, color: "from-purple-600 to-purple-400" },
      ],
    },
    {
      category: "MS Office",
      skills: [
        { name: "Word", icon: FaFileWord, color: "from-blue-600 to-blue-400" },
        { name: "Excel", icon: FaFileExcel, color: "from-green-600 to-green-400" },
        { name: "PowerPoint", icon: FaFilePowerpoint, color: "from-red-600 to-red-400" },
      ],
    },
  ];

  return (
    <section id="skills" className="bg-white px-4 py-20 transition-all duration-500 dark:bg-[#050505] sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-black text-slate-950 transition-all duration-500 md:text-5xl dark:text-white">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Skills</span>
          </h2>
          <p className="text-lg text-slate-600 transition-all duration-500 dark:text-gray-400">Expertise in modern technologies and tools</p>
        </motion.div>

        {/* Skills Grid */}
        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="mb-6 text-2xl font-bold text-slate-900 transition-all duration-500 dark:text-white">{category.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    whileHover={{ scale: 1.08, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    {/* Animated border gradient */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 opacity-0 transition duration-300 group-hover:opacity-100" />

                    {/* Card */}
                    <div className="relative rounded-2xl border border-red-200/70 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 dark:border-red-800/40 dark:bg-zinc-950/80 dark:bg-none dark:hover:shadow-black/30">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className={`text-4xl mb-3 text-transparent bg-clip-text bg-gradient-to-r ${skill.color}`}
                      >
                        <skill.icon />
                      </motion.div>
                      <p className="font-bold text-slate-900 transition group-hover:text-red-500 dark:text-white dark:group-hover:text-red-300">{skill.name}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============ PROJECTS SECTION ============
const ProjectsSection = ({ theme }) => {
  const projects = [
    {
      title: "SmartCreationPoint",
      description: "A live project built for modern web publishing and content workflows.",
      tags: ["PHP", "MySQL", "JS", "HTML", "CSS"],
      image: "/scp-logo.jpg",
      github: "https://github.com/surajkumar071/smartcreationpoint.git",
      live: "https://smartcreationpoint.com",
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio with smooth animations and glassmorphic design.",
      tags: ["React", "Framer Motion", "Tailwind", "Vite"],
      image: "🎨",
      github: "#",
      live: "#",
    },
  ];

  return (
    <section id="projects" className="bg-slate-50 px-4 py-20 transition-all duration-500 sm:px-6 dark:bg-[#050505]">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-black text-slate-950 transition-all duration-500 md:text-5xl dark:text-white">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Projects</span>
          </h2>
          <p className="text-lg text-slate-600 transition-all duration-500 dark:text-gray-400">Showcasing my best work and expertise</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Animated border */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/20 to-red-600/0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Card */}
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-red-200/70 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:border-red-500/50 hover:shadow-glow-lg dark:border-red-800/40 dark:bg-zinc-950/80 dark:bg-none dark:hover:shadow-[0_0_38px_rgba(127,29,29,0.22)]">
                {/* Image/Icon area */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="relative mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-red-100 to-white text-7xl transition-all duration-500 dark:from-zinc-900 dark:to-black group"
                >
                  {typeof project.image === "string" && (project.image.startsWith("/") || project.image.startsWith("http") || project.image.endsWith(".png") || project.image.endsWith(".jpg") || project.image.endsWith(".jpeg") || project.image.endsWith(".svg") || project.image.endsWith(".webp")) ? (
                      <img src={project.image} alt={`${project.title} logo`} className="relative z-10 h-full w-full object-contain transition-transform duration-700 will-change-transform group-hover:scale-105 group-hover:rotate-1" />
                    ) : (
                      <span className="relative z-10">{project.image}</span>
                    )}

                  {/* soft vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-60 transition duration-500 pointer-events-none" />

                  {/* moving shine effect */}
                  <div className="absolute left-[-50%] top-0 h-full w-1/3 transform rotate-12 bg-white/10 blur-2xl opacity-0 group-hover:opacity-60 group-hover:left-[120%] transition-all duration-900 pointer-events-none" />
                </motion.div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-bold text-slate-900 transition-all duration-500 group-hover:text-red-500 dark:text-white dark:group-hover:text-red-300">
                  {project.title}
                </h3>
                <p className="mb-4 flex-grow text-sm text-slate-600 transition-all duration-500 dark:text-gray-400">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full border border-red-200/70 bg-red-50 px-3 py-1 text-xs text-red-700 transition-all duration-500 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <motion.a
                    href={project.github}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-50 px-4 py-2 text-center font-semibold text-red-700 transition-all duration-500 hover:bg-red-100 hover:shadow-glow-lg dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 dark:hover:shadow-[0_0_36px_rgba(127,29,29,0.45)]"
                  >
                    <FaGithub size={16} /> Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 text-center font-semibold text-white transition-all duration-500 hover:shadow-glow-lg dark:hover:shadow-[0_0_36px_rgba(127,29,29,0.5)]"
                  >
                    <FaExternalLinkAlt size={16} /> Live Preview
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            className="inline-block rounded-full border border-red-600/40 bg-red-50 px-8 py-4 font-bold text-red-700 transition-all duration-500 hover:shadow-lg hover:shadow-red-500/10 dark:border-red-700/60 dark:bg-transparent dark:text-white dark:hover:bg-red-700/40 dark:hover:text-white dark:hover:shadow-[0_0_36px_rgba(127,29,29,0.6)]"
          >
            View All Projects →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

// ============ CONTACT SECTION ============
const ContactSection = ({ theme }) => {
  return (
    <section id="contact" className="bg-white px-4 py-20 transition-all duration-500 dark:bg-[#050505] sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-4xl font-black text-slate-950 transition-all duration-500 md:text-5xl dark:text-white">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Connect</span>
          </h2>
          <p className="text-lg text-slate-600 transition-all duration-500 dark:text-gray-400">Have a project in mind? Let's talk!</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-red-300/50 bg-gradient-to-br from-black via-[#120505] to-[#2a0505] p-6 shadow-[0_28px_90px_rgba(220,38,38,0.18)] backdrop-blur-xl transition-all duration-500 dark:border-red-700/50 dark:from-black dark:via-[#120505] dark:to-[#2a0505] dark:shadow-[0_28px_110px_rgba(220,38,38,0.25)] sm:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(127,29,29,0.32),transparent_28%),linear-gradient(to_bottom_right,rgba(255,255,255,0.02),rgba(0,0,0,0.18))]" />

          <div className="mb-6 max-w-2xl">
            <h3 className="mb-2 text-3xl font-black tracking-tight text-slate-950 transition-all duration-500 dark:text-white">
              Get in Touch
            </h3>
            <p className="max-w-xl text-slate-700 transition-all duration-500 dark:text-gray-300">
              I'm always open to new opportunities and interesting projects. Feel free to reach out through any of these channels.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "WhatsApp", value: "+91 9006192179", href: "https://wa.me/919006192179", icon: FaWhatsapp, action: "Chat on WhatsApp" },
              { label: "Email", value: "surajnirala9006@gmail.com", href: "mailto:surajnirala9006@gmail.com", icon: FaEnvelope, action: "Send Email" },
              { label: "GitHub", value: "github.com/surajkumar071", href: "https://github.com/surajkumar071", icon: FaGithub, action: "View Profile" },
              { label: "LinkedIn", value: "linkedin.com/in/surajkumar071", href: "https://www.linkedin.com/in/surajkumar071", icon: FaLinkedin, action: "Open Profile" },
              { label: "Twitter / X", value: "x.com/_surajnirala_", href: "https://x.com/_surajnirala_", icon: FaXTwitter, action: "Open X" },
              { label: "Instagram", value: "instagram.com/_surajnirala_", href: "https://www.instagram.com/_surajnirala_", icon: FaInstagram, action: "Open Instagram" },
            ].map((contact) => (
              <motion.a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative overflow-hidden rounded-2xl border border-red-300/30 bg-gradient-to-r from-white/10 via-white/6 to-white/12 px-4 py-4 shadow-[0_12px_35px_rgba(0,0,0,0.2)] transition-all duration-500 hover:border-red-400/60 hover:bg-gradient-to-r hover:from-red-950/45 hover:via-[#1b0909]/70 hover:to-black/80 hover:shadow-[0_24px_55px_rgba(220,38,38,0.2)] dark:border-red-700/30 dark:bg-gradient-to-r dark:from-white/8 dark:via-white/5 dark:to-white/10 dark:hover:shadow-[0_24px_60px_rgba(220,38,38,0.28)]"
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/0 opacity-0 transition duration-500 group-hover:from-red-500/20 group-hover:via-transparent group-hover:to-orange-500/20 group-hover:opacity-100" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/20 blur-2xl opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-red-600 to-red-900 text-white shadow-lg shadow-red-600/30 ring-1 ring-white/15 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <contact.icon size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950 transition-all duration-500 dark:text-white">{contact.label}</p>
                  </div>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1 text-right">
                  <p className="text-sm text-slate-600 transition-all duration-500 dark:text-red-100/85">{contact.value}</p>
                  <span className="relative z-10 shrink-0 whitespace-nowrap text-right text-[11px] font-semibold uppercase tracking-[0.16em] text-red-700 transition-colors duration-500 group-hover:text-white dark:text-red-200">
                    {contact.action}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// ============ FOOTER ============
const Footer = ({ theme }) => {
  return (
    <footer className="border-t border-red-200/70 px-4 py-12 transition-all duration-500 dark:border-red-900/30 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 mb-2">
              Suraj Kumar
            </h3>
            <p className="text-slate-600 transition-all duration-500 dark:text-gray-400">Building amazing digital experiences</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 font-bold text-slate-950 transition-all duration-500 dark:text-white">Quick Links</h4>
            <div className="space-y-2">
              {["About", "Projects", "Skills", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-slate-600 transition-all duration-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-4 font-bold text-slate-950 transition-all duration-500 dark:text-white">Follow</h4>
            <div className="flex gap-4">
              {[
                { icon: FaGithub, href: "https://github.com/surajkumar071" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/surajkumar071" },
                { icon: FaXTwitter, href: "https://x.com/_surajnirala_" },
                { icon: FaInstagram, href: "https://www.instagram.com/_surajnirala_" },
                  { icon: FaEnvelope, href: "mailto:surajnirala9006@gmail.com?subject=Portfolio%20Inquiry" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={social.href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={social.href.includes("github") ? "GitHub" : social.href.includes("linkedin") ? "LinkedIn" : social.href.includes("x.com") ? "Twitter / X" : social.href.includes("instagram") ? "Instagram" : "Email"}
                  title={social.href.includes("github") ? "GitHub" : social.href.includes("linkedin") ? "LinkedIn" : social.href.includes("x.com") ? "Twitter / X" : social.href.includes("instagram") ? "Instagram" : "Email"}
                  whileHover={{ scale: 1.2 }}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-50 p-2 text-red-600 transition-all duration-500 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-red-200/70 pt-8 flex flex-col items-center justify-between gap-4 sm:flex-row dark:border-red-900/30">
          <p className="text-sm text-slate-600 transition-all duration-500 dark:text-gray-400">
            © 2026 Suraj Kumar. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="mailto:surajnirala9006@gmail.com" className="text-sm text-slate-600 transition-all duration-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
              Privacy
            </a>
            <a href="tel:+919006192179" className="text-sm text-slate-600 transition-all duration-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============ MAIN APP ============
export default function App() {
  const location = useLocation();
  const isResumePage = location.pathname === "/resume";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    try {
      return window.localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    if (isResumePage) {
      return undefined;
    }

    const handleScroll = () => {
      const sections = ["home", "about", "skills", "education", "projects", "contact"];
      for (let section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isResumePage]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection, location.pathname]);

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      window.localStorage.setItem("theme", theme);
    } catch {
      // Ignore storage failures and keep rendering.
    }
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#000000" : "#fafafa");
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-all duration-500 scroll-smooth ${
        theme === "dark" ? "bg-[#020202] text-white" : "bg-[#fafafa] text-slate-900"
      }`}
    >
      <AnimatedBackground theme={theme} />
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        activeSection={activeSection}
        currentPath={location.pathname}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <HeroSlider theme={theme} />
              <AboutSection theme={theme} />
              <SkillsSection theme={theme} />
              <EducationTimeline theme={theme} />
              <ProjectsSection theme={theme} />
              <ContactSection theme={theme} />
            </main>
          }
        />
        <Route
          path="/resume"
          element={
            <Suspense fallback={null}>
              <main>
                <ResumePage theme={theme} />
              </main>
            </Suspense>
          }
        />
        <Route
          path="/education"
          element={
            <main>
              <EducationTimeline theme={theme} />
            </main>
          }
        />
        <Route
          path="*"
          element={
            <main>
              <HeroSlider theme={theme} />
              <AboutSection theme={theme} />
              <SkillsSection theme={theme} />
              <EducationTimeline theme={theme} />
              <ProjectsSection theme={theme} />
              <ContactSection theme={theme} />
            </main>
          }
        />
      </Routes>
      <Suspense fallback={null}>
        <ChatBot />
      </Suspense>
      <Footer theme={theme} />
    </div>
  );
}
