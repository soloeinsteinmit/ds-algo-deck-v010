/**
 * @fileoverview Error Boundary component for graceful error handling
 * This component catches runtime errors and displays a user-friendly error message
 */

import { useRouteError } from "react-router-dom";
import { Button } from "@nextui-org/react";

/**
 * @component ErrorBoundary
 * @description A noble component that catches errors and presents them with grace
 * Provides options to return home or try again
 */
function ErrorBoundary() {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-danger">
          Alas! An Error Has Occurred
        </h1>
        <p className="text-xl text-foreground-500">
          {error.message || "Something went wrong in our realm"}
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            color="primary"
            variant="shadow"
            onClick={() => window.location.href = "/"}
          >
            Return to Safety
          </Button>
          <Button
            color="secondary"
            variant="shadow"
            onClick={() => window.location.reload()}
          >
            Try Once More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ErrorBoundary;
