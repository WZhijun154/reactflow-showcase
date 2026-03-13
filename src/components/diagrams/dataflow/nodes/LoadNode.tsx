"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface LoadNodeData {
  label: string;
  destination?: string;
  [key: string]: unknown;
}

export function LoadNode({ data }: NodeProps) {
  const nodeData = data as LoadNodeData;

  return (
    <div className="px-4 py-3 rounded-xl bg-green-50 dark:bg-green-950 border-2 border-green-400 dark:border-green-500 shadow-lg min-w-[150px] text-center transition-all duration-200 hover:shadow-xl hover:scale-105">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-green-500 !w-3 !h-3 !border-2 !border-white dark:!border-zinc-800"
      />
      <div className="text-lg mb-0.5">📥</div>
      <div className="font-semibold text-sm text-green-800 dark:text-green-200">
        {nodeData.label}
      </div>
      {nodeData.destination && (
        <div className="text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-medium">
          {nodeData.destination}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-green-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
