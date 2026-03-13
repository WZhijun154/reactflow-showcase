"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface TransformNodeData {
  label: string;
  operation?: string;
  [key: string]: unknown;
}

export function TransformNode({ data }: NodeProps) {
  const nodeData = data as TransformNodeData;

  return (
    <div className="px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-950 border-2 border-amber-400 dark:border-amber-500 shadow-lg min-w-[150px] text-center transition-all hover:shadow-xl hover:scale-105">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-amber-500 !w-3 !h-3 !border-2 !border-white dark:!border-zinc-800"
      />
      <div className="text-lg mb-0.5">⚙️</div>
      <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">
        {nodeData.label}
      </div>
      {nodeData.operation && (
        <div className="text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 font-medium">
          {nodeData.operation}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-amber-500 !w-3 !h-3 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!bg-amber-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
