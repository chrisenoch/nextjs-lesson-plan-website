export type AutoPlayDirection = "LEFT" | "RIGHT";

export type AutoPlay = {
  direction: "LEFT" | "RIGHT";
  delay: number;
  enableAutoPlay: boolean;
  restartDelayAfterLastUserInteraction?: number;
};

type transitionEasingFunction =
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "linear";

export type Transitions = {
  durationMs: number;
  easingFunction: transitionEasingFunction;
};
