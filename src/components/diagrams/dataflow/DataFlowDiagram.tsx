"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { SourceNode } from "./nodes/SourceNode";
import { TransformNode } from "./nodes/TransformNode";
import { LoadNode } from "./nodes/LoadNode";
import { StorageNode } from "./nodes/StorageNode";
import { dataFlowNodes, dataFlowEdges } from "@/data/dataflow";

export const dataFlowNodeTypes: NodeTypes = {
  source: SourceNode,
  transform: TransformNode,
  load: LoadNode,
  storage: StorageNode,
};

export function DataFlowDiagram() {
  return (
    <DiagramWrapper
      initialNodes={dataFlowNodes}
      initialEdges={dataFlowEdges}
      nodeTypes={dataFlowNodeTypes}
      title="Data Flow Diagram"
    />
  );
}
