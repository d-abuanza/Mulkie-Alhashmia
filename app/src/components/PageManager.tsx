"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Process from "./Process";
import CTA from "./CTA";
import Footer from "./Footer";
import ConsultationForm from "./ConsultationForm";

// Page identifiers
export type PageId = "hero" | "about" | "services" | "methodology" | "consultation" | "form";

// Context so Navigation can control the active page
interface PageContextType {
  activePage: PageId;
  navigateTo: (page: PageId) => void;
}

export const PageContext = createContext<PageContextType>({
  activePage: "hero",
  navigateTo: () => {},
});

export const usePageNavigation = () => useContext(PageContext);

// Ordered pages for determining slide direction
const PAGE_ORDER: PageId[] = ["hero", "about", "services", "methodology", "consultation", "form"];

// Pages that should hide the navigation bar
const STANDALONE_PAGES: PageId[] = ["form"];

function getPageIndex(page: PageId): number {
  return PAGE_ORDER.indexOf(page);
}

// The component for each page (each takes full viewport)
function PageContent({ pageId }: { pageId: PageId }) {
  switch (pageId) {
    case "hero":
      return <Hero />;
    case "about":
      return <About />;
    case "services":
      return <Services />;
    case "methodology":
      return <Process />;
    case "consultation":
      return (
        <>
          <CTA />
          <Footer />
        </>
      );
    case "form":
      return <ConsultationForm />;
    default:
      return <Hero />;
  }
}

// Slide transition variants
const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function PageManager({ children }: { children?: React.ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>("hero");
  const [direction, setDirection] = useState(0);

  const navigateTo = useCallback(
    (page: PageId) => {
      if (page === activePage) return;
      const currentIndex = getPageIndex(activePage);
      const nextIndex = getPageIndex(page);
      setDirection(nextIndex > currentIndex ? 1 : -1);
      setActivePage(page);
    },
    [activePage]
  );

  const isStandalone = STANDALONE_PAGES.includes(activePage);

  return (
    <PageContext.Provider value={{ activePage, navigateTo }}>
      {/* Hide navigation on standalone pages (e.g. form) */}
      {!isStandalone && children}
      <div className="relative w-full min-h-screen overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activePage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "tween", duration: 0.5, ease: [0.32, 0.72, 0, 1] },
              opacity: { duration: 0.3 },
            }}
            className="w-full min-h-screen"
          >
            <PageContent pageId={activePage} />
          </motion.div>
        </AnimatePresence>
      </div>
    </PageContext.Provider>
  );
}
