"use client";

import type { DiagramDefinition } from "@/constants/diagrams";

interface DiagramContainerProps {
  diagram: DiagramDefinition;
}

export function DiagramContainer({ diagram }: DiagramContainerProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="px-4 pt-4 pb-2 sm:px-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl" aria-hidden="true">
            {diagram.icon}
          </span>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
            {diagram.title}
          </h1>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 transition-colors duration-200 max-w-2xl">
          {diagram.description}
        </p>
      </div>

      <div className="flex-1 m-4 sm:m-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-colors duration-200 overflow-hidden flex items-center justify-center min-h-[400px]">
        <p className="text-zinc-400 dark:text-zinc-500 text-lg font-medium">
          Diagram: {diagram.title} coming soon
        </p>
      </div>
    </div>
  );
}
