"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface SourceNodeData {
  label: string;
  icon?: string;
  format?: string;
  [key: string]: unknown;
}

export function SourceNode({ data }: NodeProps) {
  const nodeData = data as SourceNodeData;

  return (
    <div className="px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-950 border-2 border-blue-400 dark:border-blue-500 shadow-lg min-w-[140px] text-center transition-all hover:shadow-xl hover:scale-105">
      {nodeData.icon && (
        <div className="text-2xl mb-1">{nodeData.icon}</div>
      )}
      <div className="font-semibold text-sm text-blue-800 dark:text-blue-200">
        {nodeData.label}
      </div>
      {nodeData.format && (
        <div className="text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-medium">
          {nodeData.format}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-blue-500 !w-3 !h-3 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
