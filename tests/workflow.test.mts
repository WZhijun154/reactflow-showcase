import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-010: Workflow / Pipeline Diagram", () => {
  describe("Workflow data", () => {
    const dataPath = join(ROOT, "src/data/workflow.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "workflow.ts data file should exist");
    });

    it("exports workflowNodes with 10+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const workflowNodes"),
        "Should export workflowNodes"
      );
      const nodeMatches = content.match(/id:\s*"wf-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 10,
        `Should have at least 10 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports workflowEdges with 10+ edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const workflowEdges"),
        "Should export workflowEdges"
      );
      const edgeMatches = content.match(/id:\s*"wf-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 10,
        `Should have at least 10 edges, found ${edgeMatches.length}`
      );
    });

    it("has CI/CD pipeline stages", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"Commit"'), "Should have Commit stage");
      assert.ok(content.includes('"Build"'), "Should have Build stage");
      assert.ok(content.includes('"Security Scan"'), "Should have Security Scan stage");
      assert.ok(content.includes('"Stage Deploy"'), "Should have Stage Deploy stage");
      assert.ok(content.includes('"Production Deploy"'), "Should have Production Deploy stage");
    });

    it("has stageNode type nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const stageMatches = content.match(/type:\s*"stageNode"/g);
      assert.ok(stageMatches, "Should have stageNode types");
      assert.ok(
        stageMatches.length >= 8,
        `Should have at least 8 stage nodes, found ${stageMatches.length}`
      );
    });

    it("has gateNode type for approval", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "gateNode"'),
        "Should have gateNode type"
      );
      assert.ok(
        content.includes('"Approval Gate"'),
        "Should have Approval Gate label"
      );
    });

    it("has parallelNode type for parallel execution", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "parallelNode"'),
        "Should have parallelNode type"
      );
      assert.ok(
        content.includes('"Parallel Tests"'),
        "Should have Parallel Tests label"
      );
    });

    it("stages have status property (success, running, pending, failed)", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"success"'), "Should have success status");
      assert.ok(content.includes('"running"'), "Should have running status");
      assert.ok(content.includes('"pending"'), "Should have pending status");
    });

    it("parallel branches include unit tests, integration tests, and lint", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"Unit Tests"'), "Should have Unit Tests");
      assert.ok(content.includes('"Integration Tests"'), "Should have Integration Tests");
      assert.ok(content.includes('"Lint & Format"'), "Should have Lint & Format");
    });

    it("edges have fork and join labels", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"fork"'), "Should have fork labels on fan-out edges");
      assert.ok(content.includes('"join"'), "Should have join labels on fan-in edges");
    });

    it("edges use smoothstep type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const smoothstepMatches = content.match(/type:\s*"smoothstep"/g);
      assert.ok(smoothstepMatches, "Should use smoothstep edges");
      assert.ok(
        smoothstepMatches.length >= 10,
        `Should have 10+ smoothstep edges, found ${smoothstepMatches.length}`
      );
    });

    it("pending stages have dashed edge styling", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('strokeDasharray: "6 3"'),
        "Pending edges should be dashed"
      );
    });
  });

  describe("StageNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/workflow/nodes/StageNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "StageNode.tsx should exist");
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

    it("has color-coded status styling", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("success"), "Should handle success status");
      assert.ok(content.includes("running"), "Should handle running status");
      assert.ok(content.includes("pending"), "Should handle pending status");
      assert.ok(content.includes("failed"), "Should handle failed status");
    });

    it("displays stage label and description", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.label"), "Should display label");
      assert.ok(content.includes("nodeData.description"), "Should display description");
    });

    it("has status icons", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("✅"), "Should have success icon");
      assert.ok(content.includes("🔄"), "Should have running icon");
      assert.ok(content.includes("⏳"), "Should have pending icon");
      assert.ok(content.includes("❌"), "Should have failed icon");
    });

    it("has dark mode support", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("dark:"), "Should have dark mode classes");
    });

    it("has hover effects", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("hover:shadow"), "Should have hover shadow");
      assert.ok(content.includes("hover:scale"), "Should have hover scale");
    });
  });

  describe("GateNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/workflow/nodes/GateNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "GateNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has diamond shape styling", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("rotate(45deg)"),
        "Should have diamond rotation"
      );
    });

    it("displays gate label", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.label"), "Should display gate label");
    });

    it("displays approver information", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.approver"), "Should display approver");
    });

    it("has lock icon", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("🔒"), "Should have lock icon for gate");
    });

    it("has amber/warning color scheme", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("amber"), "Should use amber color for gate");
    });
  });

  describe("ParallelNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/workflow/nodes/ParallelNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "ParallelNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has dashed border styling", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("border-dashed"),
        "Should have dashed border for parallel node"
      );
    });

    it("displays parallel label", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.label"), "Should display label");
    });

    it("shows branch count", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(
        content.includes("nodeData.branches.length"),
        "Should show number of branches"
      );
    });

    it("has indigo color scheme", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("indigo"), "Should use indigo color for parallel");
    });
  });

  describe("WorkflowDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/workflow/WorkflowDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(componentPath), "WorkflowDiagram.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("registers all three node types", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("stageNode: StageNode"), "Should register StageNode");
      assert.ok(content.includes("gateNode: GateNode"), "Should register GateNode");
      assert.ok(content.includes("parallelNode: ParallelNode"), "Should register ParallelNode");
    });

    it("uses DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("DiagramWrapper"), "Should use DiagramWrapper");
    });

    it("passes nodeTypes to DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("nodeTypes={workflowNodeTypes}"),
        "Should pass nodeTypes"
      );
    });
  });

  describe("nodes barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/workflow/nodes/index.ts"
    );

    it("barrel file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports all node types", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("StageNode"), "Should export StageNode");
      assert.ok(content.includes("GateNode"), "Should export GateNode");
      assert.ok(content.includes("ParallelNode"), "Should export ParallelNode");
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("imports WorkflowDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("WorkflowDiagram"),
        "DiagramContainer should import WorkflowDiagram"
      );
    });

    it("renders WorkflowDiagram for workflow id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"workflow"'),
        "DiagramContainer should handle workflow diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("workflow is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"workflow"'),
        "Workflow should be in diagrams list"
      );
    });

    it("workflow has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"Workflow / Pipeline"'),
        "Should have Workflow / Pipeline title"
      );
      assert.ok(
        content.includes("CI/CD") || content.includes("pipeline"),
        "Should have description mentioning CI/CD or pipeline"
      );
    });
  });
});
