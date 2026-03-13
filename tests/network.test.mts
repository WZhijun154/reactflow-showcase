import { describe, it } from "node:test";
import { strict as assert } from "node:assert";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");

describe("US-009: Network Topology Diagram", () => {
  describe("Network data", () => {
    const dataPath = join(ROOT, "src/data/network.ts");

    it("data file exists", () => {
      assert.ok(existsSync(dataPath), "network.ts data file should exist");
    });

    it("exports networkNodes with 10+ nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const networkNodes"),
        "Should export networkNodes"
      );
      const nodeMatches = content.match(/id:\s*"net-/g);
      assert.ok(nodeMatches, "Should have node definitions");
      assert.ok(
        nodeMatches.length >= 10,
        `Should have at least 10 nodes, found ${nodeMatches.length}`
      );
    });

    it("exports networkEdges with 12+ edges", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes("export const networkEdges"),
        "Should export networkEdges"
      );
      const edgeMatches = content.match(/id:\s*"net-e-/g);
      assert.ok(edgeMatches, "Should have edge definitions");
      assert.ok(
        edgeMatches.length >= 12,
        `Should have at least 12 edges, found ${edgeMatches.length}`
      );
    });

    it("has client nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const clientMatches = content.match(/type:\s*"clientNode"/g);
      assert.ok(clientMatches, "Should have clientNode types");
      assert.ok(
        clientMatches.length >= 2,
        `Should have at least 2 clients, found ${clientMatches.length}`
      );
    });

    it("has firewall node", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(
        content.includes('type: "firewallNode"'),
        "Should have a firewallNode"
      );
    });

    it("has load balancer nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const lbMatches = content.match(/type:\s*"loadBalancerNode"/g);
      assert.ok(lbMatches, "Should have loadBalancerNode types");
      assert.ok(
        lbMatches.length >= 2,
        `Should have at least 2 load balancers, found ${lbMatches.length}`
      );
    });

    it("has server nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const serverMatches = content.match(/type:\s*"serverNode"/g);
      assert.ok(serverMatches, "Should have serverNode types");
      assert.ok(
        serverMatches.length >= 3,
        `Should have at least 3 servers, found ${serverMatches.length}`
      );
    });

    it("has cloud nodes", () => {
      const content = readFileSync(dataPath, "utf-8");
      const cloudMatches = content.match(/type:\s*"cloudNode"/g);
      assert.ok(cloudMatches, "Should have cloudNode types");
      assert.ok(
        cloudMatches.length >= 2,
        `Should have at least 2 cloud nodes, found ${cloudMatches.length}`
      );
    });

    it("has multiple network zones", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"external"'), "Should have external zone");
      assert.ok(content.includes('"dmz"'), "Should have DMZ zone");
      assert.ok(content.includes('"internal"'), "Should have internal zone");
    });

    it("edges have protocol labels", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"HTTPS"'), "Should have HTTPS label");
      assert.ok(content.includes('"HTTP"'), "Should have HTTP label");
      assert.ok(content.includes('"TCP/5432"'), "Should have TCP/5432 label");
    });

    it("has replication edge", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"replication"'), "Should have replication edge");
    });

    it("has monitoring connections", () => {
      const content = readFileSync(dataPath, "utf-8");
      assert.ok(content.includes('"metrics"'), "Should have metrics edge");
      assert.ok(content.includes('"logs"'), "Should have logs edge");
    });

    it("uses smoothstep edge type", () => {
      const content = readFileSync(dataPath, "utf-8");
      const smoothstepMatches = content.match(/type:\s*"smoothstep"/g);
      assert.ok(smoothstepMatches, "Should use smoothstep edge type");
      assert.ok(
        smoothstepMatches.length >= 12,
        `Should have smoothstep edges, found ${smoothstepMatches.length}`
      );
    });
  });

  describe("ServerNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/network/nodes/ServerNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "ServerNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("imports Handle and Position", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("Handle"), "Should import Handle");
      assert.ok(content.includes("Position"), "Should import Position");
    });

    it("has server icon", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("🖥️"), "Should have server icon");
    });

    it("has zone-based coloring", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("zoneColors"), "Should have zone color lookup");
      assert.ok(content.includes("internal"), "Should handle internal zone");
      assert.ok(content.includes("dmz"), "Should handle DMZ zone");
      assert.ok(content.includes("external"), "Should handle external zone");
    });

    it("has dark mode support", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("dark:"), "Should have dark mode classes");
    });

    it("has hover effects", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("hover:shadow"), "Should have hover shadow");
      assert.ok(content.includes("hover:scale"), "Should have hover scale");
    });
  });

  describe("LoadBalancerNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/network/nodes/LoadBalancerNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "LoadBalancerNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has hexagonal shape via clipPath", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("clipPath"), "Should use clipPath for hexagonal shape");
      assert.ok(content.includes("polygon"), "Should use polygon in clipPath");
    });

    it("has load balancer icon", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("⚖️"), "Should have balance/load balancer icon");
    });

    it("displays algorithm info", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("algorithm"), "Should display algorithm");
    });
  });

  describe("ClientNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/network/nodes/ClientNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "ClientNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has rounded (pill/circle) shape", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("rounded-full"), "Should have rounded-full for pill shape");
    });

    it("displays icon from data", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("nodeData.icon"), "Should display dynamic icon");
    });
  });

  describe("FirewallNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/network/nodes/FirewallNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "FirewallNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has firewall icon", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("🔥"), "Should have fire/firewall icon");
    });

    it("has red/warning styling", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("red"), "Should have red coloring for firewall");
    });

    it("has DMZ badge", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("DMZ"), "Should display DMZ badge");
    });
  });

  describe("CloudNode component", () => {
    const nodePath = join(
      ROOT,
      "src/components/diagrams/network/nodes/CloudNode.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(nodePath), "CloudNode.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("has cloud icon", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("☁️"), "Should have cloud icon");
    });

    it("displays provider info", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("provider"), "Should display provider");
    });

    it("has sky/blue styling", () => {
      const content = readFileSync(nodePath, "utf-8");
      assert.ok(content.includes("sky"), "Should have sky coloring for cloud");
    });
  });

  describe("NetworkTopologyDiagram component", () => {
    const componentPath = join(
      ROOT,
      "src/components/diagrams/network/NetworkTopologyDiagram.tsx"
    );

    it("component file exists", () => {
      assert.ok(existsSync(componentPath), "NetworkTopologyDiagram.tsx should exist");
    });

    it("has 'use client' directive", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes('"use client"'), "Should have 'use client'");
    });

    it("registers all five node types", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("serverNode: ServerNode"), "Should register ServerNode");
      assert.ok(content.includes("loadBalancerNode: LoadBalancerNode"), "Should register LoadBalancerNode");
      assert.ok(content.includes("clientNode: ClientNode"), "Should register ClientNode");
      assert.ok(content.includes("firewallNode: FirewallNode"), "Should register FirewallNode");
      assert.ok(content.includes("cloudNode: CloudNode"), "Should register CloudNode");
    });

    it("uses DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(content.includes("DiagramWrapper"), "Should use DiagramWrapper");
    });

    it("passes nodeTypes to DiagramWrapper", () => {
      const content = readFileSync(componentPath, "utf-8");
      assert.ok(
        content.includes("nodeTypes={networkNodeTypes}"),
        "Should pass nodeTypes"
      );
    });
  });

  describe("nodes barrel file", () => {
    const indexPath = join(
      ROOT,
      "src/components/diagrams/network/nodes/index.ts"
    );

    it("barrel file exists", () => {
      assert.ok(existsSync(indexPath), "nodes/index.ts should exist");
    });

    it("exports all node types", () => {
      const content = readFileSync(indexPath, "utf-8");
      assert.ok(content.includes("ServerNode"), "Should export ServerNode");
      assert.ok(content.includes("LoadBalancerNode"), "Should export LoadBalancerNode");
      assert.ok(content.includes("ClientNode"), "Should export ClientNode");
      assert.ok(content.includes("FirewallNode"), "Should export FirewallNode");
      assert.ok(content.includes("CloudNode"), "Should export CloudNode");
    });
  });

  describe("DiagramContainer integration", () => {
    const containerPath = join(
      ROOT,
      "src/components/layout/DiagramContainer.tsx"
    );

    it("imports NetworkTopologyDiagram", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes("NetworkTopologyDiagram"),
        "DiagramContainer should import NetworkTopologyDiagram"
      );
    });

    it("renders NetworkTopologyDiagram for network-topology id", () => {
      const content = readFileSync(containerPath, "utf-8");
      assert.ok(
        content.includes('"network-topology"'),
        "DiagramContainer should handle network-topology diagram id"
      );
    });
  });

  describe("Sidebar navigation", () => {
    const diagramsPath = join(ROOT, "src/constants/diagrams.ts");

    it("network-topology is in the diagrams list", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(
        content.includes('"network-topology"'),
        "Network Topology should be in diagrams list"
      );
    });

    it("network-topology has title and description", () => {
      const content = readFileSync(diagramsPath, "utf-8");
      assert.ok(content.includes('"Network Topology"'), "Should have Network Topology title");
      assert.ok(
        content.includes("load balancer") || content.includes("Servers"),
        "Should have description mentioning network infrastructure"
      );
    });
  });
});
