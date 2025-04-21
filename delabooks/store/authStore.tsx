import { create } from "zustand";
import  AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuthStore = create((set)=> ({
    user: null,
    token: null,
    isLoading: false,
    register: async (username: string, email: string, password: string)=> {
        set({ isLoading: true })
        try {
            const response = await fetch("http://localhost:7000/api/v1/auth/register", {
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