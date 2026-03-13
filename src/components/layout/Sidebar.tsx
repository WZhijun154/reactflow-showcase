"use client";

import { diagrams, type DiagramDefinition } from "@/constants/diagrams";

interface SidebarProps {
  activeDiagramId: string;
  onSelectDiagram: (id: string) => void;
}

export function Sidebar({ activeDiagramId, onSelectDiagram }: SidebarProps) {
  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:left-0 md:z-30 bg-white dark:bg-zinc-800 border-r border-zinc-200 dark:border-zinc-700 shadow-sm transition-colors duration-200">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-zinc-200 dark:border-zinc-700">
        <span className="text-xl" aria-hidden="true">
          📐
        </span>
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 truncate">
          React Flow Showcase
        </h2>
      </div>

      <nav className="flex-1 overflow-y-auto py-2" aria-label="Diagram types">
        <ul className="space-y-0.5 px-2">
          {diagrams.map((diagram: DiagramDefinition) => {
            const isActive = diagram.id === activeDiagramId;
            return (
              <li key={diagram.id}>
                <button
                  type="button"
                  onClick={() => onSelectDiagram(diagram.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700/50"
                  }`}
                >
                  <span className="text-base flex-shrink-0" aria-hidden="true">
                    {diagram.icon}
                  </span>
                  <span className="truncate">{diagram.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
