"use client";

import { diagrams, type DiagramDefinition } from "@/constants/diagrams";

interface MobileNavProps {
  activeDiagramId: string;
  onSelectDiagram: (id: string) => void;
}

export function MobileNav({ activeDiagramId, onSelectDiagram }: MobileNavProps) {
  return (
    <div className="md:hidden w-full bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 px-4 py-3 shadow-sm transition-colors duration-200">
      <label
        htmlFor="mobile-diagram-select"
        className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5"
      >
        Diagram Type
      </label>
      <select
        id="mobile-diagram-select"
        value={activeDiagramId}
        onChange={(e) => onSelectDiagram(e.target.value)}
        className="w-full rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 px-3 py-2.5 text-sm font-medium text-zinc-900 dark:text-zinc-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {diagrams.map((diagram: DiagramDefinition) => (
          <option key={diagram.id} value={diagram.id}>
            {diagram.icon} {diagram.title}
          </option>
        ))}
      </select>
    </div>
  );
}
