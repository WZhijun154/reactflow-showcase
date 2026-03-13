"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { DiagramContainer } from "@/components/layout/DiagramContainer";
import { diagrams } from "@/constants/diagrams";

export default function Home() {
  const [activeDiagramId, setActiveDiagramId] = useState(diagrams[0].id);

  const activeDiagram =
    diagrams.find((d) => d.id === activeDiagramId) ?? diagrams[0];

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900 transition-colors duration-200">
      {/* Sidebar — desktop only */}
      <Sidebar
        activeDiagramId={activeDiagramId}
        onSelectDiagram={setActiveDiagramId}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 md:ml-64 min-h-screen">
        {/* Top bar with theme toggle */}
        <header className="flex items-center justify-between px-4 py-3 bg-white dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700 shadow-sm transition-colors duration-200 md:px-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50 md:hidden">
            React Flow Showcase
          </h2>
          <div className="hidden md:block" />
          <ThemeToggle />
        </header>

        {/* Mobile navigation — mobile only */}
        <MobileNav
          activeDiagramId={activeDiagramId}
          onSelectDiagram={setActiveDiagramId}
        />

        {/* Diagram display area */}
        <DiagramContainer diagram={activeDiagram} />
      </div>
    </div>
  );
}
