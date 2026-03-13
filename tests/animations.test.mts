import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-011: Smooth animations, interaction polish, and edge styling", () => {
  describe("diagrams.css shared animation stylesheet", () => {
    const cssPath = join(ROOT, "src/app/diagrams.css");

    it("diagrams.css exists", () => {
      assert.ok(existsSync(cssPath), "diagrams.css should exist");
    });

    it("defines diagram-fade-in keyframes animation", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes("@keyframes diagram-fade-in"),
        "Should define diagram-fade-in keyframes",
      );
    });

    it("defines diagram-enter animation class", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".diagram-enter"),
        "Should define .diagram-enter class",
      );
      assert.ok(
        content.includes("animation: diagram-fade-in"),
        "diagram-enter should use diagram-fade-in animation",
      );
    });

    it("has selected node glow styling", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".react-flow__node.selected"),
        "Should style .react-flow__node.selected",
      );
      assert.ok(
        content.includes("box-shadow"),
        "Selected node should have box-shadow glow",
      );
    });

    it("has dark mode selected node glow", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(":where(.dark) .react-flow__node.selected"),
        "Should have dark mode selected node styling",
      );
    });

    it("has edge hover styles for thicker stroke", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".react-flow__edge:hover path"),
        "Should style edge hover",
      );
      assert.ok(
        content.includes("stroke-width"),
        "Edge hover should increase stroke-width",
      );
    });

    it("has edge path transition for smooth hover effect", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".react-flow__edge path"),
        "Should target edge path for transitions",
      );
      assert.ok(
        content.includes("transition:"),
        "Should have transition on edge paths",
      );
    });

    it("has edge hover glow/filter effect", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes("drop-shadow"),
        "Edge hover should have drop-shadow filter",
      );
    });

    it("has dark mode edge hover styling", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(":where(.dark) .react-flow__edge:hover"),
        "Should have dark mode edge hover styling",
      );
    });

    it("has animated edge dash animation", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".react-flow__edge.animated path"),
        "Should target animated edge paths",
      );
    });

    it("uses will-change for smooth viewport transforms", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".react-flow__viewport"),
        "Should target viewport for GPU optimization",
      );
      assert.ok(
        content.includes("will-change: transform"),
        "Should use will-change for smooth pan/zoom",
      );
    });

    it("has react-flow node hover filter", () => {
      const content = readFileSync(cssPath, "utf-8");
      assert.ok(
        content.includes(".react-flow__node:hover"),
        "Should have fallback node hover styling",
      );
    });
  });

  describe("globals.css imports diagrams.css", () => {
    it("globals.css imports diagrams.css", () => {
      const content = readFileSync(
        join(ROOT, "src/app/globals.css"),
        "utf-8",
      );
      assert.ok(
        content.includes('@import "./diagrams.css"'),
        "globals.css should import diagrams.css",
      );
    });
  });

  describe("DiagramContainer fade-in transition", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx",
    );

    it("DiagramContainer uses diagram-enter class", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("diagram-enter"),
        "Should apply diagram-enter class for fade-in animation",
      );
    });

    it("DiagramContainer re-triggers animation on diagram change", () => {
      const content = readFileSync(containerPath, "utf-8");
      // Should use a key that changes when diagram changes
      assert.ok(
        content.includes("key={animKey}") || content.includes("key="),
        "Should use a key prop to re-trigger animation",
      );
      assert.ok(
        content.includes("diagram.id"),
        "Should react to diagram.id changes",
      );
    });

    it("imports useEffect and useState for animation key", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("useEffect"),
        "Should import useEffect",
      );
      assert.ok(
        content.includes("useState"),
        "Should import useState",
      );
    });
  });

  describe("Custom nodes have consistent transition-all duration-200", () => {
    const nodeFiles = [
      "flowchart/nodes/ProcessNode.tsx",
      "flowchart/nodes/StartNode.tsx",
      "flowchart/nodes/EndNode.tsx",
      "flowchart/nodes/DecisionNode.tsx",
      "architecture/nodes/ServiceNode.tsx",
      "architecture/nodes/DatabaseNode.tsx",
      "architecture/nodes/APIGatewayNode.tsx",
      "architecture/nodes/QueueNode.tsx",
      "dataflow/nodes/SourceNode.tsx",
      "dataflow/nodes/TransformNode.tsx",
      "dataflow/nodes/LoadNode.tsx",
      "dataflow/nodes/StorageNode.tsx",
      "conceptmap/nodes/ConceptNode.tsx",
      "orgchart/nodes/OrgNode.tsx",
      "mindmap/nodes/MindMapNode.tsx",
      "statemachine/nodes/StateNode.tsx",
      "statemachine/nodes/InitialStateNode.tsx",
      "statemachine/nodes/FinalStateNode.tsx",
      "network/nodes/ServerNode.tsx",
      "network/nodes/ClientNode.tsx",
      "network/nodes/CloudNode.tsx",
      "network/nodes/FirewallNode.tsx",
      "network/nodes/LoadBalancerNode.tsx",
      "erdiagram/nodes/EntityNode.tsx",
      "workflow/nodes/StageNode.tsx",
      "workflow/nodes/GateNode.tsx",
      "workflow/nodes/ParallelNode.tsx",
    ];

    for (const nodeFile of nodeFiles) {
      const name = nodeFile.split("/").pop()?.replace(".tsx", "") ?? nodeFile;

      it(`${name} has transition-all duration-200`, () => {
        const filePath = join(
          ROOT,
          "src/components/diagrams",
          nodeFile,
        );
        assert.ok(existsSync(filePath), `${nodeFile} should exist`);
        const content = readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes("transition-all duration-200") ||
            content.includes("transition-all") && content.includes("duration-200"),
          `${name} should have transition-all duration-200 classes`,
        );
      });

      it(`${name} has hover effect (shadow or scale)`, () => {
        const filePath = join(
          ROOT,
          "src/components/diagrams",
          nodeFile,
        );
        const content = readFileSync(filePath, "utf-8");
        const hasHoverShadow =
          content.includes("hover:shadow-xl") ||
          content.includes("hover:shadow-lg") ||
          content.includes("hover:drop-shadow");
        const hasHoverScale =
          content.includes("hover:scale-105") ||
          content.includes("hover:scale-110") ||
          content.includes("hover:scale-[1.02]");
        assert.ok(
          hasHoverShadow || hasHoverScale,
          `${name} should have hover effect (shadow or scale change)`,
        );
      });
    }
  });

  describe("Edge animation data patterns", () => {
    it("DiagramWrapper default edges set animated:true", () => {
      const content = readFileSync(
        join(ROOT, "src/components/diagrams/DiagramWrapper.tsx"),
        "utf-8",
      );
      assert.ok(
        content.includes("animated: true"),
        "Default edge options should include animated: true",
      );
    });

    it("DiagramWrapper default edges have strokeWidth", () => {
      const content = readFileSync(
        join(ROOT, "src/components/diagrams/DiagramWrapper.tsx"),
        "utf-8",
      );
      assert.ok(
        content.includes("strokeWidth"),
        "Default edge options should specify strokeWidth",
      );
    });

    it("some data files use selective animated edges", () => {
      // At least some data files should use animated prop on edges
      const dataFiles = [
        "flowchart.ts",
        "architecture.ts",
        "dataflow.ts",
        "statemachine.ts",
        "network.ts",
        "workflow.ts",
      ];
      let filesWithAnimated = 0;
      for (const file of dataFiles) {
        const content = readFileSync(
          join(ROOT, "src/data", file),
          "utf-8",
        );
        if (content.includes("animated")) {
          filesWithAnimated++;
        }
      }
      assert.ok(
        filesWithAnimated >= 4,
        `At least 4 data files should use animated prop, found ${filesWithAnimated}`,
      );
    });
  });

  describe("Node base styling consistency", () => {
    const nodeFiles = [
      "flowchart/nodes/ProcessNode.tsx",
      "flowchart/nodes/StartNode.tsx",
      "flowchart/nodes/EndNode.tsx",
      "architecture/nodes/ServiceNode.tsx",
      "dataflow/nodes/SourceNode.tsx",
      "dataflow/nodes/TransformNode.tsx",
      "dataflow/nodes/LoadNode.tsx",
      "conceptmap/nodes/ConceptNode.tsx",
      "orgchart/nodes/OrgNode.tsx",
      "mindmap/nodes/MindMapNode.tsx",
      "statemachine/nodes/StateNode.tsx",
      "network/nodes/ServerNode.tsx",
      "network/nodes/ClientNode.tsx",
      "network/nodes/CloudNode.tsx",
      "network/nodes/FirewallNode.tsx",
      "network/nodes/LoadBalancerNode.tsx",
      "erdiagram/nodes/EntityNode.tsx",
      "workflow/nodes/StageNode.tsx",
      "workflow/nodes/ParallelNode.tsx",
    ];

    for (const nodeFile of nodeFiles) {
      const name = nodeFile.split("/").pop()?.replace(".tsx", "") ?? nodeFile;

      it(`${name} has shadow styling`, () => {
        const filePath = join(
          ROOT,
          "src/components/diagrams",
          nodeFile,
        );
        const content = readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes("shadow-lg") ||
            content.includes("shadow-md") ||
            content.includes("shadow-sm") ||
            content.includes("drop-shadow"),
          `${name} should have shadow styling`,
        );
      });

      it(`${name} has border-radius (rounded)`, () => {
        const filePath = join(
          ROOT,
          "src/components/diagrams",
          nodeFile,
        );
        const content = readFileSync(filePath, "utf-8");
        assert.ok(
          content.includes("rounded-") || content.includes("rounded"),
          `${name} should have border-radius styling`,
        );
      });
    }
  });

  describe("GPU acceleration and smooth viewport", () => {
    it("diagrams.css optimizes viewport for smooth pan/zoom", () => {
      const content = readFileSync(
        join(ROOT, "src/app/diagrams.css"),
        "utf-8",
      );
      assert.ok(
        content.includes("will-change"),
        "Should use will-change for GPU acceleration",
      );
    });

    it("MiniMap has transition styling", () => {
      const content = readFileSync(
        join(ROOT, "src/app/diagrams.css"),
        "utf-8",
      );
      assert.ok(
        content.includes(".react-flow__minimap"),
        "Should have MiniMap transition styling",
      );
    });
  });
});
