import localFont from "next/font/local";

/*
 * Geist Sans with its real italic. The package's `GeistSans` export only
 * loads the upright font, which leaves the browser to fake italics by
 * slanting it. Both variable files come straight from the installed package.
 */
export const geistSans = localFont({
  src: [
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Variable.woff2", style: "normal" },
    { path: "../../node_modules/geist/dist/fonts/geist-sans/Geist-Italic[wght].woff2", style: "italic" },
  ],
  weight: "100 900",
  variable: "--font-geist-sans",
  display: "swap",
});
