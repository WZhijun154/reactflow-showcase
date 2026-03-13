import type { Node, Edge } from "@xyflow/react";

/**
 * Concept Map: Machine Learning Concepts
 *
 * Categories with pastel colors:
 *  - core (rose): Central ML concept
 *  - paradigm (sky): Learning paradigms
 *  - algorithm (violet): Specific algorithms
 *  - application (emerald): Real-world applications
 *  - technique (amber): Supporting techniques
 */

export const conceptMapNodes: Node[] = [
  // Core concept (largest)
  {
    id: "cm-ml",
    type: "concept",
    position: { x: 400, y: 250 },
    data: { label: "Machine Learning", category: "core", importance: "high" },
  },

  // Paradigms
  {
    id: "cm-supervised",
    type: "concept",
    position: { x: 100, y: 100 },
    data: { label: "Supervised Learning", category: "paradigm", importance: "high" },
  },
  {
    id: "cm-unsupervised",
    type: "concept",
    position: { x: 100, y: 400 },
    data: { label: "Unsupervised Learning", category: "paradigm", importance: "high" },
  },
  {
    id: "cm-reinforcement",
    type: "concept",
    position: { x: 700, y: 100 },
    data: { label: "Reinforcement Learning", category: "paradigm", importance: "high" },
  },

  // Algorithms
  {
    id: "cm-neural-nets",
    type: "concept",
    position: { x: 350, y: 0 },
    data: { label: "Neural Networks", category: "algorithm", importance: "medium" },
  },
  {
    id: "cm-decision-trees",
    type: "concept",
    position: { x: 50, y: 250 },
    data: { label: "Decision Trees", category: "algorithm", importance: "medium" },
  },
  {
    id: "cm-clustering",
    type: "concept",
    position: { x: 50, y: 530 },
    data: { label: "Clustering (K-Means)", category: "algorithm", importance: "medium" },
  },
  {
    id: "cm-deep-learning",
    type: "concept",
    position: { x: 600, y: 0 },
    data: { label: "Deep Learning", category: "algorithm", importance: "medium" },
  },
  {
    id: "cm-svm",
    type: "concept",
    position: { x: 200, y: 0 },
    data: { label: "SVM", category: "algorithm", importance: "low" },
  },

  // Applications
  {
    id: "cm-nlp",
    type: "concept",
    position: { x: 750, y: 300 },
    data: { label: "NLP", category: "application", importance: "medium" },
  },
  {
    id: "cm-computer-vision",
    type: "concept",
    position: { x: 750, y: 450 },
    data: { label: "Computer Vision", category: "application", importance: "medium" },
  },
  {
    id: "cm-recommendation",
    type: "concept",
    position: { x: 400, y: 500 },
    data: { label: "Recommendation Systems", category: "application", importance: "medium" },
  },

  // Techniques
  {
    id: "cm-feature-engineering",
    type: "concept",
    position: { x: 500, y: 130 },
    data: { label: "Feature Engineering", category: "technique", importance: "low" },
  },
  {
    id: "cm-cross-validation",
    type: "concept",
    position: { x: 250, y: 150 },
    data: { label: "Cross-Validation", category: "technique", importance: "low" },
  },
  {
    id: "cm-transfer-learning",
    type: "concept",
    position: { x: 850, y: 180 },
    data: { label: "Transfer Learning", category: "technique", importance: "low" },
  },
];

