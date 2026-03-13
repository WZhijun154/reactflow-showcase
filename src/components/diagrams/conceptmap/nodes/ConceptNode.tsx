"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ConceptNodeData {
  label: string;
  category?: "core" | "paradigm" | "algorithm" | "application" | "technique";
  importance?: "high" | "medium" | "low";
  [key: string]: unknown;
}

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  core: {
    bg: "bg-rose-100 dark:bg-rose-900",
    border: "border-rose-400 dark:border-rose-500",
    text: "text-rose-800 dark:text-rose-200",
  },
  paradigm: {
    bg: "bg-sky-100 dark:bg-sky-900",
    border: "border-sky-400 dark:border-sky-500",
    text: "text-sky-800 dark:text-sky-200",
  },
  algorithm: {
    bg: "bg-violet-100 dark:bg-violet-900",
    border: "border-violet-400 dark:border-violet-500",
    text: "text-violet-800 dark:text-violet-200",
  },
  application: {
    bg: "bg-emerald-100 dark:bg-emerald-900",
    border: "border-emerald-400 dark:border-emerald-500",
    text: "text-emerald-800 dark:text-emerald-200",
  },
  technique: {
    bg: "bg-amber-100 dark:bg-amber-900",
    border: "border-amber-400 dark:border-amber-500",
    text: "text-amber-800 dark:text-amber-200",
  },
};

const importanceSizes: Record<string, string> = {
  high: "min-w-[160px] px-5 py-4 text-base",
  medium: "min-w-[130px] px-4 py-3 text-sm",
  low: "min-w-[100px] px-3 py-2 text-xs",
};

export function ConceptNode({ data }: NodeProps) {
  const nodeData = data as ConceptNodeData;
  const category = nodeData.category ?? "core";
  const importance = nodeData.importance ?? "medium";
  const colors = categoryColors[category] ?? categoryColors.core;
  const size = importanceSizes[importance] ?? importanceSizes.medium;

  return (
    <div
      className={`rounded-full ${colors.bg} ${colors.border} border-2 shadow-md text-center transition-all duration-200 hover:shadow-lg hover:scale-105 ${size}`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <Handle
        type="target"
        position={Position.Bottom}
        id="target-bottom"
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <div className={`font-semibold ${colors.text} whitespace-nowrap`}>
        {nodeData.label}
      </div>
      <Handle
        type="source"
        position={Position.Top}
        id="source-top"
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
      <Handle
        type="source"
        position={Position.Left}
        id="source-left"
        className="!bg-zinc-400 !w-2 !h-2 !border-2 !border-white dark:!border-zinc-800 !rounded-full"
      />
    </div>
  );
}
