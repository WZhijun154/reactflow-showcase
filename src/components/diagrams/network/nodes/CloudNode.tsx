"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface CloudNodeData {
  label: string;
  zone: string;
  provider?: string;
  [key: string]: unknown;
}

export function CloudNode({ data }: NodeProps) {
  const nodeData = data as CloudNodeData;

  return (
    <div className="min-w-[130px] px-4 py-3 rounded-2xl border-2 border-sky-400 dark:border-sky-500 bg-sky-50 dark:bg-sky-950 shadow-md transition-all hover:shadow-lg hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#0ea5e9" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#0ea5e9" }}
      />
      <div className="text-center">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="text-lg">☁️</span>
          <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
            {nodeData.label}
          </span>
        </div>
        {nodeData.provider && (
          <div className="text-[10px] text-sky-600 dark:text-sky-400">
            {nodeData.provider}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#0ea5e9" }}
      />
    </div>
  );
}
