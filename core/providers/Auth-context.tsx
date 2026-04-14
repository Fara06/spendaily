"use client";

import { UserData } from "@/query/auth";
import { createContext, useContext, useState } from "react";

type AuthContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserData | null>(() => {
        if (typeof window === "undefined") return null;
        const stored = localStorage.getItem("user");
        return stored ? JSON.parse(stored) : null;
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);