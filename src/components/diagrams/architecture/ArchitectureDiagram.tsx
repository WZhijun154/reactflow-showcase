"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { ServiceNode } from "./nodes/ServiceNode";
import { DatabaseNode } from "./nodes/DatabaseNode";
import { APIGatewayNode } from "./nodes/APIGatewayNode";
import { QueueNode } from "./nodes/QueueNode";
import { architectureNodes, architectureEdges } from "@/data/architecture";

export const architectureNodeTypes: NodeTypes = {
  service: ServiceNode,
  database: DatabaseNode,
  apiGateway: APIGatewayNode,
  queue: QueueNode,
};

export function ArchitectureDiagram() {
  return (
    <DiagramWrapper
      initialNodes={architectureNodes}
      initialEdges={architectureEdges}
      nodeTypes={architectureNodeTypes}
      title="Architecture Diagram"
    />
  );
}
