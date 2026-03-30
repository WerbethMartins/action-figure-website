import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

function AccessDenied(){
    const navigate = useNavigate();

    return(
        <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '80vh',
        textAlign: 'center',
        padding: '20px'
        }}>
        <ShieldAlert size={80} color="#ef4444" />
        <h1 style={{ fontSize: '2rem', marginTop: '20px' }}>Acesso Restrito</h1>
        <p style={{ color: 'gray', marginBottom: '30px', maxWidth: '400px' }}>
            Ops! Parece que você não tem as permissões de Administrador necessárias para acessar esta página.
        </p>
        
        <button 
            onClick={() => navigate('/')}
            style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
            }}
        >
            <Home size={20} />
            Voltar para a Home
        </button>
        </div>
    );
}

export default AccessDenied;