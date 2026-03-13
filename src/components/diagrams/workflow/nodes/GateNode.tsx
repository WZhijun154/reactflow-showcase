"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface GateNodeData {
  label: string;
  approver?: string;
  [key: string]: unknown;
}

export function GateNode({ data }: NodeProps) {
  const nodeData = data as GateNodeData;

  return (
    <div className="flex flex-col items-center">
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#f59e0b" }}
      />
      <div className="w-[140px] h-[70px] relative flex items-center justify-center">
        {/* Diamond shape */}
        <div
          className="absolute inset-0 border-2 border-amber-400 dark:border-amber-500 bg-amber-50 dark:bg-amber-950/40 shadow-md transition-all duration-200 hover:shadow-lg"
          style={{
            transform: "rotate(45deg)",
            borderRadius: "8px",
            width: "70px",
            height: "70px",
            position: "absolute",
            top: "0",
            left: "35px",
          }}
        />
        <div className="relative z-10 text-center">
          <div className="text-lg">🔒</div>
          <div className="font-bold text-xs text-zinc-800 dark:text-zinc-100">
            {nodeData.label}
          </div>
          {nodeData.approver && (
            <div className="text-[10px] text-amber-600 dark:text-amber-400">
              {nodeData.approver}
            </div>
          )}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: "#f59e0b" }}
      />
    </div>
  );
}
