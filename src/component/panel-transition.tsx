import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePlayer } from "../context/player-hook";

export type PanelDirection = "left" | "right" | "bottom" | "up";

const enterOffsets = {
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  bottom: { x: 0, y: 24 },
  up: { x: 0, y: 28 },
};

const exitOffsets = {
  left: { x: -24, y: 0 },
  right: { x: 24, y: 0 },
  bottom: { x: 0, y: 24 },
  up: { x: 0, y: -28 },
};

type PanelTransitionProps = {
  direction: PanelDirection;
  className?: string;
  tabIndex?: number;
  children: ReactNode;
};

export function PanelTransition({ direction, className, tabIndex, children }: PanelTransitionProps) {
  const { selectedId } = usePlayer();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={selectedId}
        tabIndex={tabIndex}
        className={className}
        initial={{ opacity: 0, ...enterOffsets[direction] }}
        animate={{ opacity: 1, x: 0, y: 0, transition: { duration: 0.32, ease: "easeOut" } }}
        exit={{ opacity: 0, ...exitOffsets[direction], transition: { duration: 0.18, ease: "easeIn" } }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
