
export interface UserData {
    id: string;
    name: string;
    email: string;
}

export interface UserContextType {
    // O estado do usuário. Pode ser UserData ou null (não logado)
    user: UserData | null; 
    
    // A função de Login
    // Ela recebe os dados do usuário e não retorna nada (void)
    signIn: (userData: UserData) => void;
    
    // A função de Logout
    // Ela não recebe argumentos e não retorna nada (void)
    signOut: () => void;
}
