import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register once. Importing this module from a client component is the only way GSAP enters the bundle.
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
