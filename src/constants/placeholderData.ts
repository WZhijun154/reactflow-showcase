import type { Node, Edge } from "@xyflow/react";

export const placeholderNodes: Node[] = [
  {
    id: "1",
    type: "default",
    position: { x: 250, y: 0 },
    data: { label: "Start" },
  },
  {
    id: "2",
    type: "default",
    position: { x: 100, y: 100 },
    data: { label: "Process A" },
  },
  {
    id: "3",
    type: "default",
    position: { x: 400, y: 100 },
    data: { label: "Process B" },
  },
  {
    id: "4",
    type: "default",
    position: { x: 250, y: 200 },
    data: { label: "End" },
  },
];

export const placeholderEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
  { id: "e2-4", source: "2", target: "4", animated: true },
  { id: "e3-4", source: "3", target: "4", animated: true },
];
