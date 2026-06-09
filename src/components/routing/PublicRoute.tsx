import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

export function PublicRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return null;

    if (user) {
        return <Navigate to="/propozycja" replace />;
    }

    return <>{children}</>;
}
