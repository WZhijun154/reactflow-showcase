import type { Node, Edge } from "@xyflow/react";

export interface StageNodeData {
  label: string;
  description?: string;
  status: "success" | "running" | "pending" | "failed";
  [key: string]: unknown;
}

export interface GateNodeData {
  label: string;
  approver?: string;
  [key: string]: unknown;
}

export interface ParallelNodeData {
  label: string;
  branches: string[];
  [key: string]: unknown;
}

export const workflowNodes: Node[] = [
  // Trigger
  {
    id: "wf-commit",
    type: "stageNode",
    position: { x: 400, y: 0 },
    data: {
      label: "Commit",
      description: "Push to main branch",
      status: "success",
    } satisfies StageNodeData,
  },
  // Build
  {
    id: "wf-build",
    type: "stageNode",
    position: { x: 400, y: 110 },
    data: {
      label: "Build",
      description: "Compile & bundle artifacts",
      status: "success",
    } satisfies StageNodeData,
  },
  // Parallel split
  {
    id: "wf-parallel-test",
    type: "parallelNode",
    position: { x: 370, y: 220 },
    data: {
      label: "Parallel Tests",
      branches: ["Unit Tests", "Integration Tests", "Lint & Format"],
    } satisfies ParallelNodeData,
  },
  // Unit tests
  {
    id: "wf-unit-tests",
    type: "stageNode",
    position: { x: 100, y: 340 },
    data: {
      label: "Unit Tests",
      description: "Run jest test suite",
      status: "success",
    } satisfies StageNodeData,
  },
  // Integration tests
  {
    id: "wf-integration-tests",
    type: "stageNode",
    position: { x: 370, y: 340 },
    data: {
      label: "Integration Tests",
      description: "E2E browser tests",
      status: "success",
    } satisfies StageNodeData,
  },
  // Lint
  {
    id: "wf-lint",
    type: "stageNode",
    position: { x: 650, y: 340 },
    data: {
      label: "Lint & Format",
      description: "ESLint + Prettier checks",
      status: "success",
    } satisfies StageNodeData,
  },
  // Security scan
  {
    id: "wf-security-scan",
    type: "stageNode",
    position: { x: 400, y: 460 },
    data: {
      label: "Security Scan",
      description: "SAST + dependency audit",
      status: "success",
    } satisfies StageNodeData,
  },
  // Docker build
  {
    id: "wf-docker-build",
    type: "stageNode",
    position: { x: 400, y: 570 },
    data: {
      label: "Docker Build",
      description: "Build & push container image",
      status: "running",
    } satisfies StageNodeData,
  },
  // Stage deploy
  {
    id: "wf-stage-deploy",
    type: "stageNode",
    position: { x: 400, y: 680 },
    data: {
      label: "Stage Deploy",
      description: "Deploy to staging env",
      status: "pending",
    } satisfies StageNodeData,
  },
  // Smoke tests
  {
    id: "wf-smoke-tests",
    type: "stageNode",
    position: { x: 400, y: 790 },
    data: {
      label: "Smoke Tests",
      description: "Health checks on staging",
      status: "pending",
    } satisfies StageNodeData,
  },
  // Approval gate
  {
    id: "wf-approval",
    type: "gateNode",
    position: { x: 395, y: 900 },
    data: {
      label: "Approval Gate",
      approver: "Tech Lead",
    } satisfies GateNodeData,
  },
  // Production deploy
  {
    id: "wf-prod-deploy",
    type: "stageNode",
    position: { x: 400, y: 1010 },
    data: {
      label: "Production Deploy",
      description: "Blue/green deployment",
      status: "pending",
    } satisfies StageNodeData,
  },
  // Post-deploy verify
  {
    id: "wf-post-deploy",
    type: "stageNode",
    position: { x: 400, y: 1120 },
    data: {
      label: "Post-Deploy Verify",
      description: "Canary analysis & monitoring",
      status: "pending",
    } satisfies StageNodeData,
  },
  // Notify
  {
    id: "wf-notify",
    type: "stageNode",
    position: { x: 400, y: 1230 },
    data: {
      label: "Notify Team",
      description: "Slack + email notification",
      status: "pending",
    } satisfies StageNodeData,
  },
];

export const workflowEdges: Edge[] = [
  {
    id: "wf-e-commit-build",
    source: "wf-commit",
    target: "wf-build",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  {
    id: "wf-e-build-parallel",
    source: "wf-build",
    target: "wf-parallel-test",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  // Fan-out to parallel branches
  {
    id: "wf-e-parallel-unit",
    source: "wf-parallel-test",
    target: "wf-unit-tests",
    type: "smoothstep",
    animated: true,
    label: "fork",
    style: { stroke: "#6366f1", strokeWidth: 2 },
    labelStyle: { fill: "#6366f1", fontWeight: 600 },
  },
  {
    id: "wf-e-parallel-integration",
    source: "wf-parallel-test",
    target: "wf-integration-tests",
    type: "smoothstep",
    animated: true,
    label: "fork",
    style: { stroke: "#6366f1", strokeWidth: 2 },
    labelStyle: { fill: "#6366f1", fontWeight: 600 },
  },
  {
    id: "wf-e-parallel-lint",
    source: "wf-parallel-test",
    target: "wf-lint",
    type: "smoothstep",
    animated: true,
    label: "fork",
    style: { stroke: "#6366f1", strokeWidth: 2 },
    labelStyle: { fill: "#6366f1", fontWeight: 600 },
  },
  // Fan-in (join)
  {
    id: "wf-e-unit-security",
    source: "wf-unit-tests",
    target: "wf-security-scan",
    type: "smoothstep",
    animated: true,
    label: "join",
    style: { stroke: "#10b981", strokeWidth: 2 },
    labelStyle: { fill: "#10b981", fontWeight: 600 },
  },
  {
    id: "wf-e-integration-security",
    source: "wf-integration-tests",
    target: "wf-security-scan",
    type: "smoothstep",
    animated: true,
    label: "join",
    style: { stroke: "#10b981", strokeWidth: 2 },
    labelStyle: { fill: "#10b981", fontWeight: 600 },
  },
  {
    id: "wf-e-lint-security",
    source: "wf-lint",
    target: "wf-security-scan",
    type: "smoothstep",
    animated: true,
    label: "join",
    style: { stroke: "#10b981", strokeWidth: 2 },
    labelStyle: { fill: "#10b981", fontWeight: 600 },
  },
  // Sequential stages
  {
    id: "wf-e-security-docker",
    source: "wf-security-scan",
    target: "wf-docker-build",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  {
    id: "wf-e-docker-stage",
    source: "wf-docker-build",
    target: "wf-stage-deploy",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  {
    id: "wf-e-stage-smoke",
    source: "wf-stage-deploy",
    target: "wf-smoke-tests",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 2, strokeDasharray: "6 3" },
  },
  {
    id: "wf-e-smoke-approval",
    source: "wf-smoke-tests",
    target: "wf-approval",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 2, strokeDasharray: "6 3" },
  },
  {
    id: "wf-e-approval-prod",
    source: "wf-approval",
    target: "wf-prod-deploy",
    label: "approved",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 2, strokeDasharray: "6 3" },
    labelStyle: { fill: "#94a3b8", fontWeight: 600 },
  },
  {
    id: "wf-e-prod-postdeploy",
    source: "wf-prod-deploy",
    target: "wf-post-deploy",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 2, strokeDasharray: "6 3" },
  },
  {
    id: "wf-e-postdeploy-notify",
    source: "wf-post-deploy",
    target: "wf-notify",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 2, strokeDasharray: "6 3" },
  },
];
