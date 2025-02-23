/**
 * @fileoverview Hark! Here lies the grand configuration of routes for our noble Data Structures & Algorithms realm.
 * Verily, this manuscript doth define the paths through which our users shall traverse.
 */

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layouts
import PublicLayout from "../layouts/PublicLayout";
import PlaygroundLayout from "../layouts/PlaygroundLayout";
import PlaygroundDashboardLayout from "../layouts/PlaygroundDashboardLayout";
import PlaygroundDashboard from "../pages/Playground/PlaygroundDashboard";

// Error Pages
import ErrorBoundary from "../pages/error/ErrorBoundary";
import PageNotFound from "../pages/NotFound/PageNotFound";

// Main Pages
import Explore from "../pages/Explore/Explore";
import Resources from "../pages/Resources/Resources";
import PracticeMode from "../pages/PracticeMode/PracticeMode";

// Playground Components
import LeftSideBar from "../components/playground/LeftSideBar";
import CodeEditor from "../components/playground/CodeEditor";
import VisualizingPanel from "../pages/Playground/VisualizingPanel";

/**
 * @typedef {Object} RouteConfig
 * @property {string} path - The sacred path through which users shall journey
 * @property {React.Component} element - The noble component that shall render
 * @property {Object} meta - The mystical metadata that describes our route
 */

/**
 * Behold! The grand configuration of our application's routes.
 * Here we define the paths through which our users shall traverse,
 * each route a chapter in our epic tale of learning.
 *
 * Route Structure:
 * - / (Public Routes with Navbar & Footer)
 *   - / (Explore)
 *   - /resources (Learning Resources)
 *   - /practice-mode (Practice Mode)
 * - /playground (Clean Layout for Algorithm Visualization)
 */
export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public routes with navbar and footer */}
      <Route
        path="/"
        element={<PublicLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route
          index
          element={<Explore />}
          meta={{
            title: "Explore 🔎",
            description:
              "Journey through the realm of algorithms and data structures",
            keywords: "algorithms, data structures, explore, learn, visualize",
          }}
        />

        <Route
          path="resources"
          element={<Resources />}
          meta={{
            title: "Resources 📚",
            description: "A grand library of knowledge and wisdom",
            keywords: "resources, learning, documentation, guides",
          }}
        />

        <Route
          path="practice-mode"
          element={<PracticeMode />}
          meta={{
            title: "Practice Mode 🧑‍💻",
            description: "Sharpen thy skills in the art of coding",
            keywords: "practice, challenges, exercises, coding",
          }}
        />

        {/* 404 route */}
        <Route
          path="*"
          element={<PageNotFound />}
          meta={{
            title: "Lost in the Void",
            description: "Alas! The page thou seeketh doth not exist",
            keywords: "404, error, not found",
          }}
        />
      </Route>

      {/* Dashboard */}
      <Route
        path="dashboard"
        element={<PlaygroundDashboardLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route
          index
          element={<PlaygroundDashboard />}
          meta={{
            title: "Algorithm Visualizer 🎯",
            description:
              "Behold the visual manifestation of algorithmic wisdom",
            keywords: "visualizer, algorithms, animation, learning",
          }}
        />
      </Route>

      {/* Playground route with clean layout */}
      <Route
        path="playground"
        element={<PlaygroundLayout />}
        errorElement={<ErrorBoundary />}
      >
        <Route
          index
          element={<VisualizingPanel />}
          meta={{
            title: "Algorithm Visualizer 🎯",
            description:
              "Behold the visual manifestation of algorithmic wisdom",
            keywords: "visualizer, algorithms, animation, learning",
          }}
        />
      </Route>
    </>
  )
);
