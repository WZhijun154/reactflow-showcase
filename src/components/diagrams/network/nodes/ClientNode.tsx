"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ClientNodeData {
  label: string;
  zone: string;
  icon?: string;
  [key: string]: unknown;
}

export function ClientNode({ data }: NodeProps) {
  const nodeData = data as ClientNodeData;

  return (
    <div className="min-w-[120px] px-4 py-3 rounded-full border-2 border-violet-400 dark:border-violet-500 bg-violet-50 dark:bg-violet-950 shadow-md transition-all hover:shadow-lg hover:scale-105">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">{nodeData.icon ?? "👤"}</span>
        <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
          {nodeData.label}
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#8b5cf6" }}
      />
    </div>
  );
}
