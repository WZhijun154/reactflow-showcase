"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface EndNodeData {
  label: string;
  [key: string]: unknown;
}

export function EndNode({ data }: NodeProps) {
  const nodeData = data as EndNodeData;
  return (
    <div className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold shadow-lg border-2 border-red-600 min-w-[100px] text-center transition-shadow hover:shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-red-700 !w-3 !h-3 !border-2 !border-white"
      />
      {nodeData.label}
    </div>
  );
}
