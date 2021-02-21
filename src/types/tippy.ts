/**
 * Just declaring the types for tippy
 * Thanks https://github.com/atomiks/tippyjs/issues/186#issuecomment-425159188
 */
import type Popper from "popper.js";
export interface TippyProps {
  a11y?: boolean;
  allowHTML?: boolean;
  animateFill?: boolean;
  animation?: "fade" | "scale" | "shift-toward" | "perspective" | "shift-away";
  appendTo?: Element | ((ref: Element) => Element);
  arrow?: boolean;
  arrowType?: "sharp" | "round";
  arrowTransform?: string;
  content?: Content;
  delay?: number | [number, number];
  duration?: number | [number, number];
  distance?: number;
  flip?: boolean;
  flipBehavior?: "flip" | Placement[];
  followCursor?: boolean | "vertical" | "horizontal";
  hideOnClick?: boolean | "toggle";
  inertia?: boolean;
  interactive?: boolean;
  interactiveBorder?: number;
  interactiveDebounce?: number;
  lazy?: boolean;
  livePlacement?: boolean;
  multiple?: boolean;
  offset?: number | string;
  // onHidden?(instance: Instance): void;
  // onHide?(instance: Instance): void;
  // onShow?(instance: Instance): void;
  // onShown?(instance: Instance): void;
  performance?: boolean;
  placement?: Placement;
  popperOptions?: Popper.PopperOptions;
  shouldPopperHideOnBlur?: (event: FocusEvent) => boolean;
  showOnInit?: boolean;
  size?: "small" | "regular" | "large";
  sticky?: boolean;
  target?: string;
  theme?: string;
  touch?: boolean;
  touchHold?: boolean;
  trigger?: "mouseenter" | "focus" | "click" | "manual";
  updateDuration?: number;
  // wait?(instance: Instance, event: Event): void;
  zIndex?: number;
}
export type Content = string | Element;

export type BasicPlacement = "top" | "bottom" | "left" | "right";

export type Placement =
  | BasicPlacement
  | "top-start"
  | "top-end"
  | "bottom-start"
  | "bottom-end"
  | "left-start"
  | "left-end"
  | "right-start"
  | "right-end";
