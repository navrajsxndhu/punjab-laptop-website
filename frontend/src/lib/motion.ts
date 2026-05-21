/** Apple-style motion presets — GPU-friendly (opacity + transform only) */
export const APPLE_EASE = [0.25, 0.1, 0.25, 1] as const;
export const APPLE_SPRING = { type: 'spring' as const, stiffness: 260, damping: 28 };
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const defaultTransition = {
  duration: 0.65,
  ease: APPLE_EASE,
};
