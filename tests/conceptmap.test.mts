import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-007: Concept Map Diagram", () => {
  describe("Concept Map data", () => {
    const dataPath = join(ROOT, "src/data/conceptmap.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "conceptmap.ts data file should exist");
    });

    it("exports conceptMapNodes with 10+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const conceptMapNodes"),
        "Should export conceptMapNodes"
      );
      const nodeMatches = content.match(/id:\s*"cm-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 10,
        `Should have at least 10 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports conceptMapEdges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const conceptMapEdges"),
        "Should export conceptMapEdges"
      );
      const edgeMatches = content.match(/id:\s*"cm-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 10,
        `Should have at least 10 edges, found ${edgeMatches.length}`
      );
    });

    it("all nodes use concept type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const conceptMatches = content.match(/type:\s*"concept"/g);
      assert.ok(conceptMatches, "Should have concept node types");
      assert.ok(
        conceptMatches.length >= 10,
        `Should have at least 10 concept nodes, found ${conceptMatches.length}`
      );
    });

    it("has multiple categories (core, paradigm, algorithm, application, technique)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"core"'), "Should have core category");
      assert.ok(content.includes('"paradigm"'), "Should have paradigm category");
      assert.ok(content.includes('"algorithm"'), "Should have algorithm category");
      assert.ok(content.includes('"application"'), "Should have application category");
      assert.ok(content.includes('"technique"'), "Should have technique category");
    });

    it("has varying importance levels for node sizes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"high"'), "Should have high importance nodes");
      assert.ok(content.includes('"medium"'), "Should have medium importance nodes");
      assert.ok(content.includes('"low"'), "Should have low importance nodes");
    });

    it("uses bezier curve edges (default type)", () => {
      const content = readFileSync(dataPath, "utf-8");
      // Default edge type in React Flow is bezier
      const defaultTypeMatches = content.match(/type:\s*"default"/g);
      assert.ok(defaultTypeMatches, "Should use default (bezier) edge type");
      assert.ok(
        defaultTypeMatches.length >= 10,
        `Should have at least 10 bezier edges, found ${defaultTypeMatches.length}`
      );
    });

    it("edges have relationship labels", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"includes"'), "Should have 'includes' relationship");
      assert.ok(content.includes('"uses"'), "Should have 'uses' relationship");
      assert.ok(content.includes('"enables"'), "Should have 'enables' relationship");
    });

    it("has Machine Learning themed concepts", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("Machine Learning"), "Should have Machine Learning");
      assert.ok(content.includes("Supervised"), "Should have Supervised Learning");
      assert.ok(content.includes("Unsupervised"), "Should have Unsupervised Learning");
      assert.ok(content.includes("Neural Networks"), "Should have Neural Networks");
    });

    it("has interconnected nodes with cross-links", () => {
      const content = readFileSync(dataPath, "utf-8");
      // Check for cross-connections between applications
      assert.ok(
        content.includes('"combined with"') || content.includes("cross"),
        "Should have cross-connections between concepts"
      );
    });

    it("uses pastel colors for different categories", () => {
      const content = readFileSync(dataPath, "utf-8");
      // Edges colored by relationship type
      assert.ok(content.includes("#94a3b8"), "Should have slate/gray for includes");
      assert.ok(content.includes("#a78bfa"), "Should have violet for uses");
      assert.ok(content.includes("#6ee7b7"), "Should have emerald for enables");
    });
  });

  describe("ConceptNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/conceptmap/nodes/ConceptNode.tsx"
    );

    it("ConceptNode component exists", () => {
      assert.ok(
        existsSync(nodePath),
        "ConceptNode.tsx should exist"
      );
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

    it("has rounded shape (rounded-full)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("rounded-full") || content.includes("rounded"),
        "ConceptNode should have rounded styling"
      );
    });

    it("has varying sizes based on importance", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("high"), "Should handle high importance");
      assert.ok(content.includes("medium"), "Should handle medium importance");
      assert.ok(content.includes("low"), "Should handle low importance");
      // Different min-widths for different sizes
      assert.ok(
        content.includes("min-w-[160px]") || content.includes("min-w-[130px]"),
        "Should have different min-widths for sizes"
      );
    });

    it("has category-based colors (pastel)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("rose"), "Should have rose for core category");
      assert.ok(content.includes("sky"), "Should have sky for paradigm category");
      assert.ok(content.includes("violet"), "Should have violet for algorithm category");
      assert.ok(content.includes("emerald"), "Should have emerald for application category");
      assert.ok(content.includes("amber"), "Should have amber for technique category");
    });

    it("has hover transitions", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("hover:"), "Should have hover effects");
      assert.ok(content.includes("transition"), "Should have transition animations");
    });

    it("has multiple handles for flexible connections", () => {
      const content = readFileSync(nodePath, "utf-8");
      const handleMatches = content.match(/<Handle/g);
      assert.ok(handleMatches, "Should have Handle components");
      assert.ok(
        handleMatches.length >= 4,
        `Should have at least 4 handles, found ${handleMatches.length}`
      );
    });
  });

  describe("nodes index barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/conceptmap/nodes/index.ts"
    );

    it("index file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports ConceptNode", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("ConceptNode"), "Should export ConceptNode");
    });
  });

  describe("ConceptMapDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/conceptmap/ConceptMapDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(
        existsSync(componentPath),
        "ConceptMapDiagram.tsx should exist"
      );
    });

    it("registers concept nodeType", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("conceptMapNodeTypes"),
        "Should define conceptMapNodeTypes"
      );
      assert.ok(
        content.includes("concept: ConceptNode"),
        "Should register ConceptNode"
      );
    });

    it("uses DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("DiagramWrapper"),
        "Should use DiagramWrapper component"
      );
    });

    it("passes nodeTypes to DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("nodeTypes={conceptMapNodeTypes}"),
        "Should pass nodeTypes to DiagramWrapper"
      );
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes('"use client"'),
        "Should have 'use client' directive"
      );
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("DiagramContainer imports ConceptMapDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("ConceptMapDiagram"),
        "DiagramContainer should import ConceptMapDiagram"
      );
    });

    it("DiagramContainer renders ConceptMapDiagram for concept-map id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"concept-map"'),
        "DiagramContainer should handle concept-map diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("concept-map is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"concept-map"'),
        "Concept Map should be in diagrams list"
      );
    });

    it("concept-map has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Concept Map"'),
        "Should have Concept Map title"
      );
      assert.ok(
        content.includes("interconnected") || content.includes("Interconnected"),
        "Should have description mentioning interconnected"
      );
    });
  });
});
