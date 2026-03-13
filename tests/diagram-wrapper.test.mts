import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");

describe("US-004: DiagramWrapper with React Flow, Minimap, and Controls", () => {
  const wrapperPath = join(SRC, "components/diagrams/DiagramWrapper.tsx");

  describe("DiagramWrapper component file", () => {
    it("file exists", () => {
      assert.ok(existsSync(wrapperPath), "DiagramWrapper.tsx must exist");
    });

    it("is a client component", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes('"use client"'),
        "DiagramWrapper must have 'use client' directive",
      );
    });

    it("imports ReactFlow from @xyflow/react", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("@xyflow/react"),
        "Should import from @xyflow/react",
      );
      assert.ok(
        source.includes("ReactFlow"),
        "Should import ReactFlow component",
      );
    });

    it("imports and renders ReactFlowProvider", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("ReactFlowProvider"),
        "Should import ReactFlowProvider",
      );
      assert.ok(
        source.includes("<ReactFlowProvider"),
        "Should render ReactFlowProvider as wrapper",
      );
    });

    it("imports and renders MiniMap", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(source.includes("MiniMap"), "Should import MiniMap");
      assert.ok(source.includes("<MiniMap"), "Should render MiniMap component");
    });

    it("imports and renders Controls", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(source.includes("Controls"), "Should import Controls");
      assert.ok(
        source.includes("<Controls"),
        "Should render Controls component",
      );
    });

    it("imports and renders Background with dots variant", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(source.includes("Background"), "Should import Background");
      assert.ok(
        source.includes("<Background"),
        "Should render Background component",
      );
      assert.ok(
        source.includes("BackgroundVariant.Dots") ||
          source.includes("variant={BackgroundVariant.Dots}") ||
          source.includes('"dots"'),
        "Should use dots background variant",
      );
    });

    it("enables fitView on ReactFlow", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("fitView"),
        "Should enable fitView on ReactFlow",
      );
    });

    it("accepts initialNodes and initialEdges props", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("initialNodes"),
        "Should accept initialNodes prop",
      );
      assert.ok(
        source.includes("initialEdges"),
        "Should accept initialEdges prop",
      );
    });

    it("accepts nodeTypes and edgeTypes props", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("nodeTypes"),
        "Should accept nodeTypes prop",
      );
      assert.ok(
        source.includes("edgeTypes"),
        "Should accept edgeTypes prop",
      );
    });

    it("accepts title prop", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("title: string") || source.includes("title"),
        "Should accept title prop in DiagramWrapperProps",
      );
    });

    it("uses useNodesState and useEdgesState hooks", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("useNodesState"),
        "Should use useNodesState hook for interactive nodes",
      );
      assert.ok(
        source.includes("useEdgesState"),
        "Should use useEdgesState hook for interactive edges",
      );
    });

    it("supports dark mode via useTheme and colorMode", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("useTheme"),
        "Should import useTheme to read current theme",
      );
      assert.ok(
        source.includes("colorMode"),
        "Should pass colorMode to ReactFlow",
      );
    });

    it("sets container height to fill available space", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("h-[calc(100vh") || source.includes("min-h-["),
        "Should set the container height to fill available space",
      );
    });

    it("imports React Flow styles", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("@xyflow/react/dist/style.css"),
        "Should import React Flow CSS styles",
      );
    });

    it("sets animated default edge options", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("defaultEdgeOptions") || source.includes("animated"),
        "Should set animated defaults for smooth edge animations",
      );
    });

    it("exports DiagramWrapper as named export", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      assert.ok(
        source.includes("export function DiagramWrapper"),
        "Should export DiagramWrapper as named export",
      );
    });
  });

  describe("Placeholder data", () => {
    const placeholderPath = join(SRC, "constants/placeholderData.ts");

    it("placeholder data file exists", () => {
      assert.ok(
        existsSync(placeholderPath),
        "placeholderData.ts must exist",
      );
    });

    it("exports placeholderNodes array", async () => {
      const mod = await import(placeholderPath);
      assert.ok(
        Array.isArray(mod.placeholderNodes),
        "Should export placeholderNodes array",
      );
      assert.ok(
        mod.placeholderNodes.length >= 2,
        "Should have at least 2 placeholder nodes",
      );
    });

    it("exports placeholderEdges array", async () => {
      const mod = await import(placeholderPath);
      assert.ok(
        Array.isArray(mod.placeholderEdges),
        "Should export placeholderEdges array",
      );
      assert.ok(
        mod.placeholderEdges.length >= 1,
        "Should have at least 1 placeholder edge",
      );
    });

    it("nodes have required fields (id, position, data)", async () => {
      const mod = await import(placeholderPath);
      for (const node of mod.placeholderNodes) {
        assert.ok(typeof node.id === "string", "Node must have string id");
        assert.ok(
          node.position && typeof node.position.x === "number",
          "Node must have position.x",
        );
        assert.ok(
          node.position && typeof node.position.y === "number",
          "Node must have position.y",
        );
        assert.ok(node.data !== undefined, "Node must have data");
      }
    });

    it("edges have required fields (id, source, target)", async () => {
      const mod = await import(placeholderPath);
      for (const edge of mod.placeholderEdges) {
        assert.ok(typeof edge.id === "string", "Edge must have string id");
        assert.ok(
          typeof edge.source === "string",
          "Edge must have string source",
        );
        assert.ok(
          typeof edge.target === "string",
          "Edge must have string target",
        );
      }
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(SRC, "components/layout/DiagramContainer.tsx");

    it("imports DiagramWrapper", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("DiagramWrapper"),
        "DiagramContainer should import DiagramWrapper",
      );
    });

    it("renders DiagramWrapper component", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("<DiagramWrapper"),
        "DiagramContainer should render DiagramWrapper",
      );
    });

    it("passes initialNodes and initialEdges to DiagramWrapper", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("initialNodes=") && source.includes("initialEdges="),
        "Should pass initialNodes and initialEdges to DiagramWrapper",
      );
    });

    it("passes title to DiagramWrapper", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("title="),
        "Should pass title to DiagramWrapper",
      );
    });

    it("no longer shows 'coming soon' placeholder", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        !source.includes("coming soon"),
        "Should no longer show 'coming soon' — replaced by real DiagramWrapper",
      );
    });

    it("still displays diagram title and description", () => {
      const source = readFileSync(containerPath, "utf-8");
      assert.ok(
        source.includes("diagram.title"),
        "Should still display diagram.title",
      );
      assert.ok(
        source.includes("diagram.description"),
        "Should still display diagram.description",
      );
    });
  });

  describe("Build and typecheck", () => {
    it("tsconfig.json exists", () => {
      assert.ok(
        existsSync(join(ROOT, "tsconfig.json")),
        "tsconfig.json must exist",
      );
    });

    it("DiagramWrapper has no TypeScript any types", () => {
      const source = readFileSync(wrapperPath, "utf-8");
      // Check for explicit `: any` or `as any` usage
      const anyMatches = source.match(/:\s*any\b|as\s+any\b/g);
      assert.ok(
        !anyMatches,
        `Should not use 'any' type — found ${anyMatches?.length ?? 0} occurrences`,
      );
    });
  });
});
