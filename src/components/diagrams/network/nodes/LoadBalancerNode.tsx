"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface LoadBalancerNodeData {
  label: string;
  zone: string;
  algorithm?: string;
  [key: string]: unknown;
}

export function LoadBalancerNode({ data }: NodeProps) {
  const nodeData = data as LoadBalancerNodeData;

  return (
    <div className="min-w-[150px] px-3 py-2.5 rounded-lg border-2 border-emerald-400 dark:border-emerald-500 bg-emerald-50 dark:bg-emerald-950 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
      style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)" }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#10b981" }}
      />
      <div className="text-center px-4">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <span className="text-lg">⚖️</span>
          <span className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
            {nodeData.label}
          </span>
        </div>
        {nodeData.algorithm && (
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
            {nodeData.algorithm}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#10b981" }}
      />
    </div>
  );
}
