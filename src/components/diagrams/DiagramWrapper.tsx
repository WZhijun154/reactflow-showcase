"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  type EdgeTypes,
  type OnConnect,
  type ColorMode,
  addEdge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { useTheme } from "@/app/providers/ThemeProvider";

interface DiagramWrapperProps {
  initialNodes: Node[];
  initialEdges: Edge[];
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  title: string;
}

function DiagramCanvas({
  initialNodes,
  initialEdges,
  nodeTypes,
  edgeTypes,
}: Omit<DiagramWrapperProps, "title">) {
  const { theme } = useTheme();
  const colorMode: ColorMode = theme === "dark" ? "dark" : "light";

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <div className="h-[calc(100vh-200px)] min-h-[400px] w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        colorMode={colorMode}
        proOptions={{ hideAttribution: true }}
        defaultEdgeOptions={{
          animated: true,
          style: { strokeWidth: 2 },
        }}
      >
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        <MiniMap
          zoomable
          pannable
          className="!bg-zinc-100 dark:!bg-zinc-800 !border-zinc-300 dark:!border-zinc-600"
        />
        <Controls
          className="!bg-white dark:!bg-zinc-700 !border-zinc-300 dark:!border-zinc-600 !shadow-md"
          showInteractive={false}
        />
      </ReactFlow>
    </div>
  );
}

export function DiagramWrapper({
  initialNodes,
  initialEdges,
  nodeTypes,
  edgeTypes,
}: DiagramWrapperProps) {
  return (
    <ReactFlowProvider>
      <DiagramCanvas
        initialNodes={initialNodes}
        initialEdges={initialEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      />
    </ReactFlowProvider>
  );
}
