import { TapticKit } from "taptickit";

let taptic = null;

function getTaptic() {
  if (typeof window === "undefined") return null;
  if (!taptic) taptic = new TapticKit();
  return taptic;
}

export function vibrateLight() {
  try {
    const t = getTaptic();
    if (t) t.trigger("light");
  } catch {
    // silently ignore
  }
}
