# React Flow Showcase

A polished Next.js application demonstrating the full power of the [React Flow](https://reactflow.dev) library for interactive diagrams. Features multiple diagram types including flowcharts, architecture diagrams, mind maps, ER diagrams, and more — all fully interactive with draggable nodes, zooming, and panning.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with TypeScript
- **Diagrams:** React Flow (@xyflow/react)
- **Styling:** Tailwind CSS 4
- **Deployment:** Static export for GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000/reactflow-showcase](http://localhost:3000/reactflow-showcase) in your browser.

### Build

```bash
npm run build
```

This produces a static export in the `out/` directory, ready for deployment to GitHub Pages.

### Lint

```bash
npm run lint
```

## Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions. Push to `main` or `feature/reactflow-showcase` to trigger a deployment.

The live site is available at: [https://WZhijun154.github.io/reactflow-showcase](https://WZhijun154.github.io/reactflow-showcase)

## Diagram Types

The showcase includes the following diagram types:

1. **Flowchart** — Decision tree with yes/no branches
2. **Architecture Diagram** — Microservices with databases, APIs, and queues
3. **Data Flow Diagram** — ETL pipeline / data processing
4. **Concept Map** — Interconnected ideas and topics
5. **Org Chart** — Hierarchical organizational structure
6. **Mind Map** — Central topic with branching sub-topics
7. **State Machine** — Finite state diagram with transitions
8. **Network Topology** — Servers, load balancers, and clients
9. **ER Diagram** — Database entity relationships
10. **Workflow/Pipeline** — CI/CD or business process

## License

MIT
