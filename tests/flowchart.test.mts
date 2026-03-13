import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-005: Flowchart Diagram", () => {
  describe("Flowchart data", () => {
    const dataPath = join(ROOT, "src/data/flowchart.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "flowchart.ts data file should exist");
    });

    it("exports flowchartNodes with 8+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const flowchartNodes"),
        "Should export flowchartNodes"
      );
      // Count node definitions by counting 'id: "fc-' occurrences
      const nodeMatches = content.match(/id:\s*"fc-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 8,
        `Should have at least 8 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports flowchartEdges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const flowchartEdges"),
        "Should export flowchartEdges"
      );
    });

    it("contains Start node type", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "start"'),
        "Should have a start node type"
      );
    });

    it("contains End node type", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "end"'),
        "Should have an end node type"
      );
    });

    it("contains Decision node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const decisionMatches = content.match(/type:\s*"decision"/g);
      assert.ok(decisionMatches, "Should have decision node types");
      assert.ok(
        decisionMatches.length >= 2,
        `Should have at least 2 decision nodes, found ${decisionMatches.length}`
      );
    });

    it("contains Process node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const processMatches = content.match(/type:\s*"process"/g);
      assert.ok(processMatches, "Should have process node types");
      assert.ok(
        processMatches.length >= 2,
        `Should have at least 2 process nodes, found ${processMatches.length}`
      );
    });

    it("has Yes/No labels on edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('label: "Yes"'),
        'Should have edges with "Yes" label'
      );
      assert.ok(
        content.includes('label: "No"'),
        'Should have edges with "No" label'
      );
    });

    it("has animated edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("animated: true"),
        "Should have animated edges"
      );
    });
  });

  describe("Custom node components", () => {
    const nodesDir = join(
      ROOT,
      "src/components/diagrams/flowchart/nodes"
    );

    it("StartNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "StartNode.tsx")),
        "StartNode.tsx should exist"
      );
    });

    it("EndNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "EndNode.tsx")),
        "EndNode.tsx should exist"
      );
    });

    it("DecisionNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "DecisionNode.tsx")),
        "DecisionNode.tsx should exist"
      );
    });

    it("ProcessNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "ProcessNode.tsx")),
        "ProcessNode.tsx should exist"
      );
    });

    it("StartNode has green styling", () => {
      const content = readFileSync(
        join(nodesDir, "StartNode.tsx"),
        "utf-8"
      );
      assert.ok(
        content.includes("emerald") || content.includes("green"),
        "StartNode should have green styling"
      );
    });

    it("EndNode has red styling", () => {
      const content = readFileSync(
        join(nodesDir, "EndNode.tsx"),
        "utf-8"
      );
      assert.ok(
        content.includes("red"),
        "EndNode should have red styling"
      );
    });

    it("DecisionNode has diamond/rotated shape", () => {
      const content = readFileSync(
        join(nodesDir, "DecisionNode.tsx"),
        "utf-8"
      );
      assert.ok(
        content.includes("rotate-45") || content.includes("diamond") || content.includes("rotate"),
        "DecisionNode should have diamond/rotated styling"
      );
    });

    it("DecisionNode has yellow/amber styling", () => {
      const content = readFileSync(
        join(nodesDir, "DecisionNode.tsx"),
        "utf-8"
      );
      assert.ok(
        content.includes("amber") || content.includes("yellow"),
        "DecisionNode should have yellow/amber styling"
      );
    });

    it("ProcessNode has blue styling", () => {
      const content = readFileSync(
        join(nodesDir, "ProcessNode.tsx"),
        "utf-8"
      );
      assert.ok(
        content.includes("blue"),
        "ProcessNode should have blue styling"
      );
    });

    it("DecisionNode has multiple source handles (yes/no)", () => {
      const content = readFileSync(
        join(nodesDir, "DecisionNode.tsx"),
        "utf-8"
      );
      assert.ok(
        content.includes('id="yes"'),
        'DecisionNode should have a "yes" source handle'
      );
      assert.ok(
        content.includes('id="no"'),
        'DecisionNode should have a "no" source handle'
      );
    });
  });

  describe("FlowchartDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/flowchart/FlowchartDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(
        existsSync(componentPath),
        "FlowchartDiagram.tsx should exist"
      );
    });

    it("registers custom nodeTypes", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("flowchartNodeTypes"),
        "Should define flowchartNodeTypes"
      );
      assert.ok(
        content.includes("start: StartNode"),
        "Should register StartNode"
      );
      assert.ok(
        content.includes("end: EndNode"),
        "Should register EndNode"
      );
      assert.ok(
        content.includes("decision: DecisionNode"),
        "Should register DecisionNode"
      );
      assert.ok(
        content.includes("process: ProcessNode"),
        "Should register ProcessNode"
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
        content.includes("nodeTypes={flowchartNodeTypes}"),
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

    it("DiagramContainer imports FlowchartDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("FlowchartDiagram"),
        "DiagramContainer should import FlowchartDiagram"
      );
    });

    it("DiagramContainer renders FlowchartDiagram for flowchart id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"flowchart"'),
        "DiagramContainer should handle flowchart diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("flowchart is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"flowchart"'),
        "Flowchart should be in diagrams list"
      );
    });

    it("flowchart has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Flowchart"'),
        "Should have Flowchart title"
      );
      assert.ok(
        content.includes("decision"),
        "Should have description mentioning decision"
      );
    });
  });
});
