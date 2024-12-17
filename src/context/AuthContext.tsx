import { createContext, useContext, useState } from 'react';

type User = {
    id: number;
    username: string;
    role: string;
};
type AuthContextProps = {
    user: User | null;
    token: string | null;
    login: (data: { user: User; token: string }) => void;
    logout: () => void;
    isAuthorized: (role: string[]) => boolean;
};
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (data: { user: User; token: string }) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('token', data.token);
    };
    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };
    const isAuthorized = (roles: string[]) => {
        return user ? roles.includes(user?.role) : false;
    };
    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, isAuthorized }}>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
