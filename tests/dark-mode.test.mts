import { describe, it } from "node:test";
import * as assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";

const SRC = path.resolve("src");

describe("US-002: Dark mode support with theme toggle", () => {
  // ------- ThemeProvider -------
  describe("ThemeProvider", () => {
    const providerPath = path.join(
      SRC,
      "app",
      "providers",
      "ThemeProvider.tsx"
    );

    it("ThemeProvider.tsx file exists", () => {
      assert.ok(fs.existsSync(providerPath), "ThemeProvider.tsx not found");
    });

    it("exports ThemeProvider component", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("export function ThemeProvider"),
        "ThemeProvider not exported"
      );
    });

    it("exports useTheme hook", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("export function useTheme"),
        "useTheme not exported"
      );
    });

    it("creates a React context for theme", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("createContext"),
        "Should use createContext for theme"
      );
    });

    it("defines Theme type as light | dark", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes('"light"') && src.includes('"dark"'),
        'Should define light and dark theme values'
      );
    });

    it("uses localStorage for persistence", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("localStorage.getItem") &&
          src.includes("localStorage.setItem"),
        "Should read/write localStorage"
      );
    });

    it("uses a consistent storage key", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("STORAGE_KEY"),
        "Should define a STORAGE_KEY constant"
      );
    });

    it("adds/removes dark class on document element", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("classList.add") && src.includes("classList.remove"),
        'Should add/remove "dark" class'
      );
      assert.ok(
        src.includes('("dark")'),
        'Should toggle "dark" class specifically'
      );
    });

    it("provides toggleTheme in context", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("toggleTheme"),
        "Context should include toggleTheme"
      );
    });

    it("handles SSR safety (typeof window check)", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes('typeof window === "undefined"') ||
          src.includes("typeof document === \"undefined\""),
        "Should guard against SSR access to window/document"
      );
    });

    it("respects prefers-color-scheme media query", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("prefers-color-scheme"),
        "Should check system preference"
      );
    });

    it("has 'use client' directive", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.trimStart().startsWith('"use client"'),
        "ThemeProvider must be a client component"
      );
    });

    it("useTheme throws when used outside ThemeProvider", () => {
      const src = fs.readFileSync(providerPath, "utf-8");
      assert.ok(
        src.includes("throw") && src.includes("ThemeProvider"),
        "useTheme should throw if context is null"
      );
    });
  });

  // ------- ThemeToggle -------
  describe("ThemeToggle", () => {
    const togglePath = path.join(SRC, "components", "ThemeToggle.tsx");

    it("ThemeToggle.tsx file exists", () => {
      assert.ok(fs.existsSync(togglePath), "ThemeToggle.tsx not found");
    });

    it("exports ThemeToggle component", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.includes("export function ThemeToggle"),
        "ThemeToggle not exported"
      );
    });

    it("has 'use client' directive", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.trimStart().startsWith('"use client"'),
        "ThemeToggle must be a client component"
      );
    });

    it("uses useTheme hook", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.includes("useTheme"),
        "ThemeToggle should use useTheme hook"
      );
    });

    it("renders a button element", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.includes("<button"),
        "Should render a button element"
      );
    });

    it("has accessible aria-label", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.includes("aria-label"),
        "Button should have aria-label for accessibility"
      );
    });

    it("contains sun and moon icons (SVG)", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      const svgCount = (src.match(/<svg/g) || []).length;
      assert.ok(
        svgCount >= 2,
        `Should have at least 2 SVG icons (sun + moon), found ${svgCount}`
      );
    });

    it("calls toggleTheme on click", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.includes("onClick={toggleTheme}") ||
          src.includes("onClick={() => toggleTheme()"),
        "Should call toggleTheme on click"
      );
    });

    it("has transition-colors for smooth theme change", () => {
      const src = fs.readFileSync(togglePath, "utf-8");
      assert.ok(
        src.includes("transition-colors"),
        "Should use transition-colors for smooth switching"
      );
    });
  });

  // ------- globals.css -------
  describe("globals.css dark mode", () => {
    const cssPath = path.join(SRC, "app", "globals.css");

    it("uses @custom-variant dark for Tailwind v4 class strategy", () => {
      const css = fs.readFileSync(cssPath, "utf-8");
      assert.ok(
        css.includes("@custom-variant dark"),
        "Should declare @custom-variant dark for class-based dark mode"
      );
    });

    it("defines dark mode CSS variables", () => {
      const css = fs.readFileSync(cssPath, "utf-8");
      assert.ok(
        css.includes(".dark"),
        "Should have .dark selector for dark mode variables"
      );
    });

    it("has smooth transition on body", () => {
      const css = fs.readFileSync(cssPath, "utf-8");
      assert.ok(
        css.includes("transition"),
        "Body should have transition for smooth theme change"
      );
    });
  });

  // ------- layout.tsx integration -------
  describe("layout.tsx integration", () => {
    const layoutPath = path.join(SRC, "app", "layout.tsx");

    it("imports ThemeProvider", () => {
      const src = fs.readFileSync(layoutPath, "utf-8");
      assert.ok(
        src.includes("ThemeProvider"),
        "layout.tsx should import ThemeProvider"
      );
    });

    it("wraps children with ThemeProvider", () => {
      const src = fs.readFileSync(layoutPath, "utf-8");
      assert.ok(
        src.includes("<ThemeProvider>") || src.includes("<ThemeProvider "),
        "Children should be wrapped in ThemeProvider"
      );
    });

    it("has suppressHydrationWarning on html element", () => {
      const src = fs.readFileSync(layoutPath, "utf-8");
      assert.ok(
        src.includes("suppressHydrationWarning"),
        "Should suppress hydration warning on <html> for theme class"
      );
    });

    it("has transition-colors on body", () => {
      const src = fs.readFileSync(layoutPath, "utf-8");
      assert.ok(
        src.includes("transition-colors"),
        "Body should have transition-colors class"
      );
    });
  });

  // ------- page.tsx integration -------
  describe("page.tsx integration", () => {
    const pagePath = path.join(SRC, "app", "page.tsx");

    it("imports ThemeToggle", () => {
      const src = fs.readFileSync(pagePath, "utf-8");
      assert.ok(
        src.includes("ThemeToggle"),
        "page.tsx should import ThemeToggle"
      );
    });

    it("renders ThemeToggle in the header", () => {
      const src = fs.readFileSync(pagePath, "utf-8");
      assert.ok(
        src.includes("<ThemeToggle"),
        "Should render ThemeToggle component"
      );
    });

    it("has dark: variants on key elements", () => {
      const src = fs.readFileSync(pagePath, "utf-8");
      const darkCount = (src.match(/dark:/g) || []).length;
      assert.ok(
        darkCount >= 3,
        `Should have multiple dark: variants, found ${darkCount}`
      );
    });
  });
});
