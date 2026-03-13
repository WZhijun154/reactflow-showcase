"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface MindMapNodeData {
  label: string;
  depth: number;
  [key: string]: unknown;
}

const depthStyles: Record<number, { bg: string; border: string; text: string; size: string }> = {
  0: {
    bg: "bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700",
    border: "border-indigo-600 dark:border-indigo-400",
    text: "text-white font-bold text-base",
    size: "min-w-[160px] px-6 py-4",
  },
  1: {
    bg: "bg-white dark:bg-zinc-800",
    border: "border-blue-400 dark:border-blue-500",
    text: "text-zinc-800 dark:text-zinc-100 font-semibold text-sm",
    size: "min-w-[120px] px-4 py-3",
  },
  2: {
    bg: "bg-zinc-50 dark:bg-zinc-900",
    border: "border-zinc-300 dark:border-zinc-600",
    text: "text-zinc-700 dark:text-zinc-300 font-medium text-xs",
    size: "min-w-[90px] px-3 py-2",
  },
};

const depthColors: Record<number, string> = {
  0: "#6366f1",
  1: "#3b82f6",
  2: "#94a3b8",
};

export function MindMapNode({ data }: NodeProps) {
  const nodeData = data as MindMapNodeData;
  const depth = nodeData.depth ?? 2;
  const style = depthStyles[depth] ?? depthStyles[2];
  const handleColor = depthColors[depth] ?? depthColors[2];

  return (
    <div
      className={`rounded-full border-2 ${style.border} ${style.bg} ${style.size} shadow-md text-center transition-all duration-200 hover:shadow-lg hover:scale-105`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: handleColor }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: handleColor }}
      />
      <div className={style.text}>{nodeData.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: handleColor }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: handleColor }}
      />
    </div>
  );
}
