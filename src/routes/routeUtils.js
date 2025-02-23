import { Navigate } from "react-router-dom";

// TODO: Implement auth and role guards
// Auth guard for protected routes
export const withAuthGuard = (route) => {
  const isAuthenticated = true; /* your auth check logic */

  return {
    ...route,
    element: isAuthenticated ? route.element : <Navigate to="/login" replace />,
  };
};

// Role-based guard
export const withRoleGuard = (route, allowedRoles) => {
  const userRole = "admin"; /* your role check logic */

  return {
    ...route,
    element: allowedRoles.includes(userRole) ? (
      route.element
    ) : (
      <Navigate to="/unauthorized" replace />
    ),
  };
};
