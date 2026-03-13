"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface Column {
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
  nullable?: boolean;
}

interface EntityNodeData {
  label: string;
  columns: Column[];
  color: string;
  [key: string]: unknown;
}

export function EntityNode({ data }: NodeProps) {
  const nodeData = data as EntityNodeData;
  const borderColor = nodeData.color ?? "#6366f1";

  return (
    <div
      className="min-w-[220px] rounded-lg border-2 bg-white dark:bg-zinc-800 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02] overflow-hidden"
      style={{ borderColor }}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: borderColor }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: borderColor }}
      />

      {/* Table header */}
      <div
        className="px-3 py-2 text-white font-bold text-sm tracking-wide"
        style={{ backgroundColor: borderColor }}
      >
        <span className="mr-1.5">🗄️</span>
        {nodeData.label}
      </div>

      {/* Columns */}
      <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {nodeData.columns.map((col: Column) => (
          <div
            key={col.name}
            className="flex items-center gap-2 px-3 py-1.5 text-xs"
          >
            <span className="flex items-center gap-1 min-w-0 flex-1">
              {col.pk && (
                <span className="text-amber-500 font-bold" title="Primary Key">
                  PK
                </span>
              )}
              {col.fk && (
                <span className="text-blue-500 font-bold" title="Foreign Key">
                  FK
                </span>
              )}
              <span className="font-medium text-zinc-800 dark:text-zinc-200 truncate">
                {col.name}
              </span>
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 text-[10px] font-mono whitespace-nowrap">
              {col.type}
            </span>
          </div>
        ))}
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: borderColor }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="!w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
        style={{ backgroundColor: borderColor }}
      />
    </div>
  );
}
