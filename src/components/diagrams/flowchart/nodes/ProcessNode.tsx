"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ProcessNodeData {
  label: string;
  [key: string]: unknown;
}

export function ProcessNode({ data }: NodeProps) {
  const nodeData = data as ProcessNodeData;
  return (
    <div className="px-5 py-3 rounded-lg bg-blue-500 text-white font-medium shadow-lg border-2 border-blue-600 min-w-[140px] text-center transition-shadow hover:shadow-xl">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-blue-700 !w-3 !h-3 !border-2 !border-white"
      />
      {nodeData.label}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-blue-700 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
