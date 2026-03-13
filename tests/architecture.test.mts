import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-006: Architecture Diagram", () => {
  describe("Architecture data", () => {
    const dataPath = join(ROOT, "src/data/architecture.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "architecture.ts data file should exist");
    });

    it("exports architectureNodes with 10+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const architectureNodes"),
        "Should export architectureNodes"
      );
      const nodeMatches = content.match(/id:\s*"arch-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 10,
        `Should have at least 10 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports architectureEdges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const architectureEdges"),
        "Should export architectureEdges"
      );
      const edgeMatches = content.match(/id:\s*"arch-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 10,
        `Should have at least 10 edges, found ${edgeMatches.length}`
      );
    });

    it("contains service node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const serviceMatches = content.match(/type:\s*"service"/g);
      assert.ok(serviceMatches, "Should have service node types");
      assert.ok(
        serviceMatches.length >= 5,
        `Should have at least 5 service nodes, found ${serviceMatches.length}`
      );
    });

    it("contains database node types", () => {
      const content = readFileSync(dataPath, "utf-8");
      const dbMatches = content.match(/type:\s*"database"/g);
      assert.ok(dbMatches, "Should have database node types");
      assert.ok(
        dbMatches.length >= 3,
        `Should have at least 3 database nodes, found ${dbMatches.length}`
      );
    });

    it("contains apiGateway node type", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "apiGateway"'),
        "Should have an apiGateway node type"
      );
    });

    it("contains queue node type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const queueMatches = content.match(/type:\s*"queue"/g);
      assert.ok(queueMatches, "Should have queue node types");
      assert.ok(
        queueMatches.length >= 2,
        `Should have at least 2 queue nodes, found ${queueMatches.length}`
      );
    });

    it("has multiple tiers (frontend, backend, data, infrastructure)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('tier: "frontend"'), "Should have frontend tier nodes");
      assert.ok(content.includes('tier: "backend"'), "Should have backend tier nodes");
    });

    it("has sync edges (solid lines)", () => {
      const content = readFileSync(dataPath, "utf-8");
      // Sync edges have strokeWidth but no strokeDasharray
      assert.ok(content.includes("strokeWidth: 2"), "Should have styled edges");
      assert.ok(
        content.includes('label: "REST"') || content.includes('label: "gRPC"'),
        "Should have labeled sync protocol edges"
      );
    });

    it("has async edges (dashed lines)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("strokeDasharray"),
        "Should have dashed edges for async communication"
      );
      assert.ok(
        content.includes('label: "async"') || content.includes('label: "subscribe"'),
        "Should have labeled async edges"
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
      "src/components/diagrams/architecture/nodes"
    );

    it("ServiceNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "ServiceNode.tsx")),
        "ServiceNode.tsx should exist"
      );
    });

    it("DatabaseNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "DatabaseNode.tsx")),
        "DatabaseNode.tsx should exist"
      );
    });

    it("APIGatewayNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "APIGatewayNode.tsx")),
        "APIGatewayNode.tsx should exist"
      );
    });

    it("QueueNode component exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "QueueNode.tsx")),
        "QueueNode.tsx should exist"
      );
    });

    it("nodes index barrel file exists", () => {
      assert.ok(
        existsSync(join(nodesDir, "index.ts")),
        "nodes/index.ts barrel file should exist"
      );
      const content = readFileSync(join(nodesDir, "index.ts"), "utf-8");
      assert.ok(content.includes("ServiceNode"), "Should export ServiceNode");
      assert.ok(content.includes("DatabaseNode"), "Should export DatabaseNode");
      assert.ok(content.includes("APIGatewayNode"), "Should export APIGatewayNode");
      assert.ok(content.includes("QueueNode"), "Should export QueueNode");
    });

    it("ServiceNode has tier-based color coding", () => {
      const content = readFileSync(join(nodesDir, "ServiceNode.tsx"), "utf-8");
      assert.ok(content.includes("blue"), "Should have blue color for frontend tier");
      assert.ok(content.includes("green"), "Should have green color for backend tier");
      assert.ok(content.includes("orange"), "Should have orange color for data tier");
      assert.ok(content.includes("purple"), "Should have purple color for infrastructure tier");
    });

    it("ServiceNode has rounded styling", () => {
      const content = readFileSync(join(nodesDir, "ServiceNode.tsx"), "utf-8");
      assert.ok(
        content.includes("rounded"),
        "ServiceNode should have rounded corners"
      );
    });

    it("ServiceNode displays icon", () => {
      const content = readFileSync(join(nodesDir, "ServiceNode.tsx"), "utf-8");
      assert.ok(
        content.includes("icon"),
        "ServiceNode should support icon display"
      );
    });

    it("DatabaseNode has cylinder shape", () => {
      const content = readFileSync(join(nodesDir, "DatabaseNode.tsx"), "utf-8");
      assert.ok(
        content.includes("rounded-[50%]") || content.includes("cylinder") || content.includes("ellipse"),
        "DatabaseNode should have cylinder/ellipse styling"
      );
    });

    it("DatabaseNode has orange color scheme", () => {
      const content = readFileSync(join(nodesDir, "DatabaseNode.tsx"), "utf-8");
      assert.ok(content.includes("orange"), "DatabaseNode should use orange colors");
    });

    it("APIGatewayNode has hexagonal shape", () => {
      const content = readFileSync(join(nodesDir, "APIGatewayNode.tsx"), "utf-8");
      assert.ok(
        content.includes("clipPath") || content.includes("polygon") || content.includes("hexagon"),
        "APIGatewayNode should have hexagonal shape via clipPath"
      );
    });

    it("APIGatewayNode has blue styling", () => {
      const content = readFileSync(join(nodesDir, "APIGatewayNode.tsx"), "utf-8");
      assert.ok(content.includes("blue"), "APIGatewayNode should use blue colors");
    });

    it("QueueNode has parallelogram shape", () => {
      const content = readFileSync(join(nodesDir, "QueueNode.tsx"), "utf-8");
      assert.ok(
        content.includes("clipPath") || content.includes("polygon") || content.includes("parallelogram"),
        "QueueNode should have parallelogram shape via clipPath"
      );
    });

    it("QueueNode has purple styling", () => {
      const content = readFileSync(join(nodesDir, "QueueNode.tsx"), "utf-8");
      assert.ok(content.includes("purple"), "QueueNode should use purple colors");
    });

    it("All node components have Handle imports", () => {
      for (const file of ["ServiceNode.tsx", "DatabaseNode.tsx", "APIGatewayNode.tsx", "QueueNode.tsx"]) {
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
      for (const file of ["ServiceNode.tsx", "DatabaseNode.tsx", "APIGatewayNode.tsx", "QueueNode.tsx"]) {
        const content = readFileSync(join(nodesDir, file), "utf-8");
        assert.ok(
          content.includes('"use client"'),
          `${file} should have 'use client' directive`
        );
      }
    });
  });

  describe("ArchitectureDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/architecture/ArchitectureDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(
        existsSync(componentPath),
        "ArchitectureDiagram.tsx should exist"
      );
    });

    it("registers custom nodeTypes", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("architectureNodeTypes"),
        "Should define architectureNodeTypes"
      );
      assert.ok(
        content.includes("service: ServiceNode"),
        "Should register ServiceNode"
      );
      assert.ok(
        content.includes("database: DatabaseNode"),
        "Should register DatabaseNode"
      );
      assert.ok(
        content.includes("apiGateway: APIGatewayNode"),
        "Should register APIGatewayNode"
      );
      assert.ok(
        content.includes("queue: QueueNode"),
        "Should register QueueNode"
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
        content.includes("nodeTypes={architectureNodeTypes}"),
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

    it("DiagramContainer imports ArchitectureDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("ArchitectureDiagram"),
        "DiagramContainer should import ArchitectureDiagram"
      );
    });

    it("DiagramContainer renders ArchitectureDiagram for architecture id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"architecture"'),
        "DiagramContainer should handle architecture diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("architecture is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"architecture"'),
        "Architecture should be in diagrams list"
      );
    });

    it("architecture has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Architecture Diagram"'),
        "Should have Architecture Diagram title"
      );
      assert.ok(
        content.includes("microservices"),
        "Should have description mentioning microservices"
      );
    });
  });
});
