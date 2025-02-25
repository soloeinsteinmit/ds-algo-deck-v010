# 🎨 Data Structure & Algorithm Visualization Architecture

## 🔄 Flow Overview

```mermaid
graph TD
    A[User] -->|Clicks Playground| B[PlaygroundLayout]
    B -->|Loads| C[VisualizingPanel]
    C -->|Uses| D[VisualizerLoader]
    D -->|Loads| E[ArrayVisualizer]
    D -->|Loads| F[ArrayControls]
    
    E -->|Updates| G[Redux Store]
    F -->|Dispatches Actions| G
    G -->|State Changes| E
```

## 🏗️ Component Architecture

```mermaid
classDiagram
    class PlaygroundLayout {
        +isEditorOpen: boolean
        +isListOpen: boolean
        +render()
    }
    
    class VisualizingPanel {
        +currentView: string
        +render()
    }
    
    class VisualizerLoader {
        +type: string
        +visualizerMap: object
        +loadVisualizer()
    }
    
    class ArrayVisualizer {
        +array: number[]
        +elementPositions: object[]
        +render()
    }
    
    class ArrayControls {
        +handleInsert()
        +handleDelete()
        +handleUpdate()
    }
    
    class ReduxStore {
        +array: number[]
        +index: number
        +element: number
        +isInserting: boolean
        +isDeleting: boolean
        +isUpdating: boolean
    }
    
    PlaygroundLayout --> VisualizingPanel
    VisualizingPanel --> VisualizerLoader
    VisualizerLoader --> ArrayVisualizer
    VisualizerLoader --> ArrayControls
    ArrayVisualizer --> ReduxStore
    ArrayControls --> ReduxStore
```

## 🔄 State Management Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as ArrayControls
    participant S as Redux Store
    participant V as ArrayVisualizer
    
    U->>C: Clicks Insert
    C->>S: Dispatch setIsInserting(true)
    C->>S: Dispatch setElement(value)
    C->>S: Dispatch setIndex(index)
    S->>V: State Update
    V->>V: Start Animation
    V->>S: Dispatch setArray(newArray)
    S->>V: State Update
    V->>V: Complete Animation
    V->>S: Dispatch setIsInserting(false)
```

## 🎯 Array Operations Flow

```mermaid
graph LR
    subgraph User Actions
        A[Click Insert] --> B[Click Delete]
        B --> C[Click Update]
    end
    
    subgraph Redux Actions
        D[setIsInserting] --> E[setElement]
        E --> F[setIndex]
        F --> G[setArray]
    end
    
    subgraph Animation States
        H[Start Animation] --> I[Update Positions]
        I --> J[Complete Animation]
    end
    
    A --> D
    D --> H
    J --> G
```

## 📁 File Structure

```mermaid
graph TD
    subgraph src
        A[pages/] --> B[Playground/]
        B --> C[VisualizingPanel.jsx]
        
        D[utils/] --> E[VisualizerLoader.jsx]
        
        F[components/] --> G[visualizer/]
        G --> H[data_structures/]
        H --> I[array/]
        I --> J[ArrayVisualizer.jsx]
        I --> K[ArrayControls.jsx]
        
        L[features/] --> M[visualizer/]
        M --> N[arrays/]
        N --> O[arrayVisualizerSlice.js]
    end
```

## 🎨 Animation States

```mermaid
stateDiagram-v2
    [*] --> Idle
    Idle --> Inserting: User clicks Insert
    Inserting --> Animating: Start animation
    Animating --> UpdatingArray: Animation complete
    UpdatingArray --> Idle: Update complete
    
    Idle --> Deleting: User clicks Delete
    Deleting --> Animating
    
    Idle --> Updating: User clicks Update
    Updating --> Animating
```

## 💻 Code Editor Integration

```mermaid
classDiagram
    class MonacoEditor {
        +value: string
        +language: string
        +theme: string
        +onChange()
        +onExecute()
    }

    class CodeExecutor {
        +parseCode()
        +validateSyntax()
        +executeCode()
        +handleError()
    }

    class ExecutionContext {
        +scope: object
        +variables: Map
        +functions: Map
        +stepCount: number
    }

    class VisualizationBridge {
        +syncState()
        +updateVisuals()
        +handleExecutionStep()
    }

    MonacoEditor --> CodeExecutor
    CodeExecutor --> ExecutionContext
    ExecutionContext --> VisualizationBridge
    VisualizationBridge --> ReduxStore
```

## 📊 Dashboard Architecture

```mermaid
classDiagram
    class DashboardLayout {
        +activeView: string
        +metrics: object
        +render()
    }

    class PerformanceMetrics {
        +timeComplexity: string
        +spaceComplexity: string
        +calculateMetrics()
    }

    class AlgorithmComparison {
        +algorithms: Algorithm[]
        +comparePerformance()
        +visualizeComparison()
    }

    class UserProgress {
        +completedItems: number
        +skillLevel: string
        +updateProgress()
    }

    DashboardLayout --> PerformanceMetrics
    DashboardLayout --> AlgorithmComparison
    DashboardLayout --> UserProgress
```

## 🔄 Real-time Updates Flow

```mermaid
sequenceDiagram
    participant E as Editor
    participant X as CodeExecutor
    participant C as ExecutionContext
    participant V as Visualizer
    participant S as State

    E->>X: Code Changes
    X->>C: Parse & Validate
    C->>V: Execute Step
    V->>S: Update State
    S->>V: Reflect Changes
    V->>E: Update Editor State
```

## 🔑 Key Points

1. **Component Hierarchy**
   - PlaygroundLayout is the top-level container
   - VisualizingPanel manages the current visualization
   - VisualizerLoader dynamically loads the appropriate components
   - ArrayVisualizer handles the actual visualization
   - ArrayControls provides user interaction

2. **State Management**
   - Redux store manages all state
   - Actions are dispatched from controls
   - Visualizer reacts to state changes
   - Animations are triggered by state updates

3. **Code Editor Features**
   - Monaco Editor integration with syntax highlighting
   - Real-time code execution and validation
   - Step-by-step debugging capabilities
   - Synchronized visualization updates
   - Error handling and feedback

4. **Dashboard Capabilities**
   - Performance metrics tracking
   - Algorithm comparison tools
   - User progress monitoring
   - Interactive learning paths
   - Customizable views

5. **Animation Flow**
   - Operation starts (insert/delete/update)
   - Animation begins
   - Array is updated
   - Animation completes
   - State is reset

6. **File Organization**
   - Clear separation of concerns
   - Components are modular
   - State management is centralized
   - Utils provide shared functionality
