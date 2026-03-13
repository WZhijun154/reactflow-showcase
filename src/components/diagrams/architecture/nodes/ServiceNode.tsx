"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ServiceNodeData {
  label: string;
  icon?: string;
  tier?: "frontend" | "backend" | "data" | "infrastructure";
  [key: string]: unknown;
}

const tierColors: Record<string, { bg: string; border: string; badge: string }> = {
  frontend: { bg: "bg-blue-50 dark:bg-blue-950", border: "border-blue-400 dark:border-blue-500", badge: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" },
  backend: { bg: "bg-green-50 dark:bg-green-950", border: "border-green-400 dark:border-green-500", badge: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300" },
  data: { bg: "bg-orange-50 dark:bg-orange-950", border: "border-orange-400 dark:border-orange-500", badge: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300" },
  infrastructure: { bg: "bg-purple-50 dark:bg-purple-950", border: "border-purple-400 dark:border-purple-500", badge: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300" },
};

export function ServiceNode({ data }: NodeProps) {
  const nodeData = data as ServiceNodeData;
  const tier = nodeData.tier ?? "backend";
  const colors = tierColors[tier] ?? tierColors.backend;

  return (
    <div
      className={`px-4 py-3 rounded-xl ${colors.bg} ${colors.border} border-2 shadow-lg min-w-[150px] text-center transition-all duration-200 hover:shadow-xl hover:scale-105`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-zinc-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      {nodeData.icon && (
        <div className="text-2xl mb-1">{nodeData.icon}</div>
      )}
      <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
        {nodeData.label}
      </div>
      <div className={`text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block ${colors.badge} font-medium`}>
        {tier}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-zinc-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
