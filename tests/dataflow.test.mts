import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-007: Data Flow Diagram", () => {
  describe("Data Flow data", () => {
    const dataPath = join(ROOT, "src/data/dataflow.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "dataflow.ts data file should exist");
    });

    it("exports dataFlowNodes with 8+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const dataFlowNodes"),
        "Should export dataFlowNodes"
      );
      const nodeMatches = content.match(/id:\s*"df-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 8,
        `Should have at least 8 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports dataFlowEdges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const dataFlowEdges"),
        "Should export dataFlowEdges"
      );
      const edgeMatches = content.match(/id:\s*"df-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 8,
        `Should have at least 8 edges, found ${edgeMatches.length}`
      );
    });

    it("contains source node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const sourceMatches = content.match(/type:\s*"source"/g);
      assert.ok(sourceMatches, "Should have source node types");
      assert.ok(
        sourceMatches.length >= 2,
        `Should have at least 2 source nodes, found ${sourceMatches.length}`
      );
    });

    it("contains transform node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const transformMatches = content.match(/type:\s*"transform"/g);
      assert.ok(transformMatches, "Should have transform node types");
      assert.ok(
        transformMatches.length >= 3,
        `Should have at least 3 transform nodes, found ${transformMatches.length}`
      );
    });

    it("contains load node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const loadMatches = content.match(/type:\s*"load"/g);
      assert.ok(loadMatches, "Should have load node types");
      assert.ok(
        loadMatches.length >= 2,
        `Should have at least 2 load nodes, found ${loadMatches.length}`
      );
    });

    it("contains storage node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const storageMatches = content.match(/type:\s*"storage"/g);
      assert.ok(storageMatches, "Should have storage node types");
      assert.ok(
        storageMatches.length >= 1,
        `Should have at least 1 storage node, found ${storageMatches.length}`
      );
    });

    it("has animated edges for data flow direction", () => {
      const content = readFileSync(dataPath, "utf-8");
      const animatedMatches = content.match(/animated:\s*true/g);
      assert.ok(animatedMatches, "Should have animated edges");
      assert.ok(
        animatedMatches.length >= 5,
        `Should have at least 5 animated edges, found ${animatedMatches.length}`
      );
    });

    it("has arrow markers on edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("markerEnd"),
        "Should have arrow markers on edges"
      );
      assert.ok(
        content.includes("arrowclosed"),
        "Should use arrowclosed marker type"
      );
    });

    it("uses gradient coloring from source (blue) to destination (green)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("#3b82f6"),
        "Should have blue color for source edges"
      );
      assert.ok(
        content.includes("#22c55e"),
        "Should have green color for load edges"
      );
    });

    it("represents ETL pipeline stages", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("Parse"), "Should have a Parse step");
      assert.ok(content.includes("Validate"), "Should have a Validate step");
      assert.ok(content.includes("Aggregate"), "Should have an Aggregate step");
      assert.ok(
        content.includes("Warehouse") || content.includes("warehouse"),
        "Should have a Warehouse destination"
      );
    });
  });

  describe("Custom node components", () => {
    const nodesDir = join(
      ROOT,
      "src/components/diagrams/dataflow/nodes"
    );

    it("SourceNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "SourceNode.tsx")),
        "SourceNode.tsx should exist"
      );
    });

    it("TransformNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "TransformNode.tsx")),
        "TransformNode.tsx should exist"
      );
    });

    it("LoadNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "LoadNode.tsx")),
        "LoadNode.tsx should exist"
      );
    });

    it("StorageNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "StorageNode.tsx")),
        "StorageNode.tsx should exist"
      );
    });

    it("nodes index barrel file exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "index.ts")),
        "nodes/index.ts barrel file should exist"
      );
      const content = readFileSync(join(nodesDir, "index.ts"), "utf-8");
      assert.ok(content.includes("SourceNode"), "Should export SourceNode");
      assert.ok(content.includes("TransformNode"), "Should export TransformNode");
      assert.ok(content.includes("LoadNode"), "Should export LoadNode");
      assert.ok(content.includes("StorageNode"), "Should export StorageNode");
    });

    it("SourceNode has blue styling", () => {
      const content = readFileSync(join(nodesDir, "SourceNode.tsx"), "utf-8");
      assert.ok(content.includes("blue"), "SourceNode should use blue colors");
    });

    it("TransformNode has amber/yellow styling", () => {
      const content = readFileSync(join(nodesDir, "TransformNode.tsx"), "utf-8");
      assert.ok(
        content.includes("amber"),
        "TransformNode should use amber colors"
      );
    });

    it("LoadNode has green styling", () => {
      const content = readFileSync(join(nodesDir, "LoadNode.tsx"), "utf-8");
      assert.ok(content.includes("green"), "LoadNode should use green colors");
    });

    it("StorageNode has indigo styling", () => {
      const content = readFileSync(join(nodesDir, "StorageNode.tsx"), "utf-8");
      assert.ok(content.includes("indigo"), "StorageNode should use indigo colors");
    });

    it("All node components have Handle imports", () => {
      for (const file of ["SourceNode.tsx", "TransformNode.tsx", "LoadNode.tsx", "StorageNode.tsx"]) {
        const content = readFileSync(join(nodesDir, file), "utf-8");
        assert.ok(
          content.includes("Handle"),
          `${file} should import Handle from @xyflow/react`
        );
        assert.ok(
          content.includes("Position"),
          `${file} should import Position from @xyflow/react`
        );
      }
    });

    it("All node components have 'use client' directive", () => {
      for (const file of ["SourceNode.tsx", "TransformNode.tsx", "LoadNode.tsx", "StorageNode.tsx"]) {
        const content = readFileSync(join(nodesDir, file), "utf-8");
        assert.ok(
          content.includes('"use client"'),
          `${file} should have 'use client' directive`
        );
      }
    });

    it("Node components have hover transitions", () => {
      for (const file of ["SourceNode.tsx", "TransformNode.tsx", "LoadNode.tsx", "StorageNode.tsx"]) {
        const content = readFileSync(join(nodesDir, file), "utf-8");
        assert.ok(
          content.includes("hover:"),
          `${file} should have hover effects`
        );
        assert.ok(
          content.includes("transition"),
          `${file} should have transition animations`
        );
      }
    });
  });

  describe("DataFlowDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/dataflow/DataFlowDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(
        existsSync(componentPath),
        "DataFlowDiagram.tsx should exist"
      );
    });

    it("registers custom nodeTypes", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("dataFlowNodeTypes"),
        "Should define dataFlowNodeTypes"
      );
      assert.ok(
        content.includes("source: SourceNode"),
        "Should register SourceNode"
      );
      assert.ok(
        content.includes("transform: TransformNode"),
        "Should register TransformNode"
      );
      assert.ok(
        content.includes("load: LoadNode"),
        "Should register LoadNode"
      );
      assert.ok(
        content.includes("storage: StorageNode"),
        "Should register StorageNode"
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
        content.includes("nodeTypes={dataFlowNodeTypes}"),
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

    it("DiagramContainer imports DataFlowDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("DataFlowDiagram"),
        "DiagramContainer should import DataFlowDiagram"
      );
    });

    it("DiagramContainer renders DataFlowDiagram for data-flow id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"data-flow"'),
        "DiagramContainer should handle data-flow diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("data-flow is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"data-flow"'),
        "Data Flow should be in diagrams list"
      );
    });

    it("data-flow has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Data Flow Diagram"'),
        "Should have Data Flow Diagram title"
      );
      assert.ok(
        content.includes("ETL"),
        "Should have description mentioning ETL"
      );
    });
  });
});
