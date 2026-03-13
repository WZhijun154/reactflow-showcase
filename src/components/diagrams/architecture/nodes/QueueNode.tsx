"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface QueueNodeData {
  label: string;
  [key: string]: unknown;
}

export function QueueNode({ data }: NodeProps) {
  const nodeData = data as QueueNodeData;

  return (
    <div className="relative flex items-center justify-center min-w-[140px] transition-all hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-purple-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-purple-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      {/* Parallelogram shape via clip-path */}
      <div
        className="px-6 py-3 bg-purple-500 dark:bg-purple-600 text-white shadow-lg text-center"
        style={{
          clipPath: "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)",
          minWidth: "170px",
          minHeight: "55px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-base mb-0.5">📨</div>
        <div className="font-semibold text-sm">{nodeData.label}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-purple-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-purple-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
