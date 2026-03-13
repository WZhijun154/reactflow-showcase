"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { StageNode, GateNode, ParallelNode } from "./nodes";
import { workflowNodes, workflowEdges } from "@/data/workflow";

export const workflowNodeTypes: NodeTypes = {
  stageNode: StageNode,
  gateNode: GateNode,
  parallelNode: ParallelNode,
};

export function WorkflowDiagram() {
  return (
    <DiagramWrapper
      initialNodes={workflowNodes}
      initialEdges={workflowEdges}
      nodeTypes={workflowNodeTypes}
      title="Workflow / Pipeline"
    />
  );
}
