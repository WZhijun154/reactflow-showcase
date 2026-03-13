import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-001: Project Scaffold", () => {
  describe("package.json", () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf-8"));

    it("has @xyflow/react as a dependency", () => {
      assert.ok(
        pkg.dependencies["@xyflow/react"],
        "Missing @xyflow/react dependency"
      );
    });

    it("has tailwindcss as a devDependency", () => {
      assert.ok(
        pkg.devDependencies["tailwindcss"],
        "Missing tailwindcss devDependency"
      );
    });

    it("has next as a dependency", () => {
      assert.ok(pkg.dependencies["next"], "Missing next dependency");
    });

    it("has build script", () => {
      assert.ok(pkg.scripts["build"], "Missing build script");
    });

    it("has dev script", () => {
      assert.ok(pkg.scripts["dev"], "Missing dev script");
    });
  });

  describe("next.config.ts", () => {
    const configContent = readFileSync(
      join(ROOT, "next.config.ts"),
      "utf-8"
    );

    it("has output: export", () => {
      assert.ok(
        configContent.includes('output: "export"'),
        'Missing output: "export" in next.config.ts'
      );
    });

    it("has basePath: /reactflow-showcase", () => {
      assert.ok(
        configContent.includes('basePath: "/reactflow-showcase"'),
        "Missing basePath in next.config.ts"
      );
    });

    it("has assetPrefix: /reactflow-showcase", () => {
      assert.ok(
        configContent.includes('assetPrefix: "/reactflow-showcase"'),
        "Missing assetPrefix in next.config.ts"
      );
    });

    it("has unoptimized images for static export", () => {
      assert.ok(
        configContent.includes("unoptimized: true"),
        "Missing images.unoptimized for static export"
      );
    });
  });

  describe("app directory structure", () => {
    it("has app/layout.tsx", () => {
      assert.ok(
        existsSync(join(ROOT, "src/app/layout.tsx")),
        "Missing src/app/layout.tsx"
      );
    });

    it("has app/page.tsx", () => {
      assert.ok(
        existsSync(join(ROOT, "src/app/page.tsx")),
        "Missing src/app/page.tsx"
      );
    });

    it("has app/globals.css", () => {
      assert.ok(
        existsSync(join(ROOT, "src/app/globals.css")),
        "Missing src/app/globals.css"
      );
    });
  });

  describe("layout.tsx content", () => {
    const layout = readFileSync(join(ROOT, "src/app/layout.tsx"), "utf-8");

    it("imports globals.css", () => {
      assert.ok(
        layout.includes("globals.css"),
        "layout.tsx should import globals.css"
      );
    });

    it("has html and body tags", () => {
      assert.ok(layout.includes("<html"), "layout.tsx should have <html>");
      assert.ok(layout.includes("<body"), "layout.tsx should have <body>");
    });

    it("has React Flow Showcase metadata", () => {
      assert.ok(
        layout.includes("React Flow Showcase"),
        "layout.tsx should have React Flow Showcase in metadata"
      );
    });
  });

  describe("page.tsx content", () => {
    const page = readFileSync(join(ROOT, "src/app/page.tsx"), "utf-8");

    it('is a client component (has "use client")', () => {
      assert.ok(
        page.includes('"use client"'),
        'page.tsx should have "use client" directive'
      );
    });

    it("imports ReactFlow", () => {
      assert.ok(
        page.includes("ReactFlow"),
        "page.tsx should import ReactFlow"
      );
    });

    it("imports Controls and MiniMap", () => {
      assert.ok(page.includes("Controls"), "page.tsx should import Controls");
      assert.ok(page.includes("MiniMap"), "page.tsx should import MiniMap");
    });

    it("renders React Flow Showcase heading", () => {
      assert.ok(
        page.includes("React Flow Showcase"),
        "page.tsx should render React Flow Showcase heading"
      );
    });
  });

  describe("globals.css", () => {
    const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf-8");

    it("imports tailwindcss", () => {
      assert.ok(
        css.includes("tailwindcss"),
        "globals.css should import tailwindcss"
      );
    });
  });

  describe("postcss.config.mjs", () => {
    it("exists", () => {
      assert.ok(
        existsSync(join(ROOT, "postcss.config.mjs")),
        "Missing postcss.config.mjs"
      );
    });

    const config = readFileSync(join(ROOT, "postcss.config.mjs"), "utf-8");

    it("uses @tailwindcss/postcss plugin", () => {
      assert.ok(
        config.includes("@tailwindcss/postcss"),
        "postcss.config.mjs should reference @tailwindcss/postcss"
      );
    });
  });

  describe("README.md", () => {
    it("exists", () => {
      assert.ok(existsSync(join(ROOT, "README.md")), "Missing README.md");
    });

    const readme = readFileSync(join(ROOT, "README.md"), "utf-8");

    it("has project title", () => {
      assert.ok(
        readme.includes("React Flow Showcase"),
        "README should include project title"
      );
    });

    it("has npm install instructions", () => {
      assert.ok(
        readme.includes("npm install"),
        "README should have install instructions"
      );
    });

    it("has npm run dev instructions", () => {
      assert.ok(
        readme.includes("npm run dev"),
        "README should have dev instructions"
      );
    });

    it("has npm run build instructions", () => {
      assert.ok(
        readme.includes("npm run build"),
        "README should have build instructions"
      );
    });
  });

  describe("tsconfig.json", () => {
    const tsconfig = JSON.parse(
      readFileSync(join(ROOT, "tsconfig.json"), "utf-8")
    );

    it("has strict mode enabled", () => {
      assert.ok(
        tsconfig.compilerOptions.strict === true,
        "tsconfig should have strict: true"
      );
    });

    it("has path alias @/*", () => {
      assert.ok(
        tsconfig.compilerOptions.paths?.["@/*"],
        "tsconfig should have @/* path alias"
      );
    });
  });
});
