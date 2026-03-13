import type { Node, Edge } from "@xyflow/react";

export interface Column {
  name: string;
  type: string;
  pk?: boolean;
  fk?: boolean;
  nullable?: boolean;
}

export interface EntityNodeData {
  label: string;
  columns: Column[];
  color: string;
  [key: string]: unknown;
}

export const erDiagramNodes: Node[] = [
  {
    id: "er-users",
    type: "entityNode",
    position: { x: 50, y: 50 },
    data: {
      label: "Users",
      color: "#3b82f6",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "email", type: "VARCHAR(255)" },
        { name: "username", type: "VARCHAR(100)" },
        { name: "password_hash", type: "VARCHAR(255)" },
        { name: "created_at", type: "TIMESTAMP" },
        { name: "is_active", type: "BOOLEAN" },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-products",
    type: "entityNode",
    position: { x: 500, y: 50 },
    data: {
      label: "Products",
      color: "#10b981",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "category_id", type: "INTEGER", fk: true },
        { name: "name", type: "VARCHAR(200)" },
        { name: "description", type: "TEXT" },
        { name: "price", type: "DECIMAL(10,2)" },
        { name: "stock_qty", type: "INTEGER" },
        { name: "created_at", type: "TIMESTAMP" },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-categories",
    type: "entityNode",
    position: { x: 950, y: 50 },
    data: {
      label: "Categories",
      color: "#8b5cf6",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "parent_id", type: "INTEGER", fk: true, nullable: true },
        { name: "name", type: "VARCHAR(100)" },
        { name: "slug", type: "VARCHAR(100)" },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-orders",
    type: "entityNode",
    position: { x: 50, y: 380 },
    data: {
      label: "Orders",
      color: "#f59e0b",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "user_id", type: "INTEGER", fk: true },
        { name: "status", type: "VARCHAR(50)" },
        { name: "total_amount", type: "DECIMAL(10,2)" },
        { name: "shipping_address", type: "TEXT" },
        { name: "ordered_at", type: "TIMESTAMP" },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-order-items",
    type: "entityNode",
    position: { x: 500, y: 380 },
    data: {
      label: "OrderItems",
      color: "#ef4444",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "order_id", type: "INTEGER", fk: true },
        { name: "product_id", type: "INTEGER", fk: true },
        { name: "quantity", type: "INTEGER" },
        { name: "unit_price", type: "DECIMAL(10,2)" },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-reviews",
    type: "entityNode",
    position: { x: 950, y: 380 },
    data: {
      label: "Reviews",
      color: "#ec4899",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "user_id", type: "INTEGER", fk: true },
        { name: "product_id", type: "INTEGER", fk: true },
        { name: "rating", type: "SMALLINT" },
        { name: "comment", type: "TEXT", nullable: true },
        { name: "created_at", type: "TIMESTAMP" },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-payments",
    type: "entityNode",
    position: { x: 50, y: 700 },
    data: {
      label: "Payments",
      color: "#06b6d4",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "order_id", type: "INTEGER", fk: true },
        { name: "method", type: "VARCHAR(50)" },
        { name: "amount", type: "DECIMAL(10,2)" },
        { name: "status", type: "VARCHAR(30)" },
        { name: "paid_at", type: "TIMESTAMP", nullable: true },
      ],
    } satisfies EntityNodeData,
  },
  {
    id: "er-addresses",
    type: "entityNode",
    position: { x: 500, y: 700 },
    data: {
      label: "Addresses",
      color: "#84cc16",
      columns: [
        { name: "id", type: "SERIAL", pk: true },
        { name: "user_id", type: "INTEGER", fk: true },
        { name: "street", type: "VARCHAR(255)" },
        { name: "city", type: "VARCHAR(100)" },
        { name: "country", type: "VARCHAR(100)" },
        { name: "postal_code", type: "VARCHAR(20)" },
      ],
    } satisfies EntityNodeData,
  },
];

export const erDiagramEdges: Edge[] = [
  // Users → Orders (1:N)
  {
    id: "er-e-users-orders",
    source: "er-users",
    target: "er-orders",
    label: "1 : N",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#3b82f6" },
  },
  // Users → Reviews (1:N)
  {
    id: "er-e-users-reviews",
    source: "er-users",
    target: "er-reviews",
    label: "1 : N",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#3b82f6" },
  },
  // Users → Addresses (1:N)
  {
    id: "er-e-users-addresses",
    source: "er-users",
    target: "er-addresses",
    label: "1 : N",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#3b82f6" },
  },
  // Products → OrderItems (1:N)
  {
    id: "er-e-products-orderitems",
    source: "er-products",
    target: "er-order-items",
    label: "1 : N",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#10b981" },
  },
  // Products → Reviews (1:N)
  {
    id: "er-e-products-reviews",
    source: "er-products",
    target: "er-reviews",
    label: "1 : N",
    type: "smoothstep",
    style: { stroke: "#10b981", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#10b981" },
  },
  // Categories → Products (1:N)
  {
    id: "er-e-categories-products",
    source: "er-categories",
    target: "er-products",
    label: "1 : N",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#8b5cf6" },
  },
  // Categories → Categories (self-ref 1:N)
  {
    id: "er-e-categories-self",
    source: "er-categories",
    target: "er-categories",
    label: "1 : N",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "6 3" },
    labelStyle: { fontWeight: 700, fill: "#8b5cf6" },
  },
  // Orders → OrderItems (1:N)
  {
    id: "er-e-orders-orderitems",
    source: "er-orders",
    target: "er-order-items",
    label: "1 : N",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#f59e0b", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#f59e0b" },
  },
  // Orders → Payments (1:1)
  {
    id: "er-e-orders-payments",
    source: "er-orders",
    target: "er-payments",
    label: "1 : 1",
    type: "smoothstep",
    style: { stroke: "#06b6d4", strokeWidth: 2 },
    labelStyle: { fontWeight: 700, fill: "#06b6d4" },
  },
  // Users ↔ Products via OrderItems (M:N implicit)
  // OrderItems is the join table — already connected above
];
