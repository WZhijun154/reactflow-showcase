"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { ConceptNode } from "./nodes/ConceptNode";
import { conceptMapNodes, conceptMapEdges } from "@/data/conceptmap";

export const conceptMapNodeTypes: NodeTypes = {
  concept: ConceptNode,
};

export function ConceptMapDiagram() {
  return (
    <DiagramWrapper
      initialNodes={conceptMapNodes}
      initialEdges={conceptMapEdges}
      nodeTypes={conceptMapNodeTypes}
      title="Concept Map"
    />
  );
}
