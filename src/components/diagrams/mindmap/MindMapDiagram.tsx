"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { MindMapNode } from "./nodes/MindMapNode";
import { mindMapNodes, mindMapEdges } from "@/data/mindmap";

export const mindMapNodeTypes: NodeTypes = {
  mindMapNode: MindMapNode,
};

export function MindMapDiagram() {
  return (
    <DiagramWrapper
      initialNodes={mindMapNodes}
      initialEdges={mindMapEdges}
      nodeTypes={mindMapNodeTypes}
      title="Mind Map"
    />
  );
}
