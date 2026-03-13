"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ParallelNodeData {
  label: string;
  branches: string[];
  [key: string]: unknown;
}

export function ParallelNode({ data }: NodeProps) {
  const nodeData = data as ParallelNodeData;

  return (
    <div className="min-w-[180px] px-4 py-3 rounded-xl border-2 border-dashed border-indigo-400 dark:border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30 shadow-md transition-all hover:shadow-lg hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
      <div className="text-center">
        <div className="text-lg mb-1">⑃</div>
        <div className="font-bold text-sm text-indigo-700 dark:text-indigo-300">
          {nodeData.label}
        </div>
        <div className="text-xs text-indigo-500 dark:text-indigo-400 mt-1">
          {nodeData.branches.length} branches
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
