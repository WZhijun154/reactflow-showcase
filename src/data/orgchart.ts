import type { Node, Edge } from "@xyflow/react";

/**
 * Org Chart: Technology company organizational structure
 * CEO → VPs → Directors → Managers
 * 16 nodes in a hierarchical tree layout
 */

export const orgChartNodes: Node[] = [
  // Level 0: CEO
  {
    id: "org-ceo",
    type: "orgNode",
    position: { x: 450, y: 0 },
    data: { label: "Sarah Chen", title: "Chief Executive Officer", level: 0 },
  },
  // Level 1: VPs
  {
    id: "org-vp-eng",
    type: "orgNode",
    position: { x: 100, y: 160 },
    data: { label: "James Rodriguez", title: "VP of Engineering", level: 1 },
  },
  {
    id: "org-vp-product",
    type: "orgNode",
    position: { x: 450, y: 160 },
    data: { label: "Emily Park", title: "VP of Product", level: 1 },
  },
  {
    id: "org-vp-ops",
    type: "orgNode",
    position: { x: 800, y: 160 },
    data: { label: "Michael Brown", title: "VP of Operations", level: 1 },
  },
  // Level 2: Directors
  {
    id: "org-dir-fe",
    type: "orgNode",
    position: { x: 0, y: 320 },
    data: { label: "Lisa Wang", title: "Director of Frontend", level: 2 },
  },
  {
    id: "org-dir-be",
    type: "orgNode",
    position: { x: 220, y: 320 },
    data: { label: "David Kim", title: "Director of Backend", level: 2 },
  },
  {
    id: "org-dir-design",
    type: "orgNode",
    position: { x: 370, y: 320 },
    data: { label: "Ana Silva", title: "Director of Design", level: 2 },
  },
  {
    id: "org-dir-pm",
    type: "orgNode",
    position: { x: 570, y: 320 },
    data: { label: "Tom Hughes", title: "Director of PM", level: 2 },
  },
  {
    id: "org-dir-infra",
    type: "orgNode",
    position: { x: 730, y: 320 },
    data: { label: "Priya Patel", title: "Director of Infrastructure", level: 2 },
  },
  {
    id: "org-dir-hr",
    type: "orgNode",
    position: { x: 950, y: 320 },
    data: { label: "Rachel Green", title: "Director of HR", level: 2 },
  },
  // Level 3: Managers
  {
    id: "org-mgr-react",
    type: "orgNode",
    position: { x: -50, y: 480 },
    data: { label: "Alex Turner", title: "React Team Lead", level: 3 },
  },
  {
    id: "org-mgr-mobile",
    type: "orgNode",
    position: { x: 90, y: 480 },
    data: { label: "Nina Kowalski", title: "Mobile Team Lead", level: 3 },
  },
  {
    id: "org-mgr-api",
    type: "orgNode",
    position: { x: 220, y: 480 },
    data: { label: "Carlos Mendez", title: "API Team Lead", level: 3 },
  },
  {
    id: "org-mgr-data",
    type: "orgNode",
    position: { x: 360, y: 480 },
    data: { label: "Sara Johnson", title: "Data Team Lead", level: 3 },
  },
  {
    id: "org-mgr-devops",
    type: "orgNode",
    position: { x: 690, y: 480 },
    data: { label: "Kevin Lee", title: "DevOps Lead", level: 3 },
  },
  {
    id: "org-mgr-sre",
    type: "orgNode",
    position: { x: 850, y: 480 },
    data: { label: "Maya Singh", title: "SRE Lead", level: 3 },
  },
];

export const orgChartEdges: Edge[] = [
  // CEO → VPs
  {
    id: "org-e-ceo-eng",
    source: "org-ceo",
    target: "org-vp-eng",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#6366f1" },
  },
  {
    id: "org-e-ceo-product",
    source: "org-ceo",
    target: "org-vp-product",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#6366f1" },
  },
  {
    id: "org-e-ceo-ops",
    source: "org-ceo",
    target: "org-vp-ops",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#6366f1" },
  },
  // VP Eng → Directors
  {
    id: "org-e-eng-fe",
    source: "org-vp-eng",
    target: "org-dir-fe",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#8b5cf6" },
  },
  {
    id: "org-e-eng-be",
    source: "org-vp-eng",
    target: "org-dir-be",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#8b5cf6" },
  },
  // VP Product → Directors
  {
    id: "org-e-product-design",
    source: "org-vp-product",
    target: "org-dir-design",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#8b5cf6" },
  },
  {
    id: "org-e-product-pm",
    source: "org-vp-product",
    target: "org-dir-pm",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#8b5cf6" },
  },
  // VP Ops → Directors
  {
    id: "org-e-ops-infra",
    source: "org-vp-ops",
    target: "org-dir-infra",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#8b5cf6" },
  },
  {
    id: "org-e-ops-hr",
    source: "org-vp-ops",
    target: "org-dir-hr",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#8b5cf6" },
  },
  // Director FE → Managers
  {
    id: "org-e-fe-react",
    source: "org-dir-fe",
    target: "org-mgr-react",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
  {
    id: "org-e-fe-mobile",
    source: "org-dir-fe",
    target: "org-mgr-mobile",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
  // Director BE → Managers
  {
    id: "org-e-be-api",
    source: "org-dir-be",
    target: "org-mgr-api",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
  {
    id: "org-e-be-data",
    source: "org-dir-be",
    target: "org-mgr-data",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
  // Director Infra → Managers
  {
    id: "org-e-infra-devops",
    source: "org-dir-infra",
    target: "org-mgr-devops",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
  {
    id: "org-e-infra-sre",
    source: "org-dir-infra",
    target: "org-mgr-sre",
    type: "smoothstep",
    style: { strokeWidth: 2, stroke: "#a78bfa" },
  },
];
