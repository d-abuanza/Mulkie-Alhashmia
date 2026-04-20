import type { Variants } from "framer-motion";

// Fade up animation for text and generic elements
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

// Fade up with slight scale for images
export const fadeUpScale: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.96,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

// Simple fade in
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  }),
};

// Stagger container
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

// Card hover animation
export const cardHover = {
  rest: {
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  hover: {
    y: -6,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

// Slide from left
export const slideFromLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

// Slide from right
export const slideFromRight: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};

// Scale in for badges/tags
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
      delay,
    },
  }),
};
