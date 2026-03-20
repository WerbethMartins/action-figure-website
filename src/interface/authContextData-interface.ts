export interface AuthContextData{
    user: any | null;
    logged: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}