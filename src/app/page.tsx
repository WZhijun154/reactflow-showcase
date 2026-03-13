"use client";

import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ThemeToggle } from "@/components/ThemeToggle";

const sampleNodes = [
  {
    id: "1",
    position: { x: 250, y: 0 },
    data: { label: "React Flow Showcase" },
    type: "input",
  },
  {
    id: "2",
    position: { x: 100, y: 100 },
    data: { label: "Interactive Diagrams" },
  },
  {
    id: "3",
    position: { x: 400, y: 100 },
    data: { label: "Multiple Diagram Types" },
  },
];

const sampleEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 dark:bg-zinc-900">
      <header className="relative w-full bg-white py-8 text-center shadow-sm transition-colors duration-200 dark:bg-zinc-800">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
          React Flow Showcase
        </h1>
        <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
          Interactive diagram demonstrations powered by React Flow
        </p>
      </header>

      <main className="flex w-full max-w-6xl flex-1 flex-col items-center px-4 py-8">
        <section className="w-full rounded-lg bg-white p-4 shadow-md transition-colors duration-200 dark:bg-zinc-800">
          <h2 className="mb-4 text-2xl font-semibold text-zinc-800 transition-colors duration-200 dark:text-zinc-200">
            Sample Diagram
          </h2>
          <div className="h-96 w-full rounded border border-zinc-200 dark:border-zinc-700">
            <ReactFlow
              nodes={sampleNodes}
              edges={sampleEdges}
              fitView
              proOptions={{ hideAttribution: true }}
            >
              <Background />
              <Controls />
              <MiniMap />
            </ReactFlow>
          </div>
        </section>
      </main>
    </div>
  );
}
