import type { Node, Edge } from "@xyflow/react";

/**
 * Flowchart: "Should I deploy to production?"
 * A realistic decision tree for a deployment workflow.
 */

export const flowchartNodes: Node[] = [
  // Start
  {
    id: "fc-start",
    type: "start",
    position: { x: 300, y: 0 },
    data: { label: "Start Deploy" },
  },
  // Decision 1: Tests pass?
  {
    id: "fc-d1",
    type: "decision",
    position: { x: 260, y: 120 },
    data: { label: "All tests pass?" },
  },
  // Process: Fix tests
  {
    id: "fc-fix-tests",
    type: "process",
    position: { x: 550, y: 155 },
    data: { label: "Fix failing tests" },
  },
  // Decision 2: Code reviewed?
  {
    id: "fc-d2",
    type: "decision",
    position: { x: 260, y: 320 },
    data: { label: "Code reviewed?" },
  },
  // Process: Request review
  {
    id: "fc-request-review",
    type: "process",
    position: { x: 550, y: 355 },
    data: { label: "Request code review" },
  },
  // Process: Merge to main
  {
    id: "fc-merge",
    type: "process",
    position: { x: 300, y: 520 },
    data: { label: "Merge to main" },
  },
  // Decision 3: Staging OK?
  {
    id: "fc-d3",
    type: "decision",
    position: { x: 260, y: 630 },
    data: { label: "Staging OK?" },
  },
  // Process: Debug staging
  {
    id: "fc-debug-staging",
    type: "process",
    position: { x: 550, y: 665 },
    data: { label: "Debug staging issues" },
  },
  // Process: Deploy to production
  {
    id: "fc-deploy",
    type: "process",
    position: { x: 300, y: 830 },
    data: { label: "Deploy to production" },
  },
  // Process: Monitor metrics
  {
    id: "fc-monitor",
    type: "process",
    position: { x: 300, y: 930 },
    data: { label: "Monitor metrics" },
  },
  // Decision 4: Errors spiking?
  {
    id: "fc-d4",
    type: "decision",
    position: { x: 260, y: 1040 },
    data: { label: "Errors spiking?" },
  },
  // Process: Rollback
  {
    id: "fc-rollback",
    type: "process",
    position: { x: 550, y: 1075 },
    data: { label: "Rollback deployment" },
  },
  // End: Success
  {
    id: "fc-end",
    type: "end",
    position: { x: 310, y: 1230 },
    data: { label: "Done ✅" },
  },
];

export const flowchartEdges: Edge[] = [
  // Start → Tests pass?
  {
    id: "fc-e-start-d1",
    source: "fc-start",
    target: "fc-d1",
    animated: true,
    style: { strokeWidth: 2 },
  },
  // Tests pass? → Yes → Code reviewed?
  {
    id: "fc-e-d1-yes",
    source: "fc-d1",
    sourceHandle: "yes",
    target: "fc-d2",
    label: "Yes",
    animated: true,
    style: { strokeWidth: 2, stroke: "#22c55e" },
    labelStyle: { fontWeight: 700, fill: "#16a34a" },
  },
  // Tests pass? → No → Fix tests
  {
    id: "fc-e-d1-no",
    source: "fc-d1",
    sourceHandle: "no",
    target: "fc-fix-tests",
    label: "No",
    style: { strokeWidth: 2, stroke: "#ef4444" },
    labelStyle: { fontWeight: 700, fill: "#dc2626" },
  },
  // Fix tests → back to Tests pass?
  {
    id: "fc-e-fix-d1",
    source: "fc-fix-tests",
    target: "fc-d1",
    style: { strokeWidth: 2, stroke: "#6b7280", strokeDasharray: "6 3" },
    type: "smoothstep",
  },
  // Code reviewed? → Yes → Merge
  {
    id: "fc-e-d2-yes",
    source: "fc-d2",
    sourceHandle: "yes",
    target: "fc-merge",
    label: "Yes",
    animated: true,
    style: { strokeWidth: 2, stroke: "#22c55e" },
    labelStyle: { fontWeight: 700, fill: "#16a34a" },
  },
  // Code reviewed? → No → Request review
  {
    id: "fc-e-d2-no",
    source: "fc-d2",
    sourceHandle: "no",
    target: "fc-request-review",
    label: "No",
    style: { strokeWidth: 2, stroke: "#ef4444" },
    labelStyle: { fontWeight: 700, fill: "#dc2626" },
  },
  // Request review → back to Code reviewed?
  {
    id: "fc-e-review-d2",
    source: "fc-request-review",
    target: "fc-d2",
    style: { strokeWidth: 2, stroke: "#6b7280", strokeDasharray: "6 3" },
    type: "smoothstep",
  },
  // Merge → Staging OK?
  {
    id: "fc-e-merge-d3",
    source: "fc-merge",
    target: "fc-d3",
    animated: true,
    style: { strokeWidth: 2 },
  },
  // Staging OK? → Yes → Deploy
  {
    id: "fc-e-d3-yes",
    source: "fc-d3",
    sourceHandle: "yes",
    target: "fc-deploy",
    label: "Yes",
    animated: true,
    style: { strokeWidth: 2, stroke: "#22c55e" },
    labelStyle: { fontWeight: 700, fill: "#16a34a" },
  },
  // Staging OK? → No → Debug staging
  {
    id: "fc-e-d3-no",
    source: "fc-d3",
    sourceHandle: "no",
    target: "fc-debug-staging",
    label: "No",
    style: { strokeWidth: 2, stroke: "#ef4444" },
    labelStyle: { fontWeight: 700, fill: "#dc2626" },
  },
  // Debug staging → back to Staging OK?
  {
    id: "fc-e-debug-d3",
    source: "fc-debug-staging",
    target: "fc-d3",
    style: { strokeWidth: 2, stroke: "#6b7280", strokeDasharray: "6 3" },
    type: "smoothstep",
  },
  // Deploy → Monitor
  {
    id: "fc-e-deploy-monitor",
    source: "fc-deploy",
    target: "fc-monitor",
    animated: true,
    style: { strokeWidth: 2 },
  },
  // Monitor → Errors spiking?
  {
    id: "fc-e-monitor-d4",
    source: "fc-monitor",
    target: "fc-d4",
    animated: true,
    style: { strokeWidth: 2 },
  },
  // Errors spiking? → No → Done
  {
    id: "fc-e-d4-no-end",
    source: "fc-d4",
    sourceHandle: "yes",
    target: "fc-end",
    label: "No",
    animated: true,
    style: { strokeWidth: 2, stroke: "#22c55e" },
    labelStyle: { fontWeight: 700, fill: "#16a34a" },
  },
  // Errors spiking? → Yes → Rollback
  {
    id: "fc-e-d4-yes-rollback",
    source: "fc-d4",
    sourceHandle: "no",
    target: "fc-rollback",
    label: "Yes",
    style: { strokeWidth: 2, stroke: "#ef4444" },
    labelStyle: { fontWeight: 700, fill: "#dc2626" },
  },
  // Rollback → back to Fix tests
  {
    id: "fc-e-rollback-fix",
    source: "fc-rollback",
    target: "fc-fix-tests",
    style: { strokeWidth: 2, stroke: "#6b7280", strokeDasharray: "6 3" },
    type: "smoothstep",
  },
];