export const conceptMapEdges: Edge[] = [
  // Core → Paradigms
  {
    id: "cm-e-ml-supervised",
    source: "cm-ml",
    target: "cm-supervised",
    type: "default",
    label: "includes",
    labelStyle: { fontSize: 10, fill: "#6b7280" },
    style: { strokeWidth: 2, stroke: "#94a3b8" },
  },
  {
    id: "cm-e-ml-unsupervised",
    source: "cm-ml",
    target: "cm-unsupervised",
    type: "default",
    label: "includes",
    labelStyle: { fontSize: 10, fill: "#6b7280" },
    style: { strokeWidth: 2, stroke: "#94a3b8" },
  },
  {
    id: "cm-e-ml-reinforcement",
    source: "cm-ml",
    target: "cm-reinforcement",
    type: "default",
    label: "includes",
    labelStyle: { fontSize: 10, fill: "#6b7280" },
    style: { strokeWidth: 2, stroke: "#94a3b8" },
  },

  // Paradigms → Algorithms
  {
    id: "cm-e-supervised-dt",
    source: "cm-supervised",
    target: "cm-decision-trees",
    type: "default",
    label: "uses",
    labelStyle: { fontSize: 9, fill: "#8b5cf6" },
    style: { strokeWidth: 1.5, stroke: "#a78bfa" },
  },
  {
    id: "cm-e-supervised-svm",
    source: "cm-supervised",
    target: "cm-svm",
    type: "default",
    label: "uses",
    labelStyle: { fontSize: 9, fill: "#8b5cf6" },
    style: { strokeWidth: 1.5, stroke: "#a78bfa" },
  },
  {
    id: "cm-e-supervised-nn",
    source: "cm-supervised",
    target: "cm-neural-nets",
    type: "default",
    label: "uses",
    labelStyle: { fontSize: 9, fill: "#8b5cf6" },
    style: { strokeWidth: 1.5, stroke: "#a78bfa" },
  },
  {
    id: "cm-e-unsupervised-clustering",
    source: "cm-unsupervised",
    target: "cm-clustering",
    type: "default",
    label: "uses",
    labelStyle: { fontSize: 9, fill: "#8b5cf6" },
    style: { strokeWidth: 1.5, stroke: "#a78bfa" },
  },
  {
    id: "cm-e-nn-deep",
    source: "cm-neural-nets",
    target: "cm-deep-learning",
    type: "default",
    label: "extends to",
    labelStyle: { fontSize: 9, fill: "#8b5cf6" },
    style: { strokeWidth: 1.5, stroke: "#a78bfa" },
  },

  // Algorithms/Paradigms → Applications
  {
    id: "cm-e-deep-nlp",
    source: "cm-deep-learning",
    target: "cm-nlp",
    type: "default",
    label: "enables",
    labelStyle: { fontSize: 9, fill: "#10b981" },
    style: { strokeWidth: 1.5, stroke: "#6ee7b7" },
  },
  {
    id: "cm-e-deep-cv",
    source: "cm-deep-learning",
    target: "cm-computer-vision",
    type: "default",
    label: "enables",
    labelStyle: { fontSize: 9, fill: "#10b981" },
    style: { strokeWidth: 1.5, stroke: "#6ee7b7" },
  },
  {
    id: "cm-e-unsupervised-rec",
    source: "cm-unsupervised",
    target: "cm-recommendation",
    type: "default",
    label: "powers",
    labelStyle: { fontSize: 9, fill: "#10b981" },
    style: { strokeWidth: 1.5, stroke: "#6ee7b7" },
  },
  {
    id: "cm-e-reinforcement-nlp",
    source: "cm-reinforcement",
    target: "cm-nlp",
    type: "default",
    label: "applied in",
    labelStyle: { fontSize: 9, fill: "#10b981" },
    style: { strokeWidth: 1.5, stroke: "#6ee7b7" },
  },

  // Technique connections
  {
    id: "cm-e-ml-feature",
    source: "cm-ml",
    target: "cm-feature-engineering",
    type: "default",
    label: "requires",
    labelStyle: { fontSize: 9, fill: "#f59e0b" },
    style: { strokeWidth: 1.5, stroke: "#fbbf24" },
  },
  {
    id: "cm-e-supervised-cv",
    source: "cm-supervised",
    target: "cm-cross-validation",
    type: "default",
    label: "evaluated by",
    labelStyle: { fontSize: 9, fill: "#f59e0b" },
    style: { strokeWidth: 1.5, stroke: "#fbbf24" },
  },
  {
    id: "cm-e-deep-transfer",
    source: "cm-deep-learning",
    target: "cm-transfer-learning",
    type: "default",
    label: "technique",
    labelStyle: { fontSize: 9, fill: "#f59e0b" },
    style: { strokeWidth: 1.5, stroke: "#fbbf24" },
  },

  // Cross-connections (bidirectional-ish relationships)
  {
    id: "cm-e-cv-recommendation",
    source: "cm-computer-vision",
    target: "cm-recommendation",
    type: "default",
    label: "combined with",
    labelStyle: { fontSize: 9, fill: "#6b7280" },
    style: { strokeWidth: 1, stroke: "#cbd5e1", strokeDasharray: "4 3" },
  },
  {
    id: "cm-e-nlp-recommendation",
    source: "cm-nlp",
    target: "cm-recommendation",
    type: "default",
    label: "combined with",
    labelStyle: { fontSize: 9, fill: "#6b7280" },
    style: { strokeWidth: 1, stroke: "#cbd5e1", strokeDasharray: "4 3" },
  },
];
