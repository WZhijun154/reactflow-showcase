export interface DiagramDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const diagrams: DiagramDefinition[] = [
  {
    id: "flowchart",
    title: "Flowchart",
    description:
      "A decision tree with yes/no branches demonstrating conditional logic and process flow.",
    icon: "🔀",
  },
  {
    id: "architecture",
    title: "Architecture Diagram",
    description:
      "A microservices architecture with databases, APIs, message queues, and service connections.",
    icon: "🏗️",
  },
  {
    id: "data-flow",
    title: "Data Flow Diagram",
    description:
      "An ETL pipeline showing data extraction, transformation, and loading stages.",
    icon: "📊",
  },
  {
    id: "concept-map",
    title: "Concept Map",
    description:
      "Interconnected ideas and topics showing relationships between concepts.",
    icon: "🧠",
  },
  {
    id: "org-chart",
    title: "Org Chart",
    description:
      "A hierarchical organizational structure showing reporting relationships.",
    icon: "👥",
  },
  {
    id: "mind-map",
    title: "Mind Map",
    description:
      "A central topic with branching sub-topics for brainstorming and ideation.",
    icon: "💡",
  },
  {
    id: "state-machine",
    title: "State Machine",
    description:
      "A finite state diagram showing states and transitions for a system lifecycle.",
    icon: "⚙️",
  },
  {
    id: "network-topology",
    title: "Network Topology",
    description:
      "Servers, load balancers, firewalls, and clients in a network infrastructure layout.",
    icon: "🌐",
  },
  {
    id: "er-diagram",
    title: "ER Diagram",
    description:
      "Database entity-relationship diagram showing tables, fields, and relationships.",
    icon: "🗄️",
  },
  {
    id: "workflow",
    title: "Workflow / Pipeline",
    description:
      "A CI/CD pipeline or business process showing sequential and parallel steps.",
    icon: "🔄",
  },
];
