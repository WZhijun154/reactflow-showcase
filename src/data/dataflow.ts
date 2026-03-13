import type { Node, Edge } from "@xyflow/react";

/**
 * Data Flow Diagram: Sales Data ETL Pipeline
 *
 * Stage colors:
 *  - Source (blue): External data sources
 *  - Transform (amber): Data processing/transformation steps
 *  - Load (green): Final loading destinations
 *  - Storage (indigo): Intermediate and final storage systems
 */

export const dataFlowNodes: Node[] = [
  // Sources
  {
    id: "df-csv-source",
    type: "source",
    position: { x: 0, y: 0 },
    data: { label: "CSV Files", icon: "📄", format: "CSV" },
  },
  {
    id: "df-api-source",
    type: "source",
    position: { x: 0, y: 180 },
    data: { label: "REST API", icon: "🌐", format: "JSON" },
  },
  {
    id: "df-db-source",
    type: "source",
    position: { x: 0, y: 360 },
    data: { label: "Legacy Database", icon: "🗃️", format: "SQL" },
  },

  // Transform steps
  {
    id: "df-parse",
    type: "transform",
    position: { x: 250, y: 90 },
    data: { label: "Parse & Extract", operation: "Extract" },
  },
  {
    id: "df-validate",
    type: "transform",
    position: { x: 480, y: 90 },
    data: { label: "Validate Schema", operation: "Validate" },
  },
  {
    id: "df-deduplicate",
    type: "transform",
    position: { x: 710, y: 30 },
    data: { label: "Deduplicate", operation: "Clean" },
  },
  {
    id: "df-enrich",
    type: "transform",
    position: { x: 710, y: 180 },
    data: { label: "Enrich & Join", operation: "Enrich" },
  },
  {
    id: "df-aggregate",
    type: "transform",
    position: { x: 940, y: 90 },
    data: { label: "Aggregate Metrics", operation: "Aggregate" },
  },

  // Storage
  {
    id: "df-staging",
    type: "storage",
    position: { x: 480, y: 310 },
    data: { label: "Staging Area", storageType: "S3 Bucket" },
  },

  // Load
  {
    id: "df-warehouse",
    type: "load",
    position: { x: 1170, y: 30 },
    data: { label: "Data Warehouse", destination: "Snowflake" },
  },
  {
    id: "df-analytics",
    type: "load",
    position: { x: 1170, y: 180 },
    data: { label: "Analytics DB", destination: "ClickHouse" },
  },
  {
    id: "df-dashboard",
    type: "storage",
    position: { x: 1170, y: 330 },
    data: { label: "BI Dashboard", storageType: "Metabase" },
  },
];

export const dataFlowEdges: Edge[] = [
  // Sources → Parse
  {
    id: "df-e-csv-parse",
    source: "df-csv-source",
    target: "df-parse",
    animated: true,
    style: { strokeWidth: 2, stroke: "#3b82f6" },
    label: "batch",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#3b82f6" },
    markerEnd: { type: "arrowclosed" as const, color: "#3b82f6" },
  },
  {
    id: "df-e-api-parse",
    source: "df-api-source",
    target: "df-parse",
    animated: true,
    style: { strokeWidth: 2, stroke: "#3b82f6" },
    label: "stream",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#3b82f6" },
    markerEnd: { type: "arrowclosed" as const, color: "#3b82f6" },
  },
  {
    id: "df-e-db-parse",
    source: "df-db-source",
    target: "df-parse",
    animated: true,
    style: { strokeWidth: 2, stroke: "#3b82f6" },
    label: "CDC",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#3b82f6" },
    markerEnd: { type: "arrowclosed" as const, color: "#3b82f6" },
  },

  // Parse → Validate
  {
    id: "df-e-parse-validate",
    source: "df-parse",
    target: "df-validate",
    animated: true,
    style: { strokeWidth: 2, stroke: "#d97706" },
    markerEnd: { type: "arrowclosed" as const, color: "#d97706" },
  },

  // Validate → Staging (checkpoint)
  {
    id: "df-e-validate-staging",
    source: "df-validate",
    target: "df-staging",
    style: { strokeWidth: 2, stroke: "#6366f1", strokeDasharray: "5 3" },
    label: "checkpoint",
    labelStyle: { fontSize: 9, fill: "#6366f1" },
    markerEnd: { type: "arrowclosed" as const, color: "#6366f1" },
  },

  // Validate → Deduplicate
  {
    id: "df-e-validate-dedup",
    source: "df-validate",
    target: "df-deduplicate",
    animated: true,
    style: { strokeWidth: 2, stroke: "#d97706" },
    markerEnd: { type: "arrowclosed" as const, color: "#d97706" },
  },

  // Validate → Enrich
  {
    id: "df-e-validate-enrich",
    source: "df-validate",
    target: "df-enrich",
    animated: true,
    style: { strokeWidth: 2, stroke: "#d97706" },
    markerEnd: { type: "arrowclosed" as const, color: "#d97706" },
  },

  // Deduplicate → Aggregate
  {
    id: "df-e-dedup-aggregate",
    source: "df-deduplicate",
    target: "df-aggregate",
    animated: true,
    style: { strokeWidth: 2, stroke: "#d97706" },
    markerEnd: { type: "arrowclosed" as const, color: "#d97706" },
  },

  // Enrich → Aggregate
  {
    id: "df-e-enrich-aggregate",
    source: "df-enrich",
    target: "df-aggregate",
    animated: true,
    style: { strokeWidth: 2, stroke: "#d97706" },
    markerEnd: { type: "arrowclosed" as const, color: "#d97706" },
  },

  // Aggregate → Load destinations
  {
    id: "df-e-aggregate-warehouse",
    source: "df-aggregate",
    target: "df-warehouse",
    animated: true,
    style: { strokeWidth: 3, stroke: "#22c55e" },
    label: "load",
    labelStyle: { fontSize: 10, fontWeight: 700, fill: "#16a34a" },
    markerEnd: { type: "arrowclosed" as const, color: "#22c55e" },
  },
  {
    id: "df-e-aggregate-analytics",
    source: "df-aggregate",
    target: "df-analytics",
    animated: true,
    style: { strokeWidth: 3, stroke: "#22c55e" },
    label: "load",
    labelStyle: { fontSize: 10, fontWeight: 700, fill: "#16a34a" },
    markerEnd: { type: "arrowclosed" as const, color: "#22c55e" },
  },

  // Analytics → Dashboard
  {
    id: "df-e-analytics-dashboard",
    source: "df-analytics",
    target: "df-dashboard",
    style: { strokeWidth: 2, stroke: "#6366f1", strokeDasharray: "5 3" },
    label: "visualize",
    labelStyle: { fontSize: 9, fill: "#6366f1" },
    markerEnd: { type: "arrowclosed" as const, color: "#6366f1" },
  },
];
