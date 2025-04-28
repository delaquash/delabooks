import { create } from "zustand";
import  AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URI } from "@/constant/app";

type IUser = {
    id?: string;
    username?: string;
    email: string;
    profileImage: string;
    createdAt: Date ;
}

type AuthState = {
    user: IUser | null;
    token: string | null;
    isLoading: boolean;
    checkAuth: () => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    isLoading: false,
    register: async (username, email, password) => {
        set({ isLoading: true });
        try {
            const response = await fetch(`${API_URI}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data?.message || "Registration failed");
            
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            set({ user: data.user, token: data.token, isLoading: false });
            return { success: true };
        } catch (error: any) {
            console.log("Register error:", error);
            set({ isLoading: false });
            return { success: false, message: error.message };
        }
    },
    login: async (email, password) => {
        set({ isLoading: true });
        try {
            const res = await fetch(`${API_URI}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            
            if (!res.ok) throw new Error(data?.message || "Login failed");
            
            await AsyncStorage.setItem("token", data.token);
            await AsyncStorage.setItem("user", JSON.stringify(data.user));
            set({ user: data.user, token: data.token, isLoading: false });
            return { success: true };
        } catch (error: any) {
            console.log("Login error:", error);
            set({ isLoading: false });
            return { success: false, message: error.message };
        }
    },
    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const token = await AsyncStorage.getItem("token");
            const userJson = await AsyncStorage.getItem("user");
            const user = userJson ? JSON.parse(userJson) : null;
            set({ token, user, isLoading: false });
        } catch (error) {
            console.log("Error from checkAuth:", error);
            set({ isLoading: false });
        }
    },
    logout: async () => {
        try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            set({ token: null, user: null });
        } catch (error) {
            console.log("Logout error:", error);
        }
    }
}));