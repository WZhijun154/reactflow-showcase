"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface StorageNodeData {
  label: string;
  storageType?: string;
  [key: string]: unknown;
}

export function StorageNode({ data }: NodeProps) {
  const nodeData = data as StorageNodeData;

  return (
    <div className="relative px-4 py-3 min-w-[140px] text-center transition-all hover:shadow-xl hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-indigo-500 !w-3 !h-3 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!bg-indigo-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      {/* Cylinder shape */}
      <div className="bg-indigo-50 dark:bg-indigo-950 border-2 border-indigo-400 dark:border-indigo-500 rounded-lg shadow-lg overflow-hidden">
        <div className="w-full h-3 bg-indigo-200 dark:bg-indigo-800 rounded-t-[50%] border-b border-indigo-300 dark:border-indigo-600" />
        <div className="px-3 py-2">
          <div className="text-lg mb-0.5">🗄️</div>
          <div className="font-semibold text-sm text-indigo-800 dark:text-indigo-200">
            {nodeData.label}
          </div>
          {nodeData.storageType && (
            <div className="text-[10px] mt-1 px-2 py-0.5 rounded-full inline-block bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-medium">
              {nodeData.storageType}
            </div>
          )}
        </div>
        <div className="w-full h-2 bg-indigo-200 dark:bg-indigo-800 rounded-b-[50%] border-t border-indigo-300 dark:border-indigo-600" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-indigo-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="!bg-indigo-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
