import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-009: State Machine Diagram", () => {
  describe("State Machine data", () => {
    const dataPath = join(ROOT, "src/data/statemachine.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "statemachine.ts data file should exist");
    });

    it("exports stateMachineNodes with 8+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const stateMachineNodes"),
        "Should export stateMachineNodes"
      );
      const nodeMatches = content.match(/id:\s*"sm-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 8,
        `Should have at least 8 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports stateMachineEdges with 10+ edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const stateMachineEdges"),
        "Should export stateMachineEdges"
      );
      const edgeMatches = content.match(/id:\s*"sm-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 10,
        `Should have at least 10 edges, found ${edgeMatches.length}`
      );
    });

    it("has an initial state node", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "initialState"'),
        "Should have an initialState node type"
      );
    });

    it("has final state nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const finalMatches = content.match(/type:\s*"finalState"/g);
      assert.ok(finalMatches, "Should have finalState nodes");
      assert.ok(
        finalMatches.length >= 2,
        `Should have at least 2 final states, found ${finalMatches.length}`
      );
    });

    it("has regular state nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const stateMatches = content.match(/type:\s*"stateNode"/g);
      assert.ok(stateMatches, "Should have stateNode nodes");
      assert.ok(
        stateMatches.length >= 6,
        `Should have at least 6 regular states, found ${stateMatches.length}`
      );
    });

    it("has order lifecycle states", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"Created"'), "Should have Created state");
      assert.ok(content.includes('"Confirmed"'), "Should have Confirmed state");
      assert.ok(content.includes('"Processing"'), "Should have Processing state");
      assert.ok(content.includes('"Shipped"'), "Should have Shipped state");
      assert.ok(content.includes('"Delivered"'), "Should have Delivered state");
    });

    it("has cancel and return states", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"Cancelled"'), "Should have Cancelled state");
      assert.ok(content.includes('"Returned"'), "Should have Returned state");
      assert.ok(content.includes('"Refunded"'), "Should have Refunded state");
    });

    it("edges have transition labels", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"place order"'), "Should have place order label");
      assert.ok(content.includes('"verify payment"'), "Should have verify payment label");
      assert.ok(content.includes('"cancel"'), "Should have cancel label");
      assert.ok(content.includes('"initiate return"'), "Should have initiate return label");
    });

    it("has cancel edges with red/dashed styling", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("#ef4444"), "Should have red stroke for cancel edges");
      assert.ok(
        content.includes('strokeDasharray: "6 3"'),
        "Should have dashed cancel edges"
      );
    });

    it("has happy path edges with indigo/animated styling", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes("#6366f1"), "Should have indigo stroke for happy path");
      assert.ok(content.includes("animated: true"), "Should have animated happy path edges");
    });

    it("uses smoothstep edge type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const smoothstepMatches = content.match(/type:\s*"smoothstep"/g);
      assert.ok(smoothstepMatches, "Should use smoothstep edge type");
      assert.ok(
        smoothstepMatches.length >= 10,
        `Should have smoothstep edges, found ${smoothstepMatches.length}`
      );
    });
  });

  describe("StateNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/statemachine/nodes/StateNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "StateNode.tsx should exist");
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

    it("has rounded rectangle styling", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("rounded-xl"), "Should have rounded-xl for rounded rectangle");
    });

    it("displays state label and description", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.label"), "Should display label");
      assert.ok(content.includes("nodeData.description"), "Should display description");
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

  describe("InitialStateNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/statemachine/nodes/InitialStateNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "InitialStateNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has filled circle styling (rounded-full with dark background)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("rounded-full"), "Should have rounded-full for circle");
      assert.ok(
        content.includes("bg-zinc-900") || content.includes("bg-black"),
        "Should have dark filled background"
      );
    });

    it("only has a source handle (no target)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('type="source"'), "Should have source handle");
      // Initial state typically has no target handle
      const targetCount = (content.match(/type="target"/g) || []).length;
      assert.equal(targetCount, 0, "Initial state should not have target handles");
    });
  });

  describe("FinalStateNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/statemachine/nodes/FinalStateNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "FinalStateNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has double circle styling (outer border + inner filled)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("rounded-full"), "Should have rounded-full for circle");
      assert.ok(
        content.includes("border-[3px]") || content.includes("border-2"),
        "Should have thick outer border"
      );
      // Should have inner filled circle
      const roundedFullCount = (content.match(/rounded-full/g) || []).length;
      assert.ok(
        roundedFullCount >= 2,
        `Should have double circle (2+ rounded-full), found ${roundedFullCount}`
      );
    });

    it("only has a target handle (no source)", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('type="target"'), "Should have target handle");
      const sourceCount = (content.match(/type="source"/g) || []).length;
      assert.equal(sourceCount, 0, "Final state should not have source handles");
    });
  });

  describe("StateMachineDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/statemachine/StateMachineDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(componentPath), "StateMachineDiagram.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("registers all three node types", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("stateNode: StateNode"), "Should register StateNode");
      assert.ok(content.includes("initialState: InitialStateNode"), "Should register InitialStateNode");
      assert.ok(content.includes("finalState: FinalStateNode"), "Should register FinalStateNode");
    });

    it("uses DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("DiagramWrapper"), "Should use DiagramWrapper");
    });

    it("passes nodeTypes to DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("nodeTypes={stateMachineNodeTypes}"),
        "Should pass nodeTypes"
      );
    });
  });

  describe("nodes barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/statemachine/nodes/index.ts"
    );

    it("barrel file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports all node types", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("StateNode"), "Should export StateNode");
      assert.ok(content.includes("InitialStateNode"), "Should export InitialStateNode");
      assert.ok(content.includes("FinalStateNode"), "Should export FinalStateNode");
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("imports StateMachineDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("StateMachineDiagram"),
        "DiagramContainer should import StateMachineDiagram"
      );
    });

    it("renders StateMachineDiagram for state-machine id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"state-machine"'),
        "DiagramContainer should handle state-machine diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("state-machine is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"state-machine"'),
        "State Machine should be in diagrams list"
      );
    });

    it("state-machine has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(content.includes('"State Machine"'), "Should have State Machine title");
      assert.ok(
        content.includes("finite state"),
        "Should have description mentioning finite state"
      );
    });
  });
});
