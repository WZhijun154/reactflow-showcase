"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface DecisionNodeData {
  label: string;
  [key: string]: unknown;
}

export function DecisionNode({ data }: NodeProps) {
  const nodeData = data as DecisionNodeData;
  return (
    <div className="relative w-[160px] h-[160px] flex items-center justify-center">
      {/* Diamond shape via rotated square */}
      <div className="absolute w-[120px] h-[120px] bg-amber-400 border-2 border-amber-500 shadow-lg rotate-45 rounded-md transition-all duration-200 hover:shadow-xl hover:scale-105" />
      {/* Label (counter-rotated so text is readable) */}
      <span className="relative z-10 text-sm font-semibold text-amber-900 text-center px-2 max-w-[100px] leading-tight">
        {nodeData.label}
      </span>
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-amber-600 !w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="yes"
        className="!bg-amber-600 !w-3 !h-3 !border-2 !border-white"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="no"
        className="!bg-amber-600 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
