"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface StateNodeData {
  label: string;
  description?: string;
  [key: string]: unknown;
}

export function StateNode({ data }: NodeProps) {
  const nodeData = data as StateNodeData;

  return (
    <div className="min-w-[140px] px-4 py-3 rounded-xl border-2 border-indigo-400 dark:border-indigo-500 bg-white dark:bg-zinc-800 shadow-md transition-all hover:shadow-lg hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="right"
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#8b5cf6" }}
      />
      <div className="text-center">
        <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-100">
          {nodeData.label}
        </div>
        {nodeData.description && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {nodeData.description}
          </div>
        )}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#6366f1" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-2 !h-2 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#8b5cf6" }}
      />
    </div>
  );
}
