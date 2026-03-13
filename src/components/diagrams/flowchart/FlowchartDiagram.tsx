"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { StartNode } from "./nodes/StartNode";
import { EndNode } from "./nodes/EndNode";
import { DecisionNode } from "./nodes/DecisionNode";
import { ProcessNode } from "./nodes/ProcessNode";
import { flowchartNodes, flowchartEdges } from "@/data/flowchart";

export const flowchartNodeTypes: NodeTypes = {
  start: StartNode,
  end: EndNode,
  decision: DecisionNode,
  process: ProcessNode,
};

export function FlowchartDiagram() {
  return (
    <DiagramWrapper
      initialNodes={flowchartNodes}
      initialEdges={flowchartEdges}
      nodeTypes={flowchartNodeTypes}
      title="Flowchart"
    />
  );
}
