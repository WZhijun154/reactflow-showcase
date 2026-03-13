"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { ServerNode, LoadBalancerNode, ClientNode, FirewallNode, CloudNode } from "./nodes";
import { networkNodes, networkEdges } from "@/data/network";

export const networkNodeTypes: NodeTypes = {
  serverNode: ServerNode,
  loadBalancerNode: LoadBalancerNode,
  clientNode: ClientNode,
  firewallNode: FirewallNode,
  cloudNode: CloudNode,
};

export function NetworkTopologyDiagram() {
  return (
    <DiagramWrapper
      initialNodes={networkNodes}
      initialEdges={networkEdges}
      nodeTypes={networkNodeTypes}
      title="Network Topology"
    />
  );
}
