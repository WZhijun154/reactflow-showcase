import type { Node, Edge } from "@xyflow/react";

export const networkNodes: Node[] = [
  // External zone - Clients
  {
    id: "net-client-web",
    type: "clientNode",
    position: { x: 100, y: 0 },
    data: { label: "Web Browsers", zone: "external", icon: "🌍" },
  },
  {
    id: "net-client-mobile",
    type: "clientNode",
    position: { x: 350, y: 0 },
    data: { label: "Mobile Apps", zone: "external", icon: "📱" },
  },
  {
    id: "net-client-api",
    type: "clientNode",
    position: { x: 600, y: 0 },
    data: { label: "API Consumers", zone: "external", icon: "🔌" },
  },
  // DMZ zone
  {
    id: "net-cdn",
    type: "cloudNode",
    position: { x: 100, y: 150 },
    data: { label: "CDN", zone: "dmz", provider: "CloudFlare" },
  },
  {
    id: "net-firewall",
    type: "firewallNode",
    position: { x: 350, y: 150 },
    data: { label: "WAF / Firewall", zone: "dmz" },
  },
  // Internal zone - Load Balancers
  {
    id: "net-lb-primary",
    type: "loadBalancerNode",
    position: { x: 220, y: 310 },
    data: { label: "Primary LB", zone: "internal", algorithm: "Round Robin" },
  },
  {
    id: "net-lb-secondary",
    type: "loadBalancerNode",
    position: { x: 480, y: 310 },
    data: { label: "Secondary LB", zone: "internal", algorithm: "Least Conn" },
  },
  // Internal zone - Servers
  {
    id: "net-server-app1",
    type: "serverNode",
    position: { x: 80, y: 470 },
    data: { label: "App Server 1", zone: "internal", os: "Ubuntu 22.04", cpu: "4 vCPU" },
  },
  {
    id: "net-server-app2",
    type: "serverNode",
    position: { x: 320, y: 470 },
    data: { label: "App Server 2", zone: "internal", os: "Ubuntu 22.04", cpu: "4 vCPU" },
  },
  {
    id: "net-server-app3",
    type: "serverNode",
    position: { x: 560, y: 470 },
    data: { label: "App Server 3", zone: "internal", os: "Ubuntu 22.04", cpu: "4 vCPU" },
  },
  // Internal zone - Databases
  {
    id: "net-db-primary",
    type: "serverNode",
    position: { x: 150, y: 640 },
    data: { label: "DB Primary", zone: "internal", os: "PostgreSQL 16", cpu: "8 vCPU" },
  },
  {
    id: "net-db-replica",
    type: "serverNode",
    position: { x: 420, y: 640 },
    data: { label: "DB Replica", zone: "internal", os: "PostgreSQL 16", cpu: "8 vCPU" },
  },
  // Cloud services
  {
    id: "net-cloud-storage",
    type: "cloudNode",
    position: { x: 650, y: 640 },
    data: { label: "Object Storage", zone: "internal", provider: "AWS S3" },
  },
  {
    id: "net-monitoring",
    type: "cloudNode",
    position: { x: 700, y: 310 },
    data: { label: "Monitoring", zone: "internal", provider: "Datadog" },
  },
];

export const networkEdges: Edge[] = [
  // Clients to DMZ
  {
    id: "net-e-web-cdn",
    source: "net-client-web",
    target: "net-cdn",
    label: "HTTPS",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
  {
    id: "net-e-mobile-fw",
    source: "net-client-mobile",
    target: "net-firewall",
    label: "HTTPS",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
  {
    id: "net-e-api-fw",
    source: "net-client-api",
    target: "net-firewall",
    label: "HTTPS/REST",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#6366f1", strokeWidth: 2 },
  },
  // CDN to Firewall
  {
    id: "net-e-cdn-fw",
    source: "net-cdn",
    target: "net-firewall",
    label: "filtered",
    type: "smoothstep",
    style: { stroke: "#f59e0b", strokeWidth: 2 },
  },
  // Firewall to Load Balancers
  {
    id: "net-e-fw-lb1",
    source: "net-firewall",
    target: "net-lb-primary",
    label: "port 443",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  {
    id: "net-e-fw-lb2",
    source: "net-firewall",
    target: "net-lb-secondary",
    label: "port 443",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#10b981", strokeWidth: 2 },
  },
  // Load Balancer to Servers
  {
    id: "net-e-lb1-app1",
    source: "net-lb-primary",
    target: "net-server-app1",
    label: "HTTP",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "net-e-lb1-app2",
    source: "net-lb-primary",
    target: "net-server-app2",
    label: "HTTP",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "net-e-lb2-app2",
    source: "net-lb-secondary",
    target: "net-server-app2",
    label: "HTTP",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  {
    id: "net-e-lb2-app3",
    source: "net-lb-secondary",
    target: "net-server-app3",
    label: "HTTP",
    type: "smoothstep",
    style: { stroke: "#3b82f6", strokeWidth: 2 },
  },
  // Servers to Databases
  {
    id: "net-e-app1-db",
    source: "net-server-app1",
    target: "net-db-primary",
    label: "TCP/5432",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
  },
  {
    id: "net-e-app2-db",
    source: "net-server-app2",
    target: "net-db-primary",
    label: "TCP/5432",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2 },
  },
  {
    id: "net-e-app3-dbreplica",
    source: "net-server-app3",
    target: "net-db-replica",
    label: "TCP/5432 (read)",
    type: "smoothstep",
    style: { stroke: "#8b5cf6", strokeWidth: 2, strokeDasharray: "6 3" },
  },
  // DB Replication
  {
    id: "net-e-db-replication",
    source: "net-db-primary",
    target: "net-db-replica",
    label: "replication",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#ec4899", strokeWidth: 2 },
  },
  // Server to Cloud Storage
  {
    id: "net-e-app3-storage",
    source: "net-server-app3",
    target: "net-cloud-storage",
    label: "S3 API",
    type: "smoothstep",
    style: { stroke: "#f59e0b", strokeWidth: 2, strokeDasharray: "6 3" },
  },
  // Monitoring connections
  {
    id: "net-e-lb1-monitoring",
    source: "net-lb-primary",
    target: "net-monitoring",
    label: "metrics",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" },
  },
  {
    id: "net-e-app2-monitoring",
    source: "net-server-app2",
    target: "net-monitoring",
    label: "logs",
    type: "smoothstep",
    style: { stroke: "#94a3b8", strokeWidth: 1, strokeDasharray: "4 4" },
  },
];
