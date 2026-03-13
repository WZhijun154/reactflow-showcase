"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ServerNodeData {
  label: string;
  zone: string;
  os?: string;
  cpu?: string;
  [key: string]: unknown;
}

const zoneColors: Record<string, { border: string; badge: string }> = {
  internal: {
    border: "border-blue-400 dark:border-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  dmz: {
    border: "border-amber-400 dark:border-amber-500",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
  },
  external: {
    border: "border-red-400 dark:border-red-500",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
};

export function ServerNode({ data }: NodeProps) {
  const nodeData = data as ServerNodeData;
  const colors = zoneColors[nodeData.zone] ?? zoneColors.internal;

  return (
    <div className={`min-w-[140px] px-3 py-2.5 rounded-lg border-2 ${colors.border} bg-white dark:bg-zinc-800 shadow-md transition-all hover:shadow-lg hover:scale-105`}>
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#3b82f6" }}
      />
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🖥️</span>
        <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
          {nodeData.label}
        </span>
      </div>
      {nodeData.os && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">{nodeData.os}</div>
      )}
      {nodeData.cpu && (
        <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded-full ${colors.badge}`}>
          {nodeData.cpu}
        </span>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#3b82f6" }}
      />
    </div>
  );
}
