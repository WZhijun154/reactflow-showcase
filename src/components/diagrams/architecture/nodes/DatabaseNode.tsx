"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface DatabaseNodeData {
  label: string;
  dbType?: string;
  [key: string]: unknown;
}

export function DatabaseNode({ data }: NodeProps) {
  const nodeData = data as DatabaseNodeData;

  return (
    <div className="relative flex flex-col items-center min-w-[130px] transition-all hover:scale-105">
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-orange-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800 !top-0"
      />
      {/* Cylinder top ellipse */}
      <div className="w-full h-4 rounded-[50%] bg-orange-400 dark:bg-orange-500 border-2 border-orange-500 dark:border-orange-600 relative z-10" />
      {/* Cylinder body */}
      <div className="w-full -mt-2 px-4 py-4 pb-2 bg-orange-100 dark:bg-orange-950 border-x-2 border-orange-500 dark:border-orange-600 text-center">
        <div className="font-semibold text-sm text-orange-900 dark:text-orange-100">
          {nodeData.label}
        </div>
        {nodeData.dbType && (
          <div className="text-[10px] text-orange-600 dark:text-orange-400 mt-0.5 font-medium">
            {nodeData.dbType}
          </div>
        )}
      </div>
      {/* Cylinder bottom ellipse */}
      <div className="w-full h-4 rounded-[50%] bg-orange-400 dark:bg-orange-500 border-2 border-orange-500 dark:border-orange-600 -mt-2 relative z-10" />
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-orange-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800 !bottom-0"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!bg-orange-600 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
