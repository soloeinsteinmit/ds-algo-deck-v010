// Enum for visualizer types
export const VisualizerType = {
  // data structures
  // implemented
  BASIC_ARRAY_OPERATIONS: "Basic Array Operations",

  // not implemented
  DYNAMIC_ARRAYS: "Dynamic Arrays",
  MULTI_DIMENSIONAL_ARRAYS: "Multi-dimensional Arrays",
  DOUBLY_LINKED_LIST: "Doubly Linked List",
  CIRCULAR_LINKED_LIST: "Circular Linked List",
  SINGLY_LINKED_LIST: "Singly Linked List",
  BINARY_TREE: "Binary Tree",

  // algorithms
  // implemented
  BUBBLE_SORT: "Bubble Sort",
  LINEAR_SEARCH: "Linear Search",

  // not implemented
  QUICK_SORT: "Quick Sort",
  MERGE_SORT: "Merge Sort",
  SELECTION_SORT: "Selection Sort",
  INSERTION_SORT: "Insertion Sort",
  BINARY_SEARCH: "Binary Search",
  JUMP_SEARCH: "Jump Search",
  EXPONENTIAL_SEARCH: "Exponential Search",
  DEPTH_FIRST_SEARCH: "Depth-First Search",
  BREADTH_FIRST_SEARCH: "Breadth-First Search",
  DIJKSTRA: "Dijkstra's",
  FLOYD_WARSHALL: "Floyd-Warshall",
  BELLMAN_FORD: "Bellman-Ford",
  PRIMS_MST: "Prim's MST",
  KRUSKALS_MST: "Kruskal's MST",
  A_STAR_SEARCH: "A* Search",
  FIBONACCI: "Fibonacci",
  COIN_CHANGE: "Coin Change (Minimum Coins)",
  LCS: "Longest Common Subsequence (LCS)",
  KNAPSACK: "Knapsack Problem",
  MATRIX_CHAIN_MULTIPLICATION: "Matrix Chain Multiplication",
  RAT_IN_A_MAZE: "Rat in a Maze",
  N_QUEENS: "N-Queens Problem",
  KNIGHTS_TOUR: "Knight's Tour",
  SUDOKU_SOLVER: "Sudoku Solver",
  ACTIVITY_SELECTION: "Activity Selection",
  FRACTIONAL_KNAPSACK: "Fractional Knapsack",
  HUFFMAN_CODING: "Huffman Coding",
  JOB_SEQUENCING: "Job Sequencing",
  SIEVE_OF_ERATOSTHENES: "Sieve of Eratosthenes (for Prime Nums)",
  EUCLIDEAN_ALGORITHM: "Euclidean Algorithm (for GCD)",
  KPM: "KPM (Knuth-Morris-Pratt) Pattern Matching",
  RABIN_KARP: "Rabin-Karp Algorithm",
  BIT_MANIPULATION: "Bit Manipulation",
  RANDOMIZED_ALGORITHMS: "Randomized Algorithms (eg. QuickSelect)",
};

// Config object structure for each visualizer
export const VisualizerConfig = {
  visualizer: null, // React component for visualizer (set when used)
  controls: null, // React component for controls (set when used)
  title: "",
  description: "",
  defaultSettings: {},
};

// State object for tracking visualizer
export const VisualizerState = {
  currentView: null || VisualizerType.BASIC_ARRAY_OPERATIONS, // this will be the type of visualizer
  settings: {},
  isAnimating: false,
  speed: 1,
};
