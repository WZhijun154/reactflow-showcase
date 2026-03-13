"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface FirewallNodeData {
  label: string;
  zone: string;
  [key: string]: unknown;
}

export function FirewallNode({ data }: NodeProps) {
  const nodeData = data as FirewallNodeData;

  return (
    <div className="min-w-[140px] px-4 py-3 rounded-lg border-2 border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-950 shadow-md transition-all hover:shadow-lg hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#ef4444" }}
      />
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">🔥</span>
        <span className="font-bold text-sm text-red-700 dark:text-red-300">
          {nodeData.label}
        </span>
      </div>
      <div className="text-center mt-1">
        <span className="inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
          DMZ
        </span>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#ef4444" }}
      />
    </div>
  );
}
