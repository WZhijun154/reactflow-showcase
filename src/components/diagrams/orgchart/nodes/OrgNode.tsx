"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface OrgNodeData {
  label: string;
  title: string;
  level: number;
  [key: string]: unknown;
}

const levelColors: Record<number, { border: string; accent: string; avatar: string }> = {
  0: {
    border: "border-indigo-500 dark:border-indigo-400",
    accent: "bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300",
    avatar: "bg-indigo-500 dark:bg-indigo-400 text-white",
  },
  1: {
    border: "border-violet-500 dark:border-violet-400",
    accent: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300",
    avatar: "bg-violet-500 dark:bg-violet-400 text-white",
  },
  2: {
    border: "border-purple-500 dark:border-purple-400",
    accent: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300",
    avatar: "bg-purple-500 dark:bg-purple-400 text-white",
  },
  3: {
    border: "border-fuchsia-500 dark:border-fuchsia-400",
    accent: "bg-fuchsia-100 dark:bg-fuchsia-900 text-fuchsia-700 dark:text-fuchsia-300",
    avatar: "bg-fuchsia-500 dark:bg-fuchsia-400 text-white",
  },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function OrgNode({ data }: NodeProps) {
  const nodeData = data as OrgNodeData;
  const level = nodeData.level ?? 2;
  const colors = levelColors[level] ?? levelColors[2];

  return (
    <div
      className={`rounded-xl border-2 ${colors.border} bg-white dark:bg-zinc-800 shadow-lg min-w-[160px] transition-all duration-200 hover:shadow-xl hover:scale-105`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-zinc-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
      <div className="px-4 py-3 flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${colors.avatar}`}
        >
          {getInitials(nodeData.label)}
        </div>
        <div className="min-w-0">
          <div className="font-semibold text-sm text-zinc-800 dark:text-zinc-100 truncate">
            {nodeData.label}
          </div>
          <div
            className={`text-[10px] mt-0.5 px-2 py-0.5 rounded-full inline-block ${colors.accent} font-medium truncate max-w-[120px]`}
          >
            {nodeData.title}
          </div>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-zinc-500 !w-2.5 !h-2.5 !border-2 !border-white dark:!border-zinc-800"
      />
    </div>
  );
}
