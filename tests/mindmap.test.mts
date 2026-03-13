import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-008: Mind Map Diagram", () => {
  describe("Mind Map data", () => {
    const dataPath = join(ROOT, "src/data/mindmap.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "mindmap.ts data file should exist");
    });

    it("exports mindMapNodes with 12+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const mindMapNodes"),
        "Should export mindMapNodes"
      );
      const nodeMatches = content.match(/id:\s*"mm-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 12,
        `Should have at least 12 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports mindMapEdges with 12+ edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const mindMapEdges"),
        "Should export mindMapEdges"
      );
      const edgeMatches = content.match(/id:\s*"mm-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 12,
        `Should have at least 12 edges, found ${edgeMatches.length}`
      );
    });

    it("has a central topic (Web Development)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('"Web Development"'),
        "Should have Web Development as central topic"
      );
      assert.ok(content.includes("depth: 0"), "Central topic should have depth 0");
    });

    it("has depth levels 0, 1, and 2", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("depth: 0"), "Should have depth 0");
      assert.ok(content.includes("depth: 1"), "Should have depth 1");
      assert.ok(content.includes("depth: 2"), "Should have depth 2");
    });

    it("has main branches at depth 1", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"Frontend"'), "Should have Frontend branch");
      assert.ok(content.includes('"Backend"'), "Should have Backend branch");
      assert.ok(content.includes('"DevOps"'), "Should have DevOps branch");
      assert.ok(content.includes('"Design"'), "Should have Design branch");
      assert.ok(content.includes('"Testing"'), "Should have Testing branch");
    });

    it("has sub-topics at depth 2", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"React"'), "Should have React sub-topic");
      assert.ok(content.includes('"TypeScript"'), "Should have TypeScript sub-topic");
      assert.ok(content.includes('"Node.js"'), "Should have Node.js sub-topic");
      assert.ok(content.includes('"Docker"'), "Should have Docker sub-topic");
    });

    it("uses mindMapNode type for all nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const typeMatches = content.match(/type:\s*"mindMapNode"/g);
      assert.ok(typeMatches, "Should have mindMapNode types");
      assert.ok(
        typeMatches.length >= 12,
        `All nodes should be mindMapNode type, found ${typeMatches.length}`
      );
    });

    it("uses bezier (default) edge type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const defaultMatches = content.match(/type:\s*"default"/g);
      assert.ok(defaultMatches, "Should use default (bezier) edge type");
      assert.ok(
        defaultMatches.length >= 12,
        `Should have bezier edges, found ${defaultMatches.length}`
      );
    });

    it("has varying stroke widths for different levels", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("strokeWidth: 3"),
        "Main branches should have thicker strokes"
      );
      assert.ok(
        content.includes("strokeWidth: 2"),
        "Sub-branches should have thinner strokes"
      );
    });

    it("has colorful edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("#3b82f6"), "Should have blue edge color");
      assert.ok(content.includes("#10b981"), "Should have green edge color");
      assert.ok(content.includes("#f59e0b"), "Should have amber edge color");
      assert.ok(content.includes("#ec4899"), "Should have pink edge color");
    });
  });

  describe("MindMapNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/mindmap/nodes/MindMapNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "MindMapNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes('"use client"'),
        "Should have 'use client' directive"
      );
    });

    it("imports Handle and Position from @xyflow/react", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("Handle"), "Should import Handle");
      assert.ok(content.includes("Position"), "Should import Position");
    });

    it("has rounded styling (pill/circle shape)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("rounded-full"),
        "Should have rounded-full for pill shape"
      );
    });

    it("has decreasing size by depth", () => {
      const content = readFileSync(nodePath, "utf-8");
      // Depth 0 should be larger
      assert.ok(
        content.includes('min-w-[160px]'),
        "Depth 0 should have larger min-width"
      );
      // Depth 1 medium
      assert.ok(
        content.includes('min-w-[120px]'),
        "Depth 1 should have medium min-width"
      );
      // Depth 2 smaller
      assert.ok(
        content.includes('min-w-[90px]'),
        "Depth 2 should have smaller min-width"
      );
    });

    it("has color-coded styles by depth", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("indigo") || content.includes("gradient"),
        "Depth 0 should have distinctive gradient/color"
      );
      assert.ok(
        content.includes("blue"),
        "Depth 1 should have blue-ish border"
      );
    });

    it("has depth-specific text sizes", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("text-base"),
        "Depth 0 should have larger text"
      );
      assert.ok(
        content.includes("text-sm"),
        "Depth 1 should have medium text"
      );
      assert.ok(
        content.includes("text-xs"),
        "Depth 2 should have smaller text"
      );
    });

    it("has dark mode support", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("dark:"),
        "Should have dark mode classes"
      );
    });

    it("has hover effects", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("hover:shadow"),
        "Should have hover shadow effect"
      );
      assert.ok(
        content.includes("hover:scale"),
        "Should have hover scale effect"
      );
    });
  });

  describe("MindMapDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/mindmap/MindMapDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(
        existsSync(componentPath),
        "MindMapDiagram.tsx should exist"
      );
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes('"use client"'),
        "Should have 'use client' directive"
      );
    });

    it("registers mindMapNode in nodeTypes", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("mindMapNodeTypes"),
        "Should define mindMapNodeTypes"
      );
      assert.ok(
        content.includes("mindMapNode: MindMapNode"),
        "Should register MindMapNode as mindMapNode type"
      );
    });

    it("uses DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("DiagramWrapper"),
        "Should use DiagramWrapper"
      );
    });

    it("passes nodeTypes to DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("nodeTypes={mindMapNodeTypes}"),
        "Should pass nodeTypes to DiagramWrapper"
      );
    });
  });

  describe("nodes barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/mindmap/nodes/index.ts"
    );

    it("barrel file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports MindMapNode", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("MindMapNode"), "Should export MindMapNode");
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("imports MindMapDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("MindMapDiagram"),
        "DiagramContainer should import MindMapDiagram"
      );
    });

    it("renders MindMapDiagram for mind-map id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"mind-map"'),
        "DiagramContainer should handle mind-map diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("mind-map is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"mind-map"'),
        "Mind Map should be in diagrams list"
      );
    });

    it("mind-map has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Mind Map"'),
        "Should have Mind Map title"
      );
      assert.ok(
        content.includes("branching"),
        "Should have description mentioning branching"
      );
    });
  });
});
