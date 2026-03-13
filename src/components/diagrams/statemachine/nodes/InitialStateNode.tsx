"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

export function InitialStateNode({ data }: NodeProps) {
  const nodeData = data as { label: string; [key: string]: unknown };

  return (
    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 dark:bg-zinc-100 shadow-lg transition-all hover:scale-110 hover:shadow-xl">
      <span className="text-xs font-bold text-white dark:text-zinc-900 sr-only">
        {nodeData.label}
      </span>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !border-2 !border-zinc-900 dark:!border-zinc-100"
        style={{ backgroundColor: "#6366f1" }}
      />
    </div>
  );
}
