"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface StageNodeData {
  label: string;
  description?: string;
  status: "success" | "running" | "pending" | "failed";
  [key: string]: unknown;
}

const statusConfig: Record<
  string,
  { bg: string; border: string; icon: string; text: string }
> = {
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-emerald-400 dark:border-emerald-500",
    icon: "✅",
    text: "text-emerald-700 dark:text-emerald-300",
  },
  running: {
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-blue-400 dark:border-blue-500",
    icon: "🔄",
    text: "text-blue-700 dark:text-blue-300",
  },
  pending: {
    bg: "bg-zinc-50 dark:bg-zinc-800",
    border: "border-zinc-300 dark:border-zinc-600",
    icon: "⏳",
    text: "text-zinc-500 dark:text-zinc-400",
  },
  failed: {
    bg: "bg-red-50 dark:bg-red-950/40",
    border: "border-red-400 dark:border-red-500",
    icon: "❌",
    text: "text-red-700 dark:text-red-300",
  },
};

export function StageNode({ data }: NodeProps) {
  const nodeData = data as StageNodeData;
  const config = statusConfig[nodeData.status] ?? statusConfig.pending;

  return (
    <div
      className={`min-w-[180px] px-4 py-3 rounded-lg border-2 shadow-md transition-all hover:shadow-lg hover:scale-105 ${config.bg} ${config.border}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
      <div className="flex items-center gap-2">
        <span className="text-lg">{config.icon}</span>
        <div>
          <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
            {nodeData.label}
          </div>
          {nodeData.description && (
            <div className={`text-xs mt-0.5 ${config.text}`}>
              {nodeData.description}
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
    </div>
  );
}
