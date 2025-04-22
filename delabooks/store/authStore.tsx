import { create } from "zustand";
import  AsyncStorage from "@react-native-async-storage/async-storage";

type AuthState = {
    user: any | null; // You can define a proper `User` type later
    token: string | null;
    isLoading: boolean;
    register: (username: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  };

export const useAuthStore = create<AuthState>((set)=> ({
    user: null,
    token: null,
    isLoading: false,
    register: async (username: string, email: string, password: string)=> {
        set({ isLoading: true })
        try {
            const response = await fetch("https://delabooks.onrender.com/api/v1/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            })

            const data = await response.json()
            if(!response.ok) throw new Error(data?.message)

            await AsyncStorage.setItem("token", data.token)
            await AsyncStorage.setItem("user", JSON.stringify(data.user))

            set({ user: data?.user, token: data?.token, isLoading: false })

            return { success: true}
        } catch (error: any) {
            console.log(error)
            return { success: false, message: error.message }
            set({ isLoading: false })
        }
    }
}))