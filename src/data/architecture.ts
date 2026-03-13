import type { Node, Edge } from "@xyflow/react";

/**
 * Architecture Diagram: E-Commerce Microservices Platform
 *
 * Tiers:
 *  - Frontend (blue): Web App, Mobile BFF
 *  - Backend (green): Auth, Order, Product, Payment, Notification services
 *  - Data (orange): User DB, Product DB, Order DB, Cache
 *  - Infrastructure (purple): API Gateway, Message Queue, Event Bus
 */

export const architectureNodes: Node[] = [
  // Infrastructure tier
  {
    id: "arch-gateway",
    type: "apiGateway",
    position: { x: 350, y: 0 },
    data: { label: "API Gateway" },
  },
  {
    id: "arch-queue",
    type: "queue",
    position: { x: 700, y: 350 },
    data: { label: "Message Queue" },
  },
  {
    id: "arch-event-bus",
    type: "queue",
    position: { x: 100, y: 500 },
    data: { label: "Event Bus" },
  },

  // Frontend tier
  {
    id: "arch-web-app",
    type: "service",
    position: { x: 200, y: -120 },
    data: { label: "Web App", icon: "🖥️", tier: "frontend" },
  },
  {
    id: "arch-mobile-bff",
    type: "service",
    position: { x: 550, y: -120 },
    data: { label: "Mobile BFF", icon: "📱", tier: "frontend" },
  },

  // Backend services
  {
    id: "arch-auth",
    type: "service",
    position: { x: 100, y: 180 },
    data: { label: "Auth Service", icon: "🔐", tier: "backend" },
  },
  {
    id: "arch-product",
    type: "service",
    position: { x: 350, y: 180 },
    data: { label: "Product Service", icon: "📦", tier: "backend" },
  },
  {
    id: "arch-order",
    type: "service",
    position: { x: 600, y: 180 },
    data: { label: "Order Service", icon: "🛒", tier: "backend" },
  },
  {
    id: "arch-payment",
    type: "service",
    position: { x: 850, y: 350 },
    data: { label: "Payment Service", icon: "💳", tier: "backend" },
  },
  {
    id: "arch-notification",
    type: "service",
    position: { x: 450, y: 500 },
    data: { label: "Notification Service", icon: "🔔", tier: "backend" },
  },

  // Data tier
  {
    id: "arch-user-db",
    type: "database",
    position: { x: 60, y: 370 },
    data: { label: "User DB", dbType: "PostgreSQL" },
  },
  {
    id: "arch-product-db",
    type: "database",
    position: { x: 310, y: 370 },
    data: { label: "Product DB", dbType: "MongoDB" },
  },
  {
    id: "arch-order-db",
    type: "database",
    position: { x: 560, y: 500 },
    data: { label: "Order DB", dbType: "PostgreSQL" },
  },
  {
    id: "arch-cache",
    type: "database",
    position: { x: 200, y: 500 },
    data: { label: "Redis Cache", dbType: "Redis" },
  },
];

