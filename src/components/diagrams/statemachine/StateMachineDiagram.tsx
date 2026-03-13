"use client";

import type { NodeTypes } from "@xyflow/react";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { StateNode, InitialStateNode, FinalStateNode } from "./nodes";
import { stateMachineNodes, stateMachineEdges } from "@/data/statemachine";

export const stateMachineNodeTypes: NodeTypes = {
  stateNode: StateNode,
  initialState: InitialStateNode,
  finalState: FinalStateNode,
};

export function StateMachineDiagram() {
  return (
    <DiagramWrapper
      initialNodes={stateMachineNodes}
      initialEdges={stateMachineEdges}
      nodeTypes={stateMachineNodeTypes}
      title="State Machine"
    />
  );
}
