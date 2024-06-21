export const containerVariants = {
  hidden: { opacity: 0, scale: 1, y: -100 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      staggerChildren: 0.2,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const containerVariants2 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.2,
      ease: "easeInOut",
      delay: 0.2,
    },
  },
};

export const itemVariants2 = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
  },
};
