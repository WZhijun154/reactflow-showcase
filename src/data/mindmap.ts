import type { Node, Edge } from "@xyflow/react";

/**
 * Mind Map: "Web Development" as the central topic
 * Branches out to Frontend, Backend, DevOps, Design, Testing
 * 18 nodes with decreasing size by depth, radial-ish layout
 */

export const mindMapNodes: Node[] = [
  // Level 0: Central topic
  {
    id: "mm-center",
    type: "mindMapNode",
    position: { x: 400, y: 300 },
    data: { label: "Web Development", depth: 0 },
  },
  // Level 1: Main branches
  {
    id: "mm-frontend",
    type: "mindMapNode",
    position: { x: 50, y: 80 },
    data: { label: "Frontend", depth: 1 },
  },
  {
    id: "mm-backend",
    type: "mindMapNode",
    position: { x: 750, y: 80 },
    data: { label: "Backend", depth: 1 },
  },
  {
    id: "mm-devops",
    type: "mindMapNode",
    position: { x: 750, y: 520 },
    data: { label: "DevOps", depth: 1 },
  },
  {
    id: "mm-design",
    type: "mindMapNode",
    position: { x: 50, y: 520 },
    data: { label: "Design", depth: 1 },
  },
  {
    id: "mm-testing",
    type: "mindMapNode",
    position: { x: 400, y: 600 },
    data: { label: "Testing", depth: 1 },
  },
  // Level 2: Frontend sub-topics
  {
    id: "mm-react",
    type: "mindMapNode",
    position: { x: -150, y: 0 },
    data: { label: "React", depth: 2 },
  },
  {
    id: "mm-css",
    type: "mindMapNode",
    position: { x: -100, y: 160 },
    data: { label: "CSS / Tailwind", depth: 2 },
  },
  {
    id: "mm-typescript",
    type: "mindMapNode",
    position: { x: 100, y: -20 },
    data: { label: "TypeScript", depth: 2 },
  },
  // Level 2: Backend sub-topics
  {
    id: "mm-nodejs",
    type: "mindMapNode",
    position: { x: 900, y: 0 },
    data: { label: "Node.js", depth: 2 },
  },
  {
    id: "mm-databases",
    type: "mindMapNode",
    position: { x: 1000, y: 140 },
    data: { label: "Databases", depth: 2 },
  },
  {
    id: "mm-apis",
    type: "mindMapNode",
    position: { x: 700, y: -20 },
    data: { label: "REST / GraphQL", depth: 2 },
  },
  // Level 2: DevOps sub-topics
  {
    id: "mm-docker",
    type: "mindMapNode",
    position: { x: 950, y: 460 },
    data: { label: "Docker", depth: 2 },
  },
  {
    id: "mm-cicd",
    type: "mindMapNode",
    position: { x: 900, y: 600 },
    data: { label: "CI/CD", depth: 2 },
  },
  // Level 2: Design sub-topics
  {
    id: "mm-ux",
    type: "mindMapNode",
    position: { x: -100, y: 460 },
    data: { label: "UX Research", depth: 2 },
  },
  {
    id: "mm-figma",
    type: "mindMapNode",
    position: { x: -50, y: 600 },
    data: { label: "Figma", depth: 2 },
  },
  // Level 2: Testing sub-topics
  {
    id: "mm-unit",
    type: "mindMapNode",
    position: { x: 300, y: 720 },
    data: { label: "Unit Tests", depth: 2 },
  },
  {
    id: "mm-e2e",
    type: "mindMapNode",
    position: { x: 500, y: 720 },
    data: { label: "E2E Tests", depth: 2 },
  },
];

export const mindMapEdges: Edge[] = [
  // Center → Main branches
  {
    id: "mm-e-center-frontend",
    source: "mm-center",
    target: "mm-frontend",
    type: "default",
    style: { strokeWidth: 3, stroke: "#3b82f6" },
  },
  {
    id: "mm-e-center-backend",
    source: "mm-center",
    target: "mm-backend",
    type: "default",
    style: { strokeWidth: 3, stroke: "#10b981" },
  },
  {
    id: "mm-e-center-devops",
    source: "mm-center",
    target: "mm-devops",
    type: "default",
    style: { strokeWidth: 3, stroke: "#f59e0b" },
  },
  {
    id: "mm-e-center-design",
    source: "mm-center",
    target: "mm-design",
    type: "default",
    style: { strokeWidth: 3, stroke: "#ec4899" },
  },
  {
    id: "mm-e-center-testing",
    source: "mm-center",
    target: "mm-testing",
    type: "default",
    style: { strokeWidth: 3, stroke: "#8b5cf6" },
  },
  // Frontend → sub-topics
  {
    id: "mm-e-frontend-react",
    source: "mm-frontend",
    target: "mm-react",
    type: "default",
    style: { strokeWidth: 2, stroke: "#60a5fa" },
  },
  {
    id: "mm-e-frontend-css",
    source: "mm-frontend",
    target: "mm-css",
    type: "default",
    style: { strokeWidth: 2, stroke: "#60a5fa" },
  },
  {
    id: "mm-e-frontend-ts",
    source: "mm-frontend",
    target: "mm-typescript",
    type: "default",
    style: { strokeWidth: 2, stroke: "#60a5fa" },
  },
  // Backend → sub-topics
  {
    id: "mm-e-backend-nodejs",
    source: "mm-backend",
    target: "mm-nodejs",
    type: "default",
    style: { strokeWidth: 2, stroke: "#34d399" },
  },
  {
    id: "mm-e-backend-databases",
    source: "mm-backend",
    target: "mm-databases",
    type: "default",
    style: { strokeWidth: 2, stroke: "#34d399" },
  },
  {
    id: "mm-e-backend-apis",
    source: "mm-backend",
    target: "mm-apis",
    type: "default",
    style: { strokeWidth: 2, stroke: "#34d399" },
  },
  // DevOps → sub-topics
  {
    id: "mm-e-devops-docker",
    source: "mm-devops",
    target: "mm-docker",
    type: "default",
    style: { strokeWidth: 2, stroke: "#fbbf24" },
  },
  {
    id: "mm-e-devops-cicd",
    source: "mm-devops",
    target: "mm-cicd",
    type: "default",
    style: { strokeWidth: 2, stroke: "#fbbf24" },
  },
  // Design → sub-topics
  {
    id: "mm-e-design-ux",
    source: "mm-design",
    target: "mm-ux",
    type: "default",
    style: { strokeWidth: 2, stroke: "#f472b6" },
  },
  {
    id: "mm-e-design-figma",
    source: "mm-design",
    target: "mm-figma",
    type: "default",
    style: { strokeWidth: 2, stroke: "#f472b6" },
  },
  // Testing → sub-topics
  {
    id: "mm-e-testing-unit",
    source: "mm-testing",
    target: "mm-unit",
    type: "default",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
  {
    id: "mm-e-testing-e2e",
    source: "mm-testing",
    target: "mm-e2e",
    type: "default",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
];
