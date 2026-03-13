import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

describe("US-003: Responsive Layout with Sidebar Navigation", () => {
  describe("constants/diagrams.ts", () => {
    const diagramsPath = join(SRC, "constants/diagrams.ts");

    it("file exists", () => {
      assert.ok(existsSync(diagramsPath), "constants/diagrams.ts must exist");
    });

    it("exports a diagrams array with exactly 10 entries", async () => {
      const mod = await import(diagramsPath);
      assert.ok(Array.isArray(mod.diagrams), "diagrams should be an array");
      assert.equal(mod.diagrams.length, 10, "Should have exactly 10 diagram types");
    });

    it("each diagram has id, title, description, and icon", async () => {
      const mod = await import(diagramsPath);
      for (const d of mod.diagrams) {
        assert.ok(typeof d.id === "string" && d.id.length > 0, `id must be non-empty string, got: ${d.id}`);
        assert.ok(typeof d.title === "string" && d.title.length > 0, `title must be non-empty string, got: ${d.title}`);
        assert.ok(typeof d.description === "string" && d.description.length > 0, `description must be non-empty string for ${d.id}`);
        assert.ok(typeof d.icon === "string" && d.icon.length > 0, `icon must be non-empty string for ${d.id}`);
      }
    });

    it("all diagram ids are unique", async () => {
      const mod = await import(diagramsPath);
      const ids = mod.diagrams.map((d: { id: string }) => d.id);
      const uniqueIds = new Set(ids);
      assert.equal(uniqueIds.size, ids.length, "All diagram ids must be unique");
    });

    it("exports DiagramDefinition type", () => {
      const source = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        source.includes("export interface DiagramDefinition") || source.includes("export type DiagramDefinition"),
        "Should export DiagramDefinition interface/type"
      );
    });

    it("includes expected diagram types", async () => {
      const mod = await import(diagramsPath);
      const ids = mod.diagrams.map((d: { id: string }) => d.id);
      const expectedIds = [
        "flowchart",
        "architecture",
        "data-flow",
        "concept-map",
        "org-chart",
        "mind-map",
        "state-machine",
        "network-topology",
        "er-diagram",
        "workflow",
      ];
      for (const expected of expectedIds) {
        assert.ok(ids.includes(expected), `Missing diagram type: ${expected}`);
      }
    });
  });

  describe("Sidebar component", () => {
    const sidebarPath = join(SRC, "components/layout/Sidebar.tsx");

    it("file exists", () => {
      assert.ok(existsSync(sidebarPath), "Sidebar.tsx must exist");
    });

    it("is a client component", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(source.includes('"use client"'), "Sidebar must have 'use client' directive");
    });

    it("imports diagrams from constants", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(
        source.includes("@/constants/diagrams"),
        "Should import from @/constants/diagrams"
      );
    });

    it("renders all diagram entries from the diagrams array", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(
        source.includes("diagrams.map"),
        "Should map over diagrams array to render entries"
      );
    });

    it("accepts activeDiagramId and onSelectDiagram props", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(source.includes("activeDiagramId"), "Should accept activeDiagramId prop");
      assert.ok(source.includes("onSelectDiagram"), "Should accept onSelectDiagram prop");
    });

    it("highlights active diagram item", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(
        source.includes("isActive") || source.includes("activeDiagramId"),
        "Should have active state logic"
      );
      assert.ok(
        source.includes("aria-current"),
        "Should set aria-current for active item"
      );
    });

    it("is hidden on mobile (uses md: breakpoint)", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(
        source.includes("hidden") && source.includes("md:"),
        "Should be hidden on mobile and visible on md+"
      );
    });

    it("has navigation landmark", () => {
      const source = readFileSync(sidebarPath, "utf-8");
      assert.ok(
        source.includes("<nav") || source.includes("role=\"navigation\""),
        "Should have nav element or navigation role"
      );
    });
  });

  describe("MobileNav component", () => {
    const mobilePath = join(SRC, "components/layout/MobileNav.tsx");

    it("file exists", () => {
      assert.ok(existsSync(mobilePath), "MobileNav.tsx must exist");
    });

    it("is a client component", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(source.includes('"use client"'), "MobileNav must have 'use client' directive");
    });

    it("imports diagrams from constants", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(
        source.includes("@/constants/diagrams"),
        "Should import from @/constants/diagrams"
      );
    });

    it("uses a select dropdown for mobile navigation", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(
        source.includes("<select"),
        "Should render a select element for mobile"
      );
    });

    it("renders options from diagrams array", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(
        source.includes("diagrams.map") && source.includes("<option"),
        "Should map diagrams to option elements"
      );
    });

    it("accepts activeDiagramId and onSelectDiagram props", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(source.includes("activeDiagramId"), "Should accept activeDiagramId prop");
      assert.ok(source.includes("onSelectDiagram"), "Should accept onSelectDiagram prop");
    });

    it("is visible only on mobile (hidden on md+)", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(
        source.includes("md:hidden"),
        "Should be hidden on md+ screens"
      );
    });

    it("has a label for accessibility", () => {
      const source = readFileSync(mobilePath, "utf-8");
      assert.ok(
        source.includes("<label") || source.includes("aria-label"),
        "Should have a label for the select element"
      );
    });
  });

  describe("DiagramContainer component", () => {
    const containerPath = join(SRC, "components/layout/DiagramContainer.tsx");

    it("file exists", () => {
      assert.ok(existsSync(containerPath), "DiagramContainer.tsx must exist");
    });

    it("is a client component", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(source.includes('"use client"'), "DiagramContainer must have 'use client' directive");
    });

    it("displays the diagram title", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("diagram.title"),
        "Should display diagram.title"
      );
    });

    it("displays the diagram description", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("diagram.description"),
        "Should display diagram.description"
      );
    });

    it("shows a placeholder for the diagram content", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("coming soon"),
        "Should show 'coming soon' placeholder text"
      );
    });

    it("imports DiagramDefinition type", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("DiagramDefinition"),
        "Should import DiagramDefinition type"
      );
    });
  });

  describe("Main page integration", () => {
    const pagePath = join(SRC, "app/page.tsx");

    it("is a client component", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(source.includes('"use client"'), "Page must have 'use client' directive");
    });

    it("imports and uses Sidebar", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(source.includes("Sidebar"), "Should import and use Sidebar component");
    });

    it("imports and uses MobileNav", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(source.includes("MobileNav"), "Should import and use MobileNav component");
    });

    it("imports and uses DiagramContainer", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(source.includes("DiagramContainer"), "Should import and use DiagramContainer component");
    });

    it("imports diagrams from constants", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(
        source.includes("@/constants/diagrams"),
        "Should import diagrams from constants"
      );
    });

    it("uses useState for active diagram tracking", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(
        source.includes("useState") && source.includes("activeDiagramId"),
        "Should use useState to track active diagram"
      );
    });

    it("passes activeDiagramId and onSelectDiagram to Sidebar", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(
        source.includes("activeDiagramId={activeDiagramId}") &&
          source.includes("onSelectDiagram={"),
        "Should pass active diagram state and setter to Sidebar"
      );
    });

    it("passes activeDiagramId and onSelectDiagram to MobileNav", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(
        source.includes("<MobileNav") &&
          source.includes("activeDiagramId=") &&
          source.includes("onSelectDiagram="),
        "Should pass active diagram state and setter to MobileNav"
      );
    });

    it("has ThemeToggle in the header", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(source.includes("ThemeToggle"), "Should include ThemeToggle component");
    });

    it("has responsive layout with md:ml-64 for sidebar offset", () => {
      const source = readFileSync(pagePath, "utf-8");
      assert.ok(
        source.includes("md:ml-64"),
        "Main content should have md:ml-64 to account for sidebar width"
      );
    });
  });

  describe("Dark mode support in layout components", () => {
    it("Sidebar has dark mode classes", () => {
      const source = readFileSync(join(SRC, "components/layout/Sidebar.tsx"), "utf-8");
      assert.ok(source.includes("dark:"), "Sidebar should have dark mode classes");
    });

    it("MobileNav has dark mode classes", () => {
      const source = readFileSync(join(SRC, "components/layout/MobileNav.tsx"), "utf-8");
      assert.ok(source.includes("dark:"), "MobileNav should have dark mode classes");
    });

    it("DiagramContainer has dark mode classes", () => {
      const source = readFileSync(join(SRC, "components/layout/DiagramContainer.tsx"), "utf-8");
      assert.ok(source.includes("dark:"), "DiagramContainer should have dark mode classes");
    });
  });
});
