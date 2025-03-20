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
    if (!hasCompletedOnboarding) {
        return  <Navigate to="/onboarding" replace />
    }

//   return hasCompletedOnboarding ? <Outlet /> : <Navigate to="/onboarding" />;
    return children;
}