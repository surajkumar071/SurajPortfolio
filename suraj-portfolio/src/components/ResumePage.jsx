import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { FaEye, FaDownload, FaTimes, FaCalendar, FaExpand, FaCompress, FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString();

// Available resumes list
const RESUMES_LIST = [
  {
    id: 1,
    name: "Latest Resume",
    fileName: "Resume.pdf",
    date: "May 2026",
    description: "Current professional resume",
  },
  {
    id: 2,
    name: "Resume v2",
    fileName: "Resume-v2.pdf",
    date: "March 2026",
    description: "Previous version",
  },
  {
    id: 3,
    name: "Resume v1",
    fileName: "Resume-v1.pdf",
    date: "January 2026",
    description: "Original resume",
  },
];

const particles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${8 + ((index * 7) % 84)}%`,
  top: `${6 + ((index * 11) % 86)}%`,
  delay: (index % 6) * 0.35,
  duration: 4 + (index % 4),
}));

export default function ResumePage({ theme }) {
  const isDark = theme === "dark";
  const viewerRef = useRef(null);
  const fullscreenModalRef = useRef(null);
  const fullscreenViewerRef = useRef(null);
  const [selectedResume, setSelectedResume] = useState(RESUMES_LIST[0]);
  const [pdfLoading, setPdfLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(900);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const [fullscreenLoading, setFullscreenLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);

  const clampZoom = (value) => Math.min(1.65, Math.max(0.75, Number(value.toFixed(2))));

  const handleZoomIn = () => setZoomLevel((cur) => clampZoom(cur + 0.1));
  const handleZoomOut = () => setZoomLevel((cur) => clampZoom(cur - 0.1));
  const handleResetZoom = () => setZoomLevel(1);

  const toggleBrowserFullscreen = async () => {
    const target = fullscreenModalRef.current;
    if (!target) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else if (target.requestFullscreen) {
        await target.requestFullscreen();
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    const updateWidth = () => {
      if (!viewerRef.current) {
        return;
      }

      const nextWidth = Math.max(280, Math.floor(viewerRef.current.clientWidth - 24));
      setPageWidth(nextWidth);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(updateWidth);
    if (viewerRef.current) {
      resizeObserver.observe(viewerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => setIsBrowserFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-10">
      {/* Animated gradients */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, 80, -60, 0], y: [0, -60, 60, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-gradient-to-br from-red-900/35 via-red-600/10 to-transparent blur-3xl"
        />
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, -70, 50, 0], y: [0, 55, -45, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-gradient-to-tr from-red-800/25 via-red-500/10 to-transparent blur-3xl"
        />

        {/* Subtle particles */}
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            aria-hidden="true"
            className="absolute h-1.5 w-1.5 rounded-full bg-red-400/30"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -14, 0], opacity: [0.2, 0.85, 0.2], scale: [1, 1.35, 1] }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="mx-auto w-full max-w-7xl">
        {/* Page heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h1 className="bg-gradient-to-r from-red-100 via-red-300 to-red-500 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-6xl fancy-heading">
            My Resume
          </h1>
          <p
            className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg ${
              isDark ? "text-red-100/80" : "text-slate-700"
            }`}
          >
            View and download my professional resume
          </p>
        </motion.div>

        {/* Resume Selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6 }}
          className="mb-8"
        >
          <p className={`mb-4 text-sm font-semibold ${isDark ? "text-red-200" : "text-red-600"}`}>
            Select Version:
          </p>
          <div className="flex flex-wrap gap-3">
            {RESUMES_LIST.map((resume) => (
              <motion.button
                key={resume.id}
                onClick={() => {
                  setSelectedResume(resume);
                  setPdfLoading(true);
                  setFullscreenLoading(true);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className={`group rounded-2xl border px-4 py-3 transition-all duration-300 ${
                  selectedResume.id === resume.id
                    ? isDark
                      ? "border-red-500 bg-red-900/40 text-red-100 shadow-lg shadow-red-900/30"
                      : "border-red-500 bg-red-50 text-red-700 shadow-lg shadow-red-200/30"
                    : isDark
                      ? "border-red-500/20 bg-black/30 text-red-200/80 hover:border-red-500/50 hover:bg-red-900/20"
                      : "border-red-200/50 bg-white/40 text-red-600/80 hover:border-red-400 hover:bg-red-50/60"
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-bold">{resume.name}</span>
                  <span className="flex items-center gap-1 text-xs opacity-75">
                    <FaCalendar size={10} />
                    {resume.date}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.button
            onClick={() => setFullscreenOpen(true)}
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className={`group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border px-6 py-3 font-semibold backdrop-blur-xl transition-all duration-300 ${
              isDark
                ? "border-red-500/35 bg-black/50 text-red-100 hover:border-red-400/70"
                : "border-red-300/60 bg-white/70 text-red-700 hover:border-red-500"
            }`}
          >
            <FaEye className="transition-transform duration-300 group-hover:scale-110" />
            View Resume
          </motion.button>

          <motion.a
            href={`/${selectedResume.fileName}`}
            download
            whileHover={{ scale: 1.03, boxShadow: "0 0 28px rgba(239, 68, 68, 0.45)" }}
            whileTap={{ scale: 0.98 }}
            className="group inline-flex min-w-[180px] items-center justify-center gap-2 rounded-2xl border border-red-500/40 bg-gradient-to-r from-red-700/80 to-red-500/70 px-6 py-3 font-semibold text-white backdrop-blur-xl transition-all duration-300 hover:from-red-600 hover:to-red-500"
          >
            <FaDownload className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            Download Resume
          </motion.a>
        </motion.div>

        {/* Resume viewer */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="group relative"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-3xl bg-gradient-to-r from-red-700/25 via-red-500/20 to-red-900/25 blur-xl transition-all duration-500 group-hover:from-red-600/35 group-hover:via-red-400/25 group-hover:to-red-800/35" />

          <div
            ref={viewerRef}
            className={`relative h-[66vh] overflow-y-auto rounded-3xl border p-2 backdrop-blur-2xl sm:h-[72vh] sm:p-3 ${
              isDark
                ? "border-red-500/30 bg-black/45 shadow-[0_20px_60px_rgba(127,29,29,0.35)]"
                : "border-red-200/70 bg-white/70 shadow-[0_20px_60px_rgba(127,29,29,0.14)]"
            }`}
          >
            <div className="card">
            {/* PDF loading animation */}
            {pdfLoading && !pdfError && (
              <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-black/60 px-4 py-3 text-sm text-red-100">
                  <span className="inline-block h-3 w-3 animate-ping rounded-full bg-red-400" />
                  Loading resume preview...
                </div>
              </div>
            )}

            {/* Inline toolbar */}
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                aria-label="Zoom out"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm hover:scale-105 ${isDark ? 'border-red-700 bg-red-900 text-red-100' : 'border-red-500/15 bg-white text-red-700'}`}
              >
                <FaSearchMinus />
              </button>
              <div className={`flex items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold ${isDark ? 'border-red-700 bg-red-800 text-red-100' : 'border-red-100 bg-white text-slate-700'}`}>
                {Math.round(zoomLevel * 100)}%
              </div>
              <button
                onClick={handleZoomIn}
                aria-label="Zoom in"
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm hover:scale-105 ${isDark ? 'border-red-700 bg-red-900 text-red-100' : 'border-red-500/15 bg-white text-red-700'}`}
              >
                <FaSearchPlus />
              </button>
            </div>

            {/* Render PDF pages inside app instead of browser plugin */}
            <motion.div whileHover={{ scale: 1.004 }} transition={{ duration: 0.35 }} className="w-full">
              <Document
                file={`/${selectedResume.fileName}`}
                loading={null}
                onLoadSuccess={({ numPages: totalPages }) => {
                  setNumPages(totalPages);
                  setPdfLoading(false);
                  setPdfError(false);
                }}
                onLoadError={() => {
                  setPdfLoading(false);
                  setPdfError(true);
                }}
                className="flex flex-col items-center gap-4"
              >
                {Array.from({ length: numPages }, (_, index) => (
                  <Page
                    key={`resume-page-${index + 1}`}
                    pageNumber={index + 1}
                    width={Math.round(pageWidth * zoomLevel)}
                    renderAnnotationLayer
                    renderTextLayer
                    className="overflow-hidden rounded-2xl border border-red-500/20 bg-white shadow-xl"
                  />
                ))}
              </Document>
            </motion.div>

            {pdfError && (
              <div className="flex h-full min-h-[340px] w-full items-center justify-center rounded-2xl border border-red-500/20 bg-black/30 text-center">
                <p className="px-6 text-sm text-red-100/90">
                  Resume preview failed to load. Use View Resume to open the PDF in a new tab.
                </p>
              </div>
            )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {fullscreenOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFullscreenOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex h-[95vh] w-[95vw] max-w-6xl flex-col rounded-2xl border border-red-500/30 bg-black/60 backdrop-blur-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setFullscreenOpen(false)}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-red-900/40 text-red-200 transition-all hover:border-red-500/60 hover:bg-red-900/70"
              >
                <FaTimes size={20} />
              </button>

              {/* Fullscreen toolbar */}
              <div className="absolute right-16 top-4 z-10 flex items-center gap-2">
                <button
                  onClick={toggleBrowserFullscreen}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm shadow-sm hover:opacity-90 ${isDark ? 'border-red-700 bg-red-900 text-red-100' : 'border-red-200 bg-white text-slate-700'}`}
                >
                  {isBrowserFullscreen ? <FaCompress /> : <FaExpand />}
                  <span className="hidden sm:inline">{isBrowserFullscreen ? "Exit" : "Browser"}</span>
                </button>
                <button
                  onClick={handleZoomOut}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm hover:scale-105 ${isDark ? 'border-red-700 bg-red-900 text-red-100' : 'border-red-500/15 bg-white text-red-700'}`}
                >
                  <FaSearchMinus />
                </button>
                <div className={`flex items-center justify-center rounded-full border px-3 py-1 text-sm font-semibold ${isDark ? 'border-red-700 bg-red-800 text-red-100' : 'border-red-100 bg-white text-slate-700'}`}>
                  {Math.round(zoomLevel * 100)}%
                </div>
                <button
                  onClick={handleZoomIn}
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-full border shadow-sm hover:scale-105 ${isDark ? 'border-red-700 bg-red-900 text-red-100' : 'border-red-500/15 bg-white text-red-700'}`}
                >
                  <FaSearchPlus />
                </button>
                <button
                  onClick={handleResetZoom}
                  className={`inline-flex h-9 items-center justify-center rounded-full border px-3 text-sm font-semibold transition ${isDark ? 'border-red-700 bg-red-900 text-red-100 hover:border-red-700' : 'border-red-200 bg-white text-slate-700 hover:border-red-400'}`}
                >
                  Fit
                </button>
              </div>

              {/* Loading overlay */}
              {fullscreenLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-black/40 backdrop-blur-sm">
                  <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-black/60 px-4 py-3 text-sm text-red-100">
                    <span className="inline-block h-3 w-3 animate-ping rounded-full bg-red-400" />
                    Loading resume...
                  </div>
                </div>
              )}

              {/* PDF Viewer */}
              <div className="flex-1 overflow-y-auto p-4">
                <Document
                  file={`/${selectedResume.fileName}`}
                  loading={null}
                  onLoadSuccess={({ numPages: totalPages }) => {
                    setFullscreenLoading(false);
                  }}
                  onLoadError={() => {
                    setFullscreenLoading(false);
                  }}
                  className="flex flex-col items-center gap-4"
                >
                  {Array.from({ length: numPages }, (_, index) => (
                    <Page
                      key={`fullscreen-page-${index + 1}`}
                      pageNumber={index + 1}
                      width={Math.round(Math.min(800, window.innerWidth - 80) * zoomLevel)}
                      renderAnnotationLayer
                      renderTextLayer
                      className="overflow-hidden rounded-lg border border-red-500/20 bg-white shadow-xl"
                    />
                  ))}
                </Document>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
