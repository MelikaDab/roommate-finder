import { Navigate } from "react-router";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  authToken: string | null;
  children: ReactNode;
}

export function ProtectedRoute({authToken, children}: ProtectedRouteProps) {
    if (!authToken) {
        return <Navigate to="/login" replace />
    }
  const hasCompletedOnboarding = localStorage.getItem("hasCompletedOnboarding");
    // Only redirect to onboarding for other protected routes, not /onboarding itself
    if (!hasCompletedOnboarding && window.location.pathname !== "/onboarding") {
        return <Navigate to="/onboarding" replace />;
    }

//   return hasCompletedOnboarding ? <Outlet /> : <Navigate to="/onboarding" />;
    return children;
}