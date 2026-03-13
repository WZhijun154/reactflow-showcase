"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { OrgNode } from "./nodes/OrgNode";
import { orgChartNodes, orgChartEdges } from "@/data/orgchart";

export const orgChartNodeTypes: NodeTypes = {
  orgNode: OrgNode,
};

export function OrgChartDiagram() {
  return (
    <DiagramWrapper
      initialNodes={orgChartNodes}
      initialEdges={orgChartEdges}
      nodeTypes={orgChartNodeTypes}
      title="Org Chart"
    />
  );
}
