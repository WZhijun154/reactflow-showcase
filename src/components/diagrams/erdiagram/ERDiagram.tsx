"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { EntityNode } from "./nodes";
import { erDiagramNodes, erDiagramEdges } from "@/data/erdiagram";

export const erDiagramNodeTypes: NodeTypes = {
  entityNode: EntityNode,
};

export function ERDiagram() {
  return (
    <DiagramWrapper
      initialNodes={erDiagramNodes}
      initialEdges={erDiagramEdges}
      nodeTypes={erDiagramNodeTypes}
      title="ER Diagram"
    />
  );
}
