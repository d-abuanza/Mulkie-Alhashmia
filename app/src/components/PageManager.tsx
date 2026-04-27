"use client";

import { useState, useCallback, createContext, useContext, useEffect } from "react";
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
  navigateTo: () => { },
});

export const usePageNavigation = () => useContext(PageContext);

// Ordered pages for determining slide direction
const PAGE_ORDER: PageId[] = ["hero", "about", "services", "methodology", "consultation", "form"];

// Pages that should hide the navigation bar
const STANDALONE_PAGES: PageId[] = ["form"];

function getPageIndex(page: PageId): number {
  return PAGE_ORDER.indexOf(page);
}

// The component for each page
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
        <div className="flex items-center justify-center py-20 lg:py-32">
          <CTA />
        </div>
      );
    case "form":
      return <ConsultationForm />;
    default:
      return <Hero />;
  }
}

export default function PageManager({ children }: { children?: React.ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>("hero");

  // Update active page based on scroll position
  useEffect(() => {
    const sections = PAGE_ORDER.filter(id => id !== "form");
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the upper part of viewport
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActivePage(entry.target.id as PageId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navigateTo = useCallback(
    (page: PageId) => {
      if (page === "form") {
        setActivePage("form");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      setActivePage(page);
      const element = document.getElementById(page);
      if (element) {
        const offset = 80; // Account for fixed header
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    },
    []
  );

  const isStandalone = activePage === "form";

  if (isStandalone) {
    return (
      <PageContext.Provider value={{ activePage, navigateTo }}>
        <ConsultationForm />
      </PageContext.Provider>
    );
  }

  return (
    <PageContext.Provider value={{ activePage, navigateTo }}>
      {children}
      <main className="relative w-full overflow-x-hidden">
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="services">
          <Services />
        </section>
        <section id="methodology">
          <Process />
        </section>
        <section id="consultation" className="bg-[#0c1a2e]">
          <CTA />
        </section>
        <Footer />
      </main>
    </PageContext.Provider>
  );
}
