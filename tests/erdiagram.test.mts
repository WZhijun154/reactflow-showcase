import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-010: ER Diagram", () => {
  describe("ER Diagram data", () => {
    const dataPath = join(ROOT, "src/data/erdiagram.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "erdiagram.ts data file should exist");
    });

    it("exports erDiagramNodes with 6+ entity nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const erDiagramNodes"),
        "Should export erDiagramNodes"
      );
      const nodeMatches = content.match(/id:\s*"er-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 6,
        `Should have at least 6 entity nodes, found ${nodeMatches.length}`
      );
    });

    it("exports erDiagramEdges with relationship edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const erDiagramEdges"),
        "Should export erDiagramEdges"
      );
      const edgeMatches = content.match(/id:\s*"er-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 6,
        `Should have at least 6 relationship edges, found ${edgeMatches.length}`
      );
    });

    it("has e-commerce entities (Users, Orders, Products, OrderItems, Categories, Reviews)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"Users"'), "Should have Users entity");
      assert.ok(content.includes('"Orders"'), "Should have Orders entity");
      assert.ok(content.includes('"Products"'), "Should have Products entity");
      assert.ok(content.includes('"OrderItems"'), "Should have OrderItems entity");
      assert.ok(content.includes('"Categories"'), "Should have Categories entity");
      assert.ok(content.includes('"Reviews"'), "Should have Reviews entity");
    });

    it("entities have columns with types", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("SERIAL"), "Should have SERIAL type");
      assert.ok(content.includes("VARCHAR"), "Should have VARCHAR type");
      assert.ok(content.includes("INTEGER"), "Should have INTEGER type");
      assert.ok(content.includes("TIMESTAMP"), "Should have TIMESTAMP type");
      assert.ok(content.includes("DECIMAL"), "Should have DECIMAL type");
      assert.ok(content.includes("TEXT"), "Should have TEXT type");
    });

    it("columns have PK indicators", () => {
      const content = readFileSync(dataPath, "utf-8");
      const pkMatches = content.match(/pk:\s*true/g);
      assert.ok(pkMatches, "Should have PK indicators");
      assert.ok(
        pkMatches.length >= 6,
        `Should have at least 6 PK columns (one per entity), found ${pkMatches.length}`
      );
    });

    it("columns have FK indicators", () => {
      const content = readFileSync(dataPath, "utf-8");
      const fkMatches = content.match(/fk:\s*true/g);
      assert.ok(fkMatches, "Should have FK indicators");
      assert.ok(
        fkMatches.length >= 5,
        `Should have at least 5 FK columns, found ${fkMatches.length}`
      );
    });

    it("edges show relationship cardinality (1:1, 1:N)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('"1 : N"'),
        "Should have 1:N cardinality labels"
      );
      assert.ok(
        content.includes('"1 : 1"'),
        "Should have 1:1 cardinality labels"
      );
    });

    it("all nodes use entityNode type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const entityMatches = content.match(/type:\s*"entityNode"/g);
      assert.ok(entityMatches, "Should have entityNode type");
      assert.ok(
        entityMatches.length >= 6,
        `Should have at least 6 entityNode nodes, found ${entityMatches.length}`
      );
    });

    it("edges have color-coded styling", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("#3b82f6"), "Should have blue stroke for user relationships");
      assert.ok(content.includes("#10b981"), "Should have green stroke for product relationships");
    });

    it("edges use smoothstep type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const smoothstepMatches = content.match(/type:\s*"smoothstep"/g);
      assert.ok(smoothstepMatches, "Should use smoothstep edges");
      assert.ok(
        smoothstepMatches.length >= 6,
        `Should have 6+ smoothstep edges, found ${smoothstepMatches.length}`
      );
    });
  });

  describe("EntityNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/erdiagram/nodes/EntityNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "EntityNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("imports Handle and Position from @xyflow/react", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("Handle"), "Should import Handle");
      assert.ok(content.includes("Position"), "Should import Position");
    });

    it("displays table name in header", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.label"), "Should display table name");
    });

    it("renders column names", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("col.name"), "Should render column names");
    });

    it("renders column types", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("col.type"), "Should render column types");
    });

    it("shows PK indicator", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("PK"), "Should display PK indicator");
      assert.ok(
        content.includes("col.pk"),
        "Should check pk property on column"
      );
    });

    it("shows FK indicator", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("FK"), "Should display FK indicator");
      assert.ok(
        content.includes("col.fk"),
        "Should check fk property on column"
      );
    });

    it("has dark mode support", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("dark:"), "Should have dark mode classes");
    });

    it("has hover effects", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("hover:shadow"), "Should have hover shadow effect");
    });

    it("has colored header based on entity color", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("borderColor") || content.includes("nodeData.color"),
        "Should use entity color for styling"
      );
    });
  });

  describe("ERDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/erdiagram/ERDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(componentPath), "ERDiagram.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("registers entityNode type", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("entityNode: EntityNode"),
        "Should register EntityNode"
      );
    });

    it("uses DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("DiagramWrapper"), "Should use DiagramWrapper");
    });

    it("passes nodeTypes to DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("nodeTypes={erDiagramNodeTypes}"),
        "Should pass nodeTypes"
      );
    });
  });

  describe("nodes barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/erdiagram/nodes/index.ts"
    );

    it("barrel file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports EntityNode", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("EntityNode"), "Should export EntityNode");
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("imports ERDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("ERDiagram"),
        "DiagramContainer should import ERDiagram"
      );
    });

    it("renders ERDiagram for er-diagram id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"er-diagram"'),
        "DiagramContainer should handle er-diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("er-diagram is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"er-diagram"'),
        "ER Diagram should be in diagrams list"
      );
    });

    it("er-diagram has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(content.includes('"ER Diagram"'), "Should have ER Diagram title");
      assert.ok(
        content.includes("entity-relationship") || content.includes("entity relationship"),
        "Should have description mentioning entity-relationship"
      );
    });
  });
});
