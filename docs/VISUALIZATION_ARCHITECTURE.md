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

3. **Animation Flow**
   - Operation starts (insert/delete/update)
   - Animation begins
   - Array is updated
   - Animation completes
   - State is reset

4. **File Organization**
   - Clear separation of concerns
   - Components are modular
   - State management is centralized
   - Utils provide shared functionality
