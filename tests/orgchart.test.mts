import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-008: Org Chart Diagram", () => {
  describe("Org Chart data", () => {
    const dataPath = join(ROOT, "src/data/orgchart.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "orgchart.ts data file should exist");
    });

    it("exports orgChartNodes with 12+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const orgChartNodes"),
        "Should export orgChartNodes"
      );
      const nodeMatches = content.match(/id:\s*"org-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 12,
        `Should have at least 12 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports orgChartEdges with 12+ edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const orgChartEdges"),
        "Should export orgChartEdges"
      );
      const edgeMatches = content.match(/id:\s*"org-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 12,
        `Should have at least 12 edges, found ${edgeMatches.length}`
      );
    });

    it("has hierarchical levels (0-3)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("level: 0"), "Should have level 0 (CEO)");
      assert.ok(content.includes("level: 1"), "Should have level 1 (VPs)");
      assert.ok(content.includes("level: 2"), "Should have level 2 (Directors)");
      assert.ok(content.includes("level: 3"), "Should have level 3 (Managers)");
    });

    it("nodes have label and title data", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('label: "Sarah Chen"'), "Should have CEO name");
      assert.ok(
        content.includes('title: "Chief Executive Officer"'),
        "Should have CEO title"
      );
    });

    it("uses orgNode type for all nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const orgNodeMatches = content.match(/type:\s*"orgNode"/g);
      assert.ok(orgNodeMatches, "Should have orgNode types");
      assert.ok(
        orgNodeMatches.length >= 12,
        `All nodes should be orgNode type, found ${orgNodeMatches.length}`
      );
    });

    it("uses smoothstep edge type for hierarchical connections", () => {
      const content = readFileSync(dataPath, "utf-8");
      const stepMatches = content.match(/type:\s*"smoothstep"/g);
      assert.ok(stepMatches, "Should use smoothstep edge type");
      assert.ok(
        stepMatches.length >= 12,
        `Should have smoothstep edges, found ${stepMatches.length}`
      );
    });

    it("has a realistic org structure (CEO → VPs → Directors → Managers)", () => {
      const content = readFileSync(dataPath, "utf-8");
      // VP level
      assert.ok(content.includes("VP of Engineering"), "Should have VP of Engineering");
      assert.ok(content.includes("VP of Product"), "Should have VP of Product");
      assert.ok(content.includes("VP of Operations"), "Should have VP of Operations");
      // Director level
      assert.ok(content.includes("Director of Frontend"), "Should have Director of Frontend");
      assert.ok(content.includes("Director of Backend"), "Should have Director of Backend");
      // Manager level
      assert.ok(content.includes("Team Lead"), "Should have Team Leads");
    });
  });

  describe("OrgNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/orgchart/nodes/OrgNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "OrgNode.tsx should exist");
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

    it("has card-like styling with rounded corners and shadow", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("rounded"), "Should have rounded corners");
      assert.ok(content.includes("shadow"), "Should have shadow styling");
    });

    it("displays name and title", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("nodeData.label"),
        "Should display the name/label"
      );
      assert.ok(
        content.includes("nodeData.title"),
        "Should display the title"
      );
    });

    it("has avatar placeholder with initials", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("getInitials"),
        "Should have a getInitials function for avatar"
      );
      assert.ok(
        content.includes("rounded-full"),
        "Should have a circular avatar"
      );
    });

    it("has different border colors by level", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("indigo"),
        "Should have indigo for level 0"
      );
      assert.ok(
        content.includes("violet"),
        "Should have violet for level 1"
      );
      assert.ok(
        content.includes("purple"),
        "Should have purple for level 2"
      );
      assert.ok(
        content.includes("fuchsia"),
        "Should have fuchsia for level 3"
      );
    });

    it("has dark mode support", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("dark:"),
        "Should have dark mode classes"
      );
    });
  });

  describe("OrgChartDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/orgchart/OrgChartDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(
        existsSync(componentPath),
        "OrgChartDiagram.tsx should exist"
      );
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes('"use client"'),
        "Should have 'use client' directive"
      );
    });

    it("registers orgNode in nodeTypes", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("orgChartNodeTypes"),
        "Should define orgChartNodeTypes"
      );
      assert.ok(
        content.includes("orgNode: OrgNode"),
        "Should register OrgNode as orgNode type"
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
        content.includes("nodeTypes={orgChartNodeTypes}"),
        "Should pass nodeTypes to DiagramWrapper"
      );
    });
  });

  describe("nodes barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/orgchart/nodes/index.ts"
    );

    it("barrel file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports OrgNode", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("OrgNode"), "Should export OrgNode");
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("imports OrgChartDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("OrgChartDiagram"),
        "DiagramContainer should import OrgChartDiagram"
      );
    });

    it("renders OrgChartDiagram for org-chart id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"org-chart"'),
        "DiagramContainer should handle org-chart diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("org-chart is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"org-chart"'),
        "Org Chart should be in diagrams list"
      );
    });

    it("org-chart has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Org Chart"'),
        "Should have Org Chart title"
      );
      assert.ok(
        content.includes("hierarchical"),
        "Should have description mentioning hierarchical"
      );
    });
  });
});
