"use client";

import type { DiagramDefinition } from "@/constants/diagrams";
import { DiagramWrapper } from "@/components/diagrams/DiagramWrapper";
import { FlowchartDiagram } from "@/components/diagrams/flowchart/FlowchartDiagram";
import { ArchitectureDiagram } from "@/components/diagrams/architecture/ArchitectureDiagram";
import { DataFlowDiagram } from "@/components/diagrams/dataflow/DataFlowDiagram";
import { ConceptMapDiagram } from "@/components/diagrams/conceptmap/ConceptMapDiagram";
import { OrgChartDiagram } from "@/components/diagrams/orgchart/OrgChartDiagram";
import { MindMapDiagram } from "@/components/diagrams/mindmap/MindMapDiagram";
import { StateMachineDiagram } from "@/components/diagrams/statemachine/StateMachineDiagram";
import { NetworkTopologyDiagram } from "@/components/diagrams/network/NetworkTopologyDiagram";
import { placeholderNodes, placeholderEdges } from "@/constants/placeholderData";

interface DiagramContainerProps {
  diagram: DiagramDefinition;
}

function DiagramRenderer({ diagramId }: { diagramId: string }) {
  switch (diagramId) {
    case "flowchart":
      return <FlowchartDiagram />;
    case "architecture":
      return <ArchitectureDiagram />;
    case "data-flow":
      return <DataFlowDiagram />;
    case "concept-map":
      return <ConceptMapDiagram />;
    case "org-chart":
      return <OrgChartDiagram />;
    case "mind-map":
      return <MindMapDiagram />;
    case "state-machine":
      return <StateMachineDiagram />;
    case "network-topology":
      return <NetworkTopologyDiagram />;
    default:
      return (
        <DiagramWrapper
          initialNodes={placeholderNodes}
          initialEdges={placeholderEdges}
          title="Placeholder"
        />
      );
  }
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

      <div className="flex-1 m-4 sm:m-6 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 shadow-sm transition-colors duration-200 overflow-hidden min-h-[400px]">
        <DiagramRenderer diagramId={diagram.id} />
      </div>
    </div>
  );
}