export const architectureEdges: Edge[] = [
  // Frontend → Gateway (sync)
  {
    id: "arch-e-web-gw",
    source: "arch-web-app",
    target: "arch-gateway",
    style: { strokeWidth: 2, stroke: "#3b82f6" },
    animated: true,
    label: "HTTPS",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#6b7280" },
  },
  {
    id: "arch-e-mobile-gw",
    source: "arch-mobile-bff",
    target: "arch-gateway",
    style: { strokeWidth: 2, stroke: "#3b82f6" },
    animated: true,
    label: "HTTPS",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#6b7280" },
  },

  // Gateway → Backend services (sync)
  {
    id: "arch-e-gw-auth",
    source: "arch-gateway",
    target: "arch-auth",
    style: { strokeWidth: 2, stroke: "#22c55e" },
    label: "REST",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#16a34a" },
    markerEnd: { type: "arrowclosed" as const, color: "#22c55e" },
  },
  {
    id: "arch-e-gw-product",
    source: "arch-gateway",
    target: "arch-product",
    style: { strokeWidth: 2, stroke: "#22c55e" },
    label: "REST",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#16a34a" },
    markerEnd: { type: "arrowclosed" as const, color: "#22c55e" },
  },
  {
    id: "arch-e-gw-order",
    source: "arch-gateway",
    target: "arch-order",
    style: { strokeWidth: 2, stroke: "#22c55e" },
    label: "gRPC",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#16a34a" },
    markerEnd: { type: "arrowclosed" as const, color: "#22c55e" },
  },

  // Backend → Databases (sync)
  {
    id: "arch-e-auth-userdb",
    source: "arch-auth",
    target: "arch-user-db",
    style: { strokeWidth: 2, stroke: "#f97316" },
    markerEnd: { type: "arrowclosed" as const, color: "#f97316" },
  },
  {
    id: "arch-e-product-productdb",
    source: "arch-product",
    target: "arch-product-db",
    style: { strokeWidth: 2, stroke: "#f97316" },
    markerEnd: { type: "arrowclosed" as const, color: "#f97316" },
  },
  {
    id: "arch-e-order-orderdb",
    source: "arch-order",
    target: "arch-order-db",
    style: { strokeWidth: 2, stroke: "#f97316" },
    markerEnd: { type: "arrowclosed" as const, color: "#f97316" },
  },

  // Backend → Cache (sync)
  {
    id: "arch-e-product-cache",
    source: "arch-product",
    target: "arch-cache",
    style: { strokeWidth: 2, stroke: "#f97316", strokeDasharray: "4 4" },
    label: "cache",
    labelStyle: { fontSize: 9, fill: "#9a3412" },
  },
  {
    id: "arch-e-auth-cache",
    source: "arch-auth",
    target: "arch-cache",
    style: { strokeWidth: 2, stroke: "#f97316", strokeDasharray: "4 4" },
    label: "sessions",
    labelStyle: { fontSize: 9, fill: "#9a3412" },
  },

  // Async: Order → Message Queue → Payment
  {
    id: "arch-e-order-queue",
    source: "arch-order",
    sourceHandle: "right",
    target: "arch-queue",
    style: { strokeWidth: 2, stroke: "#a855f7", strokeDasharray: "6 3" },
    label: "async",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#7c3aed" },
    markerEnd: { type: "arrowclosed" as const, color: "#a855f7" },
    animated: true,
  },
  {
    id: "arch-e-queue-payment",
    source: "arch-queue",
    target: "arch-payment",
    targetHandle: "left",
    style: { strokeWidth: 2, stroke: "#a855f7", strokeDasharray: "6 3" },
    label: "process",
    labelStyle: { fontSize: 10, fontWeight: 600, fill: "#7c3aed" },
    markerEnd: { type: "arrowclosed" as const, color: "#a855f7" },
    animated: true,
  },

  // Async: Payment → Event Bus (publishes event)
  {
    id: "arch-e-payment-eventbus",
    source: "arch-payment",
    target: "arch-event-bus",
    style: { strokeWidth: 2, stroke: "#a855f7", strokeDasharray: "6 3" },
    label: "payment.completed",
    labelStyle: { fontSize: 9, fill: "#7c3aed" },
    markerEnd: { type: "arrowclosed" as const, color: "#a855f7" },
  },

  // Event Bus → Notification (async)
  {
    id: "arch-e-eventbus-notification",
    source: "arch-event-bus",
    target: "arch-notification",
    targetHandle: "left",
    style: { strokeWidth: 2, stroke: "#a855f7", strokeDasharray: "6 3" },
    label: "subscribe",
    labelStyle: { fontSize: 9, fill: "#7c3aed" },
    markerEnd: { type: "arrowclosed" as const, color: "#a855f7" },
    animated: true,
  },

  // Event Bus → Order Service (async update)
  {
    id: "arch-e-eventbus-order",
    source: "arch-event-bus",
    target: "arch-order",
    style: { strokeWidth: 2, stroke: "#a855f7", strokeDasharray: "6 3" },
    label: "order.update",
    labelStyle: { fontSize: 9, fill: "#7c3aed" },
    markerEnd: { type: "arrowclosed" as const, color: "#a855f7" },
    type: "smoothstep",
  },
];
