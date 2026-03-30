// Navigate
import { Navigate } from "react-router-dom";

// Context
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface RequireRoleProps {
    children: JSX.Element;
    rolePermitida: 'admin' | 'Cliente';
}

export function RequireRole({ children, rolePermitida }: RequireRoleProps) {
    const { usuario, loading } = useAuth();

    if(loading) return <div>Carregando...</div>;

    if(!usuario){
        return <Navigate to="/login" />
    }

    if(usuario.role !== rolePermitida){
        return <Navigate to="/acesso-negado"  replace/>
    }

    return children;
}
