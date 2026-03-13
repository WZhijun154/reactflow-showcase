"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface APIGatewayNodeData {
  label: string;
  [key: string]: unknown;
}

export function APIGatewayNode({ data }: NodeProps) {
  const nodeData = data as APIGatewayNodeData;

  return (
    <div className="relative flex items-center justify-center min-w-[140px] transition-all duration-200 hover:scale-105 hover:drop-shadow-lg">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-blue-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      {/* Hexagonal shape via clip-path */}
      <div
        className="px-6 py-4 bg-blue-500 dark:bg-blue-600 text-white shadow-lg text-center"
        style={{
          clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          minWidth: "160px",
          minHeight: "70px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-lg mb-0.5">🌐</div>
        <div className="font-bold text-sm">{nodeData.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-blue-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
