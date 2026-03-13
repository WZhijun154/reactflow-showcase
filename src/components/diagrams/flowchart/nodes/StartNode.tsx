"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface StartNodeData {
  label: string;
  [key: string]: unknown;
}

export function StartNode({ data }: NodeProps) {
  const nodeData = data as StartNodeData;
  return (
    <div className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold shadow-lg border-2 border-emerald-600 min-w-[100px] text-center transition-shadow hover:shadow-xl">
      {nodeData.label}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-emerald-700 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
