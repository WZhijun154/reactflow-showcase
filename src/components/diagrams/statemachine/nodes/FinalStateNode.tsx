"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

export function FinalStateNode({ data }: NodeProps) {
  const nodeData = data as { label: string; [key: string]: unknown };

  return (
    <div className="flex items-center justify-center w-14 h-14 rounded-full border-[3px] border-zinc-900 dark:border-zinc-100 bg-transparent shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl">
      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-900 dark:bg-zinc-100">
        <span className="text-[10px] font-bold text-white dark:text-zinc-900">
          {nodeData.label}
        </span>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
    </div>
  );
}
